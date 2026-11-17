import { Link } from 'react-router-dom';
import { buttonClasses } from '../components/ui/classes';

export default function NotFoundPage({
  title = 'Página no encontrada',
  message = 'La página que buscas no existe o fue movida.',
}) {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-ink-muted">{message}</p>
      <Link to="/" className={buttonClasses({ className: 'mt-8' })}>
        Volver al inicio
      </Link>
    </section>
  );
}
