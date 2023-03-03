import { incrementSequenceNumberFn } from './account';

export const loadAccountFn = jest.fn().mockResolvedValue({
  sequence: '1',
  balances: [
    {
      asset_type: 'native',
      balance: '100.0000000'
    }
  ],
  incrementSequenceNumber: incrementSequenceNumberFn
});

export const fetchBaseFeeFn = jest.fn().mockResolvedValue(100);

export const submitTransactionFn = jest.fn().mockReturnValue(Promise.resolve({ status: 'success' }));

export class Server {
  loadAccount = loadAccountFn;
  fetchBaseFee = fetchBaseFeeFn;
  submitTransaction = submitTransactionFn;
}
