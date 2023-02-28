import { Operation } from '../../__mocks__/stellar-sdk';
import { saveCID } from '../../../src/stellar/services';
import { executeTransaction } from '../../../src/stellar/services/helpers';
import { Horizon } from 'stellar-sdk';

jest.mock('../../../src/stellar/services/helpers');

describe('saveCID', () => {
  const executeTransactionMock = jest.mocked(executeTransaction);

  const sbtIssuerPublicKey = 'public_key';
  const sbtIssuerSecretKey = 'secret_key';
  const cid = 'my_cid';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call executeTransaction with the correct arguments', async () => {
    await saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, cid);

    executeTransactionMock.mockResolvedValue(
      Promise.resolve({ successful: true } as Horizon.SubmitTransactionResponse)
    );

    expect(executeTransactionMock).toHaveBeenCalledWith(
      sbtIssuerPublicKey,
      sbtIssuerSecretKey,
      Operation.manageData({
        name: 'CID',
        value: cid
      })
    );
  });

  it('should throw an error if saving the CID fails', async () => {
    const errorMessage = 'Error: Status: 400. Reason: tx_failed';
    executeTransactionMock.mockRejectedValue(new Error(errorMessage));

    await expect(saveCID(sbtIssuerPublicKey, sbtIssuerSecretKey, cid)).rejects.toThrowError(
      `Failed saving the CID: ${errorMessage}`
    );
  });
});
