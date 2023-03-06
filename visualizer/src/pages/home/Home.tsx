import { t } from 'i18next';

import chaincertsLogo from '/static/icons/chaincertsLogo.svg';
import MainInput from '../../components/mainInput';
import './styles.css';

const PUBLIC_KEY_FIRST = 'GACI2PH7YDMJMJQJLOECDY3VO4TIOHFEOPYOWQ2MOQL4FASOX3JMPWGZ';
const PUBLIC_KEY_SECOND = 'GCZ67DC7MZURDGW7Z5YYNR2KQBRCDLGDEUCE6IDRGRDBWJYX2RQ7AUWT';

const Home = () => {
  return (
    <div className="home-container">
      <img className="chaincerts-logo" src={chaincertsLogo} alt="chaincerts-logo" />
      <div className="wrapper-main-home">
        <span className="home-title">{t('home.title')}</span>
        <p className="home-info">{t('home.info')}</p>
        <span className="home-key">{PUBLIC_KEY_FIRST}&nbsp;&nbsp;</span>
        <span className="home-key">{PUBLIC_KEY_SECOND}&nbsp;&nbsp;</span>
        <MainInput />
      </div>
    </div>
  );
};

export default Home;
