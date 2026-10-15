
import { messages, type Locale } from "@core/i18n";
import styles from "./CohortApplicationForm.module.css";
import { Legend } from "./Legend";
import { Field } from "./Field";
import { TextareaField } from "./TextareaField";
import { useCohortApplication } from "./useCohortApplication";

export interface CohortApplicationFormProps {
  locale: Locale;
  cohortSlug?: string;
}

export function CohortApplicationForm({
  locale,
  cohortSlug: _cohortSlug = "cohort-2",
}: CohortApplicationFormProps) {
  const isAr = locale === "ar";
  const copy = messages[locale].apply;

  const {
  handleSubmit,
  submitError,
  status,
  fieldErrors,
  clearFieldError,
} = useCohortApplication(_cohortSlug, locale);

if (status === "success") {
  return (
    <section
      className={styles.successBox}
      role="status"
      aria-labelledby="success-title"
    >
      <div className={styles.successIcon} aria-hidden="true">
        ✓
      </div>

      <h2 id="success-title" className={styles.successTitle}>
        {locale === "ar"
          ? "تم استلام طلب التقديم بنجاح!"
          : "Application Received Successfully!"}
      </h2>

      <p className={styles.successMessage}>
        {locale === "ar"
          ? "شكرًا لاهتمامك بالانضمام إلى الورشة. تم استلام بياناتك، وسيتم مراجعة طلبك والتواصل معك عند الحاجة."
          : "Thank you for your interest in joining ElWarsha. Your application has been received and will be reviewed."}
      </p>
    </section>
  );
}

  return (
    
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.formGroup}>
        <Legend number="01" title={isAr ? "البيانات الشخصية والتواصل" : "Personal & Contact Information"} description={isAr ? "معلومات شخصية عنك" : "A few words about you"} />
        <div className={styles.inputContainer}>
          <Field
          text={isAr? "الاسم بالكامل" : "Full Name"}
          type="text"
          name="fullName"
          placeholder={isAr? "محمد السيد" : "Mohamed Elsayed"}
          required
          minLength={3}
          error={fieldErrors.fullName}
          onChange={() => clearFieldError("fullName")}
          className={styles.input} />

          <Field
          text={isAr? "البريد الإلكتروني" : "Email"}
          type="email"
          name="email"
          placeholder={"mohamed@gmail.com"}
          required
          error={fieldErrors.email}
          onChange={() => clearFieldError("email")}
          className={styles.input} />

          <Field
          text={isAr? "رقم واتساب" : "WhatsApp Number"}
          type="tel"
          name="whatsappNumber"
          placeholder={"+201140126608"}
          required
          error={fieldErrors.whatsappNumber}
          onChange={() => clearFieldError("whatsappNumber")}
          className={styles.input} />

          <Field
          text={isAr? "اسم الحساب على Github" : "Github Username"}
          type="text"
          name="githubHandle"
          placeholder={"mohamed123"}
          required
          error={fieldErrors.githubHandle}
          onChange={() => clearFieldError("githubHandle")}
          className={styles.input} />

          <Field
          text={isAr? "اسم الحساب على Discord" : "Discord Username"}
          type="text"
          name="discordHandle"
          placeholder={"mohamed123"}
          required
          error={fieldErrors.discordHandle}
          onChange={() => clearFieldError("discordHandle")}
          className={styles.input} />
        </div>
      </fieldset>

      <fieldset className={styles.formGroup}>
        <Legend number="02" title={isAr ? "الخلفية التقنية والتعليمية" : "Technical Background"} description={isAr ? "بعض المعلومات التقنية عنك" : "some technical info about you"} />
        <div className={styles.inputContainer}>
          <div >
            <label htmlFor="currentStatus" className={styles.label}> {isAr ? "وضعك الحالي" : "current status"}</label>
            <select 
              id="currentStatus" 
              name="currentStatus" 
              defaultValue="student" 
              required
              aria-invalid={
                fieldErrors.currentStatus ? "true" : undefined
              }
              aria-describedby={
                fieldErrors.currentStatus
                  ? "currentStatus-error"
                  : undefined
              }
              onChange={() => clearFieldError("currentStatus")}
              className={styles.input} >
                <option value="student">{isAr ? "طالب" : "student"}</option>
                <option value="recent_graduate">{isAr ? "خريج حديث" : "recent graduate"}</option>
                <option value="employed_tech">{isAr ? "يعمل في مجال التكنولوجيا" : "working in tech"}</option>
                <option value="career_switcher">{isAr ? "من مجال أخر" : "switching career"}</option>
                <option value="other">{isAr ? "أخرى" : "other"}</option>
              </select>
              {fieldErrors.currentStatus && (
                <p id="currentStatus-error" className={styles.fieldError}>
                  {fieldErrors.currentStatus}
                </p>
              )}
            </div>

            <Field
              text={isAr ? "التخصص الجامعي" : "College Major"}
              name="collegeMajor"
              placeholder={isAr ? "كلية حاسبات و معلومات" : "Faculty of computers and information"}
              required
              error={fieldErrors.collegeMajor}
              onChange={() => clearFieldError("collegeMajor")}
              className={styles.input}
            />

              <Field
              text={isAr ? "من إمتى وانت بتتعلم برمجة؟" : "Programming Experience"}
              name="programmingExperience"
              placeholder={isAr ? "سنة، ٦ شهور" : "1 year, 6 months"}
              required
              error={fieldErrors.programmingExperience}
              onChange={() => clearFieldError("programmingExperience")}
              className={styles.input}
            />

            <Field           
              text={isAr ? "اللغات والتقنيات اللي اشتغلت بيها فعليًا" : "Technologies Used"}
              name="technologies"
              placeholder={isAr ? "html, css, javascript" : "html, css, javascript"}
              required
              error={fieldErrors.technologies}
              onChange={() => clearFieldError("technologies")}
              className={styles.input}
            />

            <div>
            <label htmlFor="gitExperience" className={styles.label}> {isAr ? "استخدمت Git قبل كده؟" : "Git Experience"}</label>
            <select 
              id="gitExperience" 
              name="gitExperience" 
              defaultValue="never"
              required
              aria-invalid={
                fieldErrors.gitExperience ? "true" : undefined
              }
              aria-describedby={
                fieldErrors.gitExperience
                  ? "gitExperience-error"
                  : undefined
              }
              onChange={() => clearFieldError("gitExperience")}
              className={styles.input} >
                <option value="never">{isAr ? "لم أستخدمه أبداً" : "never"}</option>
                <option value="basics">{isAr ? "أساسيات فقط" : "basics only"}</option>
                <option value="comfortable">{isAr ? "أستخدمه بشكل جيد" : "comfortable"}</option>
              </select>
              {fieldErrors.gitExperience && (
                <p id="gitExperience-error" className={styles.fieldError}>
                  {fieldErrors.gitExperience}
                </p>
              )}
            </div>
        </div>
      </fieldset>

      <fieldset className={styles.formGroup}>
        <Legend number="03" title={isAr ? "مهمة الصفحة الشخصية" : "Personal Page Task"} description={isAr ? "هشاركتنا صفحتك الشخصية بعد الانتهاء منها" : "share the link of your personal page after finishing it"} />

      <div className={styles.inputContainer}>
        <Field 
          text={isAr ? "رابط الصفحة الشخصية المنشورة" : "Published Personal Page Link"}
          type="url"
          name="personalPageUrl"
          placeholder="https://example.com"
          required
          error={fieldErrors.personalPageUrl}
          onChange={() => clearFieldError("personalPageUrl")}
          className={styles.input} />

        <Field 
          text={isAr ? "لينك الريبو على GitHub" : "GitHub Repository Link"}
          type="url"
          name="githubRepoUrl"
          placeholder="https://github.com/username/repo"
          required
          error={fieldErrors.githubRepoUrl}
          onChange={() => clearFieldError("githubRepoUrl")}
          className={styles.input} />

      </div>

        <TextareaField 
          id="aiUsage"
          name="aiUsage"
          placeholder={isAr ? "استخدمت الذكاء الاصطناعي في عمل الصفحة" : "how you used AI tools to create the page"}
          required
          error={fieldErrors.aiUsage}
          onValueChange={() => clearFieldError("aiUsage")}
          className={styles.textarea} />
      </fieldset>
  
      <fieldset className={styles.formGroup}>
        <Legend number="04" title={isAr? "الدافع و الالتزام" : "Motivation"} description={isAr ? "كلمنا عن دافعيتك و التزامك" : "tell us about your motivation and commitment"} />
          <TextareaField 
            id="motivation"
            name="motivation"
            placeholder={isAr ? "ليه عاوز تدخل البرنامج" : "Why do you want to join the program"}
            required
            minLength={50}
            error={fieldErrors.motivation}
            onValueChange={() => clearFieldError("motivation")}
            className={styles.textarea} />
      </fieldset>

      {submitError && (
        <p role="alert" className={styles.error}>
          {submitError}
        </p>
      )}

      <button type="submit" className={styles.submitButton} disabled={status === "submitting"}>
        {copy.submit}
      </button>
    </form>
  );
}