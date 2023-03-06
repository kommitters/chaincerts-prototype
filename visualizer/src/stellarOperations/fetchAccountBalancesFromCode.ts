import { Horizon } from 'stellar-sdk';
import { getStellarServer } from './helper/getStellarServer';

export const fetchAccountBalancesFromCode = async (publicKey: string, assetsCodePattern: string) => {
  const account = await getStellarServer().loadAccount(publicKey);
  const assetsFiltered = filterBalancesByAssetCodePattern(
    account.balances as Horizon.BalanceLineAsset<'credit_alphanum12'>[],
    assetsCodePattern
  );

  return formatAssets(assetsFiltered);
};

const filterBalancesByAssetCodePattern = (
  balances: Horizon.BalanceLineAsset<'credit_alphanum12'>[],
  assetsCodePattern: string
) => {
  const codePattern = new RegExp(`^(.*)${assetsCodePattern}(.*)$`);

  return balances
    ? balances.filter((balance: Horizon.BalanceLineAsset<'credit_alphanum12'>) => codePattern.test(balance.asset_code))
    : [];
};

const formatAssets = (assets: Horizon.BalanceLineAsset<'credit_alphanum12'>[]) => {
  return assets
    .map((balance: Horizon.BalanceLineAsset<'credit_alphanum12'>) => {
      return {
        assetCode: balance.asset_code,
        assetIssuer: balance.asset_issuer,
        isAuthorizedToMaintainLiabilities: balance.is_authorized_to_maintain_liabilities,
        isClawbackEnabled: balance.is_clawback_enabled
      };
    })
    .filter((asset) => Boolean(asset.assetCode));
};
