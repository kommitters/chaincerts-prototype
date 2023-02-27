import { fetchIssuerCID } from '../../../src/services/stellar';
import { loadAccountFn } from '../../__mocks__/stellar-sdk/types/server'

describe("fetchIssuerCID", () => {
  const invalid_public_key = "INVALID_ISSUER";
  const issuer_public_key = "ISSUER";

  it("should return the CID associated with the issuer", async () => {
    const cid = await fetchIssuerCID(issuer_public_key);

    expect(cid).toEqual({ "CID": "IPFS_CID" })
    expect(loadAccountFn).toHaveBeenCalledWith(issuer_public_key);
  })

  it("should return an error if the issuer account doesn't exist", async () => {
    loadAccountFn.mockReturnValueOnce(Promise.reject());
    console.error = jest.fn();

    const cid = await fetchIssuerCID(invalid_public_key);

    expect(console.error).toHaveBeenCalled();
  })
})
