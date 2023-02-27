import { render, screen } from '@testing-library/react';
import MainInput from '..';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('<MainInput />', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <MainInput />
      </I18nextProvider>
    );
  });

  it('show the placeholder text', () => {
    expect(screen.getByPlaceholderText('Insert Stellar public key')).toBeInTheDocument();
  });
  /*
  it('show the highlighted text of the error message', () => {
    expect(screen.getByText('Something happened;')).toBeInTheDocument();
  });
  */

  it('show button text', () => {
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });
});
