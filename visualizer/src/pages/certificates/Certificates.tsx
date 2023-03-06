import { useLocation } from 'react-router-dom';
import { t } from 'i18next';

import Carousel from '../../components/carousel/Carousel';
import CertificateInformation from '../../components/certificateInformation/CertificateInformation';
import { IAssetInformation } from '../../components/assetInformation/interfaces';
import Profile from '../../components/profile';
import Navbar from '../../components/navbar';
import './styles.css';

const Certificates = () => {
  const { state: certificates } = useLocation();
  const carouselData: JSX.Element[] = certificates.map((certificate: IAssetInformation, index: number) => (
    <CertificateInformation key={index} id={`certificate-${index}`} assetInformation={certificate} />
  ));

  return (
    <div className="certificates-wrapper">
      <header>
        <div className="navbar-wrapper">
          <Navbar />
        </div>
        <div className="profile-wrapper">
          <Profile stellarKey={certificates[0].destination} />
        </div>
        <div className="certificates-description">
          <p>{t('certificates.description')}</p>
        </div>
      </header>
      <main className="certificates-main">
        <Carousel carouselData={carouselData}></Carousel>
      </main>
      <hr className="certificates-endline" />
    </div>
  );
};

export default Certificates;
