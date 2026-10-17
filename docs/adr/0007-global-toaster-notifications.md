# ADR 0007 — Global Toaster for API Responses and Notifications

## Decision

All asynchronous mutation responses, non-field API errors (such as HTTP 409 Conflict, HTTP 500, or network failures), and operation success confirmations **must** use the global toaster notification system (`@core/toast`).

Inline errors are reserved strictly for field-level form validation (such as HTTP 422 `invalidParams` mapped under input controls).

## Implementation

1. **State & Helpers (`src/core/toast`)**:
   Managed via Zustand in `useToastStore`. Exported convenience methods:
   - `toast.error(message, duration?)`
   - `toast.success(message, duration?)`
   - `toast.warning(message, duration?)`
   - `toast.info(message, duration?)`
   - `toast.dismiss(id)`

2. **Presentation (`src/ui/components/Toast/Toaster.tsx`)**:
   Mounted once globally at the application root (`src/app/App.tsx`). Styled with ElWarsha design tokens and supports bidirectional layouts (LTR & RTL via `inset-inline-end`).

## Why

- **Consistency**: All pages and feature modules display asynchronous feedback in a uniform, predictable workshop style.
- **Clean Feature Code**: Features do not need ad-hoc banner state or extra alert markup for API responses.
- **Accessibility**: Screen readers are notified via standard `role="alert"` and `role="status"` live regions.

## Usage Guide

```ts
import { toast } from "@core/toast";

try {
  await api.someAction();
  toast.success("Action completed successfully!");
} catch (err) {
  if (err instanceof ElWarshaApiError && err.status === 409) {
    toast.error(err.body?.detail ?? "Resource already exists.");
    return;
  }
  toast.error("An unexpected error occurred. Please try again.");
}
```

