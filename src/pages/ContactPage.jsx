import { useState } from 'react';

const ContactPage = () => {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwdewja';
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setStatus({ type: 'sending', message: '' });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus({ type: 'success', message: '¡Mensaje enviado con éxito! Te responderemos pronto.' });
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus({
          type: 'error',
          message: data.errors
            ? data.errors.map((err) => err.message).join(', ')
            : 'Ocurrió un error inesperado.',
        });
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      setStatus({ type: 'error', message: 'No se pudo enviar el mensaje. Inténtalo más tarde.' });
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-[#272321]">
      <h2 className="text-3xl font-bold text-center mb-4">Contáctanos</h2>
      <p className="text-center text-sm sm:text-base mb-8">
        ¿Tienes preguntas, ideas o necesitas un diseño personalizado? 💬 ¡Escríbenos!
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#272321]">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Tu nombre completo"
            className="mt-1 block w-full px-3 py-2 border border-[#d6cfc7] bg-[#f9f7f6] text-[#272321] rounded-md shadow-sm focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#272321]">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="correo@ejemplo.com"
            className="mt-1 block w-full px-3 py-2 border border-[#d6cfc7] bg-[#f9f7f6] text-[#272321] rounded-md shadow-sm focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#272321]">
            Mensaje:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Cuéntanos lo que necesitas..."
            className="mt-1 block w-full px-3 py-2 border border-[#d6cfc7] bg-[#f9f7f6] text-[#272321] rounded-md shadow-sm focus:ring-pink-400 focus:border-pink-400 sm:text-sm"
          ></textarea>
        </div>

        {status.message && (
          <p
            role={status.type === 'error' ? 'alert' : 'status'}
            className={status.type === 'error' ? 'text-sm text-red-700' : 'text-sm text-green-700'}
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={status.type === 'sending'}
          className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-300 text-[#272321] text-sm font-medium rounded-md shadow transition disabled:opacity-60"
        >
          {status.type === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>También puedes escribirnos a:</p>
        <p>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:castromateo2004@gmail.com"
            className="text-yellow-200 hover:underline"
          >
            castromateo2004@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default ContactPage;
