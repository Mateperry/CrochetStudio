import React from "react";
import { Link, useLocation } from "react-router-dom";
import TarjetasInicio from "./TarjetasInicio";

// Mapeo completo de títulos a rutas
const rutaPorTitulo = {
  "Novedades": "/novedades",
  "Ofertas": "/ofertas",
  "Animes": "/animes",
  "Películas": "/peliculas",
  "Series": "/series",
  "Fantasia": "/fantasia",
  "Animales": "/animales",
  "Personalizados": "/personalizados"
};

const SeccionProductos = ({
  titulo,
  productos,
  agregarAlCarrito,
  mostrarVerMas = true
}) => {
  if (productos.length === 0) return null;

  const location = useLocation();
  const ruta = rutaPorTitulo[titulo] || "/";

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#272321] border-b-2 border-yellow-400 inline-block">
          {titulo}
        </h2>

        {/* Botón "Ver más" solo si está habilitado y no estamos ya en esa ruta */}
        {mostrarVerMas && location.pathname !== ruta && (
          <Link
            to={ruta}
            className="text-sm bg-yellow-400 text-[#272321] px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Ver más
          </Link>
        )}
      </div>

      <TarjetasInicio
        productos={productos}
        agregarAlCarrito={agregarAlCarrito}
      />
    </section>
  );
};

export default SeccionProductos;
