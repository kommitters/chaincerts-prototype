const account = {
  balances: [
    {
      asset_code: 'ASSET_CODE',
      asset_issuer: 'ISSUER_ACCOUNT',
      is_authorized_to_maintain_liabilities: true,
      is_clawback_enabled: true
    }
  ],
  data_attr: {
    CID: Buffer.from('IPFS_CID').toString('base64')
  }
};

const payments = {
  next: jest.fn().mockResolvedValue({ records: [] }),
  records: [
    {
      amount: 1,
      to: 'DESTINATION_ACCOUNT',
      asset_issuer: 'ISSUER_ACCOUNT',
      source_account: 'SOURCE_ACCOUNT',
      asset_code: 'ASSET_CODE',
      created_at: 'CREATE_AT_DATE'
    },
    {
      amount: 1,
      to: 'SOURCE_ACCOUNT',
      asset_issuer: 'ISSUER_ACCOUNT',
      source_account: 'ISSUER_ACCOUNT',
      asset_code: 'ASSET_CODE',
      created_at: 'CREATE_AT_DATE'
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
