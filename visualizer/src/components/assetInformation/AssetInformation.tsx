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
        {typeof assetValue === 'boolean' ? (
          <p className="text-sm">
            {title}
            {assetValue ? <span className="colored-circle green" /> : <span className="colored-circle red" />}
          </p>
        ) : (
          <p className="text-sm">
            {title} {String(assetValue)}
          </p>
        )}
      </div>
    );
  });
};

type AssetInformationProps = {
  assetInformation: IAssetInformation;
  modalID: string;
};

const AssetInformation = ({ assetInformation, modalID }: AssetInformationProps) => {
  return (
    <>
      <input type="checkbox" id={modalID} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-full">
          <label htmlFor={modalID} className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Blockchain information:</h3>
          <div className="py-4">{formatAssetInformation(assetInformation)}</div>
        </div>
      </div>
    </>
  );
};

export default AssetInformation;
