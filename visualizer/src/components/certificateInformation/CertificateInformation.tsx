import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import CertificateVisualizer from '../certificateVisualizer/CertificateVisualizer';
import AssetInformation from '../assetInformation/AssetInformation';
import { readCertificate } from '../../ipfs/readCertificate';
import { IAssetInformation } from '../assetInformation/interfaces';
import './styles.css';

const loadCertificateFromIFPS = (CID: string, fetchCertificateJSON: Dispatch<SetStateAction<null>>) => {
  readCertificate(CID)
    .then((certificateJSON) => fetchCertificateJSON(certificateJSON))
    .catch(() => {
      setTimeout(() => {
        loadCertificateFromIFPS(CID, fetchCertificateJSON);
      }, 200);
    });
};

type CertificateInformationProps = {
  id: string;
  assetInformation: IAssetInformation;
};

const CertificateInformation = ({ id, assetInformation }: CertificateInformationProps) => {
  const [certificateJSON, fetchCertificateJSON] = useState(null);

  useEffect(() => {
    loadCertificateFromIFPS(assetInformation.CID, fetchCertificateJSON);
  }, []);

  return (
    <div className="card">
      {certificateJSON && <CertificateVisualizer certificate={certificateJSON} id={id} />}
      <AssetInformation assetInformation={assetInformation} />
    </div>
  );
};

export default CertificateInformation;
