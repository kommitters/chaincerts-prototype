export const createBucketPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

export const putObjectPromiseResponse = jest.fn().mockReturnValue(
  Promise.resolve({
    $response: { httpResponse: { headers: { 'x-amz-meta-cid': 'HASH_CID' } } }
  })
);

const createBucketFn = jest.fn().mockImplementation(() => ({
  promise: createBucketPromiseResponse
}));

const putObjectFn = jest.fn().mockImplementation(() => ({
  promise: putObjectPromiseResponse
}));

export class S3 {
  putObject = putObjectFn;
  createBucket = createBucketFn;
}
