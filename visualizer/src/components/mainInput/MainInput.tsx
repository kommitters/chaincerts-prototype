import { t } from 'i18next';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStellarAccountInfo } from '../../stellarOperations';
import './styles.css';

const MainInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalidKey, setInvalidKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFoundCertificates, setNotFoundCertificates] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    const publicKey = inputRef.current;
    setLoading(true);
    if (publicKey) {
      try {
        const accountInfo = await fetchStellarAccountInfo(publicKey.value.trim());
        const resolvedAccountInfo = await Promise.all(accountInfo);
        if (resolvedAccountInfo.length > 0) {
          setInvalidKey(false);
          setNotFoundCertificates(false);
          setLoading(false);
          navigate(`certificates/${publicKey.value}`, {
            state: resolvedAccountInfo
          });
        } else {
          setLoading(false);
          setNotFoundCertificates(true);
          setInvalidKey(false);
        }
      } catch (error) {
        setLoading(false);
        setInvalidKey(true);
        setNotFoundCertificates(false);
      }
    }
  };

  const placeholder = t('home.stellar_input.placeholder');

  return (
    <>
      <div className="form-control">
        <label className="input-group">
          <input type="text" ref={inputRef} placeholder={placeholder} className="input input-bordered bg-slate-800" />
          <button
            className="btn btn-primary bg-gradient-to-b from-hight-pink to-hight-purple"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <span className="animate" /> : t('home.stellar_input.enter')}
          </button>
        </label>
      </div>
      {invalidKey && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{t('home.stellar_input.info_title')}</span>
          </div>
        </div>
      )}
      {notFoundCertificates && (
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{t('certificates.not_found_message')}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MainInput;
