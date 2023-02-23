import { generateCertificate } from '../../src/certificateBuilder/';

describe('generateCertificate', () => {
  it('should throw an exception if any property is missing', () => {
    const certificateRequest = {
      username: 'John Doe',
      certificate_date: '2022-02-21',
      mentor_hours: '1000'
    };

    expect(() => {
      generateCertificate(certificateRequest as never);
    }).toThrow('The stellar_account property is missing');
  });

  it('should throw an exception if mentor_hours is not a valid number', () => {
    const certificateRequest = {
      username: 'John Doe',
      certificate_date: '2022-02-21',
      mentor_hours: 'test',
      stellar_account: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'
    };

    expect(() => {
      generateCertificate(certificateRequest as never);
    }).toThrow('The mentor_hours is not a valid number');
  });

  it('should throw an exception if the stellar_account is not an allowed account', () => {
    const certificateRequest = {
      username: 'John Doe',
      certificate_date: '2022-02-21',
      mentor_hours: '1000',
      stellar_account: 'DTHLHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'
    };

    expect(() => {
      generateCertificate(certificateRequest as never);
    }).toThrow('The stellar_account is not allowed');
  });

  it('should replace the values in the template if the certificate request is valid', () => {
    const certificateRequest = {
      username: 'John Doe',
      certificate_date: '2022-02-21',
      stellar_account: 'GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB',
      mentor_hours: '1000'
    };

    const expectedCertificate = {
      material_file: 'mentor-1000h.mtl',
      object_file: 'mentor-1000h.obj',
      model_settings: [
        { name: 'Plane.004', texture: 'kommit_banner.png', visible: true },
        { name: 'Plane.002', texture: 'certificate_background.jpg', visible: true },
        { name: 'Plane.001', texture: '', visible: false }
      ],
      texts: [
        {
          type: 'username',
          textFormatter: '[value]',
          fontSize: 0.015,
          position: { x: 2.2, y: -0.55, z: -0.7 },
          color: '0xffffff',
          text: 'John Doe'
        },
        {
          type: 'mentor_hours',
          textFormatter: '[value] hours',
          fontSize: 0.01,
          position: { x: 2.2, y: 0, z: -0.7 },
          color: '0xffffff',
          text: '1000 hours'
        },
        {
          type: 'stellar_account',
          textFormatter: 'Stellar Account: [value]',
          fontSize: 0.0063,
          position: { x: 3, y: -1.37, z: -0.7 },
          color: '0x97d4ff',
          vertical: true,
          text: 'Stellar Account: GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'
        },
        {
          type: 'certificate_date',
          textFormatter: '////////[value]',
          fontSize: 0.0149,
          position: { x: 2.4, y: -1.4, z: -0.7 },
          color: '0x1005f3',
          bold: true,
          text: '////////2022-02-21'
        }
      ]
    };

    const certificate = generateCertificate(certificateRequest);

    expect(certificate).toStrictEqual(expectedCertificate);
  });
});
