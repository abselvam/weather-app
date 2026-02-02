import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CityPage from "./pages/CityPage";
import Dashboard from "./pages/Dashboard";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="min-h-screen relative bg-sky text-white">
      {/* Background only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weather/:city" element={<CityPage />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
