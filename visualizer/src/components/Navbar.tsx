import chaincertsLogo from '../../assets/images/icons/chaincertsLogo.png';
import leftArrowIcon from '../../assets/images/icons/leftArrowIcon.svg';
import { t } from 'i18next';

function Navbar() {
  return (
    <div className="flex justify-between px-10 items-center font-poppins pt-10 pb-2">
      <div>
        <img src={chaincertsLogo} alt="chaincerts-logo" />
      </div>
      <div>
        <button className="flex justify-center gap-3 w-40 h-12 bg-black text-white rounded-3xl p-3 border-2 border-solid border-white font-medium">
          <img src={leftArrowIcon} alt="left-arrow-icon" />
          <label>{t('button.back')}</label>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
