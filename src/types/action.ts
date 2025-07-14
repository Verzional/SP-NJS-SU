export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormProps<T> {
  mode: "create" | "edit";
  data?: T;
}

export interface UploadWidgetProps {
  onUploadSuccess: (url: string) => void;
}