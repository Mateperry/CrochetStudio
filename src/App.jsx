import { useState, useEffect } from "react";
import Sidebar from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../src/Components/ScrollToTop";
import Inicio from "./Secction/Inicio";
import DetalleProducto from "./Secction/DetallesDelProducto";
import Novedades from "./Secction/Novedades";
import Anime from "./Secction/Animes";
import Películas from "./Secction/Peliculas";
import Series from "./Secction/Series";
import Fantasia from "./Secction/Fantasia";
import Animales from "./Secction/Animales";
import Personalizados from "./Secction/Personalizados";
import Ofertas from "./Secction/Oferta";
import Carrito from "./Secction/Carrito";
import Checkout from "./Secction/Checkout";
import ContactUsModal from "./Secction/Contact";
import AdminDashboard from "./Secction/Admin/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthModal from "./Components/AuthModal";
import { useProducts } from "./hooks/useProducts";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: productos, isLoading, error } = useProducts();

  const [carrito, setCarrito] = useState(() => {
    // ✅ Recuperar del localStorage al inicio
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const agregarAlCarrito = (productoNuevo) => {
    setCarrito((prev) => {
      const index = prev.findIndex((p) => p.id === productoNuevo.id);
      if (index !== -1) {
        alert("⚠️ El producto ya está en el carrito.");
        return prev;
      }

      // Forzar cantidad mínima de 1
      const cantidadValida = productoNuevo.cantidad && productoNuevo.cantidad >= 1 && productoNuevo.cantidad <= 10
        ? productoNuevo.cantidad
        : 1;

      const nuevoProducto = {
        ...productoNuevo,
        cantidad: cantidadValida,
      };

      alert("🧸 Producto agregado al carrito.");
      return [...prev, nuevoProducto];
    });
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // ✅ Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

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
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
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
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        totalCarrito={carrito.length}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      <main className={`transition-all duration-300 p-4 ${collapsed ? 'md:ml-16' : 'md:ml-56'} ml-0`}>
        <Routes>
          <Route path="/" element={<Inicio productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/novedades" element={<Novedades productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/animes" element={<Anime productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/peliculas" element={<Películas productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/series" element={<Series productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/fantasia" element={<Fantasia productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/animales" element={<Animales productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/personalizados" element={<Personalizados productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/ofertas" element={<Ofertas productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/contacto" element={<ContactUsModal productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute onRequireAuth={() => setShowAuthModal(true)}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
