import { forwardRef } from 'react';
import Field from './Field';
import { controlClasses } from './classes';

const Select = forwardRef(function Select(
  { id, label, hint, error, required, className, fieldClassName, children, ...props },
  ref,
) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={fieldClassName}>
      <select ref={ref} className={controlClasses(Boolean(error), className)} {...props}>
        {children}
      </select>
    </Field>
  );
});

export default Select;
