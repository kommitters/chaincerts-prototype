import { fetchBalanceTransaction } from '../fetchBalanceTransaction';
import { operationsFn, operationsForAccount, operationsCall } from './__mocks__/stellar-sdk/server';

describe('fetchBalanceTransaction', () => {
  const BALANCE = { assetIssuer: 'ISSUER', assetCode: 'ASSET_CODE' };
  const DESTINATION_ACCOUNT = 'DESTINATION_ACCOUNT';
  const UNRELATED_DESTINATION_ACCOUNT = 'UNRELATED_DESTINATION_ACCOUNT';

  it('should return the transaction associated with the balance', async () => {
    const transaction = await fetchBalanceTransaction(DESTINATION_ACCOUNT, BALANCE);

    expect(transaction).toEqual({ id: 'TRANSACTION_ID' });
    expect(operationsFn).toHaveBeenCalled();
    expect(operationsForAccount).toHaveBeenCalled();
    expect(operationsCall).toHaveBeenCalled();
  });

  it('should return an empty array if the destination account is nos related with the balance', async () => {
    const transaction = await fetchBalanceTransaction(UNRELATED_DESTINATION_ACCOUNT, BALANCE);

    expect(transaction).toEqual({});
  });
});
