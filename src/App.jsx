import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Page1 from './components/Page1/Page1';
import DataCloud from './Servises/DataCloud';
import Page2 from './components/Page2/Page2';



const dataCloud = new DataCloud;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 dataCloud={dataCloud} />} />
        <Route path="/authorization" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
