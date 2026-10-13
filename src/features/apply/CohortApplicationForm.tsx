import React, { useState } from 'react';
import { api } from '@core/api';

export function CohortApplicationForm({ cohortSlug = 'cohort-2' }: { cohortSlug?: string }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    githubHandle: '',
    discordHandle: '',
    currentStatus: 'student',
    collegeMajor: '',
    programmingExperience: '',
    technologies: '',
    gitExperience: 'basics only',
    personalPageUrl: '',
    githubRepoUrl: '',
    aiUsage: '',
    motivation: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // مسح أخطاء الحقل عند الكتابة
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setConflictError(null);

    try {
      await (api as any).applyCohort(cohortSlug, formData);
      setIsSuccess(true);
    } catch (err: any) {
      if (err.status === 422 && err.invalidParams) {
        const errors: Record<string, string> = {};
        err.invalidParams.forEach((param: { name: string; reason: string }) => {
          errors[param.name] = param.reason;
        });
        setFieldErrors(errors);
      } else if (err.status === 409) {
        setConflictError(err.detail || 'Already applied with this email or GitHub.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-6 border rounded-lg bg-green-50">
        <h2 className="text-xl font-bold">Application Submitted!</h2>
        <p>Thank you for applying to ElWarsha Cohort 2.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {conflictError && (
        <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
          {conflictError}
        </div>
      )}

      {/* Section 1 */}
      <fieldset className="border p-4 rounded">
        <legend className="font-bold">1. Personal & Contact Information</legend>

        <div className="mt-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.fullName}
            aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
            className="border p-2 w-full"
          />
          {fieldErrors.fullName && (
            <span id="fullName-error" className="text-red-500 text-sm">
              {fieldErrors.fullName}
            </span>
          )}
        </div>

        <div className="mt-2">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className="border p-2 w-full"
          />
          {fieldErrors.email && (
            <span id="email-error" className="text-red-500 text-sm">
              {fieldErrors.email}
            </span>
          )}
        </div>

        {/* يمكنك تكرار الحقول بنفس النمط لـ whatsappNumber, githubHandle, discordHandle */}
      </fieldset>

      {/* Section 4: Motivation + عداد الحروف */}
      <fieldset className="border p-4 rounded">
        <legend className="font-bold">4. Motivation</legend>
        <div>
          <label htmlFor="motivation">Motivation</label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows={4}
            className="border p-2 w-full"
          />
          <div className="text-sm text-gray-500 mt-1">
            Character count: {formData.motivation.length} / 50 min
          </div>
          {fieldErrors.motivation && (
            <span className="text-red-500 text-sm">{fieldErrors.motivation}</span>
          )}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Apply for next cohort'}
      </button>
    </form>
  );
}