import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useState, useEffect } from 'react';

import Certificates from './pages/certificates';
import Footer from './components/footer';
import Home from './pages/home';
import i18n from './i18n';

const URL_BACKGROUND_IMAGE = 'static/images/backgroundImage.svg';

function App() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = URL_BACKGROUND_IMAGE;
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  return (
    <>
      {isImageLoaded && (
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
          <div className="footer-page">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
