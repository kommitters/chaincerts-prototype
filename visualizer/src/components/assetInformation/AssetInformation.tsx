import { t } from 'i18next';

import { IAssetTitle, IAssetInformation } from './interfaces';

import './styles.css';

const balanceTitles: IAssetTitle[] = [
  { key: 'assetCode', title: 'Asset code:' },
  { key: 'amount', title: 'Balance:' },
  { key: 'assetIssuer', title: 'Issuer:' },
  { key: 'isAuthorizedToMaintainLiabilities', title: 'Authorized to maintain liabilities:' },
  { key: 'isClawbackEnabled', title: 'Clawback enabled:' }
];

const transactionTitles: IAssetTitle[] = [
  { key: 'transactionHash', title: 'Transaction hash:' },
  { key: 'destination', title: 'Destination:' },
  { key: 'createdAt', title: 'Created at:' }
];

const IPFSTitles: IAssetTitle[] = [{ key: 'CID', title: 'CID:' }];

const formatAssetInformation = (assetInfo: IAssetInformation, assetTitles: IAssetTitle[]) => {
  return assetTitles.map(({ key, title }, index) => {
    const assetValue = assetInfo[key];
    return (
      <div key={index}>
        <>
          <div className="text-base font-bold">{title}</div>
          <div className="text-xs">{String(assetValue).toUpperCase()}</div>
        </>
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
          <h3 className="text-lg font-bold">Transaction Information:</h3>
          <div className="py-4">{formatAssetInformation(assetInformation, transactionTitles)}</div>
          <h3 className="text-lg font-bold">Soulbound Token Information:</h3>
          <div className="py-4">{formatAssetInformation(assetInformation, balanceTitles)}</div>
          <h3 className="text-lg font-bold">IPFS Information:</h3>
          <div className="py-4">{formatAssetInformation(assetInformation, IPFSTitles)}</div>
        </div>
      </div>
    </>
  );
};

export default AssetInformation;
