import { executeClawback } from '../index';
import { Transaction } from './__mocks__/stellar-sdk';
import { NETWORK_PASSPHRASE } from '../../configs/consts';
import { submitTransactionFn } from './__mocks__/stellar-sdk/types/server';

describe('executeClawback', () => {
  const XDR = 'XDR';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit the transaction to the server', async () => {
    const transaction = new Transaction(XDR, NETWORK_PASSPHRASE);

    await executeClawback(XDR);

    expect(submitTransactionFn).toHaveBeenCalledWith(transaction);
  });

  it('should throw an error with status and reason if the transaction submission fails', async () => {
    const response = { status: 400, data: { extras: { result_codes: { transaction: 'tx_failed' } } } };
    submitTransactionFn.mockRejectedValueOnce({
      response
    });

    await expect(executeClawback(XDR)).rejects.toThrow(
      `Status: ${response.status}. Reason: ${response.data.extras.result_codes.transaction}`
    );
  });
});
