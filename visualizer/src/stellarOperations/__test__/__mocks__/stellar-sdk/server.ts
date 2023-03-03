const account = {
  balances: [
    {
      asset_code: 'CERTIFICATION_CODE',
      asset_type: 'ASSET_TYPE',
      asset_issuer: 'ISSUER'
    }
  ],
  data_attr: {
    CID: Buffer.from('IPFS_CID').toString('base64')
  }
};

const payments = {
  records: [
    {
      asset_issuer: 'DISTRIBUTOR_ACCOUNT',
      asset_code: 'ASSET_CODE',
      transaction: jest.fn().mockResolvedValue({ id: 'TRANSACTION_ID' })
    }
  ]
};

export const paymentsCallFn = jest.fn().mockResolvedValue(payments);
export const paymentsLimitFn = jest.fn().mockReturnValue({ call: paymentsCallFn });
export const paymentsForAccountFn = jest.fn().mockReturnValue({ limit: paymentsLimitFn });

export const paymentsFn = jest.fn().mockReturnValue({ forAccount: paymentsForAccountFn });
export const loadAccountFn = jest.fn().mockResolvedValue(account);

export class Server {
  loadAccount = loadAccountFn;
  payments = paymentsFn;
}
