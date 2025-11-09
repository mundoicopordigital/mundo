

import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- Iconos SVG ---
const CeilingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z" /> </svg> );
const WindowIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> </svg> );
const GlassIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4M5 11h14M5 15h14M17 3v4m2-2h-4m2 14v4m2-2h-4" /> </svg> );
const HandrailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /> </svg> );
const MissionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12H3" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12h-3.75" /> </svg> );
const VisionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> </svg> );
const CartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg> );
const ListViewIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> );
const GridViewIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> );
const ChatIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> );
const InstagramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect> <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path> <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line> </svg> );
const WhatsAppIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38c1.44.82 3.08 1.25 4.69 1.25h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.15 15.28c-.22-.11-.76-.38-1.04-.49-.28-.11-.48-.11-.68.11-.2.22-.39.49-.48.59-.09.1-.18.11-.33.06s-.6-.22-1.14-.7c-.43-.37-.71-.84-.8-1-.09-.16 0-.25.09-.34.08-.08.18-.22.27-.33.09-.11.12-.18.18-.3.06-.11 0-.22-.05-.33-.06-.11-.68-1.63-.93-2.23s-.49-.52-.68-.52h-.48c-.2 0-.48.06-.68.33s-.76.74-.76 1.8c0 1.06.78 2.08.88 2.23.11.16 1.54 2.45 3.74 3.3.52.2.92.33 1.24.42.5.13.95.11 1.3.07.39-.04.76-.16.98-.38.28-.27.28-.52.2-.59-.09-.06-.22-.11-.48-.22z"/> </svg> );
const ChevronLeftIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> );
const ChevronRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> );
// Fix: Update ChevronDownIcon to accept a className prop to allow for dynamic styling like rotation.
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> );
// Fix: Use React.FC to correctly type the component and allow for the `key` prop.
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> </svg> );


// --- Tipos de Datos ---
interface Product { id: number; name: string; category: string; description: string; images: string[]; price?: number; unit?: string; details?: string; }
interface ChatMessage { sender: 'user' | 'bot'; text: string; }
interface Testimonial { name: string; rating: number; comment: string; }
interface FAQItem { question: string; answer: string; }

// --- Datos de Muestra ---
const products: Product[] = [ { id: 1, name: 'Instalación Cielorraso Icopor', category: 'cielorrasos', description: 'Solución económica y versátil para techos. Ofrece aislamiento térmico y acústico.', images: ['https://aluminiosega.com/images/galerias/cielo-rasos/cieloraso1.jpg'], price: 23000, unit: 'm² instalado', details: 'Precio por metro cuadrado todo incluido para áreas superiores a 30m².' }, { id: 2, name: 'Instalación Cielorraso PVC', category: 'cielorrasos', description: 'Acabado moderno, resistente a la humedad y de fácil limpieza. Ideal para baños y cocinas.', images: ['https://http2.mlstatic.com/D_NQ_NP_667252-MCO49163825828_022022-O.webp'], price: 36000, unit: 'm² instalado', details: 'Precio base. Costos adicionales pueden aplicar para lámparas y acrílicos.' }, { id: 3, name: 'Ventanería en Aluminio', category: 'aluminio', description: 'Fabricamos e instalamos ventanas a la medida. Diseños corredizos, proyectantes y fijos.', images: ['https://lh3.googleusercontent.com/pw/AP1GczOy9yJ7hY39s3j45_G-4s8rM093Bv7-kH10v0jBvF_0h4Lp9QjC_q4u312x5qfO-6sD1I1v7i2zR5N5o_eB5Qz=w1080-h810-s-no-gm?authuser=0'], details: 'Se requiere cotización según medidas y diseño.' }, { id: 4, name: 'Divisiones de Baño', category: 'vidrio', description: 'Divisiones en acrílico, vidrio templado y acero inoxidable. Soluciones elegantes y funcionales para tu baño.', images: ['https://lh3.googleusercontent.com/pw/AP1GczOaVqVlR-oG-eC0v7Mv2J2nUuD5Z6vJ7C7T1Q3F9X1G9Y9C9S8R5o8V5L-p6F_N5f9D8c_L5a5k4Z-n5Xg=w800-h600-s-no-gm?authuser=0'], details: 'Se requiere cotización según materiales y dimensiones.' }, { id: 5, name: 'Pasamanos en Acero Inoxidable', category: 'remodelacion', description: 'Diseño y fabricación de pasamanos y barandas en acero inoxidable para escaleras y balcones.', images: ['https://lh3.googleusercontent.com/pw/AP1GczM1aY3V3eD0c5b3d6f-c7G_k4W9R8B6E-p8O9Y-k7Y7g7P3F6S_K9Z_j_sX7e1eR-T7H1a7g6f4R2Vz5mQ=w800-h600-s-no-gm?authuser=0'], details: 'Se requiere cotización según diseño y metros lineales.' }, { id: 6, name: 'Fachadas en Vidrio Templado', category: 'vidrio', description: 'Moderniza tu negocio o residencia con fachadas de alto impacto visual y seguridad.', images: ['https://lh3.googleusercontent.com/pw/AP1GczNtJ3eP7L9d6k2q7o_z9e6f_W1x0X-H9C_B9D_t5e6E-I9A8S_a7q-A-Z_Y2V_R-S_p7f6X-i_d-D3h9d4Y=w1080-h810-s-no-gm?authuser=0'], details: 'Se requiere cotización para evaluar la complejidad y área del proyecto.' },
];
const values = [
    { emoji: '✨', title: 'Calidad', description: 'Utilizamos los mejores materiales y técnicas para garantizar acabados duraderos y estéticamente superiores.' },
    { emoji: '🤝', title: 'Compromiso', description: 'Cumplimos con los tiempos y acuerdos pactados, porque la confianza de nuestros clientes es nuestra prioridad.' },
    { emoji: '💡', title: 'Innovación', description: 'Estamos en constante búsqueda de nuevas tendencias y soluciones para ofrecerte lo último en diseño.' },
    { emoji: '⚖️', title: 'Honestidad', description: 'Te ofrecemos precios justos y una asesoría transparente en cada etapa de tu proyecto.' },
    { emoji: '😊', title: 'Servicio al Cliente', description: 'Te acompañamos y asesoramos para que tu experiencia sea excepcional, de principio a fin.' },
    { emoji: '🧑‍🤝‍🧑', title: 'Trabajo en Equipo', description: 'Nuestro personal calificado colabora estrechamente para asegurar que cada detalle de tu obra sea perfecto.' }
];

