import { t } from 'i18next';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStellarAccountInfo } from '../../stellarOperations';
import { IAccountInfo } from '../../stellarOperations/interfaces/IAccountInfo';
import './styles.css';

const MainInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showError, setErrorShow] = useState(false);
  const [errorNotFound, setErrorNotFound] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const publicKey = inputRef.current;
    if (publicKey) {
      try {
        const accountInfo: IAccountInfo[] = await fetchStellarAccountInfo(publicKey.value);

        if (accountInfo.length !== 0) {
          setErrorShow(false);
          setErrorNotFound(false);
          navigate(`certificates/${publicKey.value}`, {
            state: accountInfo
          });
        } else {
          setErrorNotFound(true);
        }
      } catch (error) {
        setErrorShow(true);
      }
    }
  };

  const placeholder = t('home.stellar_input.placeholder');

  return (
    <div className="wrapper">
      <div className="main-input-container">
        <input className="main-input" ref={inputRef} type="text" placeholder={placeholder} aria-label="key-input" />
        <button className="button-input" onClick={handleClick}>
          {t('home.stellar_input.enter')}
        </button>
      </div>
      {showError && (
        <div className="error-alert">
          <span>
            <strong>{t('home.stellar_input.error_title')}</strong> {t('home.stellar_input.info_message')}
          </span>
        </div>
      )}
      {errorNotFound && <div className="error-alert">{t('certificates.not_found_message')}</div>}
    </div>
  );
};

export default MainInput;
