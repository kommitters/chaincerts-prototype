import { fetchStellarAccountInfo } from '../fetchStellarAccountInfo';
import { loadAccountFn } from './__mocks__/stellar-sdk/server';

describe('fetchStellarAccountInfo', () => {
  const ASSET_TYPE = 'ASSET_TYPE';
  const CERTIFICATION_CODE = 'CERTIFICATION_CODE';
  const ISSUER = 'ISSUER';
  const PUBLIC_KEY = 'PUBLIC_KEY';
  const CID = 'IPFS_CID';

  it('should return all the code, name, issuer and CID for each balance', async () => {
    const stellarIAccountInfo = await fetchStellarAccountInfo(PUBLIC_KEY);

    expect(stellarIAccountInfo).toContainEqual({
      assetCode: CERTIFICATION_CODE,
      assetType: ASSET_TYPE,
      assetIssuer: ISSUER,
      CID
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
    expect(balances).toEqual([]);
  });
});
