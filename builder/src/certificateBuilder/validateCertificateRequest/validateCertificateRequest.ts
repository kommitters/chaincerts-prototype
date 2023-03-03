import { ICertificateRequest } from '../interfaces';

const certificateRequestProps = ['username', 'stellarAccount', 'certDate', 'certType'];

const validCertificateTypes = ['CertExample'];

export const validateCertificateRequest = (certificateRequest: ICertificateRequest) => {
  const missingProperty = getMissingProperty(certificateRequest);

  if (missingProperty) {
    return { valid: false, error: `The ${missingProperty} property is missing` };
  }

  if (!validCertificateType(certificateRequest.certType)) {
    return { valid: false, error: 'The certType is not allowed' };
  }

  if (certificateRequest.data?.mentorHours && !validMentorHours(certificateRequest.data.mentorHours)) {
    return { valid: false, error: 'The mentorHours is not a valid number' };
  }

  return { valid: true };
};

const getMissingProperty = (certificateRequest: ICertificateRequest) => {
  return certificateRequestProps.find((prop) => !certificateRequest[prop as keyof ICertificateRequest]);
};

const validMentorHours = (hoursStr: string) => {
  const hours = parseInt(hoursStr);

  return Number.isInteger(hours) && hours > 0 && hours <= 2000;
};

const validCertificateType = (certificateType: string) => {
  return validCertificateTypes.includes(certificateType);
};
