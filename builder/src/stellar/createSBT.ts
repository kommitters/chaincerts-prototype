import { Asset } from 'stellar-sdk';
import { IKeyPair } from './interfaces/';
import {
  createIssuerAccount,
  sendSBT,
  saveCID,
  establishNonTransferableSBT,
  getClawbackHashAndXDR,
  preAuthorizeClawback,
  lockIssuerAccount
} from './operations';
import { createStellarAccount } from './operations/helpers';

export const createSBT = async (
  recipientPublicKey: string,
  recipientSecretKey: string,
  CID: string,
  assetCode: string
): Promise<string | never> => {
  try {
    console.log(`\n\n🏗️  Issuing certificate in Stellar network`);
    console.log(`- Creating issuer accounts`);

    const { publicKey: distributorPublicKey, secretKey: distributorSecretKey } = await createStellarAccount();
    console.log(`  - Distributor: ${distributorPublicKey}`);

    const { publicKey: sbtIssuerPublicKey, secretKey: sbtIssuerSecretKey }: IKeyPair = await createIssuerAccount(
      distributorPublicKey,
      distributorSecretKey
    );
    console.log(`  - Issuer: ${sbtIssuerPublicKey}`);

    const SBT = new Asset(assetCode, sbtIssuerPublicKey);

    console.log(`- Founding asset: ${assetCode}`);
    await sendSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, distributorPublicKey, distributorSecretKey, SBT);

    console.log(`- Attaching IPFS data to the ${assetCode} asset`);
    await saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, CID);

    console.log(`\n\n🎓 Transferring the certificate `);
    console.log(`- From issuing account ${distributorPublicKey} to receiving account ${recipientPublicKey}`);
    await sendSBT(distributorPublicKey, distributorSecretKey, recipientPublicKey, recipientSecretKey, SBT);

    console.log(`\n\n🔐 Configuring the certificate`);
    await establishNonTransferableSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, recipientPublicKey, SBT);

    const { hash, xdr } = await getClawbackHashAndXDR(sbtIssuerPublicKey, recipientPublicKey, SBT);

    await preAuthorizeClawback(sbtIssuerPublicKey, sbtIssuerSecretKey, hash);

    await lockIssuerAccount(sbtIssuerPublicKey, sbtIssuerSecretKey);

    return xdr;
  } catch (error) {
    throw new Error(error.message);
  }
};
