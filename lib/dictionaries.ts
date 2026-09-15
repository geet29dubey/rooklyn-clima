import type { Locale } from './config';
import { lifecycle } from './lifecycle';

export const dictionaries = {
  es: {
    ...{
  "diagnosis": "Solicitar diagnóstico",
  "language": "Idioma",
  "menu": "Abrir menú",
  "close": "Cerrar",
  "skip": "Saltar al contenido",
  "trust": [
    "Demo gratuita",
    "Sin registro obligatorio",
    "Experiencia real de cliente"
  ],
  "diagram": {
    "title": "De la solicitud al trabajo agendado",
    "badge": "Flujo ilustrativo",
    "enquiry": "Nueva solicitud",
    "time": "Fuera del horario comercial",
    "message": "Necesito ayuda con mi climatización.",
    "qualify": "Solicitud clasificada",
    "qualified": "Servicio y urgencia identificados",
    "repair": "Reparación",
    "install": "Instalación",
    "appointment": "Visita agendada",
    "calendar": "En el calendario adecuado",
    "crm": "Oportunidad en el CRM",
    "follow": "Confirmación, recordatorios y seguimiento",
    "footer": "Un recorrido conectado. Cada oportunidad en su sitio."
  }
},
    ...lifecycle.es.header,
  },
  en: {
    ...{
  "diagnosis": "Request an assessment",
  "language": "Language",
  "menu": "Open menu",
  "close": "Close",
  "skip": "Skip to content",
  "trust": [
    "Free demonstration",
    "No registration required",
    "Realistic customer experience"
  ],
  "diagram": {
    "title": "From enquiry to booked job",
    "badge": "Illustrative workflow",
    "enquiry": "New enquiry",
    "time": "After business hours",
    "message": "I need help with my air conditioning.",
    "qualify": "Enquiry qualified",
    "qualified": "Service and urgency identified",
    "repair": "Repair",
    "install": "Installation",
    "appointment": "Visit booked",
    "calendar": "In the right calendar",
    "crm": "Opportunity in your CRM",
    "follow": "Confirmation, reminders and follow-up",
    "footer": "One connected journey. Every opportunity in its place."
  }
},
    ...lifecycle.en.header,
  },
  it: {
    ...{
  "diagnosis": "Richiedi una valutazione",
  "language": "Lingua",
  "menu": "Apri menu",
  "close": "Chiudi",
  "skip": "Vai al contenuto",
  "trust": [
    "Demo gratuita",
    "Nessuna registrazione obbligatoria",
    "Esperienza cliente realistica"
  ],
  "diagram": {
    "title": "Dalla richiesta all’intervento prenotato",
    "badge": "Flusso illustrativo",
    "enquiry": "Nuova richiesta",
    "time": "Fuori dall’orario di lavoro",
    "message": "Ho bisogno di aiuto con il climatizzatore.",
    "qualify": "Richiesta qualificata",
    "qualified": "Servizio e urgenza identificati",
    "repair": "Riparazione",
    "install": "Installazione",
    "appointment": "Visita prenotata",
    "calendar": "Nel calendario corretto",
    "crm": "Opportunità nel CRM",
    "follow": "Conferma, promemoria e follow-up",
    "footer": "Un percorso connesso. Ogni opportunità al suo posto."
  }
},
    ...lifecycle.it.header,
  }
};
export type Dictionary = typeof dictionaries[Locale];
