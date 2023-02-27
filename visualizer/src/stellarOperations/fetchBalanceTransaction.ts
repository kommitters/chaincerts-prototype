import { ServerApi } from 'stellar-sdk';
import { Balance } from './interfaces/Balance';
import { getStellarServer } from './helper/getStellarServer';

const PAYMENT = 'payment';

export const fetchBalanceTransaction = async (destinationAccount: string, balance: Balance) => {
  const { assetIssuer: issuerPublicKey, assetCode: assetCode } = balance;
  const operations = await getStellarServer().operations().forAccount(issuerPublicKey).call();
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
    return operation.type === PAYMENT && operation.to === destinationAccount && operation.asset_code === assetCode;
  });

  return paymentOperation;
};

const getPaymentTransaction = async (paymentOperation: ServerApi.OperationRecord | undefined) => {
  return paymentOperation ? await paymentOperation.transaction() : {};
};