const testimonials: Testimonial[] = [
    { name: 'Maria G.', rating: 5, comment: 'Excelente trabajo con el cielorraso de PVC en mi cocina. Resistente a la humedad y se ve increíble. ¡Totalmente recomendados!' },
    { name: 'Juan P.', rating: 5, comment: 'El equipo fue muy profesional y cumplido. La instalación del cielorraso fue rápida, limpia y el resultado superó mis expectativas.' },
    { name: 'Sofia L.', rating: 5, comment: 'Me encantaron las divisiones de baño en vidrio templado. Le dieron un toque de elegancia y modernidad a mi hogar.' },
    { name: 'Carlos R.', rating: 5, comment: 'Se nota la experiencia de más de 20 años. La calidad de los materiales y el nivel de detalle en los acabados son de primera categoría.' },
    { name: 'Ana M.', rating: 5, comment: 'Pedí una cotización y me respondieron de inmediato por WhatsApp. El proceso fue muy eficiente y la atención, excelente.' },
    { name: 'David Z.', rating: 5, comment: 'Los pasamanos de acero inoxidable quedaron perfectos en mi escalera. Un trabajo de alta precisión y con un acabado impecable.' },
    { name: 'Laura V.', rating: 5, comment: 'La fachada de vidrio para mi local comercial quedó espectacular. Ha mejorado la imagen de mi negocio. ¡Gracias Mundoicopor!' },
    { name: 'Jorge H.', rating: 5, comment: 'Tenía dudas sobre qué material usar y me asesoraron pacientemente. El icopor fue la mejor opción para mi presupuesto y necesidades.' },
    { name: 'Valentina C.', rating: 5, comment: 'Responsabilidad y cumplimiento de principio a fin. Un servicio de cinco estrellas, sin duda alguna. Los volvería a contratar.' },
];

