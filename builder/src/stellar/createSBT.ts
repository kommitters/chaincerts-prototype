import { Asset } from 'stellar-sdk';
import { IKeyPair } from './interfaces/';
import { DISTRIBUTOR_PUBLIC_KEY, DISTRIBUTOR_SECRET_KEY } from '../configs/credentials';
import { createIssuerAccount, sendSBT, saveCID, establishNonTransferableSBT } from './services';

export const createSBT = async (
  CID: string,
  assetCode: string,
  recipientPublicKey: string,
  recipientSecretKey: string
): Promise<void | never> => {
  /*eslint-disable no-useless-catch*/
  try {
    const distributorPublicKey = DISTRIBUTOR_PUBLIC_KEY;
    const distributorSecretKey = DISTRIBUTOR_SECRET_KEY;

    const { sbtIssuerPublicKey, sbtIssuerSecretKey }: IKeyPair = await createIssuerAccount();

    const SBT = new Asset(assetCode, sbtIssuerPublicKey);

    // Pin the IPFS CID in the Issuer Account
    await saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, CID);

    // Send the SBT from the issuer account to the Distributor account
    await sendSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, distributorPublicKey, distributorSecretKey, SBT);

    // Send the SBT from the distributor account to the certificate recipient account
    await sendSBT(distributorPublicKey, distributorSecretKey, recipientPublicKey, recipientSecretKey, SBT);

    // Disable recipient ability to transfer the SBT
    await establishNonTransferableSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, recipientPublicKey, SBT);
  } catch (error) {
    throw error;
  }
};
