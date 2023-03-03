import { getStellarServer } from './helper/getStellarServer';

const CID = 'CID';

export const fetchIssuerCID = async (issuerPublicKey: string) => {
  const account = await getStellarServer().loadAccount(issuerPublicKey);
  const encodedCid = account.data_attr[CID];
  const cid = Buffer.from(encodedCid, 'base64').toString();

  return { CID: cid };
};
