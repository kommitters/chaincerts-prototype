import { IOptionalRequestData } from './index';

export interface ICertificateRequest {
  username: string;
  certDate: string;
  certType: string;
  stellarAccount: string;
  data?: IOptionalRequestData;
  [index: string]: string | object | undefined;
}
