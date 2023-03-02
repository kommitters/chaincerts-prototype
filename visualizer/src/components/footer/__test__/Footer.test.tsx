import { render, screen } from '@testing-library/react';
import Footer from '../';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

describe('<Footer />', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <Footer />
      </I18nextProvider>
    );
  });

  it('show footer description', () => {
    expect(
      screen.getByText('© 2009 - 2023 kommit, All Rights Reserved - Chaincerts powered by kommit')
    ).toBeInTheDocument();
  });

  it('show the kommit logo', () => {
    expect(screen.getByAltText('kommit-logo')).toBeInTheDocument();
  });
});
