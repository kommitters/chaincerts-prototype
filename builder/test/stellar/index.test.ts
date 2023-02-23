import { createIssuerAccount, sendSBTtoDistributor, saveCID } from '../../src/stellar/services';
import { KeyPair } from '../../src/stellar/interfaces/';
import { createSBT } from '../../src/stellar/';

const CERTIFICATE_ASSET_CODE = 'MentorCert';

jest.mock('../../src/stellar/services', () => ({
  createIssuerAccount: jest.fn(),
  sendSBTtoDistributor: jest.fn(),
  saveCID: jest.fn()
}));

describe('createSBT', () => {
  const cid = 'some-cid';
  const sbtIssuerPublicKey = 'sbt-issuer-public-key';
  const sbtIssuerSecretKey = 'sbt-issuer-secret-key';
  const keyPair: KeyPair = { sbtIssuerPublicKey, sbtIssuerSecretKey };
  const mockedCreateIssuerAccount = createIssuerAccount as jest.MockedFunction<typeof createIssuerAccount>;
  const mockedSaveCID = saveCID as jest.MockedFunction<typeof saveCID>;
  const mockedSendSBTtoDistributor = sendSBTtoDistributor as jest.MockedFunction<typeof sendSBTtoDistributor>;

  beforeEach(() => {
    mockedCreateIssuerAccount.mockResolvedValue(keyPair);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a Stellar SBT asset', async () => {
    await createSBT(cid);

    expect(mockedCreateIssuerAccount).toHaveBeenCalled();
    expect(mockedSaveCID).toHaveBeenCalledWith(sbtIssuerPublicKey, sbtIssuerSecretKey, cid);
    expect(mockedSendSBTtoDistributor).toHaveBeenCalledWith(
      sbtIssuerPublicKey,
      sbtIssuerSecretKey,
      CERTIFICATE_ASSET_CODE
    );
  });

  it('should throw an error if any of the underlying functions throw', async () => {
    const errorMessage = 'Error: Status: 400. Reason: tx_failed';
    mockedSaveCID.mockRejectedValueOnce(new Error(`Failed creating SBT asset: ${errorMessage}`));

    await expect(createSBT(cid)).rejects.toThrow(`Failed creating SBT asset: ${errorMessage}`);

    expect(mockedCreateIssuerAccount).toHaveBeenCalled();
    expect(mockedSaveCID).toHaveBeenCalledWith(sbtIssuerPublicKey, sbtIssuerSecretKey, cid);
    expect(mockedSendSBTtoDistributor).not.toHaveBeenCalled();
  });
});
