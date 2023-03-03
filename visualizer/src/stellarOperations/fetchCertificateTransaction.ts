import { ServerApi } from 'stellar-sdk';
import { getAssetPayment } from './helper/getAssetPayment';

export const fetchCertificateTransaction = async (
  destinationAccount: string,
  issuerAccount: string,
  assetCode: string
) => {
  const assetPayment = await getAssetPayment(destinationAccount, issuerAccount, assetCode);

  return formatPayment(assetPayment);
};

const formatPayment = (payment: ServerApi.PaymentOperationRecord | undefined) => {
  return payment
    ? {
        destination: payment.to,
        issuer: payment.asset_issuer,
        sourceAccount: payment.source_account,
        amount: payment.amount
      }
    : {};
};
