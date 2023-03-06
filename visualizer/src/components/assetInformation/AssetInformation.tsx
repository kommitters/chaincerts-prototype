import { IAssetTitle, IAssetInformation } from './interfaces';

import './styles.css';

const assetTitles: IAssetTitle[] = [
  { key: 'assetCode', title: 'Asset code:' },
  { key: 'CID', title: 'CID:' },
  { key: 'assetIssuer', title: 'Issuer:' },
  { key: 'destination', title: 'Destination:' },
  { key: 'sourceAccount', title: 'Source:' },
  { key: 'isAuthorizedToMaintainLiabilities', title: 'Authorized to maintain liabilities:' },
  { key: 'isClawbackEnabled', title: 'Clawback enabled:' },
  { key: 'createdAt', title: 'Created at:' },
  { key: 'amount', title: 'Amount:' }
];

const formatAssetInformation = (assetInfo: IAssetInformation) => {
  return assetTitles.map(({ key, title }, index) => {
    const assetValue = assetInfo[key];

    return (
      <div key={index}>
        <span className="info-title">{title}</span>
        {typeof assetValue === 'boolean' ? (
          assetValue ? (
            <span className="colored-circle green" />
          ) : (
            <span className="colored-circle red" />
          )
        ) : (
          <span className="value">{String(assetValue)}</span>
        )}
      </div>
    );
  });
};

type AssetInformationProps = {
  assetInformation: IAssetInformation;
};

const AssetInformation = ({ assetInformation }: AssetInformationProps) => {
  return (
    <div className="asset-card">
      <h2 className="title">SBT information</h2>
      {formatAssetInformation(assetInformation)}
    </div>
  );
};

export default AssetInformation;
