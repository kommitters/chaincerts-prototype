const IPFS_BASE_URL = 'https://ipfs.filebase.io/ipfs';

export const readCertificate = (cid: string) => {
  return fetch(`${IPFS_BASE_URL}/${cid}`)
    .then((response) => response.json())
    .then((certificate) => certificate)
    .catch((error) => console.log(error));
};
