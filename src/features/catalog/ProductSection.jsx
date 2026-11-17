import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

/**
 * Home section for one category: title + "Ver todo" link.
 * Mobile: horizontal carousel with scroll-snap (cards at ~70% width). Desktop: 4-column grid.
 */
export default function ProductSection({ category, products, priorityFirst = false, id }) {
  if (products.length === 0) return null;
  const headingId = `seccion-${category.slug}`;

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28 space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 id={headingId} className="font-display text-2xl font-semibold md:text-3xl">
          {category.title}
        </h2>
        <Link
          to={category.path}
          className="shrink-0 text-sm font-medium text-ink-muted underline-offset-4 hover:text-accent hover:underline"
        >
          Ver todo <span aria-hidden="true">→</span>
          <span className="sr-only"> en {category.title}</span>
        </Link>
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:snap-none md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
        {products.map((product, index) => (
          <li key={product.id} className="flex w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <ProductCard product={product} priority={priorityFirst && index === 0} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
