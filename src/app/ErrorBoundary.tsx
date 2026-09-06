import { Component, type ErrorInfo, type ReactNode } from "react";

import { logger } from "@core/logging/logger";
import { isLocale, messages } from "@core/i18n";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("UI crashed", { message: error.message, info });
  }

  render(): ReactNode {
    if (this.state.failed) {
      const documentLocale = document.documentElement.lang;
      const locale = isLocale(documentLocale) ? documentLocale : "ar";
      return <main>{messages[locale].error}</main>;
    }
    return this.props.children;
  }
}
