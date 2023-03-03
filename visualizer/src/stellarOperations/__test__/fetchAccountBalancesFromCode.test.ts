import { fetchAccountBalancesFromCode } from '../fetchAccountBalancesFromCode';
import { loadAccountFn } from './__mocks__/stellar-sdk/server';

describe('fetchAccountBalancesFromCode', () => {
  const CERTIFICATION_CODE = 'ASSET_CODE';
  const INVALID_CERTIFICATION_CODE = 'INVALID_CERTIFICATION_CODE';
  const ISSUER = 'ISSUER_ACCOUNT';
  const PUBLIC_KEY = 'PUBLIC_KEY';

  it('should return all the code, name, and issuer for each balance with the code', async () => {
    const balances = await fetchAccountBalancesFromCode(PUBLIC_KEY, CERTIFICATION_CODE);

    expect(balances).toContainEqual({
      assetCode: CERTIFICATION_CODE,
      assetIssuer: ISSUER,
      isAuthorizedToMaintainLiabilities: true,
      isClawbackEnabled: true
    });
    expect(loadAccountFn).toHaveBeenCalledWith(PUBLIC_KEY);
  });

  it("should return and empty array if the account doesn't have the asset", async () => {
    const balances = await fetchAccountBalancesFromCode(PUBLIC_KEY, INVALID_CERTIFICATION_CODE);

    expect(balances).toEqual([]);
  });

  it('should return and empty array if the account was not found', async () => {
    loadAccountFn.mockReturnValueOnce({});

    const balances = await fetchAccountBalancesFromCode(PUBLIC_KEY, INVALID_CERTIFICATION_CODE);

    expect(balances).toEqual([]);
  });
});
