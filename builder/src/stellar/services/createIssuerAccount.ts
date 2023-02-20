import { Operation, AuthRevocableFlag, AuthClawbackEnabledFlag, AuthFlag, Keypair } from 'stellar-sdk';
import { KeyPair } from '../interfaces';
import { executeTransaction } from '../services/executeTransaction';

export const createIssuerAccount = async (): Promise<KeyPair | never> => {
  const publicStellarKey = process.env.STELLAR_PUBLIC_KEY as string;
  const secretStellarKey = process.env.STELLAR_SECRET_KEY as string;
  const startingBalance = process.env.STARTING_BALANCE as string;
  const { sbtIssuerPublicKey, sbtIssuerSecretKey } = sbtIssuerCreateKeys();

  const createAccountOp = Operation.createAccount({
    destination: sbtIssuerPublicKey,
    startingBalance
  });

  const setOptions = Operation.setOptions({
    setFlags: (AuthRevocableFlag | AuthClawbackEnabledFlag) as AuthFlag,
    source: sbtIssuerPublicKey
  });

  try {
    await executeTransaction(publicStellarKey, [secretStellarKey, sbtIssuerSecretKey], [createAccountOp, setOptions]);

    console.log(`IssuerPublicKey: ${sbtIssuerPublicKey}, IssuerSecretKey ${sbtIssuerSecretKey}`);

    return { sbtIssuerPublicKey, sbtIssuerSecretKey };
  } catch (error) {
    throw new Error(`Failed creating the issuer account: ${error.message}`);
  }
};

const sbtIssuerCreateKeys = (): KeyPair => {
  const sbtIssuerKeyPair = Keypair.random();
  const sbtIssuerPublicKey = sbtIssuerKeyPair.publicKey();
  const sbtIssuerSecretKey = sbtIssuerKeyPair.secret();

  return { sbtIssuerPublicKey, sbtIssuerSecretKey };
};
