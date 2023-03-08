import { useNavigate } from 'react-router-dom';
import { FiCommand } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { t } from 'i18next';

import chaincertsLogo from '/icons/chaincertsLogo.svg';
import MainInput from '../../components/mainInput';
import { fetchStellarAccountInfo } from '../../stellarOperations';

const PUBLIC_KEY_FIRST = 'GD6QSURVO6RSFHD3JBQCNCYVWLIP3IB3BVW7ZS3K3F5BLTXLBZSMLHL4';
const PUBLIC_KEY_SECOND = 'GDPZPB6KRALRO5TC36PZAQ2KZXVVPEMBEW4AM6TRSBIO6OCA5PJXBRQI';
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
        className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple text-lg normal-case rounded text-base xs:w-full w-80"
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
      <div className="flex flex-row justify-center">
        <div className="xl:basis-9/12 basis-full text-white">
          <div className="grid grid-cols-1 w-full xl:h-56 h-40 content-center">
            <img className="w-full xl:h-14 h-12" src={chaincertsLogo} alt="Chaincerts" />
          </div>

          <div className="w-full text-center mb-12">
            <h1 className="text-5xl font-black">{t('home.title')}</h1>
            <p className="mt-4 xl:text-xl text-lg font-light text-white">{t('home.info')}</p>
          </div>

          <div className="w-full text-center xl:mt-24 sm:mt-16">
            <div>{buttonKey(loadingFirstKey, PUBLIC_KEY_FIRST)}</div>
            <div className="mt-5">{buttonKey(loadingSecondKey, PUBLIC_KEY_SECOND)}</div>
          </div>

          <div className="w-full place-items-center">
            <div className="text-center font-semibold my-8">{t('home.separator')}</div>
            <MainInput enable={!pressed} setEnable={setPressed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
