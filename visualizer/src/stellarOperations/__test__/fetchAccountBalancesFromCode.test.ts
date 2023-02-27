import { fetchAccountBalancesFromCode } from '../fetchAccountBalancesFromCode';
import { loadAccountFn } from './__mocks__/stellar-sdk/server';

describe('fetchAccountBalancesFromCode', () => {
  const ASSET_TYPE = 'ASSET_TYPE';
  const CERTIFICATION_CODE = 'CERTIFICATION_CODE';
  const INVALID_CERTIFICATION_CODE = 'INVALID_CERTIFICATION_CODE';
  const ISSUER = 'ISSUER';
  const PUBLIC_KEY = 'PUBLIC_KEY';

  it('should return all the code, name, and issuer for each balance with the code', async () => {
    const balances = await fetchAccountBalancesFromCode(PUBLIC_KEY, CERTIFICATION_CODE);

    expect(balances).toContainEqual({ assetCode: CERTIFICATION_CODE, assetType: ASSET_TYPE, assetIssuer: ISSUER });
    expect(loadAccountFn).toHaveBeenCalledWith(PUBLIC_KEY);
  });

  it("should return and empty array if the account doesn't have the asset", async () => {
    const balances = await fetchAccountBalancesFromCode(PUBLIC_KEY, INVALID_CERTIFICATION_CODE);

    expect(balances).toEqual([]);
  });
});
