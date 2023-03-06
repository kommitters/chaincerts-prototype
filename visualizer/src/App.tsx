import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import Certificates from './pages/certificates';
import Home from './pages/home';
import i18n from './i18n';

const App = () => {
  return (
    <div className="app">
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates/:stellar_key" element={<Certificates />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
      </I18nextProvider>
    </div>
  );
};

export default App;
