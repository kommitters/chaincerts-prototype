import { establishNonTransferableSBT } from '../../../src/stellar/services/index';
import { executeTransaction } from '../../../src/stellar/services/helpers';
import { Asset, Horizon } from 'stellar-sdk';

jest.mock('../../../src/stellar/services/helpers');

describe('establishNonTransferableSBT', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);
  const sbtIssuerPublicKey = 'sbtIssuerPublicKey';
  const sbtIssuerSecretKey = 'sbtIssuerSecretKey';
  const recipientPublicKey = 'recipientPublicKey';
  const asset = new Asset('MentorCert', sbtIssuerPublicKey);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should stablish the SBT as a non-transferable asset', async () => {
    await establishNonTransferableSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, recipientPublicKey, asset);

    executeTransactionMock.mockResolvedValue(
      Promise.resolve({ successful: true } as Horizon.SubmitTransactionResponse)
    );

    expect(executeTransactionMock).toHaveBeenCalled();
  });

  it('should throw an error if stablish the SBT as a non-transferable asset fails', async () => {
    executeTransactionMock.mockResolvedValue(Promise.reject({ message: 'Error: Status: 400. Reason: tx_failed' }));

    await establishNonTransferableSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, recipientPublicKey, asset).catch(
      (error) => {
        expect(error.message).toEqual(
          `Failed stablishing the SBT as a non-transferable asset: Error: Status: 400. Reason: tx_failed`
        );
      }
    );
  });
});
