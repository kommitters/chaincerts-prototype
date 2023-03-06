import { useLocation } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel';
import CertificateInformation from '../../components/certificateInformation/CertificateInformation';
import { IAssetInformation } from '../../components/assetInformation/interfaces';

const Certificates = () => {
  const { state: certificates } = useLocation();

  const carouselData = certificates.map((certificate: IAssetInformation, index: number) => (
    <CertificateInformation key={index} id={`certificate-${index}`} assetInformation={certificate} />
  ));

  return <Carousel carouselData={carouselData}></Carousel>;
};

export default Certificates;
