// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BasePage from "./components/basePage";
import Main from "./pages/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BasePage>{<Main />}</BasePage>} />
      </Routes>
    </Router>
  );
}

export default App;
