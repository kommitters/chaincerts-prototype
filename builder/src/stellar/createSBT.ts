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

export const createSBT = async (CID: string, assetCode: string): Promise<string | never> => {
  try {
    // Create distributor Account
    const { publicKey: distributorPublicKey, secretKey: distributorSecretKey } = await createStellarAccount();
    console.log(`\n🔑 Distributor Public Key ${distributorPublicKey} \n`);

    // Create recipient Account
    const { publicKey: recipientPublicKey, secretKey: recipientSecretKey } = await createStellarAccount();
    console.log(`🔑 Recipient Public Key ${recipientPublicKey} \n`);

    // Create Issuer Account and set Flags to make the asset revocable
    const { publicKey: sbtIssuerPublicKey, secretKey: sbtIssuerSecretKey }: IKeyPair = await createIssuerAccount(
      distributorPublicKey,
      distributorSecretKey
    );
    console.log(`🔑 Issuer Public Key ${sbtIssuerPublicKey} \n`);

    const SBT = new Asset(assetCode, sbtIssuerPublicKey);

    // Pin the IPFS CID in the Issuer Account
    await saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, CID);

    // Send the SBT from the issuer account to the Distributor account
    await sendSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, distributorPublicKey, distributorSecretKey, SBT);

    // Send the SBT from the distributor account to the certificate recipient account
    await sendSBT(distributorPublicKey, distributorSecretKey, recipientPublicKey, recipientSecretKey, SBT);

    // Disable recipient ability to transfer the SBT
    await establishNonTransferableSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, recipientPublicKey, SBT);

    const { hash, xdr } = await getClawbackHashAndXDR(sbtIssuerPublicKey, recipientPublicKey, SBT);

    // Create a Clawback Operation and a pre-authorized sign to execute clawback after locking the issuer account
    await preAuthorizeClawback(sbtIssuerPublicKey, sbtIssuerSecretKey, hash);

    // Block the issuer account to disallow the possibility of supplying more SBTs and ensure the SBT's uniqueness.
    await lockIssuerAccount(sbtIssuerPublicKey, sbtIssuerSecretKey);

    return xdr;
  } catch (error) {
    throw new Error(error.message);
  }
};
