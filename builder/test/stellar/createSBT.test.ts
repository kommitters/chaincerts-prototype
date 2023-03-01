import {
  createIssuerAccount,
  sendSBT,
  saveCID,
  establishNonTransferableSBT,
  getClawbackHashAndXDR,
  preAuthorizeClawback,
  lockIssuerAccount
} from '../../src/stellar/services';
import { IKeyPair } from '../../src/stellar/interfaces';
import { createSBT } from '../../src/stellar';
import { DISTRIBUTOR_PUBLIC_KEY, DISTRIBUTOR_SECRET_KEY } from '../../src/configs/credentials';

const CERTIFICATE_ASSET_CODE = 'MentorCert';

jest.mock('../../src/stellar/services', () => ({
  createIssuerAccount: jest.fn(),
  sendSBT: jest.fn(),
  saveCID: jest.fn(),
  establishNonTransferableSBT: jest.fn(),
  getClawbackHashAndXDR: jest.fn(),
  preAuthorizeClawback: jest.fn(),
  lockIssuerAccount: jest.fn()
}));

describe('createSBT', () => {
  const cid = 'some-cid';
  const sbtIssuerPublicKey = 'sbt-issuer-public-key';
  const sbtIssuerSecretKey = 'sbt-issuer-secret-key';
  const recipientPublicKey = 'recipient-public-key';
  const recipientSecretKey = 'recipient-secret-key';

  const keyPair: IKeyPair = { sbtIssuerPublicKey, sbtIssuerSecretKey };
  const mockedCreateIssuerAccount = createIssuerAccount as jest.MockedFunction<typeof createIssuerAccount>;
  const mockedSaveCID = saveCID as jest.MockedFunction<typeof saveCID>;
  const mockedSendSBT = sendSBT as jest.MockedFunction<typeof sendSBT>;
  const mockedEstablishNonTransferableSBT = establishNonTransferableSBT as jest.MockedFunction<
    typeof establishNonTransferableSBT
  >;
  const mockedGetClawbackHashAndXDR = getClawbackHashAndXDR as jest.MockedFunction<typeof getClawbackHashAndXDR>;
  const mockedPreAuthorizeClawback = preAuthorizeClawback as jest.MockedFunction<typeof preAuthorizeClawback>;
  const mockedLockIssuerAccount = lockIssuerAccount as jest.MockedFunction<typeof lockIssuerAccount>;

  const asset = { assetCode: 'MentorCert', issuerKey: sbtIssuerPublicKey };
  const envelope = { hash: 'hash', xdr: 'xdr' };

  beforeEach(() => {
    mockedCreateIssuerAccount.mockResolvedValue(keyPair);
    mockedGetClawbackHashAndXDR.mockResolvedValue(Promise.resolve(envelope));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a Stellar SBT asset', async () => {
    const xdr = await createSBT(cid, CERTIFICATE_ASSET_CODE, recipientPublicKey, recipientSecretKey);

    expect(mockedCreateIssuerAccount).toHaveBeenCalled();
    expect(mockedSaveCID).toHaveBeenCalledWith(sbtIssuerPublicKey, sbtIssuerSecretKey, cid);
    expect(mockedSendSBT).toHaveBeenCalledWith(
      sbtIssuerPublicKey,
      sbtIssuerSecretKey,
      DISTRIBUTOR_PUBLIC_KEY,
      DISTRIBUTOR_SECRET_KEY,
      asset
    );
    expect(mockedSendSBT).toHaveBeenCalledWith(
      DISTRIBUTOR_PUBLIC_KEY,
      DISTRIBUTOR_SECRET_KEY,
      recipientPublicKey,
      recipientSecretKey,
      asset
    );
    expect(mockedEstablishNonTransferableSBT).toHaveBeenCalledWith(
      sbtIssuerPublicKey,
      sbtIssuerSecretKey,
      recipientPublicKey,
      asset
    );
    expect(mockedGetClawbackHashAndXDR).toHaveBeenCalledWith(sbtIssuerPublicKey, recipientPublicKey, asset);
    expect(mockedPreAuthorizeClawback).toHaveBeenCalledWith(sbtIssuerPublicKey, sbtIssuerSecretKey, envelope.hash);
    expect(mockedLockIssuerAccount).toBeCalledWith(sbtIssuerPublicKey, sbtIssuerSecretKey);

    expect(xdr).toEqual(envelope.xdr);
  });

  it('should show error if any of the underlying functions throw', async () => {
    const errorMessage = 'Failed saving the CID: Status: 400. Reason: tx_failed';
    mockedSaveCID.mockReturnValue(Promise.reject({ error: { message: errorMessage } }));

    await createSBT(cid, CERTIFICATE_ASSET_CODE, recipientPublicKey, recipientSecretKey).catch((error) => {
      expect(error.message).toBeUndefined;
    });
  });
});
