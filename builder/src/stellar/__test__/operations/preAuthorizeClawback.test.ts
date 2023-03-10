import { preAuthorizeClawback } from '../../operations';
import { executeTransaction } from '../../operations/helpers';
import { Operation } from '../__mocks__/stellar-sdk';

jest.mock('../../operations/helpers');

describe('preAuthorizeClawback', () => {
  const issuerPublicKey = 'issuerPublicKey';
  const issuerSecretKey = 'issuerSecretKey';
  const hash = 'hash';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute setOptions operation with correct options', async () => {
    await preAuthorizeClawback(issuerPublicKey, issuerSecretKey, hash);

    const expectedSigner = {
      preAuthTx: hash,
      weight: 1
    };

    expect(Operation.setOptions).toHaveBeenCalledWith({ signer: expectedSigner });
    expect(executeTransaction).toHaveBeenCalledWith(issuerPublicKey, issuerSecretKey, Operation.setOptions());
  });

  it('should throw an error if executeTransaction fails', async () => {
    const error = new Error('Error: Status: 400, Reason: tx_failed');
    (executeTransaction as jest.MockedFunction<typeof executeTransaction>).mockRejectedValueOnce(error);

    await expect(preAuthorizeClawback(issuerPublicKey, issuerSecretKey, hash)).rejects.toThrow(
      `Failed Pre-authorizing clawback: ${error.message}`
    );
  });
});
