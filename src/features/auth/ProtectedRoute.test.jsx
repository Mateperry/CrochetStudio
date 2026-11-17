import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './useAuth';

vi.mock('./useAuth', () => ({ useAuth: vi.fn() }));

function renderAdminRoute(onRequireAuth = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/" element={<p>Inicio</p>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute onRequireAuth={onRequireAuth}>
              <p>Panel secreto</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
  return onRequireAuth;
}

describe('ProtectedRoute', () => {
  beforeEach(() => vi.mocked(useAuth).mockReset());

  it('mientras carga muestra el estado de verificación', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isAdmin: false, isLoading: true });
    const onRequireAuth = renderAdminRoute();
    expect(screen.getByText('Verificando acceso...')).toBeInTheDocument();
    expect(onRequireAuth).not.toHaveBeenCalled();
  });

  it('sin sesión pide login y redirige al inicio', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isAdmin: false, isLoading: false });
    const onRequireAuth = renderAdminRoute();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.queryByText('Panel secreto')).not.toBeInTheDocument();
    expect(onRequireAuth).toHaveBeenCalled();
  });

  it('con sesión sin rol admin muestra acceso restringido', () => {
    vi.mocked(useAuth).mockReturnValue({ user: { id: 'u1' }, isAdmin: false, isLoading: false });
    renderAdminRoute();
    expect(screen.getByRole('heading', { name: 'Acceso restringido' })).toBeInTheDocument();
    expect(screen.queryByText('Panel secreto')).not.toBeInTheDocument();
  });

  it('con admin muestra el contenido', () => {
    vi.mocked(useAuth).mockReturnValue({ user: { id: 'u1' }, isAdmin: true, isLoading: false });
    const onRequireAuth = renderAdminRoute();
    expect(screen.getByText('Panel secreto')).toBeInTheDocument();
    expect(onRequireAuth).not.toHaveBeenCalled();
  });
});
