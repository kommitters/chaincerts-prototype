import { Operation } from 'stellar-sdk';
import { executeTransaction } from '../services/executeTransaction';

export const saveCID = async (sbtIssuerPublicKey: string, sbtIssuerSecretKey: string, cid: string): Promise<void> => {
  const manageDataOp = Operation.manageData({
    name: 'CID',
    value: cid
  });

  try {
    await executeTransaction(sbtIssuerPublicKey, sbtIssuerSecretKey, manageDataOp);
  } catch (error) {
    throw new Error(`Failed saving the CID: ${error.message}`);
  }
};
