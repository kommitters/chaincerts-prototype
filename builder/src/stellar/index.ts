import { createIssuerAccount, sendSBTtoDistributor, saveCID } from './services/';
import { KeyPair } from './interfaces/';

const CERTIFICATE_ASSET_CODE = 'MentorCert';

export const createSBT = async (cid: string): Promise<void> => {
  const { sbtIssuerPublicKey, sbtIssuerSecretKey }: KeyPair = await createIssuerAccount();
  await saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, cid);
  await sendSBTtoDistributor(sbtIssuerPublicKey, sbtIssuerSecretKey, CERTIFICATE_ASSET_CODE);
};
