import { Navigate, Route, Routes } from "react-router-dom";
import LayoutAdmin from "../pages/(admin)/Layout";
import AdminProductsPage from "../pages/(admin)/products/pages";
import SignupPage from "../pages/(auth)/sigup/Page";
import NotFoundPage from "../pages/(webside)/404/NotFoundPage";
import LayoutWebside from "../pages/(webside)/Layout";
import AboutPage from "../pages/(webside)/about/Page";
import ContactPage from "../pages/(webside)/contact/Page";
import HomePage from "../pages/(webside)/home/Page";
import PaymentPage from "../pages/(webside)/payment/Page";
import ShopPage from "../pages/(webside)/shop/Page";
import DashboardPage from "./../pages/(admin)/dashboard/Page";

export default function RouterApp() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutWebside />}>
          <Route index element={<HomePage />} />
          <Route path="sigup" element={<SignupPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
