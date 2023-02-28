import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Certificates from './pages/certificates';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates/:stellar_key" element={<Certificates />} />
          <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
