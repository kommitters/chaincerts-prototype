export const signFn = jest.fn();

export class Transaction {
  sign = signFn;
}
