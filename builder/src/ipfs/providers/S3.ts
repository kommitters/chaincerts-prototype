import * as AWS from 'aws-sdk';

export const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.IPFS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.IPFS_SECRET_ACCESS_KEY as string,
  endpoint: process.env.IPFS_ENDPOINT as string,
  region: process.env.IPFS_REGION as string,
  s3ForcePathStyle: true
});
