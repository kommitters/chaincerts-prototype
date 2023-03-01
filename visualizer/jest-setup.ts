import '@testing-library/jest-dom';
jest.mock('./src/constants', () => ({
  CERT_ASSET: 'CERTIFICATION_CODE'
  //fun: jest.fn({ num: '5' , name: 'juan' })
}));
