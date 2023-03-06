import { Operation } from 'stellar-sdk';
import { ISSUER_DATA_NAME } from '../../resources/consts';
import { executeTransaction } from './helpers';

export const saveCID = async (sbtIssuerPublicKey: string, sbtIssuerSecretKey: string, CID: string): Promise<void> => {
  const manageDataOp = Operation.manageData({
    name: ISSUER_DATA_NAME,
    value: CID
  });

  try {
    console.log('Saving the CID in the Issuer Account ... ');
    await executeTransaction(sbtIssuerPublicKey, sbtIssuerSecretKey, manageDataOp);
  } catch (error) {
    throw new Error(`Failed saving the CID: ${error.message}`);
  }
};
