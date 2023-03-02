import { IModelSettings } from './index';
import { ITextSettings } from './index';

export interface ICertificate {
  material_file: string;
  object_file: string;
  texts: ITextSettings[];
  model_settings: IModelSettings[];
}