const faqData: FAQItem[] = [
    { question: '¿En qué ciudades prestan servicio?', answer: 'Nuestra sede principal está en Pereira, pero ofrecemos nuestros servicios en todo el Eje Cafetero y áreas aledañas. Contáctanos para confirmar la cobertura en tu ubicación específica.' },
    { question: '¿Cómo puedo solicitar una cotización?', answer: 'Es muy fácil. Puedes navegar por nuestra tienda, añadir los productos o servicios que te interesan al carrito de cotización y enviarnos tus datos. También puedes usar el formulario de cotización directa al final de la página. En ambos casos, un asesor te contactará por WhatsApp a la brevedad.' },
    { question: '¿Cuánto tiempo tarda la instalación?', answer: 'El tiempo de instalación varía según el tamaño y la complejidad del proyecto. Por ejemplo, un cielorraso para una habitación estándar puede tomar de 1 a 2 días. Al momento de cotizar, te daremos un cronograma estimado y detallado.' },
    { question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos transferencias bancarias (Bancolombia), Nequi, Daviplata y efectivo. Generalmente, trabajamos con un anticipo del 50% para iniciar y el 50% restante al finalizar el trabajo a satisfacción.' },
    { question: '¿Los productos y la instalación tienen garantía?', answer: '¡Claro que sí! Todos nuestros trabajos están respaldados por una garantía que cubre tanto los materiales utilizados como la mano de obra. La satisfacción y tranquilidad de nuestros clientes es fundamental.' },
];

const slides = [ { url: 'https://lh3.googleusercontent.com/pw/AP1GczNA6X3-UATHwPn_e3vi2IM1QtBWliQsh_rAemAi6HEo28-DVJUvIa8iphmBiWmgkut2riXsBP2VWsNgnl8bSCGT1TeM_DQNEOhKrNs4RzkTTujCoI8PJdjeBswkatYAvd3zkcOO4RErXc20YR68xPE=w1200-h800-s-no-gm?authuser=0', title: 'Techos Jaspeados', description: 'Estilo y textura únicos para tus espacios.' }, { url: 'https://lh3.googleusercontent.com/pw/AP1GczNKpeflrsP9eQLuEDqItYxYG3FdUJOY6csRrvWL8LKsO4EmXoG594PQEWBFWMJ5u5MIRRb9K9zfpIGf0EwsZ1usyGvJN-Gp09SuLYSiYUm3PlwwazQy6Lgb0Dlu0pwV8EMzRkmtCcrGTC_BYHxcAkE=w874-h412-s-no-gm?authuser=0', title: 'Acabado Liso Tradicional', description: 'Elegancia y simplicidad para un look moderno y limpio.' }, { url: 'https://lh3.googleusercontent.com/pw/AP1GczMmGx0ZdSGqq4K31lnBL3wl5yG5VZfqH7F_cSjq4Lp4rKHhyhrNbtiWsm16YqtszmKwJdDCvqaOfcXBLSuI0JdLSHLaSRL5REMCSgwwpwUDuS7nzYd_LQ68LdJ5QE3Gu2b5c9lH6ub7_elpm5M8uLE=w896-h807-s-no-gm?authuser=0', title: 'Patrones Decorativos', description: 'Más de 12 referencias con diseño y elegancia para personalizar tus ambientes.' }, { url: 'https://aluminiosega.com/images/galerias/cielo-rasos/cieloraso1.jpg', title: 'Nuestro Punto de Distribución', description: 'Visítanos y conoce toda nuestra gama de productos y soluciones.' }
];

const icoporDesigns = [
  'https://lh3.googleusercontent.com/pw/AP1GczMGv-f0jhQP3KU-vfYhYr-rBZbTNrI536HMgsdg6Q15MkRzvDDfMTOLZy28DGLw8_slcP4Ahtz_iArOz9X5YnpMSz2QCO3A37Cx-z6K2XqNG0J7XF8tmAnoohnawUeeWZRpv9ORUp6BfKvnqXR3WEY=w271-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczNu_vANRAEBs8g-o7Cf_ei-60gWY0xY9tvNxpYNpa8wzGscwZDYlAP30UoFF1Obthl7cCYLcR9M8Lne5fZtcvoV_OqUoDtTTdmMAnU7tv7phpaIzT71CxO30zb9-FJqZyxWG_CsHh5NVN0dzhyYJ4U=w273-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczOD-d2udQUKu8HvuwlNvJ46NEmR92JIV1g-NnONS707-3mygQ-PELnOikMvDoXTjMWv7FBRZ3sKwxUKc8V3-IE-rBa7fXJccSZjMwxVumWsnjht9Hc7NlNI4gsccMa1evmGxcVcNASzvylA-XqAC3o=w275-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczP-50-tydm1pREE8g2o6lf_Hel6h5J0t-Szu-8WvYYWt-mafT7usaTeyuYcNSioquEqKdy4SResTKwKYSzpNBCkd4kCTTenl2RgDK6qsIMmUB3Qokij-nPFIhFKD-oGemQaE759Sl3L75e7mhWgZ5k=w277-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczOstEPzbBTYdM2m8j_ull49o5pwFzpsyXGGQtm5PikXg6oFDEjJZYOlabbUm12v5lB6E0ygiX6wk-qPewtJRn74Ii2wcLhY8KFopqB2tXfBO6dNScL3lMjRfu4CYf8EcNFF4nhPjPAO0hYkaaexKR4=w362-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczNhtOPef7s1jGJ533x6qV4llEeeVkRVNGogg7fEcms37k34ZYo7EEpZTkKCGGZ7b7OgT604ek7aI9gVeA7VNJQkZLJXDWW4ntMhTQVpL33LdJnGYS_8iddwPJVtcZdOoBgfagVVHS2oPudtf8uXn-c=w277-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczP1Mgj4HS0suDNCk9iN49sIl-m4IV2l_6ldqRcYbBGN112fw2WY4ctV8nkKy_RSK9gOlQ1aQigC_H61cnl3HR-MLPv1tZzy-ep0EZjcshoalJcTT4MsAewX2LryNqqteRMnh8oFgtSrxPrtsGq-b7Y=w240-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczPMfYBiOKERu1Q92F_TIs3aj-66nOo18v3D9BZTqIqW-7oKxHnt1s3dpiOHxYrZ-8EC1rPqEuwj2Weedkfu_UqVrVFEGt87-pXtzWDRl2fpYsCDxJ7khhHoAJya81lS6_LMEPd93DFneCA0Q6c5DhI=w239-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczM7oHwrjgrZl9EFYas996uSrCRh78P3BBdSc33-HeIORlt5CFofiVRTpusbi1EBNRMl27l8TQnGouU_cEbKu_VUtF44KVUaFrJ88xRf536lE4Q_pXSL36ycLfUa64dwOb1vmA3SATcuos4lPdn0MUw=w274-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczNSENnab2F7qLwoqOufHTV1p4beu26HDOQoLFzkJA0ynPLbHvMdogAqdt8u831Sox93VaD6kqOCMAToNi6ksTJIT8Yl3u5jyQ9noF407ZLJuNNZJUDPPk_VPvvF_VyFLE7GyogFeb_jvGpaGFXhDho=w416-h991-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMWFOzYVXTPj-aHSyZkEgQpqRuSkdFTWPj9kz2X4QMM5yMogxP0wftl835pQPyWE3ICax8qXiRuXE_tCwJKl7n8mPeZbCZw9XrH1NzGY5LGT5odgwfjJqRfFbwaGSBPET7T7FlzeKDpEdrDef_DCEU=w682-h664-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczORl5KReYJzcXJdWt-ty9hfiKVQQvglbe-CwAHRvjjFobvfMohGPbVuWLrnnYDvLSWw-eIW_YdPtSUw2uGtgdj25llLUloUX3B8moOGL6--Kn4mJ-JqtMiYlodpSc7-A-X_aQg1GI80qJ1kZSQWwuQ=w493-h645-s-no-gm?authuser=0'
];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rating} />)}
    </div>
);

