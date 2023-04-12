import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Proxies from "./pages/Proxies";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proxies" element={<Proxies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
