import { useNavigate } from 'react-router-dom';
import { FiCommand } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { t } from 'i18next';

import chaincertsLogo from '/icons/chaincertsLogo.svg';
import MainInput from '../../components/mainInput';
import { fetchStellarAccountInfo } from '../../stellarOperations';

const PUBLIC_KEY_FIRST = 'GBUGXFF4S4SEJ6BPEED3J7Z7EVDWFXWTWT5VADWNGB6O357BWVAGL3V5';
const PUBLIC_KEY_SECOND = 'GDP2KOLZOGI6TSHWQRVFPMSRKJCVDHA3UMEJQ32LWJPUA6QXA5VMNTKE';
const SIZE_CHAR = 6;

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loadingFirstKey, setLoadingFirstKey] = useState(false);
  const [loadingSecondKey, setLoadingSecondKey] = useState(false);
  const [pressed, setPressed] = useState(false);

  const navigate = useNavigate();

  function modLoadingSpinner(publicKey: string, state: boolean) {
    if (PUBLIC_KEY_FIRST === publicKey) {
      setLoadingFirstKey(state);
    }
    if (PUBLIC_KEY_SECOND === publicKey) {
      setLoadingSecondKey(state);
    }

    setPressed(state);
  }
  const buttonKey = (loader: boolean, publicKey: string) => {
    const accountNumber = PUBLIC_KEY_FIRST == publicKey ? 1 : 2;
    return (
      <button
        className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple mb-5 text-lg normal-case"
        onClick={() => handlePublicKey(publicKey)}
      >
        {loader ? (
          <FiCommand className="animate-spin stroke-white" />
        ) : (
          `${t('home.button_title')} #${accountNumber} ***${publicKey.substring(publicKey.length - SIZE_CHAR)}`
        )}
      </button>
    );
  };
  async function handlePublicKey(publicKey: string) {
    if (pressed) return;

    modLoadingSpinner(publicKey, true);
    try {
      const accountInfo = await fetchStellarAccountInfo(publicKey);
      const resolvedAccountInfo = await Promise.all(accountInfo);
      if (resolvedAccountInfo.length > 0) {
        modLoadingSpinner(publicKey, false);
        localStorage.setItem('certificates', JSON.stringify(resolvedAccountInfo));
        navigate(`certificates/${publicKey}`);
      } else {
        modLoadingSpinner(publicKey, false);
      }
    } catch (error) {
      modLoadingSpinner(publicKey, false);
    }
  }
  return (
    <>
      <div className="hero min-h-[60rem] bg-transparent">
        <div className="hero-content text-center">
          <div className="max-w-xs sm:max-w-4xl">
            <img className="w-full h-12 mb-20" src={chaincertsLogo} alt="chaincerts-logo" />
            <h1 className="text-5xl font-black mb-10 font-inter">{t('home.title')}</h1>
            <p className="py-6 mb-5 text-lg font-bold">{t('home.info')}</p>
            <p className="mb-3">{buttonKey(loadingFirstKey, PUBLIC_KEY_FIRST)}</p>
            <p>{buttonKey(loadingSecondKey, PUBLIC_KEY_SECOND)}</p>
            <p className="py-6 mb-4">{t('home.separator')}</p>
            <MainInput enable={!pressed} setEnable={setPressed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
