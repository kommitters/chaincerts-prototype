import { fetchAccountBalancesFromCode } from '../../../src/services/stellar';
import { loadAccountFn } from '../../__mocks__/stellar-sdk/types/server'

describe("fetchAccountBalancesFromCode", () => {
  const asset_type = "ASSET_TYPE";
  const certification_code = "CERTIFICATION_CODE";
  const invalid_certification_code = "INVALID_CERTIFICATION_CODE";
  const invalid_public_key = "INVALID_ISSUER";
  const issuer = "ISSUER";
  const public_key = "PUBLIC_KEY";

  it("should return all the code, name and issuer for each balance with the code", async () => {
    const balances = await fetchAccountBalancesFromCode(public_key, certification_code);

    expect(balances).toContainEqual({ assetCode: certification_code, assetType: asset_type, assetIssuer: issuer })
    expect(loadAccountFn).toHaveBeenCalledWith(public_key);
  })

  it("should return and empty array if the account doesn't have the asset", async () => {
    const balances = await fetchAccountBalancesFromCode(public_key, invalid_certification_code);

    expect(balances).toEqual([])
  })

  it("should return and error if the account doesn't exit", async () => {
    loadAccountFn.mockReturnValueOnce(Promise.reject());
    console.error = jest.fn();

    const balances = await fetchAccountBalancesFromCode(invalid_public_key, certification_code);

    expect(console.error).toHaveBeenCalled();
  })
})
