export interface IAssetTitle {
  assetCode: string;
  assetIssuer: string;
  isAuthorizedToMaintainLiabilities: string;
  isClawbackEnabled: string;
  CID: string;
  created_at: string;
  destination: string;
  sourceAccount: string;
  amount: string;
  [key: string]: string;
}
