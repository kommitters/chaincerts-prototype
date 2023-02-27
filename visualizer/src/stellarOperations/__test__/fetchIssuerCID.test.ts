import { fetchIssuerCID } from '../fetchIssuerCID';
import { loadAccountFn } from './__mocks__/stellar-sdk/server';

describe('fetchIssuerCID', () => {
  const ISSUER_PUBLIC_KEY = 'ISSUER';

  it('should return the CID associated with the issuer', async () => {
    const cid = await fetchIssuerCID(ISSUER_PUBLIC_KEY);

    expect(cid).toEqual({ CID: 'IPFS_CID' });
    expect(loadAccountFn).toHaveBeenCalledWith(ISSUER_PUBLIC_KEY);
  });
});
