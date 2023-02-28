import { Asset, Operation } from 'stellar-sdk';
import { AMOUNT } from '../../configs/consts';
import { executeTransaction } from './helpers';

export const sendSBT = async (
  senderPublicKey: string,
  senderSecretKey: string,
  recipientPublicKey: string,
  recipientSecretKey: string,
  SBT: Asset
): Promise<void> => {
  const changeTrustOp = Operation.changeTrust({
    asset: SBT,
    limit: AMOUNT,
    source: recipientPublicKey
  });

  const paymentOp = Operation.payment({
    asset: SBT,
    amount: AMOUNT,
    destination: recipientPublicKey,
    source: senderPublicKey
  });

  try {
    console.log(`Sending the SBT from ${senderPublicKey} to ${recipientPublicKey}`);
    await executeTransaction(senderPublicKey, [senderSecretKey, recipientSecretKey], [changeTrustOp, paymentOp]);
  } catch (error) {
    throw new Error(`Failed sending the SBT from ${senderPublicKey} to ${recipientPublicKey}: ${error.message}`);
  }
};
