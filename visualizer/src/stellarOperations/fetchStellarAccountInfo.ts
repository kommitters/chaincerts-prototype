import { CERT_ASSET } from '../../constants';
import { fetchAccountBalancesFromCode } from './fetchAccountBalancesFromCode';
import { fetchIssuerCID } from './fetchIssuerCID';
import { Balance } from './interfaces/Balance';

const asset = CERT_ASSET;

export const fetchStellarAccountInfo = async (publicKey: string) => {
  const balances: Balance[] = await fetchAccountBalancesFromCode(publicKey, asset);
  const stellarIAccountInfo = [];

  for (let i = 0; i < balances.length; i++) {
    if (balances[i].assetIssuer) {
      const { CID } = await fetchIssuerCID(balances[i].assetIssuer);
      const balanceInfo = { CID, ...balances[i] };
      stellarIAccountInfo.push(balanceInfo);
    }
  }

  return stellarIAccountInfo;
};