// Fix: Use React.FC to correctly type the component and allow for the `key` prop.
const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="neumorphic-card-inset rounded-lg overflow-hidden">
        <button onClick={onClick} className="w-full flex justify-between items-center p-4 text-left font-semibold">
            <span>{item.question}</span>
            <ChevronDownIcon className={`${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 pt-0 text-gray-600">
                <p>{item.answer}</p>
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todos');
    const [viewMode, setViewMode] = useState('grid');
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([ { sender: 'bot', text: '¡Hola! Soy el asistente virtual de Mundoicopor. ¿Cómo puedo ayudarte hoy?' } ]);
    const chatEndRef = useRef<null | HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsSplashVisible(false), 2500);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
      return () => clearTimeout(timer);
    }, [currentIndex]);

    const addToCart = (product: Product) => {
        if (!cart.find(item => item.id === product.id)) {
            setCart([...cart, product]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    
    const sendWhatsAppMessage = (message: string) => {
        const phoneNumber = '573121234567'; // Tu número de WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name');
        const address = formData.get('address');
        const phone = formData.get('phone');
        const measures = formData.get('measures');
        const productsText = cart.map(item => `- ${item.name}`).join('\n');
        const message = `*¡Nueva Solicitud de Cotización!*\n\n*Cliente:* ${name}\n*Teléfono:* ${phone}\n*Dirección:* ${address}\n\n*Productos de Interés:*\n${productsText}\n\n*Medidas y Detalles Adicionales:*\n${measures}\n\n_Mensaje generado desde la página web._`;
        sendWhatsAppMessage(message.trim());
        setCart([]);
        setIsCartOpen(false);
    };

    const handleDirectQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const project = formData.get('project');
        const message = `*¡Nueva Cotización Directa!*\n\n*Cliente:* ${name}\n*Teléfono:* ${phone}\n*Dirección:* ${address}\n\n*Descripción del Proyecto:*\n${project}\n\n_Mensaje generado desde la página web._`;
        sendWhatsAppMessage(message.trim());
        (e.target as HTMLFormElement).reset();
    };

    const handleChatInteraction = (userMessage: string, userQuery: string) => {
        setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setTimeout(() => {
            let botResponse = "No estoy seguro de cómo responder a eso. ¿Puedes intentar con otra opción?";
            if (userQuery === 'quote') botResponse = "¡Claro! Para cotizar, simplemente busca los productos que te interesan en nuestra tienda, añádelos al carrito y completa tus datos. ¡Tu solicitud nos llegará por WhatsApp!";
            else if (userQuery === 'info') botResponse = "Tenemos cielorrasos en icopor y PVC, perfilería, y todo en aluminio arquitectónico y vidrio templado.";
            else if (userQuery === 'contact') botResponse = "Puedes comunicarte con un asesor experto llamando al 312 123 4567 o visitándonos en Pereira. ¡Será un placer atenderte!";
            setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        }, 1000);
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => filter === 'todos' || p.category === filter)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [filter, searchTerm]);

    if (isSplashVisible) {
        return ( <div className="splash-screen"> <img src="https://lh3.googleusercontent.com/pw/AP1GczO_avgeyzyvXEExqKVMZQkpr595OS5HvQYE71aM8vXECNuAYBHIiyXIxJdb8tZj2I3fNPIGro4nBM5ktjSHo-tS40SwPaaBDVgXdsORcr_fu3eVyTccB2uBfShnmjH_re5jj7Tcd6mH-WO-Sc28G8=w256-h256-s-no-gm?authuser=0" alt="Mundoicopor Logo" className="splash-logo h-48 w-48 rounded-full" /> </div> );
    }

  return (
    <div className="text-gray-700 font-sans">
      <header className="glassmorphic sticky top-4 mx-auto max-w-7xl z-20 px-4">
        <div className="container mx-auto py-3 flex justify-between items-center gap-4">
          <a href="#" className="flex items-center"> <img src="https://lh3.googleusercontent.com/pw/AP1GczO_avgeyzyvXEExqKVMZQkpr595OS5HvQYE71aM8vXECNuAYBHIiyXIxJdb8tZj2I3fNPIGro4nBM5ktjSHo-tS40SwPaaBDVgXdsORcr_fu3eVyTccB2uBfShnmjH_re5jj7Tcd6mH-WO-Sc28G8=w64-h64-s-no-gm?authuser=0" alt="Mundoicopor Logo" className="h-12 w-12 rounded-full" /> </a>
          <div className="flex-1 flex items-center justify-center gap-2">
            <input type="search" placeholder="Buscar producto..." onChange={(e) => setSearchTerm(e.target.value)} className="neumorphic-card-inset w-full max-w-xs px-4 py-2 rounded-full text-sm"/>
            <select onChange={(e) => setFilter(e.target.value)} className="neumorphic-card-inset px-4 py-2 rounded-full text-sm">
                <option value="todos">Todas</option> <option value="cielorrasos">Cielorrasos</option> <option value="aluminio">Aluminio</option> <option value="vidrio">Vidrio</option> <option value="remodelacion">Remodelación</option>
            </select>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="neumorphic-button relative p-3 rounded-full"> <CartIcon /> {cart.length > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{cart.length}</span>} </button>
        </div>
      </header>
        
      <section className="relative w-full h-[60vh] md:h-[80vh] -mt-[88px] overflow-hidden group">
          <div className="w-full h-full flex transition-transform ease-in-out duration-1000" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {slides.map((slide, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 relative overflow-hidden cursor-pointer" onClick={() => setSelectedImage(slide.url)}>
                      <img src={slide.url} alt={slide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative w-full h-full flex flex-col justify-center items-center text-center text-white p-8 pt-20">
                          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg animate-fadeIn">{slide.title}</h2>
                          <p className="text-lg md:text-2xl mb-8 max-w-3xl drop-shadow-md animate-fadeIn" style={{ animationDelay: '0.3s' }}>{slide.description}</p>
                          <a href="#tienda" onClick={(e) => e.stopPropagation()} className="glassmorphic inline-block text-white font-bold py-3 px-8 hover:bg-white/30 transition-colors text-lg animate-fadeIn" style={{ animationDelay: '0.6s' }}> Ver Tienda </a>
                      </div>
                  </div>
              ))}
          </div>
          <button onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)} className="hidden group-hover:block absolute top-1/2 left-5 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white transition-opacity duration-300"> <ChevronLeftIcon /> </button>
          <button onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)} className="hidden group-hover:block absolute top-1/2 right-5 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 text-white transition-opacity duration-300"> <ChevronRightIcon /> </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {slides.map((_, index) => ( <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}></button> ))}
          </div>
      </section>

      <section id="icopor-designs" className="py-16">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Explora Nuestros Diseños Exclusivos de Icopor</h2>
              <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">Contamos con una gran variedad de figuras y texturas en icopor para cielorrasos. Desliza para ver más y pasa el cursor sobre una imagen para verla en detalle.</p>
              <div className="flex items-center space-x-6 overflow-x-auto pt-24 pb-24 px-4 -mx-4 relative z-0">
                  {icoporDesigns.map((src, index) => (
                      <div key={index} className="flex-shrink-0">
                          <img 
                              src={src} 
                              alt={`Diseño de icopor ${index + 1}`} 
                              className="h-48 w-auto object-contain transition-transform duration-300 ease-in-out hover:scale-200 hover:z-10 relative cursor-pointer"
                          />
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section id="tienda" className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Nuestros Productos y Servicios</h2>
            <div className="neumorphic-card flex p-1 rounded-full">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full ${viewMode === 'grid' ? 'neumorphic-button active' : ''}`}><GridViewIcon /></button> <button onClick={() => setViewMode('list')} className={`p-2 rounded-full ${viewMode === 'list' ? 'neumorphic-button active' : ''}`}><ListViewIcon /></button>
            </div>
          </div>
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-8"}>
            {filteredProducts.map(product => (
              <div key={product.id} className={`neumorphic-card overflow-hidden ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
                <img src={product.images[0]} alt={product.name} className={`${viewMode === 'list' ? 'w-full sm:w-1/3 object-cover h-full' : 'w-full h-48 object-cover'} cursor-pointer transition-transform duration-300 hover:scale-105`} onClick={() => setSelectedImage(product.images[0])} />
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3> <p className="text-gray-600 mt-2">{product.description}</p>
                     {product.price && ( <div className="my-3"> <span className="text-2xl font-bold text-blue-600">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(product.price)}</span> <span className="text-gray-500 text-sm"> / {product.unit}</span> </div> )}
                    <p className="text-sm text-gray-500 mt-2 flex-grow">{product.details}</p>
                    <button onClick={() => addToCart(product)} className="neumorphic-button bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 self-start hover:bg-blue-700 transition-colors">Añadir a Cotización</button>
                </div>
              </div>  
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-10 bg-gray-100/50">
        <div className="container mx-auto px-6 space-y-16">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Conoce a Mundoicopor</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-600">Con más de 20 años de experiencia, somos líderes en la venta, distribución e instalación de cielorrasos y servicios de remodelación, comprometidos con la calidad y la satisfacción del cliente en todo el Eje Cafetero.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="neumorphic-card p-8 text-center flex flex-col items-center"> <MissionIcon /> <h3 className="text-2xl font-bold mb-3">Nuestra Misión</h3> <p>Ofrecer soluciones integrales y de alta calidad en cielorrasos y remodelaciones, superando las expectativas de nuestros clientes a través de la innovación, un servicio excepcional y el trabajo de personal altamente calificado.</p> </div>
                <div className="neumorphic-card p-8 text-center flex flex-col items-center"> <VisionIcon /> <h3 className="text-2xl font-bold mb-3">Nuestra Visión</h3> <p>Ser la empresa de referencia en el sector de la construcción y remodelación en Colombia, reconocida por nuestra calidad, cumplimiento, y por ser el mejor aliado estratégico para materializar los proyectos de nuestros clientes.</p> </div>
            </div>
             <div>
                <h3 className="text-2xl font-bold text-center mb-8">Nuestros Valores Fundamentales</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {values.map(value => ( <div key={value.title} className="neumorphic-card p-6 text-center"> <span className="text-5xl">{value.emoji}</span> <h4 className="mt-4 font-bold text-lg">{value.title}</h4> <p className="text-sm text-gray-600 mt-1">{value.description}</p> </div> ))}
                </div>
            </div>
        </div>
      </section>

      <section id="testimonios" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="neumorphic-card p-6 flex flex-col">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 my-4 flex-grow">"{testimonial.comment}"</p>
                <p className="font-bold text-right">- {testimonial.name}</p>
              </div>
            ))}
          </div>
            <div className="text-center mt-12">
                <a 
                    href="https://g.page/r/CbwvlcxIYNs0EBM/review" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="neumorphic-button inline-flex items-center gap-2 bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors"
                >
                    <StarIcon filled={true} />
                    ¡Valóranos con 5 estrellas!
                </a>
            </div>
        </div>
      </section>

      <section id="preguntas-frecuentes" className="py-10 bg-gray-100/50">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                  {faqData.map((item, index) => (
                      <AccordionItem key={index} item={item} isOpen={openFaqIndex === index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} />
                  ))}
              </div>
          </div>
      </section>

      <section id="cotizacion" className="py-20">
        <div className="container mx-auto px-6">
            <div className="neumorphic-card max-w-4xl mx-auto p-8 md:p-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">¿Tienes un Proyecto en Mente?</h2>
                <p className="text-center text-gray-600 mb-8">Completa el formulario y te contactaremos vía WhatsApp para darte una cotización detallada.</p>
                <form onSubmit={handleDirectQuoteSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="name" type="text" placeholder="Nombre completo" required className="neumorphic-card-inset w-full p-3 rounded-lg md:col-span-2"/>
                    <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                    <input name="address" type="text" placeholder="Dirección del proyecto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                    <textarea name="project" placeholder="Describe tu proyecto aquí. Incluye el tipo de trabajo (ej. cielorraso, ventanas), medidas aproximadas y cualquier otro detalle relevante." required rows={5} className="neumorphic-card-inset w-full p-3 rounded-lg md:col-span-2"></textarea>
                    <button type="submit" className="neumorphic-button w-full md:col-span-2 bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"> Cotizar por WhatsApp </button>
                </form>
            </div>
        </div>
      </section>

      <section id="ubicacion" className="py-10">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Visítanos</h2>
            <div className="neumorphic-card overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.994269165383!2d-75.72658102588147!3d4.599182542457852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38657685608799%3A0x34db6048cc952fbc!2sCielo%20rasos%20Mundo%20Icopor!5e0!3m2!1ses-419!2sco!4v1720562650742!5m2!1ses-419!2sco"
                    width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación de Cielo rasos Mundo Icopor"
                ></iframe>
            </div>
        </div>
      </section>

      <footer className="glassmorphic mt-20 mb-4 mx-auto max-w-6xl text-gray-800">
        <div className="container mx-auto px-6 py-4 text-center">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczO_avgeyzyvXEExqKVMZQkpr595OS5HvQYE71aM8vXECNuAYBHIiyXIxJdb8tZj2I3fNPIGro4nBM5ktjSHo-tS40SwPaaBDVgXdsORcr_fu3eVyTccB2uBfShnmjH_re5jj7Tcd6mH-WO-Sc28G8=w64-h64-s-no-gm?authuser=0" alt="Mundoicopor Logo" className="h-16 w-16 rounded-full mx-auto mb-2" />
          <p>&copy; {new Date().getFullYear()} Mundoicopor. Todos los derechos reservados.</p>
          <div className="text-sm my-4 space-x-4">
              <button onClick={() => setIsPolicyModalOpen(true)} className="hover:underline">Políticas y Condiciones</button>
              <span>|</span>
              <a href="#preguntas-frecuentes" className="hover:underline">Preguntas Frecuentes</a>
          </div>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com/cielo_raso_pvc" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Mundoicopor" className="neumorphic-button p-3 rounded-full text-gray-700 hover:text-pink-600 transition-colors"> <InstagramIcon /> </a>
            <a href="https://wa.me/573121234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Mundoicopor" className="neumorphic-button p-3 rounded-full text-gray-700 hover:text-green-600 transition-colors"> <WhatsAppIcon /> </a>
          </div>
        </div>
      </footer>

       <div className={`cart-modal-overlay ${isCartOpen || isPolicyModalOpen ? 'open' : ''}`} onClick={() => { setIsCartOpen(false); setIsPolicyModalOpen(false); }}></div>
       <div className={`cart-modal w-11/12 max-w-4xl max-h-[90vh] ${isCartOpen ? 'open' : ''}`}>
        <div className="glassmorphic p-6 md:p-8 overflow-y-auto max-h-[90vh] text-gray-800">
            <div className="flex justify-between items-center mb-6"> <h2 className="text-3xl font-bold">Solicitar Cotización</h2> <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button> </div>
            {cart.length === 0 ? ( <p>Tu carrito de cotización está vacío.</p> ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <div> <h3 className="text-xl font-semibold mb-4">Productos seleccionados</h3> <div className="space-y-4"> {cart.map(item => ( <div key={item.id} className="flex items-center gap-4"> <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/> <div className="flex-grow"><p className="font-semibold">{item.name}</p></div> <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Quitar</button> </div> ))} </div> </div>
                    <form onSubmit={handleQuoteSubmit}>
                        <h3 className="text-xl font-semibold mb-4">Completa tus datos</h3>
                        <div className="space-y-4">
                            <input name="name" type="text" placeholder="Nombre completo" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <input name="address" type="text" placeholder="Dirección de entrega/instalación" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <textarea name="measures" placeholder="Medidas y detalles adicionales" rows={3} className="neumorphic-card-inset w-full p-3 rounded-lg"></textarea>
                            <button type="submit" className="neumorphic-button w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"> Enviar por WhatsApp </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
       </div>

    <div className={`cart-modal w-11/12 max-w-2xl max-h-[90vh] ${isPolicyModalOpen ? 'open' : ''}`}>
        <div className="glassmorphic p-6 md:p-8 overflow-y-auto max-h-[90vh] text-gray-800">
            <div className="flex justify-between items-center mb-6"> <h2 className="text-3xl font-bold">Políticas y Condiciones</h2> <button onClick={() => setIsPolicyModalOpen(false)} className="text-2xl">&times;</button> </div>
            <div className="space-y-4 text-sm">
                <h3 className="font-bold text-lg">1. Cotizaciones</h3>
                <p>Todas las cotizaciones tienen una validez de 15 días calendario. Los precios están sujetos a cambios basados en una visita técnica para verificar medidas y condiciones del área de trabajo. Cualquier modificación al proyecto original puede generar costos adicionales.</p>
                <h3 className="font-bold text-lg">2. Pagos</h3>
                <p>Para iniciar cualquier proyecto, se requiere un anticipo del 50% del valor total de la cotización. El 50% restante deberá ser cancelado al momento de la finalización y entrega del trabajo a satisfacción del cliente.</p>
                <h3 className="font-bold text-lg">3. Instalación</h3>
                <p>El cliente es responsable de asegurar que el área de trabajo se encuentre despejada de muebles y objetos personales antes del inicio de la instalación. Nuestro equipo tomará las precauciones necesarias para proteger las áreas circundantes, pero no nos hacemos responsables por daños a objetos no retirados.</p>
                <h3 className="font-bold text-lg">4. Garantía</h3>
                <p>Ofrecemos una garantía de 12 meses sobre la instalación y por defectos de fabricación en los materiales suministrados. La garantía no cubre daños causados por mal uso, desastres naturales, modificaciones por terceros o falta de mantenimiento adecuado.</p>
                <h3 className="font-bold text-lg">5. Cancelaciones y Reprogramaciones</h3>
                <p>Las cancelaciones deben ser notificadas con un mínimo de 48 horas de antelación. Si la cancelación ocurre después de la compra de materiales, el anticipo podría no ser reembolsable en su totalidad para cubrir los costos incurridos.</p>
            </div>
        </div>
    </div>
    
    <div className={`chatbot-window glassmorphic ${isChatOpen ? 'open' : ''}`}>
        <div className="p-4 border-b border-white/20"> <h3 className="font-bold text-center text-gray-800">Asistente Virtual</h3> </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chatMessages.map((msg, index) => ( <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> <div className={`rounded-2xl py-2 px-4 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>{msg.text}</div> </div> ))}
            <div ref={chatEndRef} />
        </div>
        <div className="p-4 border-t border-white/20 space-y-2">
            <button onClick={() => handleChatInteraction('¿Cómo puedo cotizar?', 'quote')} className="w-full text-sm neumorphic-button bg-white/50 py-2 px-4 rounded-lg">¿Cómo cotizar?</button>
            <button onClick={() => handleChatInteraction('Información de productos', 'info')} className="w-full text-sm neumorphic-button bg-white/50 py-2 px-4 rounded-lg">Info de productos</button>
            <button onClick={() => handleChatInteraction('Hablar con un asesor', 'contact')} className="w-full text-sm neumorphic-button bg-white/50 py-2 px-4 rounded-lg">Hablar con un asesor</button>
        </div>
    </div>
    <button onClick={() => setIsChatOpen(!isChatOpen)} className="chatbot-fab neumorphic-button bg-gradient-to-br from-blue-600 to-green-500 text-white p-4 rounded-full shadow-lg"> <ChatIcon /> </button>
    
    {selectedImage && (
        <div className={`image-modal-overlay ${selectedImage ? 'open' : ''}`} onClick={() => setSelectedImage(null)}>
            <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                <img src={selectedImage} alt="Vista ampliada del producto" className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl object-contain" />
                <button onClick={() => setSelectedImage(null)} className="absolute -top-4 -right-4 text-white bg-gray-800/50 rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold">&times;</button>
            </div>
        </div>
    )}
    </div>
  );
};

export default App;