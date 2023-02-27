import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Certificates from './pages/certificates';
import Home from './pages/home';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// test cd

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates/:stellar_key" element={<Certificates />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
