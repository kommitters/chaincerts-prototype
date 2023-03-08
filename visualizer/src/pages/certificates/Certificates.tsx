import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { t } from 'i18next';

import { IAssetInformation } from '../../components/assetInformation/interfaces';
import Navbar from '../../components/navbar';
import Slide from '../../components/slide';
import AssetInformation from '../../components/assetInformation';

const Certificates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isValid = location.state?.valid;

  useEffect(() => {
    if (!isValid) navigate('/');
    window.scrollTo(0, 0);
  }, []);

  if (!isValid) return null;

  const certificates = JSON.parse(localStorage.getItem('certificates') as string);
  const numberCertificates = certificates?.length ?? 0;

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:basis-10/12 xl:basis-9/12 basis-full">
          <Navbar />
        </div>
      </div>

      <div className="flex justify-center my-6">
        <div className="lg:basis-4/5 xl:basis-3/5 basis-full alert bg-white-500 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-success flex-shrink-0 w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <h3 className="font-bold">
                {numberCertificates} {t('certificates.alert_title')}
              </h3>
              <div className="text-xs">{t('certificates.description')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center mb-6">
        <div className="carousel lg:basis-4/5 xl:basis-3/5 basis-full">
          {certificates?.map((certificate: IAssetInformation, index: number) => {
            const modalID = `cert-modal-${index}`;
            return (
              <div className="w-full h-full carousel-item relative cursor-move" key={`carousel-item-${index}`}>
                <Slide
                  key={`slide-comp-${index}`}
                  certificateCID={certificate.CID}
                  slideIndex={index + 1}
                  totalSlides={numberCertificates}
                  modalID={modalID}
                />
                <AssetInformation key={`asset-comp-${index}`} assetInformation={certificate} modalID={modalID} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Certificates;
