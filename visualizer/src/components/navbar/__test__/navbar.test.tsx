import { render, screen } from '@testing-library/react';
import Navbar from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('<Navbar />', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Navbar />
      </I18nextProvider>
    );
  });

  it('show the text back', () => {
    expect(screen.getByText('back')).toBeInTheDocument();
  });

  it('show the chaincertsLogo', () => {
    expect(screen.getByAltText('chaincerts-logo')).toBeInTheDocument();
  });

  it('show the leftArrowIcon', () => {
    expect(screen.getByAltText('left-arrow-icon')).toBeInTheDocument();
  });
});
