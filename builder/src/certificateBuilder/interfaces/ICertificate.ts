import { IModelSettings, ITextSettings } from './index';

export interface ICertificate {
  materialFile: string;
  objectFile: string;
  texts: ITextSettings[];
  modelSettings: IModelSettings[];
}
