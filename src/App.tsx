import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { DemoBar } from './components/common/DemoBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { TradeChatbot } from './components/trade/TradeChatbot';

// Global Scroll to Top Handler on every route & query navigation
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Instantly scroll window and document to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
};

// Trade Portal Pages
import { HomePage } from './pages/trade/HomePage';
import { ProductsPage } from './pages/trade/ProductsPage';
import { ProductDetailPage } from './pages/trade/ProductDetailPage';
import { BulkCartPage } from './pages/trade/BulkCartPage';
import { QuotationRequestPage } from './pages/trade/QuotationRequestPage';
import { DistributorRegisterPage } from './pages/trade/DistributorRegisterPage';
import { DistributorLoginPage } from './pages/trade/DistributorLoginPage';
import { DistributorProfilePage } from './pages/trade/DistributorProfilePage';
import { MyQuotationsPage } from './pages/trade/MyQuotationsPage';

// Owner Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminDistributorsPage } from './pages/admin/AdminDistributorsPage';
import { AdminQuotationsPage } from './pages/admin/AdminQuotationsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

// Trade Portal Layout Wrapper
const TradeLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 font-sans text-slate-800 w-full relative">
      <DemoBar />
      <Navbar />
      <main className="flex-1 w-full min-w-0">
        <Outlet />
      </main>
      <Footer />
      {/* 24/7 AI Customer Order & Logistics Chatbot */}
      <TradeChatbot />
    </div>
  );
};

// Admin Portal Layout Wrapper
const AdminLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to determine active page title
  const getHeaderInfo = () => {
    const path = location.pathname;
    if (path.includes('/admin/products')) {
      return { title: 'Product & Stock Management', subtitle: 'Manage wholesale prices, packaging SKUs, and factory inventory' };
    }
    if (path.includes('/admin/distributors')) {
      return { title: 'Distributor Applications & KYC', subtitle: 'Review wholesaler onboarding, verify GSTIN, and assign commercial credit tiers' };
    }
    if (path.includes('/admin/quotations')) {
      return { title: 'Quotation Inquiries & Proforma Desk', subtitle: 'Review customer inquiries, set unit rates, and issue formal quotations' };
    }
    if (path.includes('/admin/orders')) {
      return { title: 'Orders & Dispatches', subtitle: 'Track production batches, assign Lorry Receipts (LR), and vehicle dispatches' };
    }
    if (path.includes('/admin/reports')) {
      return { title: 'Extraction & Sales Reports', subtitle: 'Interstate demand analysis, crushing volume, and packaging format shares' };
    }
    return { title: 'Owner & Works Console', subtitle: 'Daily seed crushing, pending quotations, and live inventory overview' };
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800">
      <DemoBar />
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <AdminSidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <AdminHeader
            title={title}
            subtitle={subtitle}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <>
      {/* Ensures every navigation immediately opens at the top of the screen */}
      <ScrollToTop />

      <Routes>
        {/* Trade / Customer Portal Routes */}
        <Route element={<TradeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<BulkCartPage />} />
          <Route path="/quotation-request" element={<QuotationRequestPage />} />
          <Route path="/portal/register" element={<DistributorRegisterPage />} />
          <Route path="/portal/login" element={<DistributorLoginPage />} />
          <Route path="/portal/profile" element={<DistributorProfilePage />} />
          <Route path="/portal/my-orders" element={<MyQuotationsPage />} />
        </Route>

        {/* Owner Admin Login (Standalone) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Owner Admin Authenticated Portal Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/distributors" element={<AdminDistributorsPage />} />
          <Route path="/admin/quotations" element={<AdminQuotationsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;

