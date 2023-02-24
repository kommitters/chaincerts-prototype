export class Asset {
  assetCode: string;
  issuerKey: string;

  constructor(assetCode: string, issuerKey: string) {
    this.assetCode = assetCode;
    this.issuerKey = issuerKey;
    return this;
  }
}
