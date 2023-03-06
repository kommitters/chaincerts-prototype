import { IAssetTitle, IAssetInformation } from './interfaces';
import PropTypes, { InferProps } from 'prop-types';

import './styles.css';

const assetTitles = [
  { title: 'Asset code:', key: 'assetCode' },
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

const propTypes = {
  assetInformation: PropTypes.object.isRequired
};

const AssetInformation = ({ assetInformation }: InferProps<typeof propTypes>) => {
  return (
    <div className="asset-card">
      <h2 className="title">SBT information</h2>
      {formatAssetInformation(assetInformation as IAssetInformation)}
    </div>
  );
};

export default AssetInformation;
