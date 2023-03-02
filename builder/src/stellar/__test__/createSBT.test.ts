import {
  createIssuerAccount,
  sendSBT,
  saveCID,
  establishNonTransferableSBT,
  getClawbackHashAndXDR,
  preAuthorizeClawback,
  lockIssuerAccount
} from '../services';
import { IKeyPair } from '../interfaces';
import { createSBT } from '../index';
import { createStellarAccount } from '../services/helpers';

const CERTIFICATE_ASSET_CODE = 'mentorCert';

jest.mock('../services', () => ({
  createIssuerAccount: jest.fn(),
  sendSBT: jest.fn(),
  saveCID: jest.fn(),
  establishNonTransferableSBT: jest.fn(),
  getClawbackHashAndXDR: jest.fn(),
  preAuthorizeClawback: jest.fn(),
  lockIssuerAccount: jest.fn()
}));

jest.mock('../services/helpers', () => ({
  createStellarAccount: jest.fn()
}));

describe('createSBT', () => {
  const cid = 'some-cid';

  const sbtIssuerPublicKey = 'sbt-issuer-public-key';
  const sbtIssuerSecretKey = 'sbt-issuer-secret-key';

  const distribuitorPublicKey = 'distribuitor-public-key';
  const distribuitorSecretKey = 'distribuitor-secret-key';

  const recipientPublicKey = 'recipient-public-key';
  const recipientSecretKey = 'recipient-secret-key';

  const issuerKeyPair: IKeyPair = { publicKey: sbtIssuerPublicKey, secretKey: sbtIssuerSecretKey };
  const distribuitorKeyPair: IKeyPair = { publicKey: distribuitorPublicKey, secretKey: distribuitorSecretKey };
  const recipientKeyPair: IKeyPair = { publicKey: recipientPublicKey, secretKey: recipientSecretKey };

  const mockedCreateStellarAccount = createStellarAccount as jest.MockedFunction<typeof createStellarAccount>;
  const mockedCreateIssuerAccount = createIssuerAccount as jest.MockedFunction<typeof createIssuerAccount>;
  const mockedSaveCID = saveCID as jest.MockedFunction<typeof saveCID>;
  const mockedSendSBT = sendSBT as jest.MockedFunction<typeof sendSBT>;
  const mockedEstablishNonTransferableSBT = establishNonTransferableSBT as jest.MockedFunction<
    typeof establishNonTransferableSBT
  >;
  const mockedGetClawbackHashAndXDR = getClawbackHashAndXDR as jest.MockedFunction<typeof getClawbackHashAndXDR>;
  const mockedPreAuthorizeClawback = preAuthorizeClawback as jest.MockedFunction<typeof preAuthorizeClawback>;
  const mockedLockIssuerAccount = lockIssuerAccount as jest.MockedFunction<typeof lockIssuerAccount>;

  const asset = { assetCode: CERTIFICATE_ASSET_CODE, issuerKey: sbtIssuerPublicKey };
  const envelope = { hash: 'hash', xdr: 'xdr' };

  beforeEach(() => {
    mockedGetClawbackHashAndXDR.mockResolvedValue(Promise.resolve(envelope));
    mockedCreateIssuerAccount.mockResolvedValue(issuerKeyPair);
    mockedCreateStellarAccount.mockResolvedValueOnce(distribuitorKeyPair).mockResolvedValueOnce(recipientKeyPair);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a Stellar SBT asset', async () => {
    const xdr = await createSBT(cid, CERTIFICATE_ASSET_CODE);

    expect(mockedCreateStellarAccount).toHaveBeenCalledTimes(2);
    expect(mockedCreateIssuerAccount).toHaveBeenCalled();
    expect(mockedSaveCID).toHaveBeenCalledWith(sbtIssuerPublicKey, sbtIssuerSecretKey, cid);
    expect(mockedSendSBT).toHaveBeenCalledWith(
      sbtIssuerPublicKey,
      sbtIssuerSecretKey,
      distribuitorPublicKey,
      distribuitorSecretKey,
      asset
    );
    expect(mockedSendSBT).toHaveBeenCalledWith(
      distribuitorPublicKey,
      distribuitorSecretKey,
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

    await createSBT(cid, CERTIFICATE_ASSET_CODE).catch((error) => {
      expect(error.message).toBeUndefined;
    });
  });
});
