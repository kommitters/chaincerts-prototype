import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import chaincertsLogo from '/icons/chaincertsLogo.svg';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between py-8">
      <div>
        <a onClick={() => navigate('/')} className="btn btn-ghost lowercase text-xl text-white">
          <img src={chaincertsLogo} alt="chaincerts-logo" />
        </a>
      </div>

      <div>
        <button className="btn btn-ghost btn-secondary btn-sm px-3 mt-2" onClick={() => navigate('/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
            className="inline-block w-6 h-6 stroke-current mr-1 text-white"
            data-testid="left-arrow-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.75 16.5L1.25 9L8.75 1.5"></path>
          </svg>
          <div className="font-normal normal-case text-lg text-white">{t('certificates.button.back')}</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
