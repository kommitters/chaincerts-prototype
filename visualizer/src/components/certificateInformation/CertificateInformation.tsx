import PropTypes, { InferProps } from 'prop-types';
import CertificateVisualizer from '../certificateVisualizer/CertificateVisualizer';
import AssetInformation from '../assetInformation/AssetInformation';
import './styles.css';
import { useEffect, useState } from 'react';
import { readCertificate } from '../../utils/loadCertificate';

const propTypes = {
  id: PropTypes.string.isRequired,
  assetInformation: PropTypes.object.isRequired
};

const CertificateInformation = ({ id, assetInformation }: InferProps<typeof propTypes>) => {
  const [certificateJSON, fetchCertificateJSON] = useState(null);

  useEffect(() => {
    readCertificate(assetInformation.CID).then((certificateJSON) => fetchCertificateJSON(certificateJSON));
  }, []);

  return (
    <div className="card">
      {certificateJSON && <CertificateVisualizer certificate={certificateJSON} id={id} />}
      <AssetInformation assetInformation={assetInformation} />
    </div>
  );
};

export default CertificateInformation;
