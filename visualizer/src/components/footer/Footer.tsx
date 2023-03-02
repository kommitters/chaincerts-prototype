import { t } from 'i18next';
import kommitLogo from '/icons/kommitLogo.svg';

function Footer() {
  return (
    <div className="footer">
      <img className="kommit-logo" src={kommitLogo} alt="kommit-logo" />
      <span className="footer-description">{t('footer.description')}</span>
    </div>
  );
}

export default Footer;
