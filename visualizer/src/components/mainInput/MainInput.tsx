import { FiCommand } from 'react-icons/fi';
import { t } from 'i18next';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStellarAccountInfo } from '../../stellarOperations';

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
    <div className="flex flex-col gap-y-4 sm:w-[75%] sm:m-auto">
      <div className="flex flex-row  bg-slave-dark border-4 border-solid border-low-gray py-1 pr-1 rounded-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="input border-none focus:outline-none bg-slave-dark w-full text-lg placeholder:opacity-100 placeholder:font-bold"
          aria-label="key-input"
        />
        <button
          className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple rounded-t-lg text-lg normal-case"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <FiCommand className="animate-spin stroke-white" /> : t('home.stellar_input.enter')}
        </button>
      </div>
      {invalidKey && (
        <div className="alert alert-error shadow-lg text-white text-lg bg-hight-red font-bold rounded-lg">
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
            <span>
              <strong>{t('home.stellar_input.info_title')}</strong> {t('home.stellar_input.info_message')}
            </span>
          </div>
        </div>
      )}
      {notFoundCertificates && (
        <div className="alert alert-warning shadow-lg text-white text-lg bg-hight-red font-bold rounded-lg">
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
    </div>
  );
};

export default MainInput;
