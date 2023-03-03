import { ICertificate, ICertificateRequest, IOptionalRequestData } from './interfaces';
import { mentorCertificateTemplate } from './certificateTemplates';
import { validateCertificateRequest } from './validateCertificateRequest';
import { uploadCertToIPFS } from '../ipfs';
import { createSBT } from '../stellar';
import { CLAWABACK_MESSAGE, FAILED_MESSAGE, SUCCESS_MESSAGE } from '../resources/consts';

const OPTIONAL_KOMMIT_MENTOR_DATA: IOptionalRequestData = {
  mentorHours: '100'
};

export const generateCertificate = async (certificateRequest: ICertificateRequest): Promise<void | ICertificate> => {
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

  const CID = await uploadCertToIPFS(certificate);

  try {
    const XDR = await createSBT(CID, certificateRequest.certType);
    console.log(CLAWABACK_MESSAGE + `${XDR} \n`);

    console.log(SUCCESS_MESSAGE);

    return certificate;
  } catch (error) {
    console.error(FAILED_MESSAGE + `${error.message} \n`);
  }
};
