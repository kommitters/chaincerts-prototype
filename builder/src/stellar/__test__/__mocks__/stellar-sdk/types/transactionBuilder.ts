import { Account } from './account';
import { Transaction } from './transaction';

export const addOperationFn = jest.fn().mockReturnThis();
export const setTimeboundsFn = jest.fn().mockReturnThis();
export class TransactionBuilder {
  account: Account;
  options: Options;

  addOperation = addOperationFn;
  setTimeout = jest.fn().mockReturnThis();
  setTimebounds = setTimeboundsFn;
  build = jest.fn().mockReturnValue(new Transaction('XDR', 'PHASE'));

  constructor(account: Account, options: Options) {
    this.account = account;
    this.options = options;
    return this;
  }
}

interface Options {
  fee: number;
  networkPassphrase: string;
}
