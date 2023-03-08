import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useState, useEffect } from 'react';

import Certificates from './pages/certificates';
import Footer from './components/footer';
import Home from './pages/home';
import i18n from './i18n';

const URL_BACKGROUND_IMAGE = '/images/backgroundImage.svg';

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
        <div
          className="min-h-screen bg-cover bg-center font-inter"
          style={{ backgroundImage: `url(${URL_BACKGROUND_IMAGE})` }}
        >
          <div className="container mx-auto px-4 xs:px-8">
            <div className="flex flex-col min-h-screen justify-between">
              <I18nextProvider i18n={i18n}>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/certificates/:stellar_key" element={<Certificates />} />
                    <Route path="/*" element={<Navigate replace to="/" />} />
                  </Routes>
                </Router>
              </I18nextProvider>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
