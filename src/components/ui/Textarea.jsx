import { forwardRef } from 'react';
import Field from './Field';
import { controlClasses } from './classes';
import { cn } from '../../lib/cn';

const Textarea = forwardRef(function Textarea(
  { id, label, hint, error, required, className, fieldClassName, rows = 4, ...props },
  ref,
) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={fieldClassName}>
      <textarea ref={ref} rows={rows} className={controlClasses(Boolean(error), cn('resize-y', className))} {...props} />
    </Field>
  );
});

export default Textarea;
