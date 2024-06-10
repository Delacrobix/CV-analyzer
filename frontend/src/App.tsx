import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import BasePage from "./components/basePage";
import Index from "./pages/index";
import Analysis from "./pages/analysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BasePage>{<Index />}</BasePage>} />
        <Route path='/analysis' element={<BasePage>{<Analysis />}</BasePage>} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
