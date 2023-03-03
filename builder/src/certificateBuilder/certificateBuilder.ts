import { ICertificate, ICertificateRequest, IOptionalRequestData } from './interfaces';
import { mentorCertificateTemplate } from './certificateTemplates';
import { validateCertificateRequest } from './validateCertificateRequest';
import { uploadCertToIPFS } from '../ipfs';

const OPTIONAL_KOMMIT_MENTOR_DATA: IOptionalRequestData = {
  mentorHours: '100'
};

const SUCCESS_MESAGE =
  '\n✅ Congratulations! Your certificate has been successfully generated. To access it, simply use your Stellar public key on the Chaincerts visualizer at https://demo.chaincerts.co/.';

export const generateCertificate = async (certificateRequest: ICertificateRequest): Promise<ICertificate> => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const CID = await uploadCertToIPFS(certificate);

  console.log(SUCCESS_MESAGE);

  return certificate;
};
