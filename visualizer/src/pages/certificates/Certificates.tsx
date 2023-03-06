import { useLocation } from 'react-router-dom';
import { t } from 'i18next';

import Carousel from '../../components/carousel/Carousel';
import CertificateInformation from '../../components/certificateInformation/CertificateInformation';
import { IAssetInformation } from '../../components/assetInformation/interfaces';
import Profile from '../../components/profile';
import Navbar from '../../components/navbar';

const Certificates = () => {
  const { state: certificates } = useLocation();

  const carouselData: JSX.Element[] = certificates.map((certificate: IAssetInformation, index: number) => (
    <CertificateInformation key={index} id={`certificate-${index}`} assetInformation={certificate} />
  ));

  return (
    <div className="certificates-wrapper">
      <header>
        <nav>
          <Navbar />
        </nav>
        <div>
          <Profile stellarKey="adslkj" />
        </div>
        <p>{t('certificates.description')}</p>
      </header>
      <main className="certificates-main">
        <Carousel carouselData={carouselData}></Carousel>
      </main>
    </div>
  );
};

export default Certificates;
