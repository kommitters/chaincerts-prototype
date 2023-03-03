import { executeTransaction } from '../../../services/helpers';
import { Operation } from '../../__mocks__/stellar-sdk';
import { loadAccountFn, fetchBaseFeeFn, submitTransactionFn } from '../../__mocks__/stellar-sdk/types/server';

describe('executeTransaction', () => {
  const publickKey = 'GD4J7VCL65DB44ADDPDUTBPGFFTODGUCPZRSDHAKVVE56YXTOGSTMS2M';
  const secretKey = 'SCIVLXRNRVNNIQ7VRJCAUW25K3IS2RPKQHGWRVPXYDY6QIDSC4UNHLNI';
  const operations = [Operation.manageData({ name: 'data', value: 'secret_info' })];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute a Stellar transaction', async () => {
    const response = await executeTransaction(publickKey, secretKey, operations);

    expect(loadAccountFn).toHaveBeenCalledWith(publickKey);
    expect(fetchBaseFeeFn).toHaveBeenCalled();
    expect(submitTransactionFn).toHaveBeenCalled();
    expect(response).toEqual({ status: 'success' });
  });

  it('throws error on invalid public key', async () => {
    loadAccountFn.mockReturnValueOnce(
      Promise.reject({
        response: {
          status: 400,
          extras: { reason: 'Bad Account ID' }
        }
      })
    );

    await executeTransaction('KASDUOASDBDASDADASDASDASDADA', secretKey, operations).catch((error) => {
      expect(error.message).toEqual('Status: 400. Reason: Bad Account ID');
    });
  });

  it('throws error on invalid operation', async () => {
    submitTransactionFn.mockReturnValue(
      Promise.reject({
        response: {
          status: 400,
          data: { extras: { result_codes: { transaction: 'tx_failed' } } }
        }
      })
    );

    await expect(executeTransaction(publickKey, secretKey, [])).rejects.toThrow('Status: 400. Reason: tx_failed');
  });
});
