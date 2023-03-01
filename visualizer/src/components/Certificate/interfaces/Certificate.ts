import { ModelSettings } from './index';
import { TextSettings } from './index';

export interface Certificate {
  material_file: string;
  object_file: string;
  texts: TextSettings[];
  model_settings: ModelSettings[];
}
