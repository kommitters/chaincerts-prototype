import { render, fireEvent, screen } from '@testing-library/react';
import Carousel from '../index';
import carouselData from './factory/carouselData';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('Carousel component when has several items', () => {
  beforeEach(() => {
    render(<Carousel carouselData={carouselData}></Carousel>);
  });

  test('should build the container correctly', () => {
    const carouselContainer = screen.getByRole('group', { name: /carousel-container/i });

    expect(carouselContainer).toBeInTheDocument();
    expect(carouselContainer).toHaveClass('carousel');
  });

  test('should build the items correctly', () => {
    const carouselItems = screen.getAllByTestId('carousel-item', { exact: false });

    expect(carouselItems.length).toEqual(carouselData.length);
    expect(carouselItems[0]).toHaveClass('carousel-item-1');
    expect(carouselItems[1]).toHaveClass('carousel-item-2');
    expect(carouselItems[2]).toHaveClass('carousel-item-3');
    expect(carouselItems[3]).toHaveClass('carousel-item-4');
    expect(carouselItems[4]).toHaveClass('carousel-item-5');
  });

  test('should build the buttons correctly', () => {
    const nextButton = screen.getByRole('button', { name: /next-button/i });
    const previousButton = screen.getByRole('button', { name: /previous-button/i });

    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toHaveClass('carousel-control', 'carousel-control-next');
    expect(previousButton).toHaveClass('carousel-control', 'carousel-control-previous');
  });

  test('should move the items to the left when press the next button', async () => {
    const nextButton = screen.getByRole('button', { name: /next-button/i });
    const carouselItems = screen.getAllByTestId('carousel-item', { exact: false });

    fireEvent.click(nextButton);
    expect(carouselItems[0]).toHaveClass('carousel-item-5');
    expect(carouselItems[1]).toHaveClass('carousel-item-1');
    expect(carouselItems[2]).toHaveClass('carousel-item-2');
    expect(carouselItems[3]).toHaveClass('carousel-item-3');
    expect(carouselItems[4]).toHaveClass('carousel-item-4');
  });

  test('should move the items to the right when press the previous button', async () => {
    const previousButton = screen.getByRole('button', { name: /previous-button/i });
    const carouselItems = screen.getAllByTestId('carousel-item', { exact: false });

    fireEvent.click(previousButton);
    expect(carouselItems[0]).toHaveClass('carousel-item-2');
    expect(carouselItems[1]).toHaveClass('carousel-item-3');
    expect(carouselItems[2]).toHaveClass('carousel-item-4');
    expect(carouselItems[3]).toHaveClass('carousel-item-5');
    expect(carouselItems[4]).toHaveClass('carousel-item-1');
  });
});

describe('Carousel component when has one or zero items', () => {
  test('should build a unique item correctly', () => {
    render(<Carousel carouselData={[<img key={1} />]}></Carousel>);
    const carouselItems = screen.getAllByTestId('carousel-item', { exact: false });

    expect(carouselItems.length).toEqual(1);
    expect(carouselItems[0]).toHaveClass('carousel-item-2');
  });

  test('should show an error mesagge when there are no items', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Carousel carouselData={[]}></Carousel>
      </I18nextProvider>
    );

    expect(screen.getByText('There are no certificates associated with the user')).toBeInTheDocument();
  });
});
