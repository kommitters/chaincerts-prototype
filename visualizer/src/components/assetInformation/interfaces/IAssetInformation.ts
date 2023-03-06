export interface IAssetInformation {
  assetCode: string;
  assetIssuer: string;
  isAuthorizedToMaintainLiabilities: boolean;
  isClawbackEnabled: boolean;
  CID: string;
  created_at: string;
  destination: string;
  sourceAccount: string;
  amount: string;
  [key: string]: string | boolean;
}
