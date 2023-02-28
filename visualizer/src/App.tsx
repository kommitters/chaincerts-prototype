import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Certificates from './pages/certificates';
import Home from './pages/home';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates/:stellar_key" element={<Certificates />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
            <Route />
          </Routes>
        </Router>
      </I18nextProvider>
    </div>
  );
}

export default App;
