import { IAssetTitle, IAssetInformation } from './interfaces';

import './styles.css';

const assetTitles: IAssetTitle = {
  assetCode: 'Asset code:',
  assetIssuer: 'Issuer:',
  isAuthorizedToMaintainLiabilities: 'Authorized to maintain liabilities:',
  isClawbackEnabled: 'Clawback enabled:',
  CID: 'CID:',
  created_at: 'Created at:',
  destination: 'Destination:',
  sourceAccount: 'Source: ',
  amount: 'Amount:'
};

const formatAssetInformation = (assetInfo: IAssetInformation) => {
  return Object.keys(assetInfo).map((keyAsset, index) => {
    const assetValue = assetInfo[keyAsset];

    return (
      <div key={index}>
        {typeof assetValue === 'boolean' ? (
          <>
            <span className="info-title">{assetTitles[keyAsset]}</span>
            {assetValue ? <span className="colored-circle green" /> : <span className="colored-circle red" />}
          </>
        ) : (
          <>
            <span className="info-title">{assetTitles[keyAsset]}</span>
            <span className="value">{String(assetValue)}</span>
          </>
        )}
      </div>
    );
  });
};

// TODO The asset information must be received per parameter
function AssetInformation() {
  const assetInformation: IAssetInformation = {
    assetCode: 'MENTOR100',
    CID: 'QmXvMfFZ4AoX6kB754RrDWWwRjpLN11ppHNidXwJNfB5TU',
    assetIssuer: 'GD65PQIJ3RHVPE5TIXFTHD6CBPNDYLLBNJXMAWLVYFOWV3A7L2YK7XX5',
    destination: 'GB6KONY6F5U3HWSQSPCUX2HJPPENEBP5P77ALW3HPABUHP6YQNZUFZHW',
    sourceAccount: 'GDAQ7BLRWDMSKOMW4MSKQ4FFF4X3ZLC4PT2SZMYI7VI53NEG54R5XI6K',
    isAuthorizedToMaintainLiabilities: true,
    isClawbackEnabled: true,
    amount: '0.0000001',
    created_at: '2023-02-27T19:49:01Z'
  };

  return (
    <div className="asset-card">
      <h2 className="title">SBT information</h2>
      {formatAssetInformation(assetInformation)}
    </div>
  );
}

export default AssetInformation;
