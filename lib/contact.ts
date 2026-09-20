import type { Locale } from './config';

export const assessmentForms = {
  en: { id: 'FCNLI4nmuarnHRxtPVWi', height: 718 },
  es: { id: 'uwp62aex2J0loVy7nxpZ', height: 618 },
  it: { id: '3txWuv6hLddQ9Gxy9pFe', height: 632 },
} as const;
export const contactCopy = {
  en: { label: 'Contact us', title: 'Let’s connect your customer journey.', lead: 'Tell us about your HVAC business. We’ll help you identify opportunities to improve enquiries, bookings, follow-ups and repeat service.', explore: 'Explore Rooklyn', thanks: 'Thank you for getting in touch.', received: 'Your assessment request has been submitted. The Rooklyn team will review your details and get in touch to discuss your business.', back: 'Back to Rooklyn Clima' },
  es: { label: 'Contacta con nosotros', title: 'Conectemos el recorrido de tus clientes.', lead: 'Cuéntanos sobre tu empresa de climatización. Te ayudaremos a identificar oportunidades para mejorar las solicitudes, las reservas, el seguimiento y el servicio recurrente.', explore: 'Explorar Rooklyn', thanks: 'Gracias por contactar con nosotros.', received: 'Tu solicitud de diagnóstico se ha enviado. El equipo de Rooklyn revisará los detalles y se pondrá en contacto contigo para hablar de tu empresa.', back: 'Volver a Rooklyn Clima' },
  it: { label: 'Contattaci', title: 'Colleghiamo il percorso dei tuoi clienti.', lead: 'Raccontaci della tua azienda di climatizzazione. Ti aiuteremo a individuare opportunità per migliorare richieste, prenotazioni, follow-up e servizi ricorrenti.', explore: 'Esplora Rooklyn', thanks: 'Grazie per averci contattato.', received: 'La tua richiesta di valutazione è stata inviata. Il team Rooklyn esaminerà i dettagli e ti contatterà per parlare della tua azienda.', back: 'Torna a Rooklyn Clima' },
} satisfies Record<Locale, Record<string, string>>;

/** GHL sends this form-specific message from its successful submission handler.
 * The caller must also verify event.origin and event.source. Never inspect contact data.
 */
export function isAssessmentSubmission(data: unknown, iframeId: string): boolean {
  return Array.isArray(data) && data[0] === 'set-sticky-contacts'
    && data[1] === `embedded_iframe_${iframeId}` && data[2] === iframeId;
}
