import { Server } from 'stellar-sdk';

const SERVER = new Server('https://horizon-testnet.stellar.org');

export const fetchIssuerCID = async (issuerPublicKey: string) => {
  try {
    const account = await SERVER.loadAccount(issuerPublicKey);
    const cid = account.data_attr['CID'];

    return { CID: cid };
  } catch (error) {
    console.error(error);
  }
};
