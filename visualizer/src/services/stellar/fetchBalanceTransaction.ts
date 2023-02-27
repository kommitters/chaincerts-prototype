import { Server, ServerApi } from 'stellar-sdk';
import { Balance } from './../../interfaces/Balance';

const SERVER = new Server('https://horizon-testnet.stellar.org');

export const fetchBalanceTransaction = async (destinationAccount: string, balance: Balance) => {
  const { assetIssuer: issuerPublicKey, assetCode: assetCode } = balance;
  const operations = await SERVER.operations().forAccount(issuerPublicKey).call();
  const paymentOperation = getPaymentOperation(operations, assetCode, destinationAccount);
  const paymentTransaction = await getPaymentTransaction(paymentOperation);

  return paymentTransaction;
};

const getPaymentOperation = (
  operations: ServerApi.CollectionPage<ServerApi.OperationRecord>,
  assetCode: string,
  destinationAccount: string
) => {
  const paymentOperation = operations.records.find((operation: ServerApi.OperationRecord) => {
    return operation.type == 'payment' && operation.to == destinationAccount && operation.asset_code == assetCode;
  });

  return paymentOperation;
};

const getPaymentTransaction = async (paymentOperation: ServerApi.OperationRecord | undefined) => {
  return paymentOperation ? await paymentOperation.transaction() : {};
};
