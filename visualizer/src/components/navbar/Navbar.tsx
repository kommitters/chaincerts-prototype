import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import chaincertsLogo from '/icons/chaincertsLogo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar text-white h-24 flex lg:w-5/6 w-full mx-auto">
      <div className="flex-1">
        <a onClick={() => navigate('/')} className="btn btn-ghost lowercase text-xl text-white">
          <img src={chaincertsLogo} alt="chaincerts-logo" />
        </a>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost btn-secondary btn-sm rounded-full px-3" onClick={() => navigate('/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
            className="inline-block w-5 h-5 stroke-current mr-1 text-white"
            data-testid="left-arrow-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.75 16.5L1.25 9L8.75 1.5"></path>
          </svg>
          <span className="font-normal normal-case text-lg text-white">{t('certificates.button.back')}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
