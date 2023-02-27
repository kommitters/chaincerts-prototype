import { Server } from 'stellar-sdk';

import { getStellarServer } from './helper/getStellarServer';

const CID = 'CID';

export const fetchIssuerCID = async (issuerPublicKey: string) => {
  const account = await getStellarServer().loadAccount(issuerPublicKey);
  const cid = account.data_attr[CID];

  return { CID: cid };
};
