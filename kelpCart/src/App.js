import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Contact, Login, Register, Reset, Admin, ProductDetails, Cart, CheckoutDetails, Checkout, Test } from "./pages";
// Components
import { Header, Footer } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
function App() {
  return (
    
    <>
    {/* 1 */}
      <BrowserRouter>
        <ToastContainer />
        <>
          <Header />
        </>
        <Routes>
          {/* auth */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          {/* admin */}
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          {/* cart */}
          <Route path="/product-details/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />

          {/* checkout */}
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path='/test' element={<Test />} />
          <Route path='/checkout' element={<Checkout />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
