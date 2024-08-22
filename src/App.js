import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Footer from "./sections/Footer/Footer";
import Header from "./sections/Header/Header";
import Checkout from "./Pages/Checkout/Checkout";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Shop from "./Pages/Shop/Shop";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import { ThemeProvider } from "./Context/ThemeContext";
import FAQ from "./Pages/FAQ/FAQ";
import { TypeProvider } from "./Context/TypeCardsContext";
function App() {
  return (
    <ThemeProvider>
      <TypeProvider>
         <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path={`/productInfo`} element={<ProductInfo />} />
          <Route path={`/faq`} element={<FAQ />} />
        </Routes>
        <Footer />
      </Router>
      </TypeProvider>
    </ThemeProvider>
  );
}

export default App;
