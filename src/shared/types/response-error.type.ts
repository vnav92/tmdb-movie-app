import type { AxiosError } from 'axios';

export type ResponseError = AxiosError<{
  status_code: number;
  status_message: string;
  success: boolean;
}>;
