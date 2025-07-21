import React from "react";
import SeccionProductos from "./SeccionProductos";
import LampDemo from "./Lamp";

const Inicio = ({ productos, agregarAlCarrito }) => {
  const secciones = [
    { titulo: "Novedades", categoria: "Novedades" },
    { titulo: "Ofertas", categoria: "Ofertas" },
    { titulo: "Animes", categoria: "Anime" },
    { titulo: "Películas", categoria: "Peliculas" },
    { titulo: "Series", categoria: "Series" },
    { titulo: "Fantasia", categoria: "Fantasia" },
    { titulo: "Animales", categoria: "Animales" },
    { titulo: "Personalizados", categoria: "Personalizados" }
  ];

  return (
    <>
      <LampDemo />
      <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
        {secciones.map(({ titulo, categoria }) => {
          const productosFiltrados = productos
            .filter(producto => producto.categorias.includes(categoria))
            .slice(0, 8); // ⬅️ Limita a 8 productos por sección

          return (
            <SeccionProductos
              key={categoria}
              titulo={titulo}
              productos={productosFiltrados}
              agregarAlCarrito={agregarAlCarrito}
            />
          );
        })}
      </div>
    </>
  );
};

export default Inicio;
