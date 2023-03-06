import Carousel from '../../components/carousel/Carousel';
import CertificateInformation from '../../components/certificateInformation/CertificateInformation';

const data = [
  <CertificateInformation key={1} id={'1'} />,
  <CertificateInformation key={2} id={'2'} />,
  <CertificateInformation key={5} id={'5'} />
];

const Certificates = () => {
  return <Carousel carouselData={data}></Carousel>;
};

export default Certificates;
