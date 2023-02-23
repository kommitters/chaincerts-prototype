import { CertificateRequest } from '../interfaces';

const validStellarAccounts = ['GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB'];

const certificateRequestProps = ['username', 'stellar_account', 'certificate_date', 'mentor_hours'];

export const validateCertificateRequest = (certificateRequest: CertificateRequest) => {
  const missingProperty = getMissingProperty(certificateRequest);

  if (missingProperty) {
    return { valid: false, error: `The ${missingProperty} property is missing` };
  }

  if (!validMentorHours(certificateRequest.mentor_hours)) {
    return { valid: false, error: 'The mentor_hours is not a valid number' };
  }

  if (!validStellarAccount(certificateRequest.stellar_account)) {
    return { valid: false, error: 'The stellar_account is not allowed' };
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
