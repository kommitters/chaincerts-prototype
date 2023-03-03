import '@testing-library/jest-dom';
jest.mock('./src/utils/constants', () => ({
  CERT_ASSET: 'CERTIFICATION_CODE'
}));
