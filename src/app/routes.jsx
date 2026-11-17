import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderConfirmationPage from "../pages/OrderConfirmationPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import { CATEGORIES } from "../constants/categories";

// Only registered in development; Vite drops the import from the production bundle.
const StyleGuidePage = import.meta.env.DEV ? lazy(() => import("../pages/StyleGuidePage")) : null;

export default function AppRoutes({ onRequireAuth }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categoria/:slug" element={<CategoryPage />} />
      {CATEGORIES.map((category) => (
        <Route
          key={category.legacyPath}
          path={category.legacyPath}
          element={<Navigate to={category.path} replace />}
        />
      ))}
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/pedido/:id/confirmado" element={<OrderConfirmationPage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute onRequireAuth={onRequireAuth}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      {StyleGuidePage && (
        <Route
          path="/style-guide"
          element={
            <Suspense fallback={null}>
              <StyleGuidePage />
            </Suspense>
          }
        />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
