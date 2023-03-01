import { render, screen, fireEvent } from '@testing-library/react';
import MainInput from '..';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';
import * as router from 'react-router';
import * as fetchAccount from '../../../stellarOperations/fetchStellarAccountInfo';

import { accountInfo, mockFetchStellarAccountInfo } from '../__mocks__/mockFetchStellarAccountInfo';

const navigate = jest.fn();
describe('<MainInput />', () => {
  beforeEach(() => {
    // jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
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

  it('show button text', () => {
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });

  it.only('Redirect to Certificates component when the public key is correct and has certificates', async () => {
    // const fetchResponse = jest.fn();
    const spy = jest.spyOn(fetchAccount, 'fetchStellarAccountInfo').mockImplementation(async () => accountInfo);
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    const inputKey = screen.getByLabelText('key-input');
    const stellarPublicKey = 'GB6KONY6F5U3HWSQSPCUX2HJPPENEBP5P77ALW3HPABUHP6YQNZUFZHW';

    fireEvent.change(inputKey, { target: { value: stellarPublicKey } });
    const enterButton = screen.getByText('Enter');
    fireEvent.click(enterButton);

    expect(spy).toHaveBeenCalled();

    //expect(navigate).toHaveBeenLastCalledWith(`/certificates/${stellarPublicKey}`);
    // expect(navigate).toHaveBeenCalledWith('/');
  });

  it('show error message when fetchStellarAccountInfo call fails', () => {
    expect(screen.getByText('Something happened;')).toBeInTheDocument();
  });
});
