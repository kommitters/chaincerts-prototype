import { createIssuerAccount, sendSBT, saveCID } from './services/';
import { KeyPair } from './interfaces/';
import { DISTRIBUTOR_PUBLIC_KEY, DISTRIBUTOR_SECRET_KEY } from '../configs/credentials';
import { Asset } from 'stellar-sdk';

export const createSBT = async (CID: string, assetCode: string): Promise<void | never> => {
  /*eslint-disable no-useless-catch*/
  try {
    const distributorPublicKey = DISTRIBUTOR_PUBLIC_KEY;
    const distributorSecretKey = DISTRIBUTOR_SECRET_KEY;

    const { sbtIssuerPublicKey, sbtIssuerSecretKey }: KeyPair = await createIssuerAccount();

    const SBT = new Asset(assetCode, sbtIssuerPublicKey);

    await saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, CID);
    await sendSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, distributorPublicKey, distributorSecretKey, SBT);
  } catch (error) {
    throw error;
  }
};
