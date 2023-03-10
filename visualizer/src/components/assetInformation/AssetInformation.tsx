import { t } from 'i18next';
import { Domains, IAssetTitle, IAssetInformation } from './interfaces';
import { IPFS_EXPLORE_URL, EXPERT_ACCOUNT_URL, STELLAR_TRANSACTION_URL, EXPERT_ASSET_URL } from '../../utils/constants';

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

const referenceDomains: Domains = {
  CID: IPFS_EXPLORE_URL,
  transactionHash: STELLAR_TRANSACTION_URL,
  destination: EXPERT_ACCOUNT_URL,
  assetIssuer: EXPERT_ACCOUNT_URL,
  assetCode: EXPERT_ASSET_URL
};

const getAssetDomainRoute = (key: string, assetInfo: IAssetInformation) => {
  return key === 'assetCode' ? `${assetInfo['assetCode']}-${assetInfo['assetIssuer']}-2` : assetInfo[key];
};

const getAssetInfoValueUrl = (
  domain: string,
  assetInfoValue: string | boolean,
  key: string,
  assetInfo: IAssetInformation
) => {
  const assetDomainRoute = getAssetDomainRoute(key, assetInfo);

  return (
    <a
      href={`${domain}/${assetDomainRoute}`}
      target="_blank"
      className="text-blue-600 hover:underline"
      rel="noreferrer"
    >
      {assetInfoValue}
    </a>
  );
};

const formatAssetInformation = (assetInfo: IAssetInformation, assetTitles: IAssetTitle[]) => {
  return assetTitles.map(({ key, title }, index) => {
    const assetInfoDomain = referenceDomains[key];
    const assetInfoValue = assetInfo[key];

    return (
      <div key={index}>
        <>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs">
            {assetInfoDomain
              ? getAssetInfoValueUrl(assetInfoDomain, assetInfoValue, key, assetInfo)
              : String(assetInfoValue).toUpperCase()}
          </div>
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
      <div className="modal break-all">
        <div className="modal-box relative w-full">
          <label htmlFor={modalID} className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">{t('certificates.stellar_data_modal.transaction_title')}</h3>
          <div className="py-4">{formatAssetInformation(assetInformation, transactionTitles)}</div>
          <h3 className="text-lg font-bold">{t('certificates.stellar_data_modal.soulbound_token_title')}</h3>
          <div className="py-4">{formatAssetInformation(assetInformation, balanceTitles)}</div>
          <h3 className="text-lg font-bold">{t('certificates.stellar_data_modal.IPFS_title')}</h3>
          <div className="py-4">{formatAssetInformation(assetInformation, IPFSTitles)}</div>
        </div>
      </div>
    </>
  );
};

export default AssetInformation;
