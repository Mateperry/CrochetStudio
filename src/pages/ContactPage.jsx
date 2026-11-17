import { useState } from 'react';
import { CheckCircle2Icon, MessageCircleIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { buttonClasses } from '../components/ui/classes';
import { validateContactForm, MAX_MESSAGE_LENGTH } from '../features/contact/validateContactForm';
import { buildWhatsAppUrl, getWhatsAppNumber } from '../lib/whatsapp';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const CONTACT_EMAIL = 'castromateo2004@gmail.com';
const EMPTY_FORM = { name: '', email: '', message: '' };

export default function ContactPage() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [submitError, setSubmitError] = useState('');
  const whatsappNumber = getWhatsAppNumber();

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'sent') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      setSubmitError(`El formulario no está configurado. Escríbenos directamente a ${CONTACT_EMAIL}.`);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.errors?.map((item) => item.message).join(', ') || 'No se pudo enviar el mensaje.');
      }

      setValues(EMPTY_FORM);
      setStatus('sent');
    } catch (error) {
      console.error('Error al enviar el formulario de contacto:', error);
      setStatus('error');
      // The form keeps what the user wrote so they can retry.
      setSubmitError('No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo.');
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_20rem]">
      <section aria-labelledby="contacto-titulo" className="space-y-6">
        <div>
          <h1 id="contacto-titulo" className="font-display text-3xl font-semibold md:text-4xl">
            Contáctanos
          </h1>
          <p className="mt-2 text-ink-muted">¿Tienes preguntas, ideas o quieres un diseño personalizado? Escríbenos.</p>
        </div>

        <Card className="p-5 md:p-6">
          {status === 'sent' && (
            <div role="status" className="mb-5 flex items-start gap-3 rounded-md bg-success/10 px-4 py-3 text-sm text-success">
              <CheckCircle2Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p>¡Mensaje enviado! Te responderemos pronto a tu correo.</p>
            </div>
          )}
          {status === 'error' && submitError && (
            <p role="alert" className="mb-5 rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">
              {submitError}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Nombre"
              name="name"
              autoComplete="name"
              placeholder="Tu nombre completo"
              value={values.name}
              onChange={handleChange('name')}
              error={errors.name}
              required
            />
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="correo@ejemplo.com"
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              required
            />
            <Textarea
              label="Mensaje"
              name="message"
              rows={5}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Cuéntanos lo que necesitas..."
              value={values.message}
              onChange={handleChange('message')}
              error={errors.message}
              hint={`${values.message.length}/${MAX_MESSAGE_LENGTH} caracteres`}
              required
            />
            <Button type="submit" className="w-full sm:w-auto" loading={status === 'sending'} loadingText="Enviando...">
              Enviar mensaje
            </Button>
          </form>
        </Card>
      </section>

      <aside className="space-y-4 lg:pt-20">
        <Card className="space-y-2 p-5">
          <h2 className="font-display text-lg font-semibold">Otras formas de contacto</h2>
          <p className="text-sm text-ink-muted">Correo</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-sm font-medium text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>
        </Card>
        {whatsappNumber && (
          <a
            href={buildWhatsAppUrl(whatsappNumber, 'Hola, quiero información sobre un amigurumi.')}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: 'secondary', className: 'w-full' })}
          >
            <MessageCircleIcon size={18} aria-hidden="true" />
            Escríbenos por WhatsApp
          </a>
        )}
      </aside>
    </div>
  );
}
