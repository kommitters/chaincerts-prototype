export const signFn = jest.fn();
export const hashFn = jest.fn().mockImplementation(() => ({
  toString: jest.fn().mockReturnValue('hash')
}));
export const toEnvelopeFn = jest.fn().mockImplementation(() => ({
  toXDR: jest.fn().mockReturnValue('XDR')
}));

export class Transaction {
  XDR: string;
  networkPhrase: string;

  hash = hashFn;
  toEnvelope = toEnvelopeFn;
  sign = signFn;

  constructor(XDR: string, networkPhrase: string) {
    this.XDR = XDR;
    this.networkPhrase = networkPhrase;
    return this;
  }
}
