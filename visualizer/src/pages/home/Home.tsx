import { useNavigate } from 'react-router-dom';
import { FiCommand } from 'react-icons/fi';
import { useState } from 'react';
import { t } from 'i18next';

import chaincertsLogo from '/icons/chaincertsLogo.svg';
import MainInput from '../../components/mainInput';
import { fetchStellarAccountInfo } from '../../stellarOperations';

const PUBLIC_KEY_FIRST = 'GACI2PH7YDMJMJQJLOECDY3VO4TIOHFEOPYOWQ2MOQL4FASOX3JMPWGZ';
const PUBLIC_KEY_SECOND = 'GCZ67DC7MZURDGW7Z5YYNR2KQBRCDLGDEUCE6IDRGRDBWJYX2RQ7AUWT';
const SIZE_CHAR = 6;

const Home = () => {
  const [loadingFirstKey, setLoadingFirstKey] = useState(false);
  const [loadingSecondKey, setLoadingSecondKey] = useState(false);

  const navigate = useNavigate();

  function modLoadingSpinner(publicKey: string, state: boolean) {
    if (PUBLIC_KEY_FIRST === publicKey) {
      setLoadingFirstKey(state);
    }
    if (PUBLIC_KEY_SECOND === publicKey) {
      setLoadingSecondKey(state);
    }
  }
  const buttonKey = (loader: boolean, publicKey: string) => {
    return (
      <button
        className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple mb-5 text-lg normal-case"
        onClick={() => handlePublicKey(publicKey)}
      >
        {loader ? (
          <FiCommand className="animate-spin stroke-white" />
        ) : (
          `${t('home.button_title')} #1 ***${publicKey.substring(publicKey.length - SIZE_CHAR)}`
        )}
      </button>
    );
  };
  async function handlePublicKey(publicKey: string) {
    modLoadingSpinner(publicKey, true);
    try {
      const accountInfo = await fetchStellarAccountInfo(publicKey);
      const resolvedAccountInfo = await Promise.all(accountInfo);
      if (resolvedAccountInfo.length > 0) {
        modLoadingSpinner(publicKey, false);
        navigate(`certificates/${publicKey}`, {
          state: resolvedAccountInfo
        });
      } else {
        modLoadingSpinner(publicKey, false);
      }
    } catch (error) {
      modLoadingSpinner(publicKey, false);
    }
  }
  return (
    <>
      <div className="hero min-h-screen bg-transparent">
        <div className="hero-content text-center">
          <div className="max-w-xs sm:max-w-4xl">
            <img className="w-full h-12 mb-20" src={chaincertsLogo} alt="chaincerts-logo" />
            <h1 className="text-5xl font-black mb-10 font-inter">{t('home.title')}</h1>
            <p className="py-6 mb-5 text-lg font-bold">{t('home.info')}</p>
            <p className="mb-3">{buttonKey(loadingFirstKey, PUBLIC_KEY_FIRST)}</p>
            <p className="mb-3">{buttonKey(loadingSecondKey, PUBLIC_KEY_SECOND)}</p>
            <p className="py-6">{t('home.separator')}</p>
            <MainInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
