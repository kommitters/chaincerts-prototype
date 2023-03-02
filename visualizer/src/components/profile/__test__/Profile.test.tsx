import { render, screen } from '@testing-library/react';
import Profile from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('Profile component', () => {
  const stellarPublicKey = 'GDG5FFM2L534PEL4HQTTN2AR6P3E2TJYD5CTOD42DXKBIBBRAWSQAZLJV';

  beforeEach(() => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Profile stellar_key={stellarPublicKey} />
      </I18nextProvider>
    );
  });

  it('should show the profile description message', () => {
    expect(screen.getByText('Stellar Public Key')).toBeInTheDocument();
  });

  it('should show the stellar key', () => {
    expect(screen.getByText(stellarPublicKey)).toBeInTheDocument();
  });

  it('should show the avatar image', () => {
    expect(screen.getByAltText('avatar-image')).toBeInTheDocument();
  });
});
