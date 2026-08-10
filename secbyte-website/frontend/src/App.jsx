import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import Testimonials from "./pages/Testimonials";
import Faq from "./pages/Faq";
import Technologies from "./pages/Technologies";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminContacts from "./pages/AdminContacts";
import AdminServices from "./pages/AdminServices";
import AdminBlog from "./pages/AdminBlog";
import AdminCareers from "./pages/AdminCareers";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
        <Route path="/admin/careers" element={<ProtectedRoute><AdminCareers /></ProtectedRoute>} />

        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />
        <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
        <Route path="/careers/:slug" element={<PublicLayout><CareerDetail /></PublicLayout>} />
        <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><Faq /></PublicLayout>} />
        <Route path="/technologies" element={<PublicLayout><Technologies /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;