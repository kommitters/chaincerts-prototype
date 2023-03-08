import { t } from 'i18next';
import kommitLogo from '/icons/kommitLogo.svg';

const Footer = () => {
  return (
    <div className="flex flex-row justify-center h-20">
      <div className="lg:basis-7/12 basis-full text-white">
        <img className="h-6" src={kommitLogo} alt="kommit-logo" />
        <p className="text-sm mt-2">{t('footer.description')}</p>
      </div>
    </div>
  );
};

export default Footer;
