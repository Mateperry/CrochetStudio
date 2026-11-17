import { useCallback, useState } from "react";
import Navigation from "../components/layout/Navigation";
import ScrollToTop from "../components/layout/ScrollToTop";
import AuthModal from "../features/auth/AuthModal";
import { useCart } from "../features/cart/useCart";
import AppRoutes from "./routes";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { count } = useCart();
  const openAuth = useCallback(() => setShowAuthModal(true), []);

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
        onOpenAuth={openAuth}
      />

      <main className={`transition-all duration-300 p-4 ${collapsed ? 'md:ml-16' : 'md:ml-56'} ml-0`}>
        <AppRoutes onRequireAuth={openAuth} />
      </main>
    </div>
  );
}
