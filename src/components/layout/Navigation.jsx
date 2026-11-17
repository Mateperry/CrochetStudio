import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, LayoutGridIcon, LogOutIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
import CategoriesMenu from './CategoriesMenu';
import AccountMenu from './AccountMenu';
import CartButton from './CartButton';
import { CATEGORIES } from '../../constants/categories';
import { useAuth } from '../../features/auth/useAuth';
import { cn } from '../../lib/cn';

const desktopLinkClass = ({ isActive }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-muted',
    isActive ? 'text-accent' : 'text-ink',
  );

function Brand() {
  return (
    <Link to="/" className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
      Crochet Studio
    </Link>
  );
}

function BottomBarItem({ icon: Icon, label, active, ...props }) {
  const Component = props.to ? Link : 'button';
  return (
    <Component
      {...(props.to ? {} : { type: 'button' })}
      {...props}
      aria-current={props.to && active ? 'page' : undefined}
      className={cn(
        'flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium transition-colors',
        active ? 'text-accent' : 'text-ink',
      )}
    >
      <Icon size={22} aria-hidden="true" />
      {label}
    </Component>
  );
}

/**
 * Navigation — glass top bar on desktop; thin top bar + bottom tab bar on mobile.
 * The mobile "Categorías" and "Cuenta" tabs open bottom sheets.
 */
export default function Navigation({ onOpenAuth, onOpenCart }) {
  const { pathname } = useLocation();
  const { user, userProfile, isAdmin, signOut } = useAuth();
  const [sheet, setSheet] = useState(null); // 'categories' | 'account' | null
  const closeSheet = () => setSheet(null);

  return (
    <>
      {/* Top bar (desktop and mobile) */}
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6">
        <GlassPanel className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:h-16">
          <Brand />

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            <NavLink to="/" end className={desktopLinkClass}>
              Inicio
            </NavLink>
            <CategoriesMenu />
            <NavLink to="/contacto" className={desktopLinkClass}>
              Contacto
            </NavLink>
          </nav>

          <div className="flex items-center gap-1">
            <CartButton onClick={onOpenCart} />
            <ThemeToggle className="hidden md:inline-flex" />
            <div className="hidden md:block">
              <AccountMenu onOpenAuth={onOpenAuth} />
            </div>
          </div>
        </GlassPanel>
      </header>

      {/* Bottom tab bar (mobile) */}
      <nav
        aria-label="Navegación móvil"
        className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <GlassPanel className="flex items-center justify-around px-2">
          <BottomBarItem to="/" icon={HomeIcon} label="Inicio" active={pathname === '/'} />
          <BottomBarItem
            icon={LayoutGridIcon}
            label="Categorías"
            active={pathname.startsWith('/categoria/')}
            onClick={() => setSheet('categories')}
            aria-expanded={sheet === 'categories'}
          />
          <CartButton onClick={onOpenCart} showLabel className="flex-1" />
          <BottomBarItem
            icon={UserIcon}
            label="Cuenta"
            active={pathname.startsWith('/admin')}
            onClick={() => (user ? setSheet('account') : onOpenAuth())}
            aria-expanded={user ? sheet === 'account' : undefined}
          />
        </GlassPanel>
      </nav>

      <Modal isOpen={sheet === 'categories'} onClose={closeSheet} title="Categorías" placement="bottom">
        <ul className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                to={category.path}
                onClick={closeSheet}
                aria-current={pathname === category.path ? 'page' : undefined}
                className={cn(
                  'block rounded-md border border-line bg-surface px-4 py-3 text-sm font-medium',
                  pathname === category.path && 'border-accent text-accent',
                )}
              >
                {category.title}
              </Link>
            </li>
          ))}
          <li className="col-span-2">
            <Link
              to="/contacto"
              onClick={closeSheet}
              className="flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-3 text-sm font-medium"
            >
              <MailIcon size={16} aria-hidden="true" />
              Contacto
            </Link>
          </li>
        </ul>
      </Modal>

      <Modal
        isOpen={sheet === 'account' && Boolean(user)}
        onClose={closeSheet}
        title={userProfile?.display_name || user?.email || 'Cuenta'}
        description={user?.email}
        placement="bottom"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-md border border-line bg-surface px-4 py-2 text-sm">
            <span>Tema</span>
            <ThemeToggle />
          </div>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={closeSheet}
              className="flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-3 text-sm font-medium"
            >
              <SettingsIcon size={16} aria-hidden="true" />
              Panel admin
            </Link>
          )}
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              closeSheet();
              signOut();
            }}
          >
            <LogOutIcon size={16} aria-hidden="true" />
            Cerrar sesión
          </Button>
        </div>
      </Modal>
    </>
  );
}
