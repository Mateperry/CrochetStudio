import { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { applyTheme, getSystemTheme, readStoredTheme } from '../../lib/theme';
import { cn } from '../../lib/cn';

/**
 * ThemeToggle — switches between light and dark and remembers the choice.
 * Without a saved choice it follows the system preference.
 */
export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(() => readStoredTheme() ?? getSystemTheme());
  const isDark = theme === 'dark';

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-muted',
        className,
      )}
    >
      {isDark ? <SunIcon size={20} aria-hidden="true" /> : <MoonIcon size={20} aria-hidden="true" />}
    </button>
  );
}
