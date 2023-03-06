import { Asset, Operation } from 'stellar-sdk';
import { executeTransaction } from './helpers';

export const establishNonTransferableSBT = async (
  sbtIssuerPublicKey: string,
  sbtIssuerSecretKey: string,
  recipientPublicKey: string,
  sbt: Asset
) => {
  const setTrustLineFlagsOp = Operation.setTrustLineFlags({
    asset: sbt,
    trustor: recipientPublicKey,
    flags: {
      authorized: false,
      authorizedToMaintainLiabilities: true
    }
  });

  try {
    console.log('\n🚫 Establishing Chaincert as a non-transferable asset... \n');
    await executeTransaction(sbtIssuerPublicKey, sbtIssuerSecretKey, setTrustLineFlagsOp);
  } catch (error) {
    throw new Error(`Failed stablishing the SBT as a non-transferable asset: ${error.message}`);
  }
};
