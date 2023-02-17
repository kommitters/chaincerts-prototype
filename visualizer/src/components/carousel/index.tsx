import './styles.css';

interface CarouselProps {
  carouselData: any[];
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

    const items = document.querySelectorAll('.carousel-item');
    carouselInView.forEach((item, index) => {
      items[index].className = `carousel-item carousel-item-${item}`;
    });
  };

  const nextControl = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    const firstElement = carouselData.shift();
    if (firstElement) carouselData.push(firstElement);

    const lastElement = carouselInView.pop();
    if (lastElement) carouselInView.unshift(lastElement);

    const items = document.querySelectorAll('.carousel-item');
    carouselInView.forEach((item, index) => {
      items[index].className = `carousel-item carousel-item-${item}`;
    });
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {carouselData.map((item, index) => {
          return (
            <div key={index} className={`carousel-item carousel-item-${index + 1}`} data-index={index + 1}>
              {item}
            </div>
          );
        })}
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-control carousel-control-previous"
          data-name="previous"
          onClick={previousControl}
        ></button>
        <button className="carousel-control carousel-control-next" data-name="next" onClick={nextControl}></button>
      </div>
    </div>
  );
};

export default Carousel;
