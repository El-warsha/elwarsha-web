# ADR 0007 — Zod for Form Validation

## Decision

Use Zod to define and validate application form data through schemas located in the relevant feature's validation directory.

Validation schemas should define field constraints and use localized validation messages from the existing i18n messages.

Keep validation logic separate from form UI components to improve maintainability and reusability.

## Why

Zod provides a declarative and type-safe way to validate form data. Centralizing validation rules in schemas makes them easier to understand, maintain, and test.

Using localized validation messages keeps error feedback consistent with the application's Arabic and English support.

## Notes

- Keep validation schemas close to the feature they belong to.
- Reuse the existing i18n messages instead of hardcoding user-facing error messages.
- Update the schema when form fields or validation requirements change.
- Do not duplicate validation rules unnecessarily across UI components.
- Use `safeParse` or `parse` to validate data, depending on the form's error-handling requirements.