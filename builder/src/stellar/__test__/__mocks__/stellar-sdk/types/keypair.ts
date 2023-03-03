export const publicKeyFn = jest.fn().mockReturnValue('stellar_public_key');
export const secretFn = jest.fn().mockReturnValue('stellar_secret_key');

export class Keypair {
  static random = jest.fn().mockReturnValue(new Keypair());
  static fromSecret = jest.fn().mockImplementation((secret) => secret);
  publicKey = publicKeyFn;
  secret = secretFn;
}
