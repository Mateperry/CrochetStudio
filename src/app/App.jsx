import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import ScrollToTop from "../components/layout/ScrollToTop";
import AuthModal from "../features/auth/AuthModal";
import AppRoutes from "./routes";

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const openAuth = useCallback(() => setShowAuthModal(true), []);
  const openCart = useCallback(() => navigate("/carrito"), [navigate]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <ScrollToTop />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <Navigation onOpenAuth={openAuth} onOpenCart={openCart} />

      {/* Top padding clears the fixed top bar; bottom padding clears the mobile tab bar. */}
      <main
        id="contenido"
        className="mx-auto max-w-6xl px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-24 md:px-6 md:pb-16 md:pt-28"
      >
        <AppRoutes onRequireAuth={openAuth} />
      </main>
    </div>
  );
}
