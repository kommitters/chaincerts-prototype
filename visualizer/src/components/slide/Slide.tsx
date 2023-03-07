import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { readCertificate } from '../../ipfs/readCertificate';
import CertificateVisualizer from '../certificateVisualizer';
import { Link } from 'react-router-dom';

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
    <div id={`slide${slideIndex}`} className="carousel-item relative w-full ">
      <div className="card bg-base-100 shadow-xl w-full" style={{ height: 500 }}>
        <div className="w-full h-full">
          {certificateJSON && <CertificateVisualizer certificate={certificateJSON} id={`certificate-${slideIndex}`} />}
        </div>
        <div className="card-body py-5">
          <div className="card-actions justify-between">
            <div className="self-center">
              <h2 className="card-title">Certificate</h2>
              <p className="text-sm font-light">{certificateCID}</p>
            </div>
            <div>
              <label htmlFor={modalID} className="btn btn-primary">
                Stellar network data
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        {slideIndex > 1 ? (
          <a href={`#slide${slideIndex - 1}`} className="btn btn-circle">
            ❮
          </a>
        ) : (
          <a />
        )}

        {slideIndex < totalSlides && (
          <a href={`#slide${slideIndex + 1}`} className="btn btn-circle">
            ❯
          </a>
        )}
      </div>
    </div>
  );
};

export default Slide;
