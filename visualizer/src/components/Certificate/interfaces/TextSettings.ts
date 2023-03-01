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
