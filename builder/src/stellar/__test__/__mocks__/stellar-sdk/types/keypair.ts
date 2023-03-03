export class Keypair {
  static random = jest.fn().mockReturnValue({
    publicKey: jest.fn().mockReturnValue('stellar_public_key'),
    secret: jest.fn().mockReturnValue('stellar_secret_key')
  });
  static fromSecret = jest.fn().mockImplementation((secret) => secret);
}
