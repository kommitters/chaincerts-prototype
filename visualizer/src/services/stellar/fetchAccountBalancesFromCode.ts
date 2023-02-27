import { Server } from 'stellar-sdk';

const SERVER = new Server('https://horizon-testnet.stellar.org');

export const fetchAccountBalancesFromCode = async (publicKey: string, assetsCodePattern: string) => {
  try {
    const account = await SERVER.loadAccount(publicKey);
    const assetsFiltered = filterBalancesByAssetCodePattern(account.balances, assetsCodePattern);
    const assets = formatAssets(assetsFiltered);

    return assets;
  } catch (error) {
    console.error(error);
  }
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
