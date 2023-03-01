import { TransactionBuilder, Operation, Asset } from 'stellar-sdk';
import { IXDR } from '../interfaces';
import { NETWORK_PASSPHRASE, AMOUNT } from '../../configs/consts';
import { getStellarServer } from './helpers';

export const getClawbackHashAndXDR = async (
  issuerPublicKey: string,
  recipientPublicKey: string,
  SBT: Asset
): Promise<IXDR> => {
  const server = getStellarServer();
  const account = await server.loadAccount(issuerPublicKey);
  const fee = String(await server.fetchBaseFee());
  account.incrementSequenceNumber();
  account.incrementSequenceNumber();

  const clawbackOp = Operation.clawback({
    asset: SBT,
    amount: AMOUNT,
    from: recipientPublicKey
  });

  const transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase: NETWORK_PASSPHRASE
  })
    .addOperation(clawbackOp)
    .setTimebounds(0, 1687382400)
    .build();

  const hash = transaction.hash().toString('hex');

  const xdr = transaction.toEnvelope().toXDR('base64');

  return { hash: hash, xdr: xdr };
};
