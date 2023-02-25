import { Operation, AuthRevocableFlag, AuthClawbackEnabledFlag, AuthFlag, Keypair } from 'stellar-sdk';
import { KeyPair } from '../interfaces';
import { executeTransaction } from '../services/executeTransaction';
import { STELLAR_PUBLIC_KEY, STELLAR_SECRET_KEY } from '../../configs/credentials';

const STARTING_BALANCE = '3';

export const createIssuerAccount = async (): Promise<KeyPair | never> => {
  const publicStellarKey = STELLAR_PUBLIC_KEY;
  const secretStellarKey = STELLAR_SECRET_KEY;

  const { sbtIssuerPublicKey, sbtIssuerSecretKey } = sbtIssuerCreateKeys();

  const createAccountOp = Operation.createAccount({
    destination: sbtIssuerPublicKey,
    startingBalance: STARTING_BALANCE
  });

  const setOptions = Operation.setOptions({
    setFlags: (AuthRevocableFlag | AuthClawbackEnabledFlag) as AuthFlag,
    source: sbtIssuerPublicKey
  });

  try {
    console.log('Creating the Issuer Account ...');
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
