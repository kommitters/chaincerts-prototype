import { Transaction } from 'stellar-sdk';
import { NETWORK_PASSPHRASE } from '../configs/consts';
import { getStellarServer } from './services/helpers';

const SERVER = getStellarServer();

export const executeClawback = async (XDR: string) => {
  const transaction = new Transaction(XDR, NETWORK_PASSPHRASE);

  try {
    console.log('Executing the clawback...');
    await SERVER.submitTransaction(transaction);
  } catch ({ response }) {
    const status = response.status;
    const reason = response.extras?.reason || response.data?.extras?.result_codes?.transaction;

    throw new Error(`Status: ${status}. Reason: ${reason}`);
  }
};
