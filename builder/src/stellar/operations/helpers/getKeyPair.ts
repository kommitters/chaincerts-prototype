import { Keypair } from 'stellar-sdk';
import { IKeyPair } from '../../interfaces';

export const getKeyPair = (): IKeyPair => {
  const keyPair = Keypair.random();
  const publicKey = keyPair.publicKey();
  const secretKey = keyPair.secret();

  return { publicKey, secretKey };
};
