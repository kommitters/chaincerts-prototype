import { fetchCertificateTransaction } from '../fetchCertificateTransaction';
import { paymentsFn, paymentsForAccountFn, paymentsLimitFn, paymentsCallFn } from './__mocks__/stellar-sdk/server';

describe('fetchBalanceTransaction', () => {
  const ASSET_CODE = 'ASSET_CODE';
  const DISTRIBUTOR_ACCOUNT = 'DISTRIBUTOR_ACCOUNT';
  const DESTINATION_ACCOUNT = 'DESTINATION_ACCOUNT';
  const UNRELATED_ASSET = { asset_code: 'UNRELATED_ASSET', asset_issuer: 'UNRELATED_ISSUER' };
  const UNRELATED_DESTINATION_ACCOUNT = 'UNRELATED_DESTINATION_ACCOUNT';

  it('should return the transaction associated with the balance', async () => {
    const transaction = await fetchCertificateTransaction(DESTINATION_ACCOUNT, DISTRIBUTOR_ACCOUNT, ASSET_CODE);

    expect(transaction).toEqual({ id: 'TRANSACTION_ID' });
    expect(paymentsFn).toHaveBeenCalled();
    expect(paymentsForAccountFn).toHaveBeenCalled();
    expect(paymentsCallFn).toHaveBeenCalled();
  });

  it('should return an empty array if the destination account is nos related with the balance', async () => {
    paymentsCallFn.mockReturnValueOnce({ records: [] });

    const transaction = await fetchCertificateTransaction(
      UNRELATED_DESTINATION_ACCOUNT,
      DISTRIBUTOR_ACCOUNT,
      ASSET_CODE
    );

    expect(transaction).toEqual({});
  });

  it('should call more payments', async () => {
    paymentsCallFn.mockReturnValueOnce({
      records: [UNRELATED_ASSET],
      next: jest.fn().mockResolvedValue({ records: [] })
    });

    const transaction = await fetchCertificateTransaction(DESTINATION_ACCOUNT, DISTRIBUTOR_ACCOUNT, ASSET_CODE);

    expect(transaction).toEqual({});
    expect(paymentsLimitFn).toHaveBeenCalled();
  });
});
