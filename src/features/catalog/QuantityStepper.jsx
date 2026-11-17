import { MinusIcon, PlusIcon } from 'lucide-react';
import { MAX_QUANTITY, MIN_QUANTITY } from '../cart/cartReducer';
import { cn } from '../../lib/cn';

/**
 * − / + quantity control limited to 1..10.
 */
export default function QuantityStepper({ value, onChange, label = 'Cantidad', size = 'md', className }) {
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';
  const buttonClass = cn(
    'inline-flex items-center justify-center rounded-md text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40',
    buttonSize,
  );

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex items-center rounded-md border border-line bg-surface-muted', className)}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(value - 1)}
        disabled={value <= MIN_QUANTITY}
        aria-label="Quitar una unidad"
      >
        <MinusIcon size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite" className={cn('min-w-8 text-center font-medium tabular-nums', size === 'sm' ? 'text-sm' : '')}>
        {value}
      </output>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label="Agregar una unidad"
      >
        <PlusIcon size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
