import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import SelectBg from "./pages/SelectBg";
import Coloring from "./pages/Coloring";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/SelectBg" element={<SelectBg />} />
        <Route path="/Coloring" element={<Coloring />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
