import { render, screen } from '@testing-library/react';
import Profile from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('<Profile />', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Profile stellar_key="GDG5FFM2L534PEL4HQTTN2AR6P3E2TJYD5CTOD42DXKBIBBRAWSQAZLJV" />
      </I18nextProvider>
    );
  });

  it('Show profile description message', () => {
    expect(screen.getByText('Stellar Public Key')).toBeInTheDocument();
  });

  it('Show stellar key', () => {
    expect(screen.getByText('GDG5FFM2L534PEL4HQTTN2AR6P3E2TJYD5CTOD42DXKBIBBRAWSQAZLJV')).toBeInTheDocument();
  });

  it('Show avatar image', () => {
    expect(screen.getByAltText('avatar-image')).toBeInTheDocument();
  });
});
