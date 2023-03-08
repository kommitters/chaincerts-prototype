import { ICertificate, ICertificateRequest, IOptionalRequestData } from './interfaces';
import { mentorCertificateTemplate } from './certificateTemplates';
import { validateCertificateRequest } from './validateCertificateRequest';
import { uploadCertToIPFS } from '../ipfs';
import { createSBT } from '../stellar';
import { FAILED_MESSAGE, SUCCESS_MESSAGE } from '../resources/consts';
import { createStellarAccount } from '../stellar/operations/helpers';

const OPTIONAL_KOMMIT_MENTOR_DATA: IOptionalRequestData = {
  mentorHours: '100'
};

export const generateCertificate = async (certificateRequest: ICertificateRequest): Promise<void | ICertificate> => {
  const requestValidation = validateCertificateRequest(certificateRequest);

  if (!requestValidation.valid) {
    throw new Error(requestValidation.error);
  }

  console.log(`\n\n🚀 Creating a receiving account`);
  const { publicKey: recipientPublicKey, secretKey: recipientSecretKey } = await createStellarAccount();
  console.log(`- Account address: ${recipientPublicKey}`);

  console.log(`\n\n🎨 Creating a certificate visualization`);
  console.log(`- Creating a 3D model`);
  certificateRequest.stellarAccount = recipientPublicKey;

  const certificate = { ...mentorCertificateTemplate };

  certificate.texts.forEach((certificateText) => {
    const { type, textFormatter } = certificateText;

    const textValue = certificateRequest[type] ?? certificateRequest.data?.[type] ?? OPTIONAL_KOMMIT_MENTOR_DATA[type];

    certificateText.text = textFormatter.replace('[value]', textValue as string);
  });

  const CID = await uploadCertToIPFS(certificate);

  try {
    await createSBT(recipientPublicKey, recipientSecretKey, CID, certificateRequest.certType);

    console.log(SUCCESS_MESSAGE + `\n \n${recipientPublicKey}. \n`);

    return certificate;
  } catch (error) {
    console.error(FAILED_MESSAGE + `${error.message} \n`);
  }
};
