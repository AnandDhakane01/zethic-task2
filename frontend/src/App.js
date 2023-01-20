import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
