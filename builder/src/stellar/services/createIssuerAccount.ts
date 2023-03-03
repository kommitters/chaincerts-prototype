import { Operation, AuthRevocableFlag, AuthClawbackEnabledFlag, AuthFlag } from 'stellar-sdk';
import { IKeyPair } from '../interfaces';
import { executeTransaction, getKeyPair } from './helpers';
import { STARTING_BALANCE } from '../../configs/consts';

export const createIssuerAccount = async (
  publicStellarKey: string,
  secretStellarKey: string
): Promise<IKeyPair | never> => {
  const { publicKey: sbtIssuerPublicKey, secretKey: sbtIssuerSecretKey } = getKeyPair();

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
    return { publicKey: sbtIssuerPublicKey, secretKey: sbtIssuerSecretKey };
  } catch (error) {
    throw new Error(`Failed creating the issuer account: ${error.message}`);
  }
};
