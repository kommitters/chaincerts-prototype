import { generateCertificate } from '../index';
import { kommitMentorCertificate } from './factory/kommitMentorCertificate';
import { uploadCertToIPFS } from '../../../src/ipfs';
import { createSBT } from '../../../src/stellar';

jest.mock('../../../src/stellar', () => ({
  createSBT: jest.fn()
}));

jest.mock('../../../src/ipfs', () => ({
  uploadCertToIPFS: jest.fn()
}));

describe('generateCertificate', () => {
  const mockedCreateSBT = jest.mocked(createSBT);
  const mockedUploadCertToIPFS = jest.mocked(uploadCertToIPFS);

  const XDR = 'XDR';
  const CID = 'CID';

  const correctCertificateRequest = {
    username: 'John Doe',
    certDate: '2022-02-21',
    stellarAccount: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB',
    certType: 'CertExample',
    data: {
      mentorHours: '2000'
    }
  };

  beforeEach(() => {
    mockedUploadCertToIPFS.mockResolvedValue(Promise.resolve(CID));
    mockedCreateSBT.mockResolvedValue(Promise.resolve(XDR));
  });

  it('should throw an exception if any property is missing', () => {
    const certificateRequest = {
      certDate: '2022-02-21',
      certType: 'CertExample'
    };

    expect(generateCertificate(certificateRequest as never)).rejects.toThrow('The username property is missing');
  });

  it('should throw an exception if mentorHours is not a valid number', () => {
    const certificateRequest = {
      username: 'John Doe',
      certDate: '2022-02-21',
      stellarAccount: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB',
      certType: 'CertExample',
      data: {
        mentorHours: 'test'
      }
    };

    expect(generateCertificate(certificateRequest)).rejects.toThrow('The mentorHours is not a valid number');
  });

  it('should throw an exception if the certType is not an allowed certificate type', () => {
    const certificateRequest = {
      username: 'John Doe',
      certDate: '2022-02-21',
      stellarAccount: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB',
      certType: 'senior-certificate'
    };

    expect(generateCertificate(certificateRequest as never)).rejects.toThrow('The certType is not allowed');
  });

  it('should replace the values in the template if the certificate request is valid', async () => {
    const expectedCertificate = {
      materialFile: 'mentor-1000h.mtl',
      objectFile: 'mentor-1000h.obj',
      modelSettings: [
        { name: 'Plane.004', texture: 'kommit_banner.png', visible: true },
        { name: 'Plane.002', texture: 'certificate_background.jpg', visible: true },
        { name: 'Plane.001', texture: '', visible: false }
      ],
      texts: [
        {
          type: 'username',
          textFormatter: '[value]',
          fontSize: 0.015,
          position: { x: 2.5, y: -1.05, z: -0.7 },
          color: '0xffffff',
          text: 'John Doe'
        },
        {
          type: 'mentorHours',
          textFormatter: '• [value] hours •',
          fontSize: 0.01,
          position: { x: 2.5, y: -0.5, z: -0.7 },
          color: '0xffffff',
          text: '• 2000 hours •'
        },
        {
          type: 'stellarAccount',
          textFormatter: 'Stellar Account: [value]',
          fontSize: 0.0063,
          position: { x: 3.0, y: -1.87, z: 0.5 },
          color: '0x97d4ff',
          vertical: true,
          text: 'Stellar Account: GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'
        },
        {
          type: 'certDate',
          textFormatter: '////////[value]',
          fontSize: 0.0149,
          position: { x: 2.5, y: -1.65, z: -0.7 },
          color: '0x1005f3',
          bold: true,
          text: '////////2022-02-21'
        }
      ]
    };

    const certificate = await generateCertificate(correctCertificateRequest);

    expect(certificate).toStrictEqual(expectedCertificate);
  });

  it('should add the default mentor_hour data if it is not supplied and generate the certificate', async () => {
    const certificateRequest = {
      username: 'John Doe',
      certDate: '2022-02-21',
      stellarAccount: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB',
      certType: 'CertExample'
    };

    const certificate = await generateCertificate(certificateRequest);

    expect(certificate).toStrictEqual(kommitMentorCertificate);
  });

  it('Should create the SBT and return clawback XDR', async () => {
    await generateCertificate(correctCertificateRequest);

    expect(mockedUploadCertToIPFS).toBeCalled();
    expect(mockedCreateSBT).toHaveBeenCalledWith(CID, correctCertificateRequest.certType);
  });

  it('should show error on console if the SBT creation fails', async () => {
    const errorMessage = 'Fails the SBT creation';
    mockedCreateSBT.mockRejectedValue(new Error(errorMessage));

    console.error = jest.fn();
    await generateCertificate(correctCertificateRequest).catch(() => {
      expect((console.error as jest.Mock).mock.calls[0][0]).toBe(`⚠️ Error creating the SBT \n ${errorMessage} \n`);
    });
  });
});
