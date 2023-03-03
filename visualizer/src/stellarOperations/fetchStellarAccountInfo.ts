import { CERT_ASSET } from '../../constants';
import { fetchAccountBalancesFromCode } from './fetchAccountBalancesFromCode';
import { fetchIssuerCID } from './fetchIssuerCID';
import { Balance } from './interfaces/Balance';

const asset = CERT_ASSET;

export const fetchStellarAccountInfo = async (publicKey: string) => {
  const balances: Balance[] = await fetchAccountBalancesFromCode(publicKey, asset);
  let stellarAccountInfo = [];

  stellarAccountInfo = balances.map(async (ele) => {
    if (ele.assetIssuer) {
      const { CID } = await fetchIssuerCID(ele.assetIssuer);
      return Promise.resolve({ CID, ...ele });
    }
  });

  return stellarAccountInfo;
};
