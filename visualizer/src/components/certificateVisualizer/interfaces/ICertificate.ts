import { IModelSettings } from './index';
import { ITextSettings } from './index';

export interface ICertificate {
  materialFile: string;
  objectFile: string;
  texts: ITextSettings[];
  modelSettings: IModelSettings[];
}
