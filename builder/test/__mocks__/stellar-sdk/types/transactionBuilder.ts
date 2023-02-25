import { Transaction } from './transaction';

export class TransactionBuilder {
  addOperation = jest.fn().mockReturnThis();
  setTimeout = jest.fn().mockReturnThis();
  build = jest.fn().mockReturnValue(new Transaction());
}
