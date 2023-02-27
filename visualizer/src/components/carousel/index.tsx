import { ReactElement } from 'react';
import { t } from 'i18next';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './styles.css';

interface CarouselProps {
  carouselData: ReactElement[];
}

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
    const items = document.querySelectorAll('.carousel-item');
    moveItems();
  };

  const moveItems = () => {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length > 1) {
      carouselInView.forEach((item, index) => {
        items[index].className = `carousel-item carousel-item-${item}`;
      });
    }
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

  return (
    <>
      {carouselData.length == 0 ? (
        <div className={`error-message`}>{t('certificates.carousel.error_message')}</div>
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
