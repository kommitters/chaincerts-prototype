import { t } from 'i18next';

import chaincertsLogo from '/static/icons/chaincertsLogo.svg';
import MainInput from '../../components/mainInput';
import Footer from '../../components/footer';
import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="wrapper-home">
        <img className="chaincerts-logo" src={chaincertsLogo} alt="chaincerts-logo" />
        <div className="wrapper-main-home">
          <span className="home-title">{t('home.title')}</span>
          <p className="home-info">{t('home.info')}</p>
          <span className="home-key">GAQFD264BREGU67VGWQ6JIBRQTGCZTGHEVL63ZV4IBWEMYHJQB7OOMID</span>
          <span className="home-key">GBAAAUVZQQ6OAPU2IT5Z4WDQRLJ6AJFNPXL2SCZTA5TRB6FZBQMBJPV4</span>
          <div className="home-input-container">
            <MainInput />
          </div>
        </div>
        <div className="footer-home">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
