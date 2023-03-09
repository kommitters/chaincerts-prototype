import { useNavigate } from 'react-router-dom';
import { ImSpinner5 } from 'react-icons/im';
import { useState, useEffect } from 'react';
import { t } from 'i18next';

import chaincertsLogo from '/icons/chaincertsLogo.svg';
import MainInput from '../../components/mainInput';
import { fetchStellarAccountInfo } from '../../stellarOperations';

import { PUBLIC_KEY_JANE, PUBLIC_KEY_JOHN } from '../../utils/constants';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loadingFirstKey, setLoadingFirstKey] = useState(false);
  const [loadingSecondKey, setLoadingSecondKey] = useState(false);
  const [pressed, setPressed] = useState(false);

  const navigate = useNavigate();

  function modLoadingSpinner(publicKey: string, state: boolean) {
    if (PUBLIC_KEY_JANE === publicKey) {
      setLoadingFirstKey(state);
    }
    if (PUBLIC_KEY_JOHN === publicKey) {
      setLoadingSecondKey(state);
    }

    setPressed(state);
  }

  const buttonKey = (name: name, loader: boolean, publicKey: string) => {
    return (
      <button
        className="btn border-none bg-gradient-to-b from-hight-pink to-hight-purple text-lg normal-case rounded xs:w-full w-80 animate-none"
        onClick={() => handlePublicKey(publicKey)}
      >
        {loader ? <ImSpinner5 className="animate-spin stroke-white" /> : name}
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
            <div>{buttonKey('jane.doe*chaincherts.co', loadingFirstKey, PUBLIC_KEY_JANE)}</div>
            <div className="mt-5">{buttonKey('john.doe*chaincherts.co', loadingSecondKey, PUBLIC_KEY_JOHN)}</div>
          </div>

          <div className="w-80 m-auto sm:w-full place-items-center">
            <div className="text-center font-semibold my-8">{t('home.separator')}</div>
            <MainInput enable={!pressed} setEnable={setPressed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
