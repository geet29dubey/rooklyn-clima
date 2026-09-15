import type { Locale } from './config';
import { lifecycle } from './lifecycle';

export const content = {
  es: {
    ...{
  "optionalNote": "Se valora por separado. No está activa en esta demostración.",
  "demoTag": "04 / Pruébalo como un cliente",
  "demoTitle": "La mejor forma de entenderlo es probarlo.",
  "demoBadge": "ÁUREA CLIMA · DEMO DE ROOKLYN",
  "repairTitle": "Reparación",
  "repairDesc": "Simula una solicitud de avería y prueba el proceso de reserva.",
  "repairCta": "Probar reparación",
  "installationTitle": "Nueva instalación",
  "installationCta": "Probar instalación",
  "demoSteps": [
    "Describe la avería",
    "Prueba la reserva"
  ],
  "installSteps": [
    "Indica tus necesidades",
    "Agenda una visita técnica"
  ],
  "disclaimer": "Áurea Clima es un entorno demostrativo creado por Rooklyn. No presta servicios reales de climatización.",
  "free": "Gratis y sin registro obligatorio",
  "impactNote": "El impacto dependerá del volumen de solicitudes, la tasa de cierre y el valor medio de cada reparación o instalación. Por eso evaluamos el proceso y el caso de negocio de cada empresa de forma individual.",
  "assess": "Evaluar mi caso",
  "audienceTitle": "Diseñado para empresas que están sobre el terreno.",
  "audienceLead": "El sistema se configura alrededor de tus procesos actuales. Tu empresa no tiene que encajar en un flujo idéntico al de las demás.",
  "audience": [
    "Empresas de climatización",
    "Instaladores de aire acondicionado",
    "Especialistas en calefacción y calderas",
    "Empresas de mantenimiento",
    "Equipos de reparación e instalación",
    "Solicitudes por teléfono, formularios o WhatsApp"
  ],
  "deliveryTag": "06 / De la idea a la operación",
  "deliveryTitle": "Un sistema adaptado. Un alcance definido contigo.",
  "deliveryLead": "La propuesta puede incluir estos entregables. La combinación final se acuerda según tus necesidades; no todos forman parte de un único paquete.",
  "deliveries": [
    "Configuración de páginas y formularios",
    "Calendarios por tipo de servicio",
    "Embudo CRM personalizado",
    "Flujos de confirmación y recordatorios",
    "Gestión de cancelaciones y ausencias",
    "Seguimiento de presupuestos",
    "Historial de equipos y servicios",
    "Campañas de mantenimiento recurrente",
    "Formación inicial",
    "Soporte y optimización"
  ],
  "faqTag": "Preguntas frecuentes",
  "faqTitle": "Lo que necesitas saber.",
  "faqs": [
    [
      "¿La demo de Áurea Clima es gratuita?",
      "Sí. Puedes explorarla gratis y sin completar un formulario de registro previo."
    ],
    [
      "¿Áurea Clima es una empresa real de climatización?",
      "No. Es un entorno demostrativo creado por Rooklyn y no presta servicios reales de climatización."
    ],
    [
      "¿El sistema distingue reparaciones e instalaciones?",
      "Sí. Cada tipo de solicitud puede seguir su propia clasificación, calendario y seguimiento dentro de un CRM compartido."
    ],
    [
      "¿Se conecta con los calendarios existentes?",
      "Se estudian tus calendarios y su compatibilidad durante el diagnóstico para definir la conexión adecuada."
    ],
    [
      "¿Puede enviar confirmaciones y recordatorios?",
      "Sí. Se pueden configurar mensajes de confirmación y recordatorios según el servicio y el recorrido acordados."
    ],
    [
      "¿Puede hacer seguimiento automático de presupuestos?",
      "Sí. Se pueden preparar secuencias de seguimiento vinculadas al estado de la oportunidad y a los permisos de comunicación."
    ],
    [
      "¿Admite español, inglés e italiano?",
      "Esta página está disponible en los tres idiomas. Los formularios y flujos de tu sistema se localizan según el alcance acordado. El idioma de la demo externa depende de su configuración."
    ],
    [
      "¿Se pueden añadir WhatsApp y un asistente virtual?",
      "Sí, como integración opcional con WhatsApp y asistente virtual. Se configura y prueba por separado; no está activa en esta demostración."
    ],
    [
      "¿Cuánto tarda la implementación?",
      "Depende de los calendarios, flujos, integraciones y personalización necesarios. El plazo se define después de analizar tu proceso."
    ],
    [
      "¿Se adapta a cada empresa?",
      "Sí. El diagnóstico permite adaptar las rutas, etapas y comunicaciones a tu forma de trabajar."
    ]
  ],
  "privacy": "Política de privacidad",
  "cookies": "Política de cookies",
  "legal": "Aviso legal",
  "preferences": "Preferencias de cookies",
  "contact": "Contacto",
  "rights": "Rooklyn. Todos los derechos reservados.",
  "formPending": "Las solicitudes de diagnóstico estarán disponibles próximamente.",
  "formPendingText": "Mientras preparamos este canal, puedes explorar la demo gratuita. Este formulario está desactivado y no recoge ni envía tus datos.",
  "name": "Nombre",
  "company": "Empresa",
  "contactLabel": "Email profesional o WhatsApp",
  "problemLabel": "Problema principal",
  "choose": "Selecciona una opción",
  "options": [
    "Llamadas perdidas",
    "Respuesta lenta",
    "Gestión de citas",
    "Seguimiento de presupuestos",
    "Recordatorios de mantenimiento",
    "Otro"
  ],
  "consent": "He leído la política de privacidad y acepto que Rooklyn me contacte sobre esta solicitud.",
  "send": "Enviar solicitud de diagnóstico",
  "calendar": "Elegir una cita de consulta",
  "formLoading": "Cargando formulario seguro…",
  "formFallback": "Abrir el formulario seguro",
  "required": "Completa este campo.",
  "invalidContact": "Introduce un email válido o un teléfono con prefijo internacional.",
  "privacyRequired": "Acepta la política de privacidad para continuar.",
  "cookieTitle": "Tú decides sobre tus datos.",
  "cookieText": "Usamos almacenamiento local para recordar tu idioma y tus preferencias. Las analíticas opcionales solo se activan si las aceptas.",
  "reject": "Solo necesarias",
  "accept": "Aceptar analíticas",
  "customize": "Configurar",
  "essential": "Preferencias necesarias",
  "essentialDesc": "Guardan tu idioma y tu elección de privacidad en este dispositivo.",
  "analytics": "Analíticas opcionales",
  "analyticsDesc": "Permiten entender el uso de la página y el origen de las solicitudes. Desactivadas por defecto.",
  "save": "Guardar preferencias",
  "always": "Siempre activas",
  "legalPending": "Esta información se publicará antes de activar la captación de datos.",
  "notFoundTitle": "Esta página no está disponible.",
  "notFoundText": "Vuelve al inicio para descubrir el sistema de automatización de Rooklyn.",
  "back": "Volver al inicio"
},
    ...lifecycle.es.page,
  },
  en: {
    ...{
  "optionalNote": "Assessed separately. Not active in this demonstration.",
  "demoTag": "04 / Try it as a customer",
  "demoTitle": "The best way to understand it is to try it.",
  "demoBadge": "ÁUREA CLIMA · A ROOKLYN DEMO",
  "repairTitle": "Repair",
  "repairDesc": "Simulate a breakdown request and experience the booking process.",
  "repairCta": "Try the repair journey",
  "installationTitle": "New installation",
  "installationCta": "Try the installation journey",
  "demoSteps": [
    "Describe the breakdown",
    "Try the booking process"
  ],
  "installSteps": [
    "Share your requirements",
    "Schedule a technical visit"
  ],
  "disclaimer": "Áurea Clima is a demonstration environment created by Rooklyn. It does not provide real HVAC services.",
  "free": "Free, with no registration required",
  "impactNote": "The impact depends on enquiry volume, closing rate and the average value of each repair or installation. We therefore assess every company’s process and business case individually.",
  "assess": "Assess my business case",
  "audienceTitle": "Built for businesses working in the field.",
  "audienceLead": "The system is configured around your existing processes. Your business does not have to fit the same workflow as everyone else.",
  "audience": [
    "HVAC contractors",
    "Air-conditioning installers",
    "Heating and boiler specialists",
    "Maintenance businesses",
    "Repair and installation teams",
    "Enquiries by phone, forms or WhatsApp"
  ],
  "deliveryTag": "06 / From idea to operation",
  "deliveryTitle": "An adapted system. A scope agreed with you.",
  "deliveryLead": "Your proposal may include these deliverables. The final combination depends on your needs; they are not all included in a single package.",
  "deliveries": [
    "Landing-page and form configuration",
    "Calendars for each service type",
    "Customised CRM pipeline",
    "Confirmation and reminder workflows",
    "Cancellation and no-show handling",
    "Estimate follow-up",
    "Equipment and service-history records",
    "Recurring maintenance campaigns",
    "Initial training",
    "Support and optimisation"
  ],
  "faqTag": "Frequently asked questions",
  "faqTitle": "What you need to know.",
  "faqs": [
    [
      "Is the Áurea Clima demo free?",
      "Yes. You can explore it for free without completing a registration form first."
    ],
    [
      "Is Áurea Clima a real HVAC company?",
      "No. It is a demonstration environment created by Rooklyn and does not provide real HVAC services."
    ],
    [
      "Can it distinguish repairs from installations?",
      "Yes. Each enquiry type can follow its own qualification, calendar and follow-up inside a shared CRM."
    ],
    [
      "Can it connect with existing calendars?",
      "We assess your calendars and their compatibility during the consultation to define the appropriate connection."
    ],
    [
      "Can it send confirmations and reminders?",
      "Yes. Confirmation messages and reminders can be configured around the agreed service and customer journey."
    ],
    [
      "Can it follow up estimates automatically?",
      "Yes. Follow-up sequences can be linked to the opportunity’s status and communication permissions."
    ],
    [
      "Does it support Spanish, English and Italian?",
      "This page supports all three languages. Your system’s forms and workflows are localised to the agreed scope. The external demo’s language depends on its configuration."
    ],
    [
      "Can WhatsApp and a virtual assistant be added?",
      "Yes, through optional WhatsApp and virtual assistant integration. It is configured and tested separately and is not active in this demonstration."
    ],
    [
      "How long does implementation take?",
      "It depends on the calendars, workflows, integrations and customisation required. Timing is defined after reviewing your process."
    ],
    [
      "Is the system adapted to each company?",
      "Yes. The assessment helps adapt journeys, pipeline stages and communications to the way your business works."
    ]
  ],
  "privacy": "Privacy Policy",
  "cookies": "Cookie Policy",
  "legal": "Legal Notice",
  "preferences": "Cookie preferences",
  "contact": "Contact",
  "rights": "Rooklyn. All rights reserved.",
  "formPending": "Assessment requests will be available soon.",
  "formPendingText": "While we prepare this channel, you can explore the free demo. This form is disabled and does not collect or send your data.",
  "name": "Name",
  "company": "Company name",
  "contactLabel": "Work email or WhatsApp",
  "problemLabel": "Primary problem",
  "choose": "Select an option",
  "options": [
    "Missed calls",
    "Slow response",
    "Scheduling",
    "Estimate follow-up",
    "Maintenance recalls",
    "Other"
  ],
  "consent": "I have read the Privacy Policy and agree to be contacted by Rooklyn about this request.",
  "send": "Request an assessment",
  "calendar": "Choose a consultation appointment",
  "formLoading": "Loading the secure form…",
  "formFallback": "Open the secure form",
  "required": "Complete this field.",
  "invalidContact": "Enter a valid email or phone number with an international dialling code.",
  "privacyRequired": "Accept the Privacy Policy to continue.",
  "cookieTitle": "Your data. Your choice.",
  "cookieText": "We use local storage to remember your language and preferences. Optional analytics are only activated if you accept them.",
  "reject": "Necessary only",
  "accept": "Accept analytics",
  "customize": "Customise",
  "essential": "Necessary preferences",
  "essentialDesc": "Remember your language and privacy choice on this device.",
  "analytics": "Optional analytics",
  "analyticsDesc": "Help us understand page use and where enquiries come from. Off by default.",
  "save": "Save preferences",
  "always": "Always active",
  "legalPending": "This information will be published before data collection is enabled.",
  "notFoundTitle": "This page is not available.",
  "notFoundText": "Return home to explore Rooklyn’s automation system.",
  "back": "Back to home"
},
    ...lifecycle.en.page,
  },
  it: {
    ...{
  "optionalNote": "Valutata separatamente. Non è attiva in questa dimostrazione.",
  "demoTag": "04 / Provalo come un cliente",
  "demoTitle": "Il modo migliore per capirlo è provarlo.",
  "demoBadge": "ÁUREA CLIMA · DEMO DI ROOKLYN",
  "repairTitle": "Riparazione",
  "repairDesc": "Simula una richiesta di riparazione e prova il processo di prenotazione.",
  "repairCta": "Prova il percorso di riparazione",
  "installationTitle": "Nuova installazione",
  "installationCta": "Prova il percorso di installazione",
  "demoSteps": [
    "Descrivi il guasto",
    "Prova la prenotazione"
  ],
  "installSteps": [
    "Indica le tue esigenze",
    "Prenota una sopralluogo tecnico"
  ],
  "disclaimer": "Áurea Clima è un ambiente dimostrativo creato da Rooklyn. Non fornisce servizi reali di climatizzazione.",
  "free": "Gratis, senza registrazione obbligatoria",
  "impactNote": "L’impatto dipende dal volume delle richieste, dal tasso di chiusura e dal valore medio di ogni riparazione o installazione. Per questo analizziamo individualmente il processo e il caso aziendale di ogni impresa.",
  "assess": "Valuta il mio caso",
  "audienceTitle": "Pensato per chi lavora sul campo.",
  "audienceLead": "Il sistema viene configurato intorno ai tuoi processi attuali. La tua azienda non deve adattarsi a un flusso identico per tutti.",
  "audience": [
    "Aziende di climatizzazione",
    "Installatori di condizionatori",
    "Specialisti di riscaldamento e caldaie",
    "Imprese di manutenzione",
    "Team di riparazione e installazione",
    "Richieste via telefono, moduli o WhatsApp"
  ],
  "deliveryTag": "06 / Dall’idea all’operatività",
  "deliveryTitle": "Un sistema su misura. Un ambito definito insieme.",
  "deliveryLead": "La proposta può comprendere questi elementi. La combinazione finale viene concordata in base alle esigenze; non sono tutti inclusi in un unico pacchetto.",
  "deliveries": [
    "Configurazione di pagine e moduli",
    "Calendari per tipo di servizio",
    "Pipeline CRM personalizzata",
    "Flussi di conferma e promemoria",
    "Gestione di cancellazioni e assenze",
    "Follow-up dei preventivi",
    "Storico di impianti e interventi",
    "Campagne di manutenzione ricorrente",
    "Formazione iniziale",
    "Supporto e ottimizzazione"
  ],
  "faqTag": "Domande frequenti",
  "faqTitle": "Quello che serve sapere.",
  "faqs": [
    [
      "La demo Áurea Clima è gratuita?",
      "Sì. Puoi esplorarla gratuitamente senza compilare prima un modulo di registrazione."
    ],
    [
      "Áurea Clima è una vera azienda di climatizzazione?",
      "No. È un ambiente dimostrativo creato da Rooklyn e non fornisce servizi reali di climatizzazione."
    ],
    [
      "Il sistema distingue riparazioni e installazioni?",
      "Sì. Ogni tipo di richiesta può seguire qualificazione, calendario e follow-up propri, all’interno di un CRM condiviso."
    ],
    [
      "Si può collegare ai calendari esistenti?",
      "Durante la valutazione analizziamo i calendari e la loro compatibilità per definire il collegamento adatto."
    ],
    [
      "Può inviare conferme e promemoria?",
      "Sì. I messaggi di conferma e i promemoria possono essere configurati secondo il servizio e il percorso concordati."
    ],
    [
      "Può seguire automaticamente i preventivi?",
      "Sì. Le sequenze di follow-up possono essere collegate allo stato dell’opportunità e ai consensi per le comunicazioni."
    ],
    [
      "Supporta spagnolo, inglese e italiano?",
      "Questa pagina è disponibile nelle tre lingue. I moduli e i flussi del sistema vengono localizzati secondo l’ambito concordato. La lingua della demo esterna dipende dalla sua configurazione."
    ],
    [
      "Si possono aggiungere WhatsApp e un assistente virtuale?",
      "Sì, con l’integrazione opzionale con WhatsApp e assistente virtuale. Viene configurata e testata separatamente e non è attiva in questa dimostrazione."
    ],
    [
      "Quanto tempo richiede l’implementazione?",
      "Dipende da calendari, flussi, integrazioni e personalizzazione richiesti. I tempi vengono definiti dopo l’analisi del processo."
    ],
    [
      "Il sistema viene adattato a ogni azienda?",
      "Sì. La valutazione permette di adattare percorsi, fasi e comunicazioni al tuo modo di lavorare."
    ]
  ],
  "privacy": "Informativa sulla privacy",
  "cookies": "Informativa sui cookie",
  "legal": "Note legali",
  "preferences": "Preferenze sui cookie",
  "contact": "Contatti",
  "rights": "Rooklyn. Tutti i diritti riservati.",
  "formPending": "Le richieste di valutazione saranno disponibili a breve.",
  "formPendingText": "Mentre prepariamo questo canale, puoi esplorare la demo gratuita. Il modulo è disattivato e non raccoglie né invia i tuoi dati.",
  "name": "Nome",
  "company": "Nome dell’azienda",
  "contactLabel": "Email di lavoro o WhatsApp",
  "problemLabel": "Problema principale",
  "choose": "Seleziona un’opzione",
  "options": [
    "Chiamate perse",
    "Risposte lente",
    "Gestione appuntamenti",
    "Follow-up preventivi",
    "Richiami per manutenzione",
    "Altro"
  ],
  "consent": "Ho letto l’informativa sulla privacy e accetto di essere contattato da Rooklyn per questa richiesta.",
  "send": "Invia richiesta di valutazione",
  "calendar": "Scegli un appuntamento di consulenza",
  "formLoading": "Caricamento del modulo sicuro…",
  "formFallback": "Apri il modulo sicuro",
  "required": "Compila questo campo.",
  "invalidContact": "Inserisci un’email valida o un numero con prefisso internazionale.",
  "privacyRequired": "Accetta l’informativa sulla privacy per continuare.",
  "cookieTitle": "I tuoi dati. La tua scelta.",
  "cookieText": "Usiamo l’archiviazione locale per ricordare lingua e preferenze. Le analitiche opzionali si attivano solo se le accetti.",
  "reject": "Solo necessari",
  "accept": "Accetta analitiche",
  "customize": "Personalizza",
  "essential": "Preferenze necessarie",
  "essentialDesc": "Memorizzano la lingua e la scelta sulla privacy su questo dispositivo.",
  "analytics": "Analitiche opzionali",
  "analyticsDesc": "Aiutano a capire l’uso della pagina e l’origine delle richieste. Disattivate per impostazione predefinita.",
  "save": "Salva preferenze",
  "always": "Sempre attive",
  "legalPending": "Queste informazioni saranno pubblicate prima di attivare la raccolta dei dati.",
  "notFoundTitle": "Questa pagina non è disponibile.",
  "notFoundText": "Torna alla pagina iniziale per scoprire il sistema di automazione Rooklyn.",
  "back": "Torna alla pagina iniziale"
},
    ...lifecycle.it.page,
  }
};
