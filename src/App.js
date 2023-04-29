import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Lobby from './pages/Lobby/Lobby';
import SelectBg from "./pages/SelectBg/SelectBg";
import Coloring from './pages/Coloring/Coloring';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/selectBg" element={<SelectBg />} />
        <Route path="/coloring" element={<Coloring />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
