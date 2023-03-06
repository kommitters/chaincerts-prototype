import { S3 } from './providers';
import { ICertificate } from '../certificateBuilder/interfaces/ICertificate';

export const uploadCertToIPFS = async (certificate: ICertificate): Promise<string> => {
  console.log('\nStarting the process to upload the certificate to Filebase...');

  const certificateBuffer = Buffer.from(JSON.stringify(certificate));
  const fileName = generateHash();
  const IPFS_CERTS_BUCKET_NAME = process.env.IPFS_CERTS_BUCKET_NAME as string;

  try {
    await S3.createBucket({ Bucket: IPFS_CERTS_BUCKET_NAME }).promise();

    const fileInfo = await S3.putObject({
      Bucket: IPFS_CERTS_BUCKET_NAME,
      Key: fileName,
      Body: certificateBuffer
    }).promise();

    const CID = fileInfo.$response.httpResponse.headers['x-amz-meta-cid'];
    console.log(
      `📂 Congratulations, your certificate has been uploaded to Filebase. Please find the CID below for reference. \n CID: ${CID} \n`
    );

    return CID;
  } catch (error) {
    throw new Error(`Error uploading certificate to filebase: ${error}`);
  }
};

const generateHash = () => {
  return Date.now().toString(16).toUpperCase() + Math.random().toString(16).substring(2).toUpperCase();
};
