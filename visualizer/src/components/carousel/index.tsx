import { ReactElement } from 'react';
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
    const lastElement = carouselData.pop();
    if (lastElement) carouselData.unshift(lastElement);

    const firstElement = carouselInView.shift();
    if (firstElement) carouselInView.push(firstElement);
    moveItems();
  };

  const nextControl = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    const firstElement = carouselData.shift();
    if (firstElement) carouselData.push(firstElement);

    const lastElement = carouselInView.pop();
    if (lastElement) carouselInView.unshift(lastElement);
    moveItems();
  };

  const moveItems = () => {
    const items = document.querySelectorAll('.carousel-item');
    carouselInView.forEach((item, index) => {
      items[index].className = `carousel-item carousel-item-${item}`;
    });
  };

  return (
    <div className="carousel" role="group" aria-label="carousel-container">
      {carouselData.map((item, index) => {
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
      })}
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
  );
};

export default Carousel;
