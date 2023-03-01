import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';
import * as router from 'react-router';

const navigate = jest.fn();

describe('NavBar component', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Navbar />
      </I18nextProvider>
    );
  });

  it('should show the text back', () => {
    expect(screen.getByText('back')).toBeInTheDocument();
  });

  it('should show the chaincertsLogo', () => {
    expect(screen.getByAltText('chaincerts-logo')).toBeInTheDocument();
  });

  it('should show the leftArrowIcon', () => {
    expect(screen.getByAltText('left-arrow-icon')).toBeInTheDocument();
  });

  it('should redirect to home when the back button is pressed', () => {
    const backButton = screen.getByText('back');
    fireEvent.click(backButton);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
