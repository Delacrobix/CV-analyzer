import React from "react";

import BasePage from "./components/basePage";
import Main from "./pages/main";

function App() {
  return <BasePage Children={<Main />} />;
}

export default App;
