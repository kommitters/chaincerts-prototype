import leftArrowIcon from '/icons/leftArrowIcon.svg';
import chaincertsLogo from '/icons/chaincertsLogo.svg';
import { t } from 'i18next';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <div className="logo">
        <img src={chaincertsLogo} alt="chaincerts-logo" />
      </div>
      <button className="button" onClick={() => navigate('/')}>
        <img src={leftArrowIcon} alt="left-arrow-icon" />
        <span className="text-button">{t('certificates.button.back')}</span>
      </button>
    </div>
  );
};

export default Navbar;
