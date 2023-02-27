import { OptionalRequestData } from './index';

export interface CertificateRequest {
  username: string;
  stellar_account: string;
  cert_date: string;
  cert_type: string;
  data?: OptionalRequestData;
  [index: string]: string | object | undefined;
}
