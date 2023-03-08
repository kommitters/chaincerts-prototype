import { FiCommand } from 'react-icons/fi';
import { t } from 'i18next';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStellarAccountInfo } from '../../stellarOperations';

type MainInputProps = {
  enable: boolean;
  setEnable: (enable: boolean) => void;
};

const MainInput = ({ enable, setEnable }: MainInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalidKey, setInvalidKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFoundCertificates, setNotFoundCertificates] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!enable) return;

    const publicKey = inputRef.current;
    setLoading(true);
    setEnable(true);

    if (publicKey) {
      try {
        const accountInfo = await fetchStellarAccountInfo(publicKey.value.trim());
        const resolvedAccountInfo = await Promise.all(accountInfo);
        if (resolvedAccountInfo.length > 0) {
          setInvalidKey(false);
          setNotFoundCertificates(false);
          setLoading(false);
          setEnable(false);
          localStorage.setItem('certificates', JSON.stringify(resolvedAccountInfo));
          navigate(`certificates/${publicKey.value}`);
        } else {
          setLoading(false);
          setEnable(false);
          setNotFoundCertificates(true);
          setInvalidKey(false);
        }
      } catch (error) {
        setLoading(false);
        setEnable(false);
        setInvalidKey(true);
        setNotFoundCertificates(false);
      }
    }
  };

  const placeholder = t('home.stellar_input.placeholder');

  const alertError = (invalidKey: boolean) => {
    if (invalidKey) {
      return (
        <div className="alert alert-error shadow-lg text-white bg-hight-red rounded-lg -mt-4">
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
            <span>{t('home.stellar_input.info_message')}</span>
          </div>
        </div>
      );
    }
  };

  const alertWarning = (notFoundCertificates: boolean) => {
    if (notFoundCertificates) {
      return (
        <div className="alert alert-error shadow-lg text-white bg-hight-red rounded-lg -mt-4">
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
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-4 sm:w-[75%] sm:m-auto">
      <div className="flex flex-row bg-slave-dark border-4 border-solid border-low-gray py-1 pr-1 rounded-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="input border-none focus:outline-none bg-slave-dark w-full text-lg placeholder:opacity-100 placeholder:text-lg"
          aria-label="key-input"
        />
        <button
          className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple rounded normal-case text-base"
          onClick={handleClick}
        >
          {loading ? <FiCommand className="animate-spin stroke-white" /> : t('home.stellar_input.enter')}
        </button>
      </div>
      <div>{alertError(invalidKey)}</div>
      <div>{alertWarning(notFoundCertificates)}</div>
    </div>
  );
};

export default MainInput;
