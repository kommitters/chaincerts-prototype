import { createIssuerAccount } from '../../services';
import { executeTransaction } from '../../services/helpers';
import { Horizon } from 'stellar-sdk';

jest.mock('../../services/helpers');

describe('createIssuerAccount', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create an issuer account and return its key pair', async () => {
    const keyPair = await createIssuerAccount();

    executeTransactionMock.mockResolvedValue(
      Promise.resolve({ successful: true } as Horizon.SubmitTransactionResponse)
    );

    expect(executeTransactionMock).toHaveBeenCalled();
    expect(keyPair).toBeDefined();
    expect(keyPair.sbtIssuerPublicKey).toBeDefined();
    expect(keyPair.sbtIssuerSecretKey).toBeDefined();
  });

  it('should throw an error if creating the issuer account fails', async () => {
    executeTransactionMock.mockResolvedValue(Promise.reject({ message: 'Error: Status: 400. Reason: tx_failed' }));

    await createIssuerAccount().catch((error) => {
      expect(error.message).toEqual(`Failed creating the issuer account: Error: Status: 400. Reason: tx_failed`);
    });
  });
});
