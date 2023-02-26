import { CertificateRequest, Certificate, OptionalRequestData } from './interfaces';
import { mentorCertificateTemplate } from './certificateTemplates';
import { validateCertificateRequest } from './validateCertificateRequest';

const OPTIONAL_KOMMIT_MENTOR_DATA: OptionalRequestData = {
  mentor_hours: '1000'
};

export const generateCertificate = (certificateRequest: CertificateRequest): Certificate => {
  const requestValidation = validateCertificateRequest(certificateRequest);

  if (!requestValidation.valid) {
    throw new Error(requestValidation.error);
  }

  const certificate = { ...mentorCertificateTemplate };

  certificate.texts.forEach((certificateText) => {
    const { type, textFormatter } = certificateText;

    const textValue = certificateRequest[type] ?? certificateRequest.data?.[type] ?? OPTIONAL_KOMMIT_MENTOR_DATA[type];

    certificateText.text = textFormatter.replace('[value]', textValue as string);
  });

  return certificate;
};
