import { t } from 'i18next';
import kommitLogo from '/icons/kommitLogo.svg';
import './styles.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <img className="kommit-logo" src={kommitLogo} alt="kommit-logo" />
      <span className="footer-description">{t('footer.description')}</span>
    </div>
  );
};

export default Footer;
