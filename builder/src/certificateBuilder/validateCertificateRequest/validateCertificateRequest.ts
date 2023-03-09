import { ICertificateRequest } from '../interfaces';

const certificateRequestProps = ['username', 'certDate', 'certType'];

const validCertificateTypes = ['CERTEXAMPLE'];

export const validateCertificateRequest = (certificateRequest: ICertificateRequest) => {
  const missingProperty = getMissingProperty(certificateRequest);

  if (missingProperty) {
    return { valid: false, error: `The ${missingProperty} property is missing` };
  }

  if (!validCertificateType(certificateRequest.certType)) {
    return { valid: false, error: 'The certType is not allowed' };
  }

  return { valid: true };
};

const getMissingProperty = (certificateRequest: ICertificateRequest) => {
  return certificateRequestProps.find((prop) => !certificateRequest[prop as keyof ICertificateRequest]);
};

const validCertificateType = (certificateType: string) => {
  return validCertificateTypes.includes(certificateType);
};
