import { CertificateRequest } from './interfaces/CertificateRequest';
import { Certificate } from './interfaces/Certificate';
import { certificateTemplate } from './certificateTemplate';

export const generateCertificate = (certificateRequest: CertificateRequest): Certificate => {
  const certificateRequestValidation = validateCertificateRequest(certificateRequest);

  if (!certificateRequestValidation.valid) {
    throw new Error(certificateRequestValidation.error);
  }

  const certificate = { ...certificateTemplate };

  certificate.texts.forEach((text) => {
    text.text = `${text.textFormatter}${certificateRequest[text.type as keyof CertificateRequest]}`;
  });

  return certificate;
};

const certificateRequestProps = ['username', 'stellar_account', 'certificate_date', 'mentor_hours'];

const validateCertificateRequest = (certificateRequest: CertificateRequest) => {
  const missingProperty = certificateRequestProps.find((prop) => !certificateRequest[prop as keyof CertificateRequest]);

  return missingProperty ? { valid: false, error: `The ${missingProperty} property is missing` } : { valid: true };
};
