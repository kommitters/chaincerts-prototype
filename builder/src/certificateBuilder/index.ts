import { CertificateRequest, Certificate } from './interfaces';
import { mentorCertificateTemplate } from './mentorCertificateTemplate';
import { validateCertificateRequest } from './validateCertificateRequest';

export const generateCertificate = (certificateRequest: CertificateRequest): Certificate => {
  const certificateRequestValidation = validateCertificateRequest(certificateRequest);

  if (!certificateRequestValidation.valid) {
    throw new Error(certificateRequestValidation.error);
  }

  const certificate = { ...mentorCertificateTemplate };

  certificate.texts.forEach((text) => {
    text.text = text.textFormatter.replace('[value]', certificateRequest[text.type as keyof CertificateRequest]);
  });

  return certificate;
};
