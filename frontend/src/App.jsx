import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CityPage from "./pages/CityPage";
import Dashboard from "./pages/Dashboard";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather/:city" element={<CityPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
