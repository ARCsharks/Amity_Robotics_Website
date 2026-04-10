import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;