import { CertificateRequest } from '../interfaces';

const validStellarAccounts = ['GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'];

const certificateRequestProps = ['username', 'stellar_account', 'certificate_date', 'certificate_type'];

const validCertificateTypes = ['kommit-mentor'];

export const validateCertificateRequest = (certificateRequest: CertificateRequest) => {
  const missingProperty = getMissingProperty(certificateRequest);

  if (missingProperty) {
    return { valid: false, error: `The ${missingProperty} property is missing` };
  }

  if (!validStellarAccount(certificateRequest.stellar_account)) {
    return { valid: false, error: 'The stellar_account is not allowed' };
  }

  if (!validCertificateType(certificateRequest.certificate_type)) {
    return { valid: false, error: 'The certificate_type is not allowed' };
  }

  if (certificateRequest.data?.mentor_hours && !validMentorHours(certificateRequest.data.mentor_hours)) {
    return { valid: false, error: 'The mentor_hours is not a valid number' };
  }

  return { valid: true };
};

const getMissingProperty = (certificateRequest: CertificateRequest) => {
  return certificateRequestProps.find((prop) => !certificateRequest[prop as keyof CertificateRequest]);
};

const validMentorHours = (hoursStr: string) => {
  const hours = parseInt(hoursStr);

  return Number.isInteger(hours) && hours > 0 && hours <= 2000;
};

const validStellarAccount = (stellarAccount: string) => {
  return validStellarAccounts.some((validStellarAccount) => validStellarAccount === stellarAccount);
};

const validCertificateType = (certificateType: string) => {
  return validCertificateTypes.includes(certificateType);
};
