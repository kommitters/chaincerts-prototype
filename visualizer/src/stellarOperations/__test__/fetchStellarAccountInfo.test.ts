import { fetchStellarAccountInfo } from '../fetchStellarAccountInfo';
import { loadAccountFn } from './__mocks__/stellar-sdk/server';

describe('fetchStellarAccountInfo', () => {
  const CERTIFICATION_CODE = 'ASSET_CODE';
  const ISSUER = 'ISSUER_ACCOUNT';
  const PUBLIC_KEY = 'DESTINATION_ACCOUNT';
  const SOURCE_ACCOUNT = 'SOURCE_ACCOUNT';
  const DESTINATION_ACCOUNT = 'DESTINATION_ACCOUNT';
  const CID = 'IPFS_CID';

  it('should return all the code, name, issuer, CID, createAt and the payment for each balance', async () => {
    const stellarAccountInfo = await fetchStellarAccountInfo(PUBLIC_KEY);
    const resolvedStellarAccountInfo = await Promise.all(stellarAccountInfo);
    expect(resolvedStellarAccountInfo).toContainEqual({
      assetCode: CERTIFICATION_CODE,
      assetIssuer: ISSUER,
      CID,
      isAuthorizedToMaintainLiabilities: true,
      isClawbackEnabled: true,
      createdAt: 'CREATE_AT_DATE',
      amount: 1,
      destination: DESTINATION_ACCOUNT,
      issuer: ISSUER,
      sourceAccount: SOURCE_ACCOUNT
    });
    expect(loadAccountFn).toHaveBeenCalledWith(PUBLIC_KEY);
  });

  it('should return and empty array if the account was not found', async () => {
    loadAccountFn.mockReturnValueOnce({});

    const balances = await fetchStellarAccountInfo(PUBLIC_KEY);

    expect(balances).toEqual([]);
  });

  it('should return and empty array if the Issuer is undefined', async () => {
    const IncompleteAccount = {
      balances: [
        {
          asset_code: 'CERTIFICATION_CODE',
          asset_type: 'ASSET_TYPE'
        }
      ]
    };
    loadAccountFn.mockReturnValueOnce(IncompleteAccount);
    const balances = await fetchStellarAccountInfo(PUBLIC_KEY);
    const resolvedValuesArray = await Promise.all(balances);
    expect(resolvedValuesArray).toEqual([]);
  });
});
