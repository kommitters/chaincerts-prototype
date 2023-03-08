import { t } from 'i18next';
import kommitLogo from '/icons/kommitLogo.svg';

const Footer = () => {
  return (
    <footer className="footer mt-5 p-4 bg-transparent text-neutral-content sm:justify-around">
      <div className="place-items-center sm:place-items-start grid-flow-row">
        <img className="kommit-logo items-center" src={kommitLogo} alt="kommit-logo" />
        <p className="text-center">{t('footer.description')}</p>
      </div>
    </footer>
  );
};

export default Footer;
