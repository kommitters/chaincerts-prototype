import { Dispatch, SetStateAction, useEffect, useState, RefObject } from 'react';
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
  refParent: RefObject<HTMLElement>;
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

const Slide = ({
  certificateCID,
  slideIndex,
  totalSlides,
  modalID,
  nonTransferable,
  revocable,
  refParent
}: SlideProps) => {
  const { stellar_key: stellarKey } = useParams();
  const [certificateJSON, fetchCertificateJSON] = useState(null);

  useEffect(() => {
    loadCertificateFromIFPS(certificateCID, fetchCertificateJSON);
  }, []);

  const handleAnchorClick = (event: React.MouseEvent<Element, MouseEvent>, slideIndex: number) => {
    event.preventDefault();
    const carousel = refParent.current as HTMLElement;
    const slide = carousel.querySelector(`#slide${slideIndex}`) as HTMLElement;
    const scrollLeft = slide.offsetLeft - carousel.offsetLeft;
    carousel.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
      top: 0
    });
  };

  const showTitle = stellarKey === PUBLIC_KEY_JANE || stellarKey === PUBLIC_KEY_JOHN;
  const name = stellarKey === PUBLIC_KEY_JANE ? JANE : JONH;
  const title = CERTS_TITLES[slideIndex - 1].replace('{NAME}', name);

  return (
    <div id={`slide${slideIndex}`} className="w-full h-full carousel-item relative cursor-move">
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="relative w-full h-full" style={{ height: 450 }}>
          {certificateJSON && <CertificateVisualizer certificate={certificateJSON} id={`certificate-${slideIndex}`} />}

          {slideIndex > 1 ? (
            <a
              href={`#slide${slideIndex - 1}`}
              className="btn btn-circle absolute m-auto left-3 top-1/2"
              onClick={(e) => handleAnchorClick(e, slideIndex - 1)}
            >
              ❮
            </a>
          ) : (
            <a />
          )}

          {slideIndex < totalSlides && (
            <a
              href={`#slide${slideIndex + 1}`}
              className="btn btn-circle absolute m-auto right-3 top-1/2"
              onClick={(e) => handleAnchorClick(e, slideIndex + 1)}
            >
              ❯
            </a>
          )}
        </div>

        <div className="card-body py-5">
          <div className="card-actions">
            <div className="lg:flex flex-row justify-between justify-items-end">
              <div className="lg:basis-8/12 basis-6/12">
                {showTitle && <h1 className="lg:text-3xl text-2xl font-bold mb-6">{title}</h1>}
              </div>

              <div className="lg:basis-4/12 basis-6/12 text-right">
                <label
                  htmlFor={modalID}
                  className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple text-base normal-case rounded lg:sm-auto w-full"
                >
                  {t('certificates.button_modal')}
                </label>
              </div>
            </div>

            <div>
              <p className="text-sm font-light break-all">
                <span className="font-bold">{t('certificates.hash')}</span>{' '}
                <span>{Buffer.from(certificateCID).toString('base64').replaceAll('=', '')}</span>
              </p>

              <p className="text-sm font-light break-all">
                <span className="font-bold">{t('certificates.owner')}</span> {stellarKey}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
