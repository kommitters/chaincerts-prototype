import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import { readCertificate } from '../../ipfs/readCertificate';
import CertificateVisualizer from '../certificateVisualizer';
import { PUBLIC_KEY_JANE, PUBLIC_KEY_JOHN, CERTS_TITLES } from '../../utils/constants';

const JANE = 'Jane';
const JONH = 'John';

type SlideProps = {
  certificateCID: string;
  slideIndex: number;
  totalSlides: number;
  modalID: string;
  nonTransferable: boolean;
  revocable: boolean;
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

const Slide = ({ certificateCID, slideIndex, totalSlides, modalID, nonTransferable, revocable }: SlideProps) => {
  const { stellar_key: stellarKey } = useParams();
  const [certificateJSON, fetchCertificateJSON] = useState(null);

  useEffect(() => {
    loadCertificateFromIFPS(certificateCID, fetchCertificateJSON);
  }, []);

  const showTitle = stellarKey === PUBLIC_KEY_JANE || stellarKey === PUBLIC_KEY_JOHN;
  const name = stellarKey === PUBLIC_KEY_JANE ? JANE : JONH;
  const title = CERTS_TITLES[slideIndex - 1].replace('{NAME}', name);

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
              {showTitle && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
              <h2 className="text-lg font-bold">{t('certificates.info')}</h2>
              <p className="text-sm font-light">
                <strong className="font-black">{t('certificates.hash')}</strong>{' '}
                {Buffer.from(certificateCID).toString('base64').replaceAll('=', '')}
              </p>
              <p className="text-sm font-light">
                <strong className="font-bold">{t('certificates.owner')}</strong> {stellarKey}
              </p>
              <div
                className={
                  'badge text-xs font-semibold mt-2.5 mr-0.5 ' + (nonTransferable ? 'badge-success' : 'badge-error')
                }
              >
                {t('certificates.tags.non_transferable')}
              </div>
              <div
                className={'badge text-xs font-semibold mt-2.5 ml-0.5 ' + (revocable ? 'badge-success' : 'badge-error')}
              >
                {t('certificates.tags.revocable')}
              </div>
            </div>
            <div className="max-[660px]:w-full lg:text-right lg:self-center">
              <label
                htmlFor={modalID}
                className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple text-base normal-case rounded w-full"
              >
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
