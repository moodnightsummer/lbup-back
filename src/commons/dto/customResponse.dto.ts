export class CustomResponse {
  constructor(success: boolean, data?: any, meta?: Record<string, any>) {
    this.success = success;
    this.data = data;
    this.meta = meta;
  }

  success: boolean;
  data: any;
  meta: Record<string, any>;
  error?: {
    code: string;
    message: string;
  };
}
