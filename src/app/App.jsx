import { useState } from "react";
import Navigation from "../components/layout/Navigation";
import ScrollToTop from "../components/layout/ScrollToTop";
import AuthModal from "../features/auth/AuthModal";
import { useProducts } from "../features/catalog/hooks/useProducts";
import { useCart } from "../features/cart/useCart";
import AppRoutes from "./routes";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: productos, isLoading, error } = useProducts();
  const { count } = useCart();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
        <p className="mt-4 text-pink-600 font-medium animate-pulse">Cargando ternura...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4 text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-2">¡Ups! Algo salió mal</h2>
        <p className="text-red-600 mb-4">{error.message || 'No pudimos conectar con la base de datos.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <ScrollToTop />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <Navigation
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        totalCarrito={count}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      <main className={`transition-all duration-300 p-4 ${collapsed ? 'md:ml-16' : 'md:ml-56'} ml-0`}>
        <AppRoutes productos={productos} onRequireAuth={() => setShowAuthModal(true)} />
      </main>
    </div>
  );
}
