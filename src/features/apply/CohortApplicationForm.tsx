import { messages, type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";
import { Button } from "@ui/components/Button/Button";
import { useState, type ChangeEvent, type FocusEvent, type SyntheticEvent  } from "react";
import { initialValues, validate, type FormValues } from "./validation";
import { api, ElWarshaApiError, type ApplyCohortInput } from "@core/api";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className={styles.error} role="alert">
      {message}
    </p>
  ) : null;
}

export function CohortApplicationForm({
  locale,
  cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const copy = messages[locale].apply;
  const form = copy.form;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  
  function handleChange(
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
) {
  const { name, value } = e.target;
  setValues((prev) => ({ ...prev, [name]: value }));
}
const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
const [submitted, setSubmitted] = useState(false);

const errors = validate(values, form.errors);

function handleBlur(e: FocusEvent<HTMLElement>) {
  const target = e.target;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
  ) {
    if (target.name) {
      setTouched((prev) => ({ ...prev, [target.name]: true }));
    }
  }
}

function getError(name: keyof FormValues) {
  return touched[name] || submitted ? errors[name] : undefined;
}

async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();
  setSubmitted(true);
  if (Object.keys(errors).length > 0) return;
  if (status === "submitting") return;

  setStatus("submitting");
  setServerError("");

  try {
    const payload: ApplyCohortInput = {
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      whatsappNumber: values.whatsappNumber.replace(/[\s-]/g, ""),
      githubHandle: values.githubHandle.trim(),
      discordHandle: values.discordHandle.trim(),
      personalPageUrl: values.personalPageUrl.trim(),
      githubRepoUrl: values.githubRepoUrl.trim(),
      currentStatus: values.currentStatus as ApplyCohortInput["currentStatus"],
      gitExperience: values.gitExperience as ApplyCohortInput["gitExperience"],
    };
    await api.applyCohort(cohortSlug, payload);
    setStatus("success");
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  } catch (err) {
    setStatus("error");
    if (err instanceof ElWarshaApiError) {
      setServerError(err.message);
    } else {
      setServerError(form.networkError);
    }
  }
}
  return (
    <form className={styles.form} onSubmit={handleSubmit} onBlur={handleBlur} noValidate>
      {/* Section 1: Personal & Contact */}
      <fieldset className={styles.fieldset}>

        <legend>{form.sections.personal}</legend>

        <div className={styles.field}>
          <label htmlFor="fullName">{form.fields.fullName}</label>
          <input id="fullName" 
                 name="fullName" 
                 type="text"
                 value={values.fullName}
                 onChange={handleChange}
                 aria-invalid={getError("fullName") ? true : undefined}
                />
  <FieldError message={getError("fullName")} />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">{form.fields.email}</label>
          <input id="email" 
          name="email" 
          type="email" 
          value={values.email}
          onChange={handleChange}
          aria-invalid={getError("email") ? true : undefined}
          />
          <FieldError message={getError("email")} />
        </div>

        <div className={styles.field}>
          <label htmlFor="whatsappNumber">{form.fields.whatsappNumber}</label>
          <input id="whatsappNumber" 
          name="whatsappNumber" 
          type="tel" 
          value={values.whatsappNumber}
          onChange={handleChange}
          aria-invalid={getError("whatsappNumber") ? true : undefined}
          />
          <FieldError message={getError("whatsappNumber")} />
        </div>

        <div className={styles.field}>
          <label htmlFor="githubHandle">{form.fields.githubHandle}</label>
          <input id="githubHandle" 
          name="githubHandle" 
          type="text"
          value={values.githubHandle}
          onChange={handleChange}
           aria-invalid={getError("githubHandle") ? true : undefined}
          />
          <FieldError message={getError("githubHandle")} />

        </div>

        <div className={styles.field}>
          <label htmlFor="discordHandle">{form.fields.discordHandle}</label>
          <input id="discordHandle" 
          name="discordHandle" 
          type="text" 
          value={values.discordHandle}
          onChange={handleChange}
          aria-invalid={getError("discordHandle") ? true : undefined}
          />
          <FieldError message={getError("discordHandle")} />

        </div>

      </fieldset>

      {/* Section 2: Technical Background */}
      <fieldset className={styles.fieldset}>
        <legend>{form.sections.technical}</legend>
        
        <div className={styles.field}>
          <label htmlFor="currentStatus">{form.fields.currentStatus}</label>
         <select name="currentStatus" id="currentStatus" value={values.currentStatus} onChange={handleChange}aria-invalid={getError("currentStatus") ? true : undefined}> 
          <option value="">{form.select}</option>
          <option value="student">{form.options.student}</option>
          <option value="recent_graduate">{form.options.recent_graduate}</option>
          <option value="employed_tech">{form.options.employed_tech}</option>
          <option value="career_switcher">{form.options.career_switcher}</option>
          <option value="other">{form.options.other}</option>
         </select>
         <FieldError message={getError("currentStatus")} />
        </div>

        <div className={styles.field}>
          <label htmlFor="collegeMajor">{form.fields.collegeMajor}</label>
          <input id="collegeMajor" 
          name="collegeMajor" 
          type="text" 
          value={values.collegeMajor} 
          onChange={handleChange} 
          aria-invalid={getError("collegeMajor") ? true : undefined}
          />
         <FieldError message={getError("collegeMajor")} />       
          </div>

        <div className={styles.field}>
          <label htmlFor="programmingExperience">
            {form.fields.programmingExperience}</label>
          <input id="programmingExperience" 
          name="programmingExperience" 
          type="text" 
          value={values.programmingExperience} 
          onChange={handleChange} 
          aria-invalid={getError("programmingExperience") ? true : undefined}
          />
         <FieldError message={getError("programmingExperience")} />       

        </div>

        <div className={styles.field}>
          <label htmlFor="technologies">
            {form.fields.technologies}</label>
          <textarea id="technologies" 
          name="technologies" rows={3} 
          value={values.technologies} 
          onChange={handleChange} 
          aria-invalid={getError("technologies") ? true : undefined}
          />
          <FieldError message={getError("technologies")} />
        </div>

        <div className={styles.field}>
          <label htmlFor="gitExperience">{form.fields.gitExperience}</label>
          <select id="gitExperience" name="gitExperience" value={values.gitExperience} onChange={handleChange}aria-invalid={getError("gitExperience") ? true : undefined} >
            <option value="">{form.select}</option>
            <option value="none">{form.options.none}</option>
            <option value="basics">{form.options.basics}</option>
            <option value="comfortable">{form.options.comfortable}</option>
          </select>
          <FieldError message={getError("gitExperience")} />
        </div>
       </fieldset>

       {/* Section 3: Personal Page Task */}
      <fieldset className={styles.fieldset}>
        <legend>{form.sections.page}</legend>

        <div className={styles.field}>
          <label htmlFor="personalPageUrl">
            {form.fields.personalPageUrl}</label>
          <input id="personalPageUrl" 
          name="personalPageUrl" 
          type="url"
          value={values.personalPageUrl}
          onChange={handleChange}
           aria-invalid={getError("personalPageUrl") ? true : undefined}
          />
          <FieldError message={getError("personalPageUrl")} />

        </div>

        <div className={styles.field}>
          <label htmlFor="githubRepoUrl">{form.fields.githubRepoUrl}</label>
          <input id="githubRepoUrl" 
          name="githubRepoUrl" 
          type="url"
          value={values.githubRepoUrl}
          onChange={handleChange} 
          aria-invalid={getError("githubRepoUrl") ? true : undefined}
          />
          <FieldError message={getError("githubRepoUrl")} />

        </div>

        <div className={styles.field}>
          <label htmlFor="aiUsage">
            {form.fields.aiUsage}</label>
          <textarea id="aiUsage" name="aiUsage" rows={3} value={values.aiUsage} onChange={handleChange} aria-invalid={getError("aiUsage") ? true : undefined} />
          <FieldError message={getError("aiUsage")} />
        </div>
      </fieldset>

      {/* Section 4: Motivation */}
      <fieldset className={styles.fieldset}>
        <legend>{form.sections.motivation}</legend>

        <div className={styles.field}>
          <label htmlFor="motivation">{form.fields.motivation}</label>
          <textarea id="motivation" name="motivation" rows={5} value={values.motivation} onChange={handleChange} aria-invalid={getError("motivation") ? true : undefined} />
          <small>{values.motivation.trim().length} / 50</small>
          <FieldError message={getError("motivation")} />
        </div>
      </fieldset>
      


      {status === "success" && (
        <p role="status" className={styles.success}>
             {form.success}          
             </p>
         )}
      {status === "error" && (
      <p role="alert" className={styles.error}>{serverError}</p>
         )}

       <Button type="submit" className={styles.submit} disabled={status === "submitting"}>
          {status === "submitting" ? form.sending : copy.submit}
        </Button>  
      
    </form>
  );
}  
