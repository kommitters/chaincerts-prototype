import { createIssuerAccount } from '../../../src/stellar/services/index';
import { executeTransaction } from '../../../src/stellar/services/executeTransaction';
import { Horizon } from 'stellar-sdk';

jest.mock('../../../src/stellar/services/executeTransaction');

describe('createIssuerAccount', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);

  process.env.STELLAR_PUBLIC_KEY = 'publicKey';
  process.env.STELLAR_SECRET_KEY = 'secretKey';
  process.env.STARTING_BALANCE = '1000';

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
