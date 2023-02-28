const account = {
  balances: [
    {
      asset_code: 'CERTIFICATION_CODE',
      asset_type: 'ASSET_TYPE',
      asset_issuer: 'ISSUER'
    }
  ],
  data_attr: {
    CID: 'IPFS_CID'
  }
};

const operations = {
  records: [
    {
      type: 'payment',
      to: 'DESTINATION_ACCOUNT',
      asset_code: 'ASSET_CODE',
      transaction: jest.fn().mockResolvedValue({ id: 'TRANSACTION_ID' })
    }
  ]
};

export const operationsCallFn = jest.fn().mockResolvedValue(operations);
export const operationsForAccountFn = jest.fn().mockReturnValue({ call: operationsCallFn });

export const operationsFn = jest.fn().mockReturnValue({ forAccount: operationsForAccountFn });
export const loadAccountFn = jest.fn().mockResolvedValue(account);

export class Server {
  loadAccount = loadAccountFn;
  operations = operationsFn;
}
