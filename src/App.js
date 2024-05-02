import React from "react";
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home"
import EmailList from "./pages/EmailList"
import Header from "./layout/Header";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email-list" element={<EmailList />} />
      </Routes>
    </div>
  );
}

export default App;
