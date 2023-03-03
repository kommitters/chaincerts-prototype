import { ServerApi } from 'stellar-sdk';
import { getStellarServer } from './helper/getStellarServer';

const PAYMENTS_LIMIT = 100;

export const fetchCertificateTransaction = async (
  destinationAccount: string,
  distributorAccount: string,
  assetCode: string
) => {
  const assetPayment = await getAssetPayment(destinationAccount, distributorAccount, assetCode);
  const paymentTransaction = await getPaymentTransaction(assetPayment);

  return paymentTransaction;
};

const getAssetPayment = async (destinationAccount: string, distributorAccount: string, assetCode: string) => {
  let payments = await getStellarServer().payments().forAccount(destinationAccount).limit(PAYMENTS_LIMIT).call();
  let paymentRecord = findPaymentRecord(payments, distributorAccount, assetCode);

  while (paymentRecord === undefined && payments.records.length != 0) {
    payments = await payments.next();
    paymentRecord = findPaymentRecord(payments, distributorAccount, assetCode);
  }

  return paymentRecord;
};

const findPaymentRecord = (
  payments: ServerApi.CollectionPage<ServerApi.PaymentOperationRecord>,
  distributorAccount: string,
  assetCode: string
) => {
  const payment = payments.records.find((payment: ServerApi.PaymentOperationRecord) => {
    return payment.asset_issuer === distributorAccount && payment.asset_code === assetCode;
  });

  return payment;
};

const getPaymentTransaction = async (payment: ServerApi.PaymentOperationRecord | undefined) => {
  return payment ? await payment.transaction() : {};
};
