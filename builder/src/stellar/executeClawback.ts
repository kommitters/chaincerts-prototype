import { Transaction } from 'stellar-sdk';
import { NETWORK_PASSPHRASE } from '../resources/consts';
import { getStellarServer } from './operations/helpers';

export const executeClawback = async (XDR: string) => {
  const transaction = new Transaction(XDR, NETWORK_PASSPHRASE);
  const server = getStellarServer();
  try {
    console.log('Executing the clawback...');
    await server.submitTransaction(transaction);
  } catch ({ response }) {
    const status = response.status;
    const reason = response.extras?.reason || response.data?.extras?.result_codes?.transaction;

    throw new Error(`Status: ${status}. Reason: ${reason}`);
  }
};
