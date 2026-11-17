import { describe, expect, it } from 'vitest';
import { formatPrice } from './formatPrice';
import { getDiscountPercent, getUnitPrice } from './pricing';
import { contrastRatio } from './contrast';

// Intl may use a non-breaking space between the symbol and the number.
const normalize = (text) => text.replace(/\s/g, ' ');

describe('formatPrice', () => {
  it('formatea pesos colombianos sin decimales', () => {
    expect(normalize(formatPrice(42000))).toBe('$ 42.000');
    expect(normalize(formatPrice(1234567))).toBe('$ 1.234.567');
  });

  it('redondea decimales', () => {
    expect(normalize(formatPrice(39999.6))).toBe('$ 40.000');
  });

  it('valores inválidos se muestran como $ 0', () => {
    expect(normalize(formatPrice(undefined))).toBe('$ 0');
    expect(normalize(formatPrice('abc'))).toBe('$ 0');
  });
});

describe('pricing', () => {
  it('usa el precio promocional si existe', () => {
    expect(getUnitPrice({ precio: 50000, precioPromocional: 45000 })).toBe(45000);
    expect(getUnitPrice({ precio: 50000, precioPromocional: null })).toBe(50000);
  });

  it('calcula el porcentaje de descuento', () => {
    expect(getDiscountPercent({ precio: 50000, precioPromocional: 45000 })).toBe(10);
    expect(getDiscountPercent({ precio: 50000, precioPromocional: null })).toBeNull();
  });
});

describe('paleta', () => {
  it('texto, texto secundario y botón cumplen 4,5:1 en modo claro', () => {
    const bg = [250, 247, 242];
    expect(contrastRatio([42, 36, 32], bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio([107, 98, 90], bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio([255, 255, 255], [176, 74, 51])).toBeGreaterThanOrEqual(4.5);
  });

  it('texto y botón cumplen 4,5:1 en modo oscuro', () => {
    const bg = [23, 20, 18];
    expect(contrastRatio([243, 237, 230], bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio([184, 174, 164], bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio([23, 20, 18], [224, 122, 95])).toBeGreaterThanOrEqual(4.5);
  });
});
