import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import * as router from 'react-router';

import * as fetchAccount from '../../../stellarOperations/fetchStellarAccountInfo';
import { accountInfo } from '../factory/fetchAccountInfoResponse';
import i18n from '../../../i18n';
import MainInput from '..';

const navigate = jest.fn();
describe('<MainInput />', () => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  const stellarPublicKey = 'GDG5FFM2L534PEL4HQTTN2AR6P3E2TJYD5CTOD42DXKBIBBRAWSQAZLJV';
  beforeEach(() => {
    i18n.changeLanguage('en');
    render(
      <I18nextProvider i18n={i18n}>
        <MainInput />
      </I18nextProvider>
    );
  });

  it('Show the correct elements in the component', () => {
    expect(screen.getByPlaceholderText('Insert Stellar public key')).toBeInTheDocument();
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });

  it('Redirect to Certificates component when the public key is correct and has certificates', async () => {
    const spy = jest.spyOn(fetchAccount, 'fetchStellarAccountInfo').mockImplementation(async () => accountInfo);
    const inputKey = screen.getByLabelText('key-input');

    fireEvent.change(inputKey, { target: { value: stellarPublicKey } });
    const enterButton = screen.getByText('Enter');
    fireEvent.click(enterButton);

    expect(spy).toBeCalled();

    await waitFor(() => {
      expect(navigate).toHaveBeenLastCalledWith(`certificates/${stellarPublicKey}`, { state: accountInfo });
    });
  });

  it('Displays an error message when the query to fetchStellarAccountInfo returns an empty array', async () => {
    const spy = jest.spyOn(fetchAccount, 'fetchStellarAccountInfo').mockImplementation(async () => []);
    const inputKey = screen.getByLabelText('key-input');

    fireEvent.change(inputKey, { target: { value: stellarPublicKey } });
    const enterButton = screen.getByText('Enter');
    fireEvent.click(enterButton);

    expect(spy).toBeCalled();

    await waitFor(() => {
      expect(screen.getByText('There are no certificates associated with the user')).toBeInTheDocument();
    });
  });

  it('Displays an error message when the query to fetchStellarAccountInfo fails', async () => {
    const spy = jest.spyOn(fetchAccount, 'fetchStellarAccountInfo').mockImplementation(async () => {
      throw new Error();
    });
    const inputKey = screen.getByLabelText('key-input');

    fireEvent.change(inputKey, { target: { value: stellarPublicKey } });
    const enterButton = screen.getByText('Enter');
    fireEvent.click(enterButton);

    expect(spy).toBeCalled();

    await waitFor(() => {
      expect(screen.getByText('Something happened;')).toBeInTheDocument();
    });
  });
});
