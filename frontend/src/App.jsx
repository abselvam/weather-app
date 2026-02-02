import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CityPage from "./pages/CityPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather/:city" element={<CityPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
