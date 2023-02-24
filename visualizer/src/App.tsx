import { t } from 'i18next';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <div>
          <h1>Visualizer</h1>
          <p>{t('home_info.title')}</p>
          <p>{t('home_info.information_paragraph')}</p>
        </div>
      </div>
    </I18nextProvider>
  );
}

export default App;
