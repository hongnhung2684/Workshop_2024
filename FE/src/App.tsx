import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutWebside from "./pages/(webside)/Layout";
import Cart from "./pages/(webside)/cart/page";
import HomePage from "./pages/(webside)/home/Page";
import ShopPage from "./pages/(webside)/shop/Page";
import SignupPage from "./pages/(auth)/sigup/Page";
import SigninPage from "./pages/(auth)/signin/Page";
import LayoutAdmin from "./pages/(admin)/Layout";
import DashboardPage from "./pages/(admin)/dashboard/Page";
import AdminProductsPage from "./pages/(admin)/products/page";
import ProductAdd from "./pages/(admin)/products/add/pages";
import NotFoundPage from "./pages/(webside)/404/NotFoundPage";
import PaymentPage from "./pages/(webside)/payment/Page";
import AboutPage from "./pages/(webside)/about/Page";
import ContactPage from "./pages/(webside)/contact/Page";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<LayoutWebside/>}>
          <Route index element={<HomePage/>}/>
          <Route path="shop" element={<ShopPage/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="signup" element={<SignupPage/>}/>
          <Route path="signin" element={<SigninPage/>}/>
          <Route path="payment" element={<PaymentPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

        </Route>
        <Route path="admin" element={<LayoutAdmin/>}>
        <Route index element={<Navigate to="dashboard"/>}/>
        <Route path="dashboard" element={<DashboardPage/>}/>
        <Route path="products" element={<AdminProductsPage/>}/>
        <Route path="products/add" element={<ProductAdd/>}/>

        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
