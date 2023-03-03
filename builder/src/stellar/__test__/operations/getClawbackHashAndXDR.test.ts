import { getClawbackHashAndXDR } from '../../operations';
import { Operation } from '../__mocks__/stellar-sdk';
import { AMOUNT } from '../../../resources/consts';
import { loadAccountFn, fetchBaseFeeFn } from '../__mocks__/stellar-sdk/types/server';
import { incrementSequenceNumberFn } from '../__mocks__/stellar-sdk/types/account';
import { hashFn, toEnvelopeFn } from '../__mocks__/stellar-sdk/types/transaction';
import { addOperationFn, setTimeboundsFn } from '../__mocks__/stellar-sdk/types/transactionBuilder';
import { Asset } from 'stellar-sdk';

describe('getClawbackHashAndXDR', () => {
  const issuerPublicKey = 'issuerPublicKey';
  const recipientPublicKey = 'recipientPublicKey';
  const SBT = new Asset('SBT', issuerPublicKey);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a hash and XDR for a clawback transaction', async () => {
    const expectedClawbackOp = Operation.clawback({
      asset: SBT,
      amount: AMOUNT,
      from: recipientPublicKey
    });

    const result = await getClawbackHashAndXDR(issuerPublicKey, recipientPublicKey, SBT);

    expect(loadAccountFn).toHaveBeenCalledWith(issuerPublicKey);
    expect(fetchBaseFeeFn).toHaveBeenCalled();
    expect(incrementSequenceNumberFn).toHaveBeenCalledTimes(2);
    expect(addOperationFn).toHaveBeenCalledWith(expectedClawbackOp);
    expect(setTimeboundsFn).toHaveBeenCalledWith(0, 1687382400);
    expect(hashFn).toHaveBeenCalled();
    expect(toEnvelopeFn).toHaveBeenCalled();

    expect(result).toEqual({
      hash: 'hash',
      xdr: 'XDR'
    });
  });
});
