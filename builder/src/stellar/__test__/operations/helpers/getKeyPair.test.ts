import { getKeyPair } from '../../../operations/helpers';
import { publicKeyFn, secretFn } from '../../__mocks__/stellar-sdk/types/keypair';

describe('getKeyPair', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return keypair', () => {
    const result = getKeyPair();

    expect(publicKeyFn).toHaveBeenCalledTimes(1);
    expect(secretFn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ publicKey: 'stellar_public_key', secretKey: 'stellar_secret_key' });
  });
});
