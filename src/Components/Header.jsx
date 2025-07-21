import {
  HomeIcon, StarIcon, FilmIcon, TvIcon, GhostIcon,
  PawPrintIcon, SparklesIcon, TagIcon, ShoppingCartIcon,
  UserIcon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const menuItems = [
  { label: "Inicio", icon: <HomeIcon />, link: "/" },
  { label: "Novedades", icon: <StarIcon />, link: "/novedades" },
  { label: "Animes", icon: <TvIcon />, link: "/animes" },
  { label: "Películas", icon: <FilmIcon />, link: "/peliculas" },
  { label: "Series", icon: <TvIcon />, link: "/series" },
  { label: "Fantasía", icon: <GhostIcon />, link: "/fantasia" },
  { label: "Animales", icon: <PawPrintIcon />, link: "/animales" },
  { label: "Personalizados", icon: <SparklesIcon />, link: "/personalizados" },
  { label: "Ofertas", icon: <TagIcon />, link: "/ofertas" },
  { label: "Contacto", icon: <UserIcon />, link: "/contacto" },
];

export default function Sidebar({ collapsed, setCollapsed, totalCarrito = 0 }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    // Cerrarlo por defecto si es móvil
    if (mobile) {
      setCollapsed(true);
    }

    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  useEffect(() => {
    let scrollY = 0;
    if (isMobile && !collapsed) {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (top) window.scrollTo(0, -parseInt(top));
    };
  }, [isMobile, collapsed]);

  const handleItemClick = () => {
    if (isMobile) setCollapsed(true);
  };

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {(!isMobile || !collapsed) && (
        <aside
          className={`
            bg-[#aba599] shadow-md p-3 flex flex-col transition-all duration-300
            ${collapsed ? 'w-16' : 'w-56'}
            h-screen
            ${isMobile ? 'fixed top-0 left-0 z-50' : 'fixed top-0 left-0 z-10'}
          `}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2 px-2 py-2 mb-4 rounded-md hover:bg-[#71675d] transition-colors"
          >
            <div className="flex flex-col justify-center items-start gap-[5px]">
              <span className="block w-6 h-[3px] bg-[#272321] rounded"></span>
              <span className="block w-6 h-[3px] bg-[#272321] rounded"></span>
              <span className="block w-6 h-[3px] bg-[#272321] rounded"></span>
            </div>
            {!collapsed && <span className="text-sm text-[#272321]">Menú</span>}
          </button>

          <nav className="flex flex-col gap-2 flex-grow">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={handleItemClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-[#71675d] text-white'
                      : 'hover:bg-[#71675d] text-[#272321]'
                  }`
                }
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#71675d]">
            <NavLink
              to="/carrito"
              onClick={handleItemClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-[#71675d] text-white'
                    : 'hover:bg-[#71675d] text-[#272321]'
                }`
              }
            >
              <div className="relative">
                <ShoppingCartIcon />
                {totalCarrito > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCarrito}
                  </span>
                )}
              </div>
              {!collapsed && <span>Carrito</span>}
            </NavLink>
          </div>
        </aside>
      )}

      {isMobile && collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-50 bg-[#aba599] p-2 rounded-md shadow-md hover:bg-[#71675d] transition-colors"
        >
          <div className="flex flex-col justify-center items-start gap-[5px]">
            <span className="block w-6 h-[3px] bg-[#272321] rounded"></span>
            <span className="block w-6 h-[3px] bg-[#272321] rounded"></span>
            <span className="block w-6 h-[3px] bg-[#272321] rounded"></span>
          </div>
        </button>
      )}
    </>
  );
}
