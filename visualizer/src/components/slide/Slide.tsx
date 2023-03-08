import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { t } from 'i18next';

import { readCertificate } from '../../ipfs/readCertificate';
import CertificateVisualizer from '../certificateVisualizer';

type SlideProps = {
  certificateCID: string;
  slideIndex: number;
  totalSlides: number;
  modalID: string;
};

const loadCertificateFromIFPS = (CID: string, fetchCertificateJSON: Dispatch<SetStateAction<null>>) => {
  readCertificate(CID)
    .then((certificateJSON) => fetchCertificateJSON(certificateJSON))
    .catch(() => {
      setTimeout(() => {
        loadCertificateFromIFPS(CID, fetchCertificateJSON);
      }, 200);
    });
};

const Slide = ({ certificateCID, slideIndex, totalSlides, modalID }: SlideProps) => {
  const [certificateJSON, fetchCertificateJSON] = useState(null);

  useEffect(() => {
    loadCertificateFromIFPS(certificateCID, fetchCertificateJSON);
  }, []);

  return (
    <div id={`slide${slideIndex}`} className="w-full">
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="relative w-full h-full" style={{ height: 450 }}>
          {certificateJSON && <CertificateVisualizer certificate={certificateJSON} id={`certificate-${slideIndex}`} />}

          {slideIndex > 1 ? (
            <a href={`#slide${slideIndex - 1}`} className="btn btn-circle absolute m-auto left-3 top-1/2">
              ❮
            </a>
          ) : (
            <a />
          )}

          {slideIndex < totalSlides && (
            <a href={`#slide${slideIndex + 1}`} className="btn btn-circle absolute m-auto right-3 top-1/2">
              ❯
            </a>
          )}
        </div>
        <div className="card-body py-5">
          <div className="card-actions justify-between">
            <div className="self-center">
              <h2 className="card-title">{t('certificates.carousel.title')}</h2>
              <p className="text-sm font-light">{certificateCID}</p>
            </div>
            <div>
              <label htmlFor={modalID} className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple">
                {t('certificates.button_modal')}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
