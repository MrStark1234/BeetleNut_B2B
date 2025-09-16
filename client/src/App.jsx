import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import InquiryForm from "./components/InquiryPage";
import AdminInquiries from "./pages/admin/AdminInquiries";
import WhatsAppFloat from "./components/WhatsAppFloat";

const App = () => {
  const location = useLocation();
  const hideOnAdmin =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/inquiry" element={<InquiryForm />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-inquiry" element={<AdminInquiries />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        {!hideOnAdmin && <WhatsAppFloat />}
      </div>

      <Footer />
    </div>
  );
};

export default App;
