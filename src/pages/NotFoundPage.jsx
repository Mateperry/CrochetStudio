import { Link } from "react-router-dom";

export default function NotFoundPage({ title = "Página no encontrada", message = "La página que buscas no existe o fue movida." }) {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center text-[#272321]">
      <p className="text-6xl font-bold mb-4">404</p>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="mb-6">{message}</p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#71675d] text-white rounded-full hover:bg-[#5a5148] transition-colors"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
