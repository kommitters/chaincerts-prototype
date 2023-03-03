import { createIssuerAccount } from '../../services';
import { executeTransaction, getKeyPair } from '../../services/helpers';
import { Horizon } from 'stellar-sdk';
import { IKeyPair } from '../../interfaces';

jest.mock('../../services/helpers', () => ({
  getKeyPair: jest.fn(),
  executeTransaction: jest.fn()
}));

describe('createIssuerAccount', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);

  const distribuitorPublicKey = 'distribuitor-public-key';
  const distribuitorSecretKey = 'distribuitor-secret-key';
  const distribuitorKeyPair: IKeyPair = { publicKey: distribuitorPublicKey, secretKey: distribuitorSecretKey };
  const mockedGetKeyPair = getKeyPair as jest.MockedFunction<typeof getKeyPair>;

  beforeEach(() => {
    mockedGetKeyPair.mockReturnValue(distribuitorKeyPair);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create an issuer account and return its key pair', async () => {
    const keyPair: IKeyPair = await createIssuerAccount(distribuitorPublicKey, distribuitorSecretKey);

    executeTransactionMock.mockResolvedValue(
      Promise.resolve({ successful: true } as Horizon.SubmitTransactionResponse)
    );

    expect(executeTransactionMock).toHaveBeenCalled();
    expect(keyPair).toBeDefined();
    expect(keyPair.publicKey).toBeDefined();
    expect(keyPair.secretKey).toBeDefined();
  });

  it('should throw an error if creating the issuer account fails', async () => {
    executeTransactionMock.mockResolvedValue(Promise.reject({ message: 'Error: Status: 400. Reason: tx_failed' }));

    await createIssuerAccount(distribuitorPublicKey, distribuitorSecretKey).catch((error) => {
      expect(error.message).toEqual(`Failed creating the issuer account: Error: Status: 400. Reason: tx_failed`);
    });
  });
});
