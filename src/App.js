import React from 'react';
import Navbar from './componants/nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nacional from './componants/nacional';
import Internacional from './componants/internacional';
import AddNacional from './componants/aN';
import Aviao from './componants/aviao';
import AddAviao from './componants/aA';
import AddCompanhia from './componants/aC';
import Companhia from './componants/companhia';
import AddInternacional from './componants/aI';


function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Nacional />} />
        <Route path="/nacional" element={<Nacional />} />
        <Route path="/internacional" element={<Internacional />} />
        <Route path="/aviao" element={<Aviao />} />
        <Route path="/companhia" element={<Companhia />} />
        <Route path="/aN" element={<AddNacional />} />
        <Route path="/aA" element={<AddAviao />} />
        <Route path="/aI" element={<AddInternacional />} />
        <Route path="/aC" element={<AddCompanhia />} />
      </Routes>
    </Router>
  );
}

export default App;
