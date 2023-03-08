import { S3 } from './providers';
import { ICertificate } from '../certificateBuilder/interfaces/ICertificate';

export const uploadCertToIPFS = async (certificate: ICertificate): Promise<string> => {
  console.log('- Uploading to IPFS');

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

    console.log('- The certificate is accessible in IPFS using this ID:', CID);

    return CID;
  } catch (error) {
    throw new Error(`Error uploading certificate to filebase: ${error}`);
  }
};

const generateHash = () => {
  return Date.now().toString(16).toUpperCase() + Math.random().toString(16).substring(2).toUpperCase();
};
