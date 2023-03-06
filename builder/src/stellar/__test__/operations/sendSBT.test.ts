import { Operation } from '../__mocks__/stellar-sdk';
import { Asset } from 'stellar-sdk';
import { sendSBT } from '../../operations';
import { executeTransaction } from '../../operations/helpers';
import { Horizon } from 'stellar-sdk';

jest.mock('../../operations/helpers');

describe('sendSBT', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);

  const sbtIssuerPublicKey = 'sbtIssuerPublicKey';
  const sbtIssuerSecretKey = 'sbtIssuerSecretKey';
  const distributorPublicKey = 'distributorPublicKey';
  const distributorSecretKey = 'distributorSecretKey';
  const asset = new Asset('MentorCert', sbtIssuerPublicKey);
  const amount = '100';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute transaction with correct operations and keys', async () => {
    const changeTrustOp = Operation.changeTrust({
      asset: asset,
      limit: amount,
      source: distributorPublicKey
    });

    const paymentOp = Operation.payment({
      asset: asset,
      amount: amount,
      destination: distributorPublicKey,
      source: sbtIssuerPublicKey
    });

    executeTransactionMock.mockResolvedValue(
      Promise.resolve({ successful: true } as Horizon.SubmitTransactionResponse)
    );

    await sendSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, distributorPublicKey, distributorSecretKey, asset);

    expect(executeTransaction).toHaveBeenCalledTimes(1);
    expect(executeTransaction).toHaveBeenCalledWith(
      sbtIssuerPublicKey,
      [sbtIssuerSecretKey, distributorSecretKey],
      [changeTrustOp, paymentOp]
    );
  });

  it('should throw an error if sending the SBT to distributor fails', async () => {
    const errorMessage = 'Error: Status: 400. Reason: tx_failed';
    executeTransactionMock.mockRejectedValue(new Error(errorMessage));

    await expect(
      sendSBT(sbtIssuerPublicKey, sbtIssuerSecretKey, distributorPublicKey, distributorSecretKey, asset)
    ).rejects.toThrow(`Failed sending the SBT from sbtIssuerPublicKey to distributorPublicKey: ${errorMessage}`);
  });
});
