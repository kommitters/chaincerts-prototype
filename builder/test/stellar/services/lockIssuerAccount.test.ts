import { lockIssuerAccount } from '../../../src/stellar/services';
import { Operation } from 'stellar-sdk';
import { executeTransaction } from '../../../src/stellar/services/helpers';

jest.mock('stellar-sdk');
jest.mock('../../../src/stellar/services/helpers');

describe('lockIssuerAccount', () => {
  const issuerPublicKey = 'issuerPublicKey';
  const issuerSecretKey = 'issuerSecretKey';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute a transaction to lock the issuer account', async () => {
    const expectedSetOptionsOp = Operation.setOptions({
      masterWeight: 0
    });

    await lockIssuerAccount(issuerPublicKey, issuerSecretKey);

    expect(Operation.setOptions).toHaveBeenCalledWith({
      masterWeight: 0
    });

    expect(executeTransaction).toHaveBeenCalledWith(issuerPublicKey, issuerSecretKey, expectedSetOptionsOp);
  });

  it('should throw an error if the transaction execution fails', async () => {
    const error = new Error('Error: Status: 400, Reason: tx_failed ');
    (executeTransaction as jest.MockedFunction<typeof executeTransaction>).mockRejectedValueOnce(error);

    await expect(lockIssuerAccount(issuerPublicKey, issuerSecretKey)).rejects.toThrow(
      `Failed locking the issuer account: ${error.message}`
    );
  });
});
