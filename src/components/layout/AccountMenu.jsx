import { useCallback, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import Button from '../ui/Button';
import { useAuth } from '../../features/auth/useAuth';
import { useDismiss } from '../../lib/useDismiss';

/**
 * Account entry in the desktop bar: "Iniciar sesión" button, or a menu with the user's name,
 * "Panel admin" (admins only) and "Cerrar sesión".
 */
export default function AccountMenu({ onOpenAuth }) {
  const { user, userProfile, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const menuId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(containerRef, open, close);

  if (!user) {
    return (
      <Button variant="secondary" size="sm" onClick={onOpenAuth}>
        Iniciar sesión
      </Button>
    );
  }

  const name = userProfile?.display_name || user.email;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Cuenta de ${name}`}
        className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-surface-muted"
      >
        {userProfile?.avatar_url ? (
          <img src={userProfile.avatar_url} alt="" className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <UserIcon size={20} aria-hidden="true" />
        )}
        <span className="hidden max-w-[10rem] truncate lg:inline">{name}</span>
      </button>

      {open && (
        <GlassPanel id={menuId} className="absolute right-0 top-full mt-2 w-56 p-2">
          <p className="truncate px-3 py-2 text-xs text-ink-muted">{user.email}</p>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={close}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-surface-muted"
            >
              <SettingsIcon size={16} aria-hidden="true" />
              Panel admin
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              close();
              signOut();
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-surface-muted"
          >
            <LogOutIcon size={16} aria-hidden="true" />
            Cerrar sesión
          </button>
        </GlassPanel>
      )}
    </div>
  );
}
