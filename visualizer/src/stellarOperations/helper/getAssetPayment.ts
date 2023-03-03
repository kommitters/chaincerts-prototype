import { ServerApi } from 'stellar-sdk';
import { getStellarServer } from './getStellarServer';

const PAYMENTS_LIMIT = 100;

export const getAssetPayment = async (destinationAccount: string, issuerAccount: string, assetCode: string) => {
  let payments = await getStellarServer().payments().forAccount(destinationAccount).limit(PAYMENTS_LIMIT).call();
  let paymentRecord = findPaymentRecord(payments, destinationAccount, issuerAccount, assetCode);

  while (paymentRecord === undefined && payments.records.length != 0) {
    payments = await payments.next();
    paymentRecord = findPaymentRecord(payments, destinationAccount, issuerAccount, assetCode);
  }

  return paymentRecord;
};

const findPaymentRecord = (
  payments: ServerApi.CollectionPage<ServerApi.PaymentOperationRecord>,
  destinationAccount: string,
  issuerAccount: string,
  assetCode: string
) => {
  const payment = payments.records.find((payment: ServerApi.PaymentOperationRecord) => {
    return (
      payment.to == destinationAccount && payment.asset_issuer === issuerAccount && payment.asset_code === assetCode
    );
  });

  return payment;
};
