import * as AWS from 'aws-sdk';
import { IPFS_ACCESS_KEY_ID, IPFS_ENDPOINT, IPFS_REGION, IPFS_SECRET_ACCESS_KEY } from '../../configs/credentials';

export const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: IPFS_ACCESS_KEY_ID,
  secretAccessKey: IPFS_SECRET_ACCESS_KEY,
  endpoint: IPFS_ENDPOINT,
  region: IPFS_REGION,
  s3ForcePathStyle: true
});
