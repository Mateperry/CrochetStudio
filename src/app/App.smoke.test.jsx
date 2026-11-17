import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import AppProviders from './providers';

const PRODUCTS = [
  {
    id: 1,
    nombre: 'Pikachu Amigurumi',
    precio: 42000,
    precio_promocional: null,
    descripcion: 'Pikachu tejido a mano de 20 cm.',
    personaje: 'Pikachu',
    tipo_lana: 'Algodón',
    aguja: '2.0 mm',
    dificultad: 'Media',
    tamano: '20 cm',
    tiempo_estimado: '6 horas',
    detalles: null,
    imagenes: ['https://ejemplo.supabase.co/pikachu.webp'],
    categorias: ['Anime', 'Pokémon', 'Novedades'],
  },
  {
    id: 2,
    nombre: 'Woody',
    precio: 50000,
    precio_promocional: 45000,
    descripcion: 'Woody de Toy Story.',
    imagenes: [],
    categorias: ['Películas', 'Toy Story'],
  },
];

// Minimal fake of the Supabase client used by the app.
vi.mock('../lib/supabase', () => {
  const query = {
    select: () => query,
    order: () => Promise.resolve({ data: PRODUCTS, error: null }),
  };
  return {
    isSupabaseConfigured: true,
    supabase: {
      from: () => query,
      rpc: vi.fn(() => Promise.resolve({ data: 99, error: null })),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: () => Promise.resolve({ error: null }),
      },
    },
  };
});

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(
    <AppProviders>
      <App />
    </AppProviders>,
  );
}

describe('App (prueba de humo)', () => {
  it('inicio muestra Películas (con tilde) y el producto', async () => {
    renderAt('/');
    expect(await screen.findByRole('heading', { name: 'Películas' })).toBeInTheDocument();
    expect(screen.getAllByText('Pikachu Amigurumi').length).toBeGreaterThan(0);
  });

  it('una categoría muestra su título y contador', async () => {
    renderAt('/categoria/anime');
    expect(await screen.findByRole('heading', { level: 1, name: 'Anime' })).toBeInTheDocument();
    expect(await screen.findByText('1 producto')).toBeInTheDocument();
  });

  it('las rutas viejas redirigen a /categoria/<slug>', async () => {
    renderAt('/peliculas');
    expect(await screen.findByRole('heading', { level: 1, name: 'Películas' })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/categoria/peliculas');
  });

  it('slug desconocido y ruta inexistente muestran 404', async () => {
    renderAt('/categoria/nada');
    expect(await screen.findByRole('heading', { name: 'Categoría no encontrada' })).toBeInTheDocument();
  });

  it('el detalle agrega al carrito y abre el panel', async () => {
    const user = userEvent.setup();
    renderAt('/producto/1');
    expect(await screen.findByRole('heading', { level: 1, name: 'Pikachu Amigurumi' })).toBeInTheDocument();
    expect(screen.getByText('Ficha técnica')).toBeInTheDocument();
    // "Detalles" is empty for this product and must be hidden.
    expect(screen.queryByText('Detalles')).not.toBeInTheDocument();

    const [addButton] = screen.getAllByRole('button', { name: 'Agregar al carrito' });
    await user.click(addButton);

    const drawer = await screen.findByRole('dialog', { name: 'Tu carrito' });
    expect(within(drawer).getByText('Pikachu Amigurumi')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('crochet-cart:v1')).items).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it('id no numérico en el detalle muestra 404', async () => {
    renderAt('/producto/abc');
    expect(await screen.findByRole('heading', { name: 'Producto no encontrado' })).toBeInTheDocument();
  });

  it('checkout con carrito vacío redirige al carrito', async () => {
    renderAt('/checkout');
    expect(await screen.findByRole('heading', { name: 'Tu carrito está vacío' })).toBeInTheDocument();
  });

  it('contacto valida antes de enviar', async () => {
    const user = userEvent.setup();
    renderAt('/contacto');
    await user.click(await screen.findByRole('button', { name: 'Enviar mensaje' }));
    expect(screen.getByText('Escribe tu nombre.')).toBeInTheDocument();
    expect(screen.getByText('Escribe tu correo electrónico.')).toBeInTheDocument();
  });

  it('checkout crea el pedido con solo ids y cantidades', async () => {
    const user = userEvent.setup();
    const { supabase } = await import('../lib/supabase');
    localStorage.setItem('crochet-cart:v1', JSON.stringify({ version: 1, items: [{ productId: 2, quantity: 2 }] }));
    renderAt('/checkout');

    await user.type(await screen.findByLabelText(/Nombre completo/), 'Ana Pérez');
    await user.type(screen.getByLabelText(/Correo electrónico/), 'ana@correo.com');
    await user.type(screen.getByLabelText(/Teléfono/), '3001234567');
    await user.type(screen.getByLabelText(/Ciudad/), 'Bogotá');
    await user.type(screen.getByLabelText(/Dirección/), 'Calle 10 # 20-30');
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }));

    expect(await screen.findByRole('heading', { name: '¡Pedido recibido!' })).toBeInTheDocument();
    expect(supabase.rpc).toHaveBeenCalledWith('create_order', {
      payload: expect.objectContaining({ items: [{ product_id: 2, quantity: 2 }], phone: '3001234567' }),
    });
    await waitFor(() => expect(JSON.parse(localStorage.getItem('crochet-cart:v1')).items).toEqual([]));
  });
});
