import { Server } from 'stellar-sdk';
import { getStellarServer } from './helper/getStellarServer';

export const fetchAccountBalancesFromCode = async (publicKey: string, assetsCodePattern: string) => {
  const account = await getStellarServer().loadAccount(publicKey);
  const assetsFiltered = filterBalancesByAssetCodePattern(account.balances, assetsCodePattern);
  const assets = formatAssets(assetsFiltered);

  return assets;
};

const filterBalancesByAssetCodePattern = (balances: any, assetsCodePattern: string) => {
  var codePattern = new RegExp('^(.*)' + assetsCodePattern + '(.*)$');
  return balances ? balances.filter((balance: any) => codePattern.test(balance.asset_code)) : [];
};

const formatAssets = (assets: any) => {
  return assets.map((balance: any) => {
    return {
      assetCode: balance.asset_code,
      assetType: balance.asset_type,
      assetIssuer: balance.asset_issuer
    };
  });
};
