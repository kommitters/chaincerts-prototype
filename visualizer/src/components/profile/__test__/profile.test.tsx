import { render, screen } from '@testing-library/react';
import Profile from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('<Profile />', () => {
  it('Show profile description message', async () => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Profile />
      </I18nextProvider>
    );
    expect(screen.getByText('Stellar Public Key')).toBeInTheDocument();
  });
});
