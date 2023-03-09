import { createStellarAccount, getKeyPair } from '../../../operations/helpers';

jest.mock('../../../operations/helpers/getKeyPair', () => ({
  getKeyPair: jest.fn(() => ({
    publicKey: 'public_key',
    secretKey: 'secret_key'
  }))
}));

describe('createStellarAccount', () => {
  const mockedGetKeyPair = getKeyPair as jest.MockedFunction<typeof getKeyPair>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return keypair', async () => {
    const mockFetch = jest.fn(() => Promise.resolve());
    global.fetch = mockFetch as jest.Mock;

    const result = await createStellarAccount();

    expect(mockedGetKeyPair).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://friendbot.stellar.org?addr=public_key');
    expect(result).toEqual({ publicKey: 'public_key', secretKey: 'secret_key' });
  });

  it('should throw error if fetch fails', async () => {
    const mockFetch = jest.fn(() => Promise.reject(new Error('fetch error')));
    global.fetch = mockFetch as jest.Mock;

    await expect(createStellarAccount()).rejects.toThrowError('fetch error');
    expect(getKeyPair).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://friendbot.stellar.org?addr=public_key');
  });
});
