import { forwardRef } from 'react';
import { buttonClasses } from './classes';

function Spinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

/**
 * Button — variants primary / secondary / ghost / danger, sizes sm / md / icon.
 * `loading` disables the button, shows a spinner and announces the busy state.
 */
const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', loading = false, loadingText, disabled, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {loading && <Spinner />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
});

export default Button;
