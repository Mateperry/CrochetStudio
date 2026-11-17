import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NewsPage from "../pages/categories/NewsPage";
import AnimePage from "../pages/categories/AnimePage";
import MoviesPage from "../pages/categories/MoviesPage";
import SeriesPage from "../pages/categories/SeriesPage";
import FantasyPage from "../pages/categories/FantasyPage";
import AnimalsPage from "../pages/categories/AnimalsPage";
import CustomPage from "../pages/categories/CustomPage";
import OffersPage from "../pages/categories/OffersPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactPage from "../pages/ContactPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";

export default function AppRoutes({ productos, agregarAlCarrito, carrito, setCarrito, eliminarDelCarrito, onRequireAuth }) {
  const catalogProps = { productos, agregarAlCarrito };

  return (
    <Routes>
      <Route path="/" element={<HomePage {...catalogProps} />} />
      <Route path="/producto/:id" element={<ProductDetailPage {...catalogProps} />} />
      <Route path="/novedades" element={<NewsPage {...catalogProps} />} />
      <Route path="/animes" element={<AnimePage {...catalogProps} />} />
      <Route path="/peliculas" element={<MoviesPage {...catalogProps} />} />
      <Route path="/series" element={<SeriesPage {...catalogProps} />} />
      <Route path="/fantasia" element={<FantasyPage {...catalogProps} />} />
      <Route path="/animales" element={<AnimalsPage {...catalogProps} />} />
      <Route path="/personalizados" element={<CustomPage {...catalogProps} />} />
      <Route path="/ofertas" element={<OffersPage {...catalogProps} />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route
        path="/carrito"
        element={
          <CartPage
            carrito={carrito}
            setCarrito={setCarrito}
            eliminarDelCarrito={eliminarDelCarrito}
          />
        }
      />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute onRequireAuth={onRequireAuth}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
