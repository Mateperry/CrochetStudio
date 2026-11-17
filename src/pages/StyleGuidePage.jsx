import { useEffect, useState } from 'react';
import { HeartIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Modal from '../components/ui/Modal';
import GlassPanel from '../components/ui/GlassPanel';
import Skeleton from '../components/ui/Skeleton';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useToast } from '../components/ui/Toast/useToast';
import { useProducts } from '../features/catalog/hooks/useProducts';
import { contrastRatio, parseRgbChannels } from '../lib/contrast';

const SWATCHES = [
  { token: 'bg', label: 'Fondo', className: 'bg-bg' },
  { token: 'surface', label: 'Superficie', className: 'bg-surface' },
  { token: 'surface-muted', label: 'Superficie secundaria', className: 'bg-surface-muted' },
  { token: 'ink', label: 'Texto', className: 'bg-ink' },
  { token: 'ink-muted', label: 'Texto secundario', className: 'bg-ink-muted' },
  { token: 'line', label: 'Bordes', className: 'bg-line' },
  { token: 'accent', label: 'Acento', className: 'bg-accent' },
  { token: 'accent-soft', label: 'Acento suave', className: 'bg-accent-soft' },
  { token: 'sage', label: 'Salvia', className: 'bg-sage' },
  { token: 'success', label: 'Éxito', className: 'bg-success' },
];

const CONTRAST_PAIRS = [
  { label: 'Texto sobre fondo', fg: 'ink', bg: 'bg' },
  { label: 'Texto secundario sobre fondo', fg: 'ink-muted', bg: 'bg' },
  { label: 'Texto secundario sobre superficie secundaria', fg: 'ink-muted', bg: 'surface-muted' },
  { label: 'Texto de botón sobre acento', fg: 'on-accent', bg: 'accent' },
  { label: 'Acento sobre fondo (enlaces)', fg: 'accent', bg: 'bg' },
  { label: 'Éxito sobre superficie', fg: 'success', bg: 'surface' },
];

function readToken(name) {
  return parseRgbChannels(getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`));
}

/** Recomputes ratios whenever the theme attribute or system scheme changes. */
function useContrastRows() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const compute = () =>
      setRows(
        CONTRAST_PAIRS.map((pair) => {
          const fg = readToken(pair.fg);
          const bg = readToken(pair.bg);
          return { ...pair, ratio: fg && bg ? contrastRatio(fg, bg) : null };
        }),
      );
    compute();
    const observer = new MutationObserver(compute);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', compute);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', compute);
    };
  }, []);

  return rows;
}

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const toast = useToast();
  const rows = useContrastRows();
  const { data: products, isPending } = useProducts();

  return (
    <div className="relative mx-auto max-w-6xl space-y-12 px-4 pb-24">
      <GlassPanel as="header" className="sticky top-4 z-20 flex items-center justify-between px-5 py-3">
        <span className="font-display text-lg font-semibold">Crochet Studio · Guía de estilo</span>
        <ThemeToggle />
      </GlassPanel>

      <Section title="Colores">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SWATCHES.map((swatch) => (
            <div key={swatch.token} className="space-y-2">
              <div className={`h-16 rounded-md border border-line ${swatch.className}`} />
              <p className="text-sm font-medium">{swatch.label}</p>
              <p className="text-xs text-ink-muted">--color-{swatch.token}</p>
            </div>
          ))}
        </div>

        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Contraste de las combinaciones de color del tema actual</caption>
            <thead className="bg-surface-muted text-ink-muted">
              <tr>
                <th className="px-4 py-2 font-medium">Combinación</th>
                <th className="px-4 py-2 font-medium">Contraste</th>
                <th className="px-4 py-2 font-medium">AA (4,5:1)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2 tabular-nums">{row.ratio ? `${row.ratio.toFixed(2).replace('.', ',')}:1` : '—'}</td>
                  <td className="px-4 py-2">
                    {row.ratio == null ? '—' : row.ratio >= 4.5 ? <Badge variant="success">Cumple</Badge> : <Badge variant="accent">No cumple</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section title="Tipografía">
        <div className="space-y-3">
          <p className="font-display text-5xl font-bold">Fraunces 48 · Título</p>
          <p className="font-display text-3xl font-semibold">Fraunces 30 · Sección</p>
          <p className="font-display text-xl font-semibold">Fraunces 20 · Tarjeta</p>
          <p className="text-base">Inter 16 · Texto de párrafo para descripciones y formularios.</p>
          <p className="text-sm text-ink-muted">Inter 14 · Texto secundario y ayudas.</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Inter 12 · Etiquetas</p>
        </div>
      </Section>

      <Section title="Botones y badges">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="danger">Eliminar</Button>
          <Button size="sm">Pequeño</Button>
          <Button loading loadingText="Guardando...">Guardar</Button>
          <Button variant="secondary" size="icon" aria-label="Me gusta">
            <HeartIcon size={18} aria-hidden="true" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Neutral</Badge>
          <Badge variant="accent">Anime</Badge>
          <Badge variant="success">-15%</Badge>
        </div>
      </Section>

      <Section title="Formularios">
        <Card className="grid gap-4 p-5 sm:grid-cols-2">
          <Input label="Nombre" placeholder="Tu nombre completo" required />
          <Input label="Correo" type="email" placeholder="correo@ejemplo.com" error="El formato del correo no es válido." />
          <Select label="Dificultad" hint="Opcional">
            <option>Fácil</option>
            <option>Media</option>
          </Select>
          <Textarea label="Mensaje" placeholder="Cuéntanos lo que necesitas..." rows={3} />
        </Card>
      </Section>

      <Section title="Capas flotantes">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Abrir modal</Button>
          <Button variant="secondary" onClick={() => toast.success('Producto agregado al carrito.')}>
            Mostrar aviso
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Pokémon', 'Naruto', 'Disney'].map((chip, index) => (
            <button
              key={chip}
              type="button"
              aria-pressed={index === 0}
              className={`glass rounded-full px-4 py-1.5 text-sm ${index === 0 ? 'ring-2 ring-accent' : ''}`}
            >
              {chip}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Productos reales bajo vidrio">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {isPending
            ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="aspect-[4/5]" />)
            : (products ?? []).slice(0, 6).map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <img
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="truncate font-medium">{product.nombre}</p>
                    <p className="text-sm text-ink-muted">${product.precio.toLocaleString('es-CO')}</p>
                  </div>
                </Card>
              ))}
        </div>
      </Section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal de ejemplo"
        description="Se cierra con Escape, con clic fuera o con el botón."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setModalOpen(false)}>Aceptar</Button>
          </div>
        }
      >
        <Input label="Campo dentro del modal" placeholder="El foco queda atrapado aquí" />
      </Modal>
    </div>
  );
}
