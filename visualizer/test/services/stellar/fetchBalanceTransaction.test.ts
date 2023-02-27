import { fetchBalanceTransaction } from '../../../src/services/stellar';
import { operationsFn, operationsForAccount, operationsCall } from '../../__mocks__/stellar-sdk/types/server'

describe("fetchBalanceTransaction", () => {
  const balance = { assetIssuer: "ISSUER", assetCode: "ASSET_CODE" };
  const destination_account = "DESTINATION_ACCOUNT";
  const unrelated_destination_account = "UNRELATED_DESTINATION_ACCOUNT";

  it("should return the transaction associated with the balance", async () => {
    const transaction = await fetchBalanceTransaction(destination_account, balance);

    expect(transaction).toEqual({ id: "TRANSACTION_ID" })
    expect(operationsFn).toHaveBeenCalled();
    expect(operationsForAccount).toHaveBeenCalled();
    expect(operationsCall).toHaveBeenCalled();
  })

  it("should return an empty array if the destination account is nos related with the balance", async () => {
    const transaction = await fetchBalanceTransaction(unrelated_destination_account, balance);

    expect(transaction).toEqual({})
  })
})
