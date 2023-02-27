import { S3 } from './providers/S3';
import { Certificate } from '../certificateBuilder/interfaces/Certificate';
import { IPFS_CERTS_BUCKET_NAME } from '../configs/credentials';

export const uploadCertToIPFS = async (certificate: Certificate): Promise<string> => {
  console.log('Uploading certificate to Filebase...');

  const certificateBuffer = Buffer.from(JSON.stringify(certificate));
  const fileName = generateHash();

  try {
    await S3.createBucket({ Bucket: IPFS_CERTS_BUCKET_NAME }).promise();

    const fileInfo = await S3.putObject({
      Bucket: IPFS_CERTS_BUCKET_NAME,
      Key: fileName,
      Body: certificateBuffer
    }).promise();

    const CID = fileInfo.$response.httpResponse.headers['x-amz-meta-cid'];
    console.log(`the certificate has been successfully uploaded to Filebase with the following CID: ${CID}`);

    return CID;
  } catch (error) {
    throw new Error(`Error uploading certificate to filebase: ${error}`);
  }
};

const generateHash = () => {
  return Date.now().toString(16).toUpperCase() + Math.random().toString(16).substring(2).toUpperCase();
};
