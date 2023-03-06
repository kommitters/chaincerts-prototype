import { t } from 'i18next';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStellarAccountInfo } from '../../stellarOperations';
import './styles.css';

const MainInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalidKey, setInvalidKey] = useState(false);
  const [notFoundCertificates, setNotFoundCertificates] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const publicKey = inputRef.current;
    if (publicKey) {
      try {
        const accountInfo = await fetchStellarAccountInfo(publicKey.value);
        const resolvedAccountInfo = await Promise.all(accountInfo);
        if (resolvedAccountInfo.length > 0) {
          setInvalidKey(false);
          setNotFoundCertificates(false);
          navigate(`certificates/${publicKey.value}`, {
            state: resolvedAccountInfo
          });
        } else {
          setNotFoundCertificates(true);
          setInvalidKey(false);
        }
      } catch (error) {
        setInvalidKey(true);
        setNotFoundCertificates(false);
      }
    }
  };

  const placeholder = t('home.stellar_input.placeholder');

  return (
    <>
      <div className="main-input-container">
        <input className="main-input" ref={inputRef} type="text" placeholder={placeholder} aria-label="key-input" />
        <button className="button-input" onClick={handleClick}>
          {t('home.stellar_input.enter')}
        </button>
      </div>
      {invalidKey && (
        <div className="error-alert">
          <span>
            <strong>{t('home.stellar_input.info_title')}</strong> {t('home.stellar_input.info_message')}
          </span>
        </div>
      )}
      {notFoundCertificates && <div className="error-alert">{t('certificates.not_found_message')}</div>}
    </>
  );
};

export default MainInput;
