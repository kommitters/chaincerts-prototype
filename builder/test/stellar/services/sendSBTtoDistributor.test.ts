import { Asset, Operation } from '../../__mocks__/stellar-sdk';
import { sendSBTtoDistributor } from '../../../src/stellar/services';
import { executeTransaction } from '../../../src/stellar/services/executeTransaction';
import { Horizon } from 'stellar-sdk';

jest.mock('../../../src/stellar/services/executeTransaction');

describe('sendSBTtoDistributor', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);

  const sbtIssuerPublicKey = 'sbtIssuerPublicKey';
  const sbtIssuerSecretKey = 'sbtIssuerSecretKey';
  const distributorPublicKey = 'distributorPublicKey';
  const distributorSecretKey = 'distributorSecretKey';
  const assetCode = 'assetCode';
  const amount = '100';

  process.env.DISTRIBUTOR_PUBLIC_KEY = distributorPublicKey;
  process.env.DISTRIBUTOR_SECRET_KEY = distributorSecretKey;
  process.env.AMOUNT = amount;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute transaction with correct operations and keys', async () => {
    const sbt = new Asset(assetCode, sbtIssuerPublicKey);

    const changeTrustOp = Operation.changeTrust({
      asset: new Asset(assetCode, sbtIssuerPublicKey),
      limit: amount,
      source: distributorPublicKey
    });

    const paymentOp = Operation.payment({
      asset: sbt,
      amount: amount,
      destination: distributorPublicKey,
      source: sbtIssuerPublicKey
    });

    executeTransactionMock.mockResolvedValue(
      Promise.resolve({ successful: true } as Horizon.SubmitTransactionResponse)
    );

    await sendSBTtoDistributor(sbtIssuerPublicKey, sbtIssuerSecretKey, assetCode);

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

    await expect(sendSBTtoDistributor(sbtIssuerPublicKey, sbtIssuerSecretKey, assetCode)).rejects.toThrow(
      `Failed sending the SBT to the distributor: ${errorMessage}`
    );
  });
});
