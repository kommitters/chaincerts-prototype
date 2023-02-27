import leftArrowIcon from '/icons/leftArrowIcon.svg';
import chaincertsLogo from '/images/chaincertsLogo.png';
import { t } from 'i18next';
import './styles.css';

function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo">
        <img src={chaincertsLogo} alt="chaincerts-logo" />
      </div>
      <div>
        <button className="button">
          <img src={leftArrowIcon} alt="left-arrow-icon" />
          {t('certificates.button.back')}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
