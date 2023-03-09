import { uploadCertToIPFS } from '../index';
import { createBucketPromiseResponse, putObjectPromiseResponse } from './__mocks__/aws-sdk/S3';
import { kommitMentorCertificate } from './factory/kommitMentorCertificate';
describe('uploadCertToIPFS lambda', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('when the arguments are ok, returns the CID', async () => {
    const result = await uploadCertToIPFS(kommitMentorCertificate);

    expect(result).toBe('HASH_CID');
  });

  it('when the createBucket fails, returns a 500 error', async () => {
    const ERROR_MESSAGE = 'createBucketError';
    createBucketPromiseResponse.mockReturnValueOnce(Promise.reject(new Error(ERROR_MESSAGE)));

    await expect(uploadCertToIPFS(kommitMentorCertificate)).rejects.toThrow(
      `Error uploading certificate to filebase: Error: ${ERROR_MESSAGE}`
    );
  });

  it('when the putObject fails, returns a 500 error', async () => {
    const ERROR_MESSAGE = 'putObjectError';

    putObjectPromiseResponse.mockReturnValueOnce(Promise.reject(new Error(ERROR_MESSAGE)));

    await expect(uploadCertToIPFS(kommitMentorCertificate)).rejects.toThrow(
      `Error uploading certificate to filebase: Error: ${ERROR_MESSAGE}`
    );
  });
});
