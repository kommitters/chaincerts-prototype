import { Server, TransactionBuilder, Keypair, xdr, Horizon } from 'stellar-sdk';

const SERVER = new Server('https://horizon-testnet.stellar.org');
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

export const executeTransaction = async (
  publicKey: string,
  secretKeys: string | Array<string>,
  operations: xdr.Operation | Array<xdr.Operation>
): Promise<Horizon.SubmitTransactionResponse | never> => {
  try {
    secretKeys = convertToArray(secretKeys) as Array<string>;
    operations = convertToArray(operations) as Array<xdr.Operation>;

    const account = await SERVER.loadAccount(publicKey);
    const fee = String(await SERVER.fetchBaseFee());

    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: NETWORK_PASSPHRASE
    });

    operations.forEach((operation) => transaction.addOperation(operation));

    const tx = transaction.setTimeout(60).build();

    secretKeys.forEach((secret) => tx.sign(Keypair.fromSecret(secret)));

    return await SERVER.submitTransaction(tx);
  } catch ({ response }) {
    const status = response.status;
    const reason = response.extras?.reason || response.data?.extras?.result_codes?.transaction;

    throw new Error(`Status: ${status}. Reason: ${reason}`);
  }
};

function convertToArray(value: string | Array<string>): Array<string>;

function convertToArray(value: xdr.Operation | Array<xdr.Operation>): Array<xdr.Operation>;

function convertToArray(value: unknown): Array<unknown> {
  return !Array.isArray(value) ? [value] : value;
}
