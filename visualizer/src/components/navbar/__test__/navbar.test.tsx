import { render, screen } from '@testing-library/react';
import Navbar from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('<Navbar />', () => {
  it('show the text back', async () => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Navbar />
      </I18nextProvider>
    );
    expect(screen.getByText('back')).toBeInTheDocument();
  });
});
