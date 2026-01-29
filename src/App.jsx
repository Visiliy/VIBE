import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Page1 from './components/Page1/Page1';
import DataCloud from './Servises/DataCloud';
import Page2 from './components/Page2/Page2';
import Cookies from './Servises/Cookies';

const dataCloud = new DataCloud();
const cookies = new Cookies();

const jwtCookie = cookies.get('JWT') || null;
const firstVisitCookie = cookies.get('firstVisit') || false;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 dataCloud={dataCloud} jwt={jwtCookie} firstVisit={firstVisitCookie} />} />
        <Route path="/authorization" element={<Page2 dataCloud={dataCloud} jwt={jwtCookie} firstVisit={firstVisitCookie} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
