import { Operation } from 'stellar-sdk';
import { executeTransaction } from '../services/executeTransaction';

const NAME = 'CID';

export const saveCID = async (sbtIssuerPublicKey: string, sbtIssuerSecretKey: string, CID: string): Promise<void> => {
  const manageDataOp = Operation.manageData({
    name: NAME,
    value: CID
  });

  try {
    console.log('Saving the CID in the Issuer Account ... ');
    await executeTransaction(sbtIssuerPublicKey, sbtIssuerSecretKey, manageDataOp);
  } catch (error) {
    throw new Error(`Failed saving the CID: ${error.message}`);
  }
};
