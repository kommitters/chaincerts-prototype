import { Server, TransactionBuilder, Keypair, xdr, Horizon } from 'stellar-sdk';

const STELLAR_HORIZON_TEST_URL = 'https://horizon-testnet.stellar.org';

const server = new Server(STELLAR_HORIZON_TEST_URL);

export const executeTransaction = async (
  publicKey: string,
  secretKeys: string | Array<string>,
  operations: xdr.Operation | Array<xdr.Operation>
): Promise<Horizon.SubmitTransactionResponse | never> => {
  try {
    secretKeys = convertToArray(secretKeys) as Array<string>;
    operations = convertToArray(operations) as Array<xdr.Operation>;

    const account = await server.loadAccount(publicKey);
    const fee = String(await server.fetchBaseFee());

    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: process.env.NETWORK_PASSPHRASE
    });

    operations.forEach((operation) => transaction.addOperation(operation));

    const tx = transaction.setTimeout(60).build();

    secretKeys.forEach((secret) => tx.sign(Keypair.fromSecret(secret)));

    return await server.submitTransaction(tx);
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
