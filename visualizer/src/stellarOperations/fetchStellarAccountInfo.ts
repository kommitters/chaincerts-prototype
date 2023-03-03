import { CERT_ASSET } from '../../utils/constants';
import { fetchAccountBalancesFromCode } from './fetchAccountBalancesFromCode';
import { fetchIssuerCID } from './fetchIssuerCID';
import { Balance } from './interfaces/Balance';

const asset = CERT_ASSET;

export const fetchStellarAccountInfo = async (publicKey: string) => {
  const balances: Balance[] = await fetchAccountBalancesFromCode(publicKey, asset);

  const stellarAccountInfo = balances.map(async (balance) => {
    if (balance.assetIssuer) {
      const { CID } = await fetchIssuerCID(balance.assetIssuer);
      return Promise.resolve({ CID, ...balance });
    }
  });

  return stellarAccountInfo;
};
