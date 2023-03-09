import { CERT_ASSET } from '../utils/constants';
import { fetchAccountBalancesFromCode } from './fetchAccountBalancesFromCode';
import { fetchCertificateTransaction } from './fetchCertificateTransaction';
import { getAssetPayment } from './helper/getAssetPayment';
import { fetchIssuerCID } from './fetchIssuerCID';
import { Balance } from './interfaces/Balance';

export const fetchStellarAccountInfo = async (publicKey: string) => {
  const balances: Balance[] = await fetchAccountBalancesFromCode(publicKey, CERT_ASSET);

  const stellarAccountInfo = balances.map(async (balance) => {
    if (balance.assetIssuer) {
      const issuerTransaction = await fetchCertificateTransaction(publicKey, balance.assetIssuer, balance.assetCode);
      const assetCreationDate = await getAssetCreationDate(issuerTransaction.sourceAccount, balance);
      const { CID } = await fetchIssuerCID(balance.assetIssuer);
      return Promise.resolve({ ...balance, CID, createdAt: assetCreationDate, ...issuerTransaction });
    }
  });

  return stellarAccountInfo;
};

const getAssetCreationDate = async (sourceAccount: string | undefined, balance: Balance) => {
  if (sourceAccount) {
    const assetCreationPayment = await getAssetPayment(sourceAccount, balance.assetIssuer, balance.assetCode);
    return assetCreationPayment?.created_at;
  }
};
