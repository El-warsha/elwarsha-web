export type LogFields = Record<string, unknown>;

export const logger = {
  info(message: string, fields?: LogFields) {
    console.info(JSON.stringify({ level: "info", message, ...fields }));
  },
  error(message: string, fields?: LogFields) {
    console.error(JSON.stringify({ level: "error", message, ...fields }));
  },
};
