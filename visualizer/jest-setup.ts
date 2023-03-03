import '@testing-library/jest-dom';
jest.mock('./utils/constants', () => ({
  CERT_ASSET: 'CERTIFICATION_CODE'
}));
