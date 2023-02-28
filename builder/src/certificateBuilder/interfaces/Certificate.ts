export interface Certificate {
  material_file: string;
  object_file: string;
  texts: TextSettings[];
  model_settings: ModelSettings[];
}

export interface TextSettings {
  type: string;
  textFormatter: string;
  fontSize: number;
  position: { x: number; y: number; z: number };
  color: string;
  text: string;
  vertical?: boolean;
  bold?: boolean;
}

export interface ModelSettings {
  name: string;
  texture: string;
  visible: boolean;
}
