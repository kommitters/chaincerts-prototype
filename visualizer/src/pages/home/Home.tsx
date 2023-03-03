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
          <span className="home-key">GB6KONY6F5U3HWSQSPCUX2HJPPENEBP5P77ALW3HPABUHP6YQNZUFZHW</span>
          <span className="home-key">GCQXTWFTNV4ILHREYU7OBU3SYBGPF4EXFCI2GEB47CGYENN2AWC4OOBX</span>
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
