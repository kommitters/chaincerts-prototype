import { FRIENDBOT_ENDPOINT } from '../../../resources/consts';
import { IKeyPair } from '../../interfaces';
import { getKeyPair } from './getKeyPair';

export const createStellarAccount = async (): Promise<IKeyPair | never> => {
  const { publicKey, secretKey } = getKeyPair();
  try {
    await fetch(FRIENDBOT_ENDPOINT + `${encodeURIComponent(publicKey)}`);
    return { publicKey, secretKey };
  } catch (error) {
    throw new Error(error.message);
  }
};
