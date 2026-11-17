import { forwardRef } from 'react';
import Field from './Field';
import { controlClasses } from './classes';

const Input = forwardRef(function Input({ id, label, hint, error, required, className, fieldClassName, ...props }, ref) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={fieldClassName}>
      <input ref={ref} className={controlClasses(Boolean(error), className)} {...props} />
    </Field>
  );
});

export default Input;
