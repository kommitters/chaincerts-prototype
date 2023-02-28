import { Operation } from 'stellar-sdk';
import { executeTransaction } from './helpers';

export const lockIssuerAccount = async (issuerPublicKey: string, issuerSecretKey: string) => {
  const setOptionsOp = Operation.setOptions({
    masterWeight: 0
  });

  try {
    console.log('Locking the issuer account .... ');
    await executeTransaction(issuerPublicKey, issuerSecretKey, setOptionsOp);
  } catch (error) {
    throw new Error(`Failed locking the issuer account: ${error.message}`);
  }
};
