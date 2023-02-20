import { Asset, Operation } from 'stellar-sdk';
import { executeTransaction } from '../services/executeTransaction';

export const sendSBTtoDistributor = async (
  sbtIssuerPublicKey: string,
  sbtIssuerSecretKey: string,
  assetCode: string
): Promise<void> => {
  const distributorPublicKey = process.env.DISTRIBUTOR_PUBLIC_KEY as string;
  const distributorSecretKey = process.env.DISTRIBUTOR_SECRET_KEY as string;
  const amount = process.env.AMOUNT as string;
  const sbt = new Asset(assetCode, sbtIssuerPublicKey);

  const changeTrustOp = Operation.changeTrust({
    asset: sbt,
    limit: amount,
    source: distributorPublicKey
  });

  const paymentOp = Operation.payment({
    asset: sbt,
    amount: amount,
    destination: distributorPublicKey,
    source: sbtIssuerPublicKey
  });

  try {
    await executeTransaction(
      sbtIssuerPublicKey,
      [sbtIssuerSecretKey, distributorSecretKey],
      [changeTrustOp, paymentOp]
    );
  } catch (error) {
    throw new Error(`Failed sending the SBT to the distributor: ${error.message}`);
  }
};
