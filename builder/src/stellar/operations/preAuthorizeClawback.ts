import { Operation } from 'stellar-sdk';
import { executeTransaction } from './helpers';

export const preAuthorizeClawback = async (issuerPublicKey: string, issuerSecretKey: string, hash: string) => {
  const setOptionsOp = Operation.setOptions({
    signer: {
      preAuthTx: hash,
      weight: 1
    }
  });

  try {
    console.log('- Pre-authorizing the clawback operation');
    await executeTransaction(issuerPublicKey, issuerSecretKey, setOptionsOp);
  } catch (error) {
    throw new Error(`Failed Pre-authorizing clawback: ${error.message}`);
  }
};
