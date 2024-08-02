// alertType.ts
export interface AlertType {
  id: string; // UUID or unique string
  message: string;
  severity: "success" | "error" | "info" | "warning";
}
