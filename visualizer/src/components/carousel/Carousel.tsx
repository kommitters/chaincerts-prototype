import { useEffect } from 'react';
import { t } from 'i18next';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import { IconContext } from 'react-icons';

import './styles.css';

type CarouselProps = {
  carouselData: JSX.Element[];
};

const MAIN_CERTIFICATE_INDEX = 2;
const MAIN_CERTIFICATE_CLASS = 'carousel-item-2';

const Carousel = ({ carouselData }: CarouselProps) => {
  const totalItems = carouselData.length;
  const carouselInView = [...Array(totalItems).keys()].map((x) => ++x);

  const previousControl = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    const firstElement = carouselInView.shift();
    if (firstElement) carouselInView.push(firstElement);
    moveItems();
  };

  const nextControl = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    const lastElement = carouselInView.pop();
    if (lastElement) carouselInView.unshift(lastElement);
    moveItems();
  };

  const moveItems = () => {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length > 1) {
      carouselInView.forEach((item, index) => {
        const actualComponent = items[index];

        hideAssetInformation(actualComponent);

        if (item === MAIN_CERTIFICATE_INDEX) {
          showAssetInformation(actualComponent);
        }

        actualComponent.className = `carousel-item carousel-item-${item}`;
      });
    }
  };

  const showAssetInformation = (component: Element) => {
    const assetCard = component?.getElementsByClassName('asset-card')[0];

    if (assetCard) assetCard.className = 'asset-card show';
  };

  const hideAssetInformation = (component: Element) => {
    const assetCard = component?.getElementsByClassName('asset-card')[0];

    if (assetCard) assetCard.className = 'asset-card';
  };

  const buildItems = () => {
    if (carouselData.length > 1) {
      return carouselData.map((item, index) => {
        return (
          <div
            key={index}
            className={`carousel-item carousel-item-${index + 1}`}
            data-index={index + 1}
            data-testid={'carousel-item'}
          >
            {item}
          </div>
        );
      });
    }

    return (
      <div className={`carousel-item carousel-item-2`} data-index={1} data-testid={'carousel-item'}>
        {carouselData[0]}
      </div>
    );
  };

  useEffect(() => {
    const firstMainCertificate = document.getElementsByClassName(MAIN_CERTIFICATE_CLASS)[0];

    showAssetInformation(firstMainCertificate);
  }, []);

  return (
    <>
      {carouselData.length == 0 ? (
        <div className="not-found-message">{t('certificates.not_found_message')}</div>
      ) : (
        <div className="carousel" role="group" aria-label="carousel-container">
          {buildItems()}
          <button
            className="carousel-control carousel-control-previous"
            data-name="previous"
            onClick={previousControl}
            aria-label="previous-button"
          >
            <IconContext.Provider value={{ size: '3em' }}>
              <>
                <AiOutlineDoubleLeft />
              </>
            </IconContext.Provider>
          </button>
          <button
            className="carousel-control carousel-control-next"
            data-name="next"
            onClick={nextControl}
            aria-label="next-button"
          >
            <IconContext.Provider value={{ size: '3em' }}>
              <>
                <AiOutlineDoubleRight />
              </>
            </IconContext.Provider>
          </button>
        </div>
      )}
    </>
  );
};

export default Carousel;
