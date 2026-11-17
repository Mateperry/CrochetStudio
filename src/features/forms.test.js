import { describe, expect, it } from 'vitest';
import { formValuesToProductData, validateProductForm, EMPTY_PRODUCT_FORM } from './admin/productFormModel';
import { normalizePhone, toOrderPayload, validateCheckoutForm } from './checkout/validateCheckoutForm';
import { toProductPayload } from './admin/hooks/useAdminProducts';

const validProduct = {
  ...EMPTY_PRODUCT_FORM,
  nombre: 'Pikachu',
  descripcion: 'Pikachu tejido a mano',
  precio: '42000',
  categories: [1],
  images: ['https://ejemplo.supabase.co/img.webp', ''],
};

describe('validateProductForm', () => {
  it('acepta un producto válido', () => {
    expect(validateProductForm(validProduct)).toEqual({});
  });

  it('exige nombre, descripción, precio, categoría e imagen', () => {
    const errors = validateProductForm(EMPTY_PRODUCT_FORM);
    expect(Object.keys(errors).sort()).toEqual(['categories', 'descripcion', 'images', 'nombre', 'precio']);
  });

  it('el precio promocional debe ser menor al precio', () => {
    expect(validateProductForm({ ...validProduct, precioPromocional: '42000' }).precioPromocional).toMatch(/menor/);
    expect(validateProductForm({ ...validProduct, precioPromocional: '39000' })).toEqual({});
  });

  it('rechaza URLs de imagen inválidas', () => {
    expect(validateProductForm({ ...validProduct, images: ['no-es-url'] }).images).toMatch(/no es válida/);
  });

  it('formValuesToProductData descarta URLs vacías y convierte números', () => {
    const data = formValuesToProductData(validProduct, 7);
    expect(data).toMatchObject({ id: 7, precio: 42000, precioPromocional: null, images: ['https://ejemplo.supabase.co/img.webp'] });
  });

  it('toProductPayload usa los nombres de columnas de la base', () => {
    const payload = toProductPayload(formValuesToProductData(validProduct));
    expect(payload).toMatchObject({ nombre: 'Pikachu', precio_promocional: null, categorias: [1], imagenes: ['https://ejemplo.supabase.co/img.webp'] });
    expect(payload).not.toHaveProperty('id');
  });
});

describe('validateCheckoutForm', () => {
  const valid = {
    customerName: 'Ana Pérez',
    email: 'ana@correo.com',
    phone: '300 123 4567',
    city: 'Bogotá',
    address: 'Calle 10 # 20-30',
    notes: '',
  };

  it('acepta datos válidos (teléfono con espacios)', () => {
    expect(validateCheckoutForm(valid)).toEqual({});
  });

  it('exige teléfono de 10 dígitos', () => {
    expect(validateCheckoutForm({ ...valid, phone: '12345' }).phone).toMatch(/10 dígitos/);
    expect(normalizePhone('(300) 123-4567')).toBe('3001234567');
  });

  it('marca los campos vacíos', () => {
    const errors = validateCheckoutForm({ customerName: '', email: 'x', phone: '', city: '', address: '', notes: '' });
    expect(Object.keys(errors).sort()).toEqual(['address', 'city', 'customerName', 'email', 'phone']);
  });

  it('el payload del pedido no lleva precios', () => {
    const payload = toOrderPayload(valid, [{ productId: 1, quantity: 2, unitPrice: 1 }]);
    expect(payload.items).toEqual([{ product_id: 1, quantity: 2 }]);
    expect(payload.phone).toBe('3001234567');
    expect(JSON.stringify(payload)).not.toMatch(/price|precio/);
  });
});
