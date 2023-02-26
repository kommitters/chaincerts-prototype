import { OptionalRequestData } from './index';

export interface CertificateRequest {
  username: string;
  stellar_account: string;
  certificate_date: string;
  certificate_type: string;
  data?: OptionalRequestData;
  [index: string]: string | object | undefined;
}
