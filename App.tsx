
import React, { useState, useMemo, useEffect, useRef } from 'react';

// FIX: Add type definitions for SpeechRecognition API to fix TypeScript errors.
// The Speech Recognition API is not yet part of the standard TypeScript DOM library.
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: any) => void;
  onend: () => void;
  onerror: (event: any) => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// --- Constantes ---
const LOGO_URL = 'https://lh3.googleusercontent.com/pw/AP1GczO2xbFnHWenHS0R5JJih1sCqz-4V2qQPqDCOyAf-80E63H817eWs94woV1q1ah0gFDNjs3G0aUIJElSH2URp2wGP4Qb9opR8tELd2Q03vdFegrpcheOipDQ2X5MejcXG46nCPe8IdOzAh6FvLWGyDg=w991-h991-s-no-gm?authuser=0';
const LOGO_URL_THUMB = 'https://lh3.googleusercontent.com/pw/AP1GczO2xbFnHWenHS0R5JJih1sCqz-4V2qQPqDCOyAf-80E63H817eWs94woV1q1ah0gFDNjs3G0aUIJElSH2URp2wGP4Qb9opR8tELd2Q03vdFegrpcheOipDQ2X5MejcXG46nCPe8IdOzAh6FvLWGyDg=w256-h256-s-no-gm?authuser=0';
const LOGO_URL_ICON = 'https://lh3.googleusercontent.com/pw/AP1GczO2xbFnHWenHS0R5JJih1sCqz-4V2qQPqDCOyAf-80E63H817eWs94woV1q1ah0gFDNjs3G0aUIJElSH2URp2wGP4Qb9opR8tELd2Q03vdFegrpcheOipDQ2X5MejcXG46nCPe8IdOzAh6FvLWGyDg=w64-h64-s-no-gm?authuser=0';


// --- Iconos SVG ---
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
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg> );
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /> </svg> );
const MicIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> );
const SendIcon: React.FC = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> );
const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>);
const PlayIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /> </svg> );
const PhotoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /> </svg> );


// --- Tipos de Datos ---
interface Product { id: number; name: string; category: string; description: string; images: string[]; price?: number; unit?: string; details?: string; videoId?: string; }
interface ChatMessage { sender: 'user' | 'bot'; type: 'text' | 'options' | 'product'; content: string | { text: string; options: { label: string; query: string }[] } | Product; }
interface Testimonial { name: string; rating: number; comment: string; }
interface FAQItem { question: string; answer: string; }

// --- Datos de Muestra ---
const products: Product[] = [ { id: 1, name: 'Instalación Cielorraso Icopor', category: 'cielorrasos', description: 'Solución económica y versátil para techos. Ofrece aislamiento térmico y acústico.', images: ['https://lh3.googleusercontent.com/pw/AP1GczPE24mZ9UcezZcZykGOcB0bBzHN57qzv_74BpkwjadAKsm6Wd4ZQJp05ASg4uw34ILghL6EniSSMYLWM_WKvW49krIJz2J3EqIbhItJVYj0ymv2XF5IIww6a-ApWOT_fuz02aiLDxnvOXP2fYMGH_o=w544-h563-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNKdGsEvgE0X4XkbjEt_PyuOOaDN7mUuGFFesuGIRlhzNXX1_miglU5DnOMIqmRVEGLIb_iT5ucfYw9HgIlvO7GnfR7P9OwUFBKoSP-U3Mqu4PuWo8rJZRyDyBZgj2ctNH_espTdG3RdK7yAEzX7wU=w544-h616-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNUrN4myHiNxL1uaRWc-IDemTcTPOdYpS256Kx3854Xw5y5Lj2etuBD5MrGDJV1glSBxLxZ4skmjVbCY86CZwO9iLlpF4DVgjcvSUxDBMc8oVZKqsJp0IDTPDlt82A791tB7tL18YRA2YdogQ36BwQ=w538-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMWIuwLjGRxUkvwkAjNaU1_8VzvoeV1RK_o1D0vX-myvQt_8iemWPG00nDyx3mDGRnHmn161QjCVbkLYsS28roZkcq0md9rq68UEHU3hFYu6FChO964Fm910qStGN1aGngplGhywjC1_g_7IfAPhP8=w608-h936-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMmGx0ZdSGqq4K31lnBL3wl5yG5VZfqH7F_cSjq4Lp4rKHhyhrNbtiWsm16YqtszmKwJdDCvqaOfcXBLSuI0JdLSHLaSRL5REMCSgwwpwUDuS7nzYd_LQ68LdJ5QE3Gu2b5c9lH6ub7_elpm5M8uLE=w896-h807-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNlixUibXYBdyexvAI17YPs4C8z5VyNL7rFLZtXfLwcxh40ydLQ-eKqQ_377JruinpQS07A8eq5nz32T23rkTLqMKoqjyu6LwrQ-mKwLmyfmH-PjlRvsVRNrWNS5GbBJs_6c7sT3nii5fMLZkBDskc=w512-h905-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPjXMrkw1fi7rTYTHC9xwxP6lLw1AyDz5tN2bul7cvavZOpSvETe-zLK3tR2kC9o48t7gh6KcoepjQ5xR8lw9LsOIHbZNXEuJ4lb_9WsZ1tNpvEzEcXlUq5LebWkmiQhIG1frs6WNT4wLVhNUPH_oc=w566-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMwLFfpnX9RsGkaBa9AAoPSOwrJ0U3hnQeK5bdtyq3tLelF0YsD0GxQI6VCz1h96IN6t0gy194J3lN3Q4LOHtHMj7haSRPNq3n3r-e0CyqfzFqsjJ_mIVFv6Y_cOAsWLNhGnRadL8vY3SH5MCp3Z98=w518-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPq-jUqU2FoP9bLkFebFFo2IKj5BIHrCAHHZx8f2TuwZ8NkhQQXiFi5_48j5WerLDLv5EQKpC7Aa_-m2Az9LPiYghbDRuJiJFn70iX-s-vm3AhFNK0G70rcj6qCJAMTMIO4enNgN7VKeWo3hWVro4=w991-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMhrimRDCNHo0aWGaZWV6RTehxpzaHWoUdhMQ1JG3KQHja_CtbLCtiOCFpxKYnrTy0jAt4fHdIsBfjaXPQNw1_sU91Am92boTV2vTuqA5mX3yAM487zo7VVA3VxbBZl2VRDHtMeXA6brsJoqxjDc54=w931-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPCb5bSQ2rnkCVOI71VS6SAt4k3RZrqXD7PNDLDE8CEb71T-BrRokzq-hBXiviYRnVEKY1LXfmBjFEJYrvc-_Ekuec5yE_836L1l8xxESnfSAwHnlnUrLpxOltdKqM9UNgZGr9cog_J9WKyu9W5ikg=w434-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOeSwz3xec7Ksk_YNRTmdJblVHUghGIU7Uaq4wI3FQMgzxkPZY22ZhQizz7-wy6HR000-Xle3PGp5csGvu-mZqKBpzvAHjNpi_k547362PCvAIzVJAfJizmPElYZOt-lgyFjixuUfnxyxvITm8spYU=w1056-h941-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPYOxScCy_rFr7lDM7stC-6308jgwa858Egn_i0i-slxRc_koN3NmtHGMACjeNGKQrrTEBzJ_8pLccHCGMPYO5768ONX6f1maDUu_vb08oHat6ywl3swxILBGv0sqR1tkB1Mq5_GKobsplC_xWxszU=w619-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPySGlIlaWDWXrlO9UKA6SyBAyejxaKd0xHh4fz83Ves0-WiKIXWgpb3ImL7Bz6aPNYqzwMUNJ5c5iVhpqKPxeJgBIbIdRCg6xb4mEcW9uIy3-oS0X_nI1it6RBt9XRd9XQ2OgWyrBfZMT6eZfoCFo=w474-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMJT8jlwbfI5_joGDTMty743rDQwdWoMrwUaNJfe8ViaelGAVV4WosV1BqmOKsp-Pp88YfCLwC3DmlY-F3if_okE48cGTLP7WyYzi8SfYrqg1bDWU8Bheg69F5qoEIQ1ctQibrS44fv8lsdIxp5sCI=w619-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczN5gOTWGZX63hjuQt1P2I8V7TVglpuVztU4LDJrBEkggimHQ_UgVeNKAf9LBtPfjzRjv4H7hxw4sdJODWCobAczr4Sb4zh83_Gq6uwZudXDg4e8FAviDlyJaPr9UH3wjjj7X-vpzK1OmDWjmGR39fI=w566-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOshJuArHIVhB7_VzJRjBAb_e8w35VfEtcy_SdREez5Mhn1Xt8t-VAvgUUqeuAiogIE-_zDBCe5NWMR499o4kuBD6_utkWc-zf1PJ8GXoOwAdBbm0lGJo7fYNj_L8gUQM24Ch6Ik3M3ebQ-5dnxz6k=w600-h600-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOidC6cJWQF8aaeaStJ_dG1f3nByM4Z3T5QtSzdkDwzma84IL3cDpcks2ltPLW7vigNteP760qjkk4BEI3UxRX7SkF5yNpJQ8JojggXMD-qVAE1haMSXsgvh2o6aSVqFWK64d-7jfgZDHFqWlbuFF8=w1200-h675-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNKpeflrsP9eQLuEDqItYxYG3FdUJOY6csRrvWL8LKsO4EmXoG594PQEWBFWMJ5u5MIRRb9K9zfpIGf0EwsZ1usyGvJN-Gp09SuLYSiYUm3PlwwazQy6Lgb0Dlu0pwV8EMzRkmtCcrGTC_BYHxcAkE=w874-h412-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczN_3gGQxVQ_YQcc_f3h802JcnqSG6gVnUrhXF0_0T9ngoJVv962QyU2RcA5kjLvRd9BLQiIT68AeoFSSSSdC7J-ypTmb7BG00oh9tlOidyGa5HNImICiFYKqt5Tans-ccjKUqvXb15Fdd6B36t-lw0=w602-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOpDZeiJbf0Jja2KDCUpRq3pesPw0A0e06cY3Y1Rq5u0rZe9QnPnp0ni-gaOuIQeWG2nt5JMDDCfbAcSar8shq8PZ2ww_ED4-fo951NfZt_wA8a8908pclbBRaxatet_YT5mI7qxWxTNnRUSetrYx8=w602-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNyRZauHop4-0VVbcwPH-ryZGk8D7IJFq0NUclE9Odm3s7p3-VJJoTV7YQPX35tu97M4jykA2nw4jPH32XBAhu7XKw8lWyRk7oqfmxSEMy662pRf0guUANB31Tivww33BJzkcb6R1wJ6ec7qO5e7t8=w602-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPbsYQY06WXoLj3YCXSMTHwQ58OhRSWgxoOBTFAz4BAM08CU7OvHSOR3nX-AQbPyxkWZAZ2AlDEZAhl7nhe7-25mi0HMpaoaewZmWgk_HINXcz2SAJZ8m-qVATPjlEDNqgl8cvtl-O1i7bake79LAI=w412-h991-s-no-gm?authuser=0'], price: 23000, unit: 'm² instalado', details: 'Precio por metro cuadrado todo incluido para áreas superiores a 30m².', videoId: '2JMNIE9LdqE' }, { id: 2, name: 'Instalación Cielo Raso en PVC', category: 'cielorrasos', description: 'Acabado moderno, resistente a la humedad y de fácil limpieza. Ideal para baños y cocinas.', images: ['https://lh3.googleusercontent.com/pw/AP1GczNSEfQv4PgsuJP10nvTmE30XtmbsGs9bjPctIc1i9MvMNeWUAGqyUpZ4QKFBwUXKxjYzW4EaztKwJzV1bB0OqqjsW8xq_HiZ4t-54i0bXiaJB83I3bTLJsrDkTKf_bDpLlVYGWakRCWTIikppi6iqgC=w1200-h675-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPCOvWnSoFn9buxTaIYUE4aqeib-e5SFS53NkaKMJMKSciggjzN6yo1a6NJewTH-Am6q-87fDyIMUMY03GofScvrzyyS4b-F6HEbFBsGJxAlVSGUXKsEqZj08UFaXDcyrPNRv8qcL3Lm2o3gVemZ88Y=w600-h400-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNWxHObc6nAbfC3ryLNNdVSLxvlDfFv9mb1MLlYgRvjHcR3YNrUToW-yerApyxO0txAErziw9QMQqL5kU5mT_auiyCg6skXea2ab3Thz6HZs-Tuo90v-P5U6vZH39QW-pa2AVxZs0til0DI0lGagwYc=w205-h246-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczO9mcV85l7qJrJmFo4uuuSIvDE-SScvcjiaOBzNesGelcxSSjvEorb5NMOkGLfgR8pIaypswXjYfZOaYvzM8ZpVaXSKqYzeCcbpr_CUQIRD5TDHRBcqtOQsuj_n__3ATRhFmVAnN-SueoSa5VlXD_ma=w768-h512-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOcglJdTRQW_DqphZjtz4t0fSc0ItcEm6AnZU2nTPsDern4XlBj03jO-ZiNSGFoN9fU9H-zru11SsN3De-GcolT8BB_lEPTPR8KgYTVQXe6t4HcZ0Plt1vWeYxx2hQx503CFd2DEjJ1xX_W47Av9zvW=w550-h550-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNasdOlUUOIdo8qandK_rCReolacVBPCIMx_YAD9Spyn9Mtt3-iERaO7vU16PutNyr8jtVC2jMQYrDXut2CvFwTjyaiED5zpiBogwe7REE1Z_msBniIPyH3-2bH30llbLo30TVXnaW30Bfvk20wIq1p=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNybLhXEYd0AbPBNTnLWwRgAI7EZ3DRUdrlIrCfnLsu1rrSIwmYzxHzIa9eItHeKP55tltd4jOU-RWY50Hu0iWcV8Pic4XzzM1JF7ZPE6cAfK0CB8SUUCIn9H7fhPjEkTha7IlgtLRtnsgrG4HZjvq2=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPVzIemKc1j3mQ11E7sZ63t8Eit0L18IKYN6e-9SKt6ZyNcfBPqihqAGfJp-wjRke4VpoRD6smHVTSwHLbZK1alSxcD9pqgpFWsOLtupsPMm_TIvpuujY4kCEvfI2pIyR2RROcG-6yjz8Lr2Xse4ywj=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPt7lXO5Rj7wANI8xS_m7cgSJuv9J2FWbWJBNxHLFp8Q6ZIrFswp6LfxO4pE61aQzQoZKeGUQnRuzVh2xciWNCJRppMH3kwkJ68mftvjVgIgAGJMH6DpjsgjtldipnIFxb50AaAn3jJ517aqMcQkkUi=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNZloB_MA0EQjnqLuwHW6SJj643TA1ZSjx5bZUxmGI8Q_CS6bXtfQcRAKzMJenafTeOR5_JCcuoCCao-9d1kKHf1XNRik0f2o_5_1GoIm0MdpQxO7325goccMA41vEFVW7JYspgBbRezzVN1xm7aEX7=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczObms80xWmsR7y4PiUFxHxLAr0oekDarK70G8mP8ULZoFDujCI9evewg6-1qjD66xZJOfDARw89CdSNKBrkLN4d9gWQ1eHkpGCGhs9l-mcCG-mb92gHRv4OioSZHnEPXV74uMnW227qHb4m_rwItasy=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczM-8q8oK_udDzPylVfVWwQagKG5grhIWGs8ph82XpPn9_vaz3LbR_75eh6FH5WU11zI51EuqxdoOiin0J9kXeqm0EfXzaerCpy0ZstEl5a7xg80LwYZhSUeanzisoSF2rOoWNd7zCy92-s2XnG02mJ=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczN-7U19ZDcTeZP_X-sp9zEHCO-4Mv-YeVBHlKq0pYUV1WbwyYceOZhDT4XewGqLakEUx9awuUPKrxok7mZRlCSpy6OtPfGtseXIorxAgUFTmgwcazBZc74El5-nlaamHsJOtMRDIZdAST7zOJZu5KoT=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMRwJpOIgdh5pD0AJX5CK3Ci7Ql_fCtfRg0MY6UFjuxMeotpRTA6tfMNfvrcPWsvFeI4x46tFLfmMDOzTU5F5Rva677d8SUM_ge7qlHnGEutfBLhWCBGNUVva4V5h3pj2F0xDS3vnNIM5_kObSvnHm5=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNWv5voj3wLgVem5_SGMQg2zfRGukntRS5TvCLX-2QMmofNflQkWTIM0AK63DsVON4-KFYTnEefsE4772nYY4ZmzlFh9BFBbq3G60W-1Hiu5u4djf0wPtn_5fFc-dxh_MtV4P3WGcF5AqtDTcVNxoz4=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNyw9liKu88JQaoJKsjIeTCmP2mD0Jb0zA6kj6L6bN8E7aIuQGfUsF2G6lVJhMBMDbSrCdRaIF4wbE2tuNqpPV6ocuOkwtiXkDust3l94pfOiA5PoSGIDwHxwTsKVzaP_X-trAlnUPKNTJxJNlvScYo=w800-h421-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOx-5M2zOwaVfgJuF0rqSSEjCbC4IJgHTI26L1h_C3ZvjTZFbE4jgjuMeWx2n5WQ2REkRmZPnntEoVxjUsi1FYe32ZYn8S3jb0s6gzNwjsjUfy8Fxy6d1B7_t3-H7gi5djpkwimv7EVnneykEaDu1GW=w768-h512-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOKHyyttRwGIhFVG8G6xlsRK2-aC1-Pzf5jGHF_PZNN0LNmIsDZzzsZkU38a0vndIqOOd9x1Q26HBCIC8xfxly3ZH14J8QDgam3dMhxuN9icqvKZRNj9cUQsj-06Hy4Kif5viO5z8NXO2k-htRvsV3Z=w768-h650-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOIivul8BzSp6tEtnP4x6x_OYP3MVk1qkmIXOJ2Y0cyq4JOlZSt3HntMgGSGjKCc85Ten3h6ZsqO66N4NCNtFhQxD5A-mP3lnbwdQ2o5poBf4ASja20TMBIO50vPfFLXUOHO5QfCs37jS6tahrf26Lv=w600-h600-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMWUv0GXms10uPIVtLsItakxP5DhZYRf_6vDJEbslZE8a-U6Re3-nwkN_94GEalbS0qZQLlVP8a_-k1qxtzenFcOixaJnXTY-4vUeOJ9-nKpv0zdsTLeLxEWw2KxgOQu1Mo7vS67vhvX2SXdS8fayZK=w300-h300-s-no-gm?authuser=0'], price: 36000, unit: 'm² instalado', details: 'Precio base. Costos adicionales pueden aplicar para lámparas y acrílicos.' }, { id: 3, name: 'Ventanería en Aluminio', category: 'aluminio', description: 'Fabricamos e instalamos ventanas a la medida. Diseños corredizos, proyectantes y fijos.', images: ['https://lh3.googleusercontent.com/pw/AP1GczNjNsMnhs08Uf4bP9FJO2rKejJOqICXdpjqev7Uxggj5j9NCi6z6b_MHK1KNbdrfImwvFC7mKudLL31uyGYsEaspTHmzFW1wal4f649U0PS34B4QBptEuaWq5n1QB8vlNm4qN-xXX6F9gmoEwcg_pM6=w1485-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMhnFNYYP-VyrJOcq2nidNvt0vRj84oETx4vEpv4kM3O4jvUban0A5SZHz_WDvkj8DLw6PSO42fqi9JrF4HwBNz1k__wiz3z3Msowv9TGzt9p5gbvEdePj9jrP464xhHclYsYTXd44TRJj7WHPmbxIf=w1487-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNGcXJflpIILSPhn8KbpYMy4JR7MzjZEDCmYYPECds1T57CfOrQjLiC5HPU7YT-qCEWbK5c7ZA2H9MQMRsgmOq0ugYFwh1vR8SbaLnCskm2COTN5uKtWb9XmuKLCsMfGHRuXOpLJfmNnQf2BndOmcYV=w1487-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPVGaye0T_6dgcg0FsfMOZk8AluXXZQAhZtJ-O9h4MOnCPzoSUBmKQVz5loaUaR4ZWlmdLVvnXXBKTHBTBSwKOYsnnUobdq6L22v1-jTFHifSrCVssWdAuYKpEI5J2nnXgHexVyqiCJOlvrX2FQOeos=w661-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPkjmzjxfXjsM4gO59au9BhVtvPdLycHHjODzSgDUxHFLkdEsomT43tvMANEbWLLNEwizbNTQeGr8Vt4F2CLr1TiYtd8ZQqKfOdu6K4B1oRI1FjXjRmU79vup-qXzESBlTitkM-iqHnN41Lm0yOfx1D=w661-h991-s-no-gm?authuser=0'], details: 'Se requiere cotización según medidas y diseño.' }, { id: 4, name: 'Divisiones de Baño', category: 'vidrio', description: 'Divisiones en acrílico, vidrio templado y acero inoxidable. Soluciones elegantes y funcionales para tu baño.', images: ['https://lh3.googleusercontent.com/pw/AP1GczNor1NwF6hEYFSsdg00ZDHQi9RYVEjYxxqqje7k4LVCcLzRWgXRsR4qUvVa8PHg6ciXjjZvNmiVKEjXsZv4c_cLuvKIBlmmMm2H79BMlGVubL3U9Ltyf8W6GQyzo1FDX88DfZxOeO2u6zp9DIaG3KV2=w557-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNTx2nw9tkL_tJb0Zqkgaa5bcxMNrYS8CMq61rR63Djc2bbrD_j7SRulgbtxUz3g1sX1CUI5POihM0ci6EyNww6b0Z0DXQczoPFfzOD9a59WjGP9unXQ5RkaipXohHHWj3GMOcSI5rvgR51oIyhB-Hj=w557-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczM4CmkSypv1gUecGHBI3dJgqN7_qZw64CCnlCYIOi_I5OpfezypITH0vmiJFbZaXmpmU5p1tS1yVsBy8gEPPxtHKB0I9q4ii9XXmAjl4vXXTxIvLeY9sodapMpd2Kq1fNQlVVS5knir-dObv22xvEpJ=w650-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczM2QleZXigjT1VaWkYqHYT_eCL7-K8I-fQ_4jkRd_ax5LNnZV2Tn-QepJ-E3GMFK8WiQ4IdeShTlr1Q_JHY3zvZOS8UMp202gHFs-PBszTI_cgZ5rvkvwRrrxvbX-2wLy7IhFo-1pFu8WTn39xsClgL=w864-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPJrcQThm3RO-fsbfCHZ0Tmj8Qf_1ypObePFKmcckSm9MTEMoR1yj9MSCWBCt0_OY0kJSdVkhSkeczufecKt7P6VUZBkTDCBCRCGlbBohVdW3bjozsHN6GBx2QuzFAP3YGWxDEIabMQPYtMP6MgIWZU=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNdb2UXpBuNku6Nsu_VoT8jh4Kt41ztTFQtJIcHcJnxsb6-gJ42uZqk2CwPrGnIqvKcDQyUGgJzLLd5I3SWdbLI1HLf17_-bod86XEvlQT6aXBPAcjyoAakPzAfH-DhlyNe3BLS57EMugccNbx8Doov=w701-h966-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczP9VZjqd5-Iuh8lqG4IQHBth5VzRaS_dbdWoouXn0iMJyNbNIvhyEZtOB5EpmR7tYLLLbwMGY0CplkTZ6RNsLNq71dMQArYndNQhjSQ7eBkvcu6TonPaWJIR3Nni-Td5NyXN3nhxTjVC2nNwgf6Zwgh=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczM2YuEl8KZBVkOwHnMeUnACFUW9WtYin6xnFLNJ1Kakc9SuW-qQQMO0fwlMtYWkhkdTV0VfbBPF73sSpfHRUkDksLfqeJ_Jnp-ys4sG5sPVWkfNFmSf2kGXJAcF3GSx-REZJdxnhfT2gtLRGFxCSX2v=w868-h958-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNmAuRB81wiAQ4sBEmZd0df-RGNbNPfBIQ53_Ptg-ofUcd0NPq8tqcP4ijVu7sx-h6yZlahv5bxxT6cT6o7tmg9nzK0RZmSJqCL5iHtzqeez9-7ECpoItkmMJl3J9pVmpoi32MHa7Wzj71mFIqVYR9r=w611-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMv0VFrB-yZ-2lvdWQOo-OaycnLLfzo25Q51Y8XjLUuqcgETSNQgSj6yBO781p_XwhMpCmP4wV38OaWZqaFYVuo8ttL6AvPoliW6rc_R7zPpk7aa9AHa-IjG17FY5TaWbAnyxiQllnbsnCHMtoYZYTZ=w557-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOZ302zb9wSTgGqHKAfdMMlUACh9rGVrbHFkhd0s_OKLzOQsz_S5HmL3m5qHuwhMa6lQj5ZU81KTdGM3ntpw5-b2g4wDmgEnBUBKO_yiijh84hAUyylKVpgmOdG4euqo3lDvhnQl9yIDo05OkgRe65=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPfebolllzL8vGXedDYQtWfmuXcqk6qH2AmegHcIKTdPBkj0P5lrcp85bDySeP0Ok99L15DT_2Z-GQDYupCETw5GAy3NX8FwgcU2sMG_b67u6R0SZnwqVIAtIo_vNO5i2Zq6-izKQ3cRiZiH2FkgGpk=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNvqbvALoXg1BN84UPyjXljZ3EJGa95pRwNVtOYJZEm2UHEe8FWwTGBQP8JXUoPDHpGWf-i4J6asc3FFKyW7BFk1tZthbnWVOi6ZGXW7g8EWkgbW4VSCA4MtN0VFWkzX5SARM1sa849ezBXZaw6g70R=w557-h991-s-no-gm?authuser=0'], details: 'Se requiere cotización según materiales y dimensiones.' }, { id: 5, name: 'Pasamanos y Barandales en Acero Inoxidable', category: 'remodelacion', description: 'Diseño y fabricación de pasamanos y barandas en acero inoxidable para escaleras y balcones.', images: ['https://lh3.googleusercontent.com/pw/AP1GczNlygNaby5N35jRGu_nsrzbMp7jScZWnIBmBAMhSzpIdKzvvXIko4aZcgXb6PLNzMvC1Gwi-iBVL7r8flRzxil9oqwjqPyYEd0Qb8uO4pLW3WiyepodfEA__-ERw5C5O__oghZvPLJqytrXCQwH5m7u=w557-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczODkSeTxqloPJ593ku3RMgwX9RP7Om_BCecrqsRxeQaa_6U3dqD4ubu92MYn5vtlSJ3dsbnYGRKEV4dbCXTmO9TKCq1QFyXRKdezJgnTA6_fkhV63Ri-DQKB4l45ACYKx0Io-PrRDkNvK389q6MudBM=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNP5IoUqtRRG9tzfyk0Ujd12X5SOeHtTyyhgKM3_N1JVuzXFRpm-DIaebmIJbxwQfgl_a5AS9zq-DW0aRIIF-GJvb5QDn7cbjD-gNgOlwLJTE9WMZ3anyJCsvXeVNUWec-n3mqTuFFARwz1UjX1LaSB=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOZsk0Cnk3rp--PV8G2j25FK-SvEELSErnxeVnzqJI82pND15C7wDSP7iPaCLsfkuydlmh7UA22GDFfHTTRVdq1EqNaTmXF2ITkVvb2EYp9g_GYiAaVfHZsgXYIAs4d3nacqO6C58FejMki81auiZ_k=w1032-h774-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczM8mjhCk0Z_8pgHbT4TaamPVJHAHI6MMNb-HDYF_Dh53y9mNMwwDk4TOFYDxieMndzxm8qsxkuQOOpwrSmEcgfvPCvsmeXEvUOY1s2BY5x8G0m7WiSNek7l4S9w5WPAZjbN9KkVh4Z8qK5hl-Rt-l9_=w1200-h484-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMt2l6t1ZW3hXKZNWdsvA0fkAg-24pxOrq5JQIIlKdXa-eHKe1B5LmHBcoU_nMrQ3h8HmuurC9w2RsStSB15GhXQKQLwsDx4fClcPYqUCrXsRUwGO8xfM2tkc1ikeehh9PJZTZex3C_-qOuuMJUmzlT=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMc3s6dsiLaj9AHYF7lWrSk8jch1g_EvIjh0vKV-dO-QpYycVneDpAGXAmScEEscUdmyhr72SPaS2MTMOpw94wDIlN6gsD9b8jmlZbs4J1-c6n29sE7rrBJLiEUx5JBjXCgZZ86lWNQUZgu4OGo5qnl=w743-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOxbixZk1avorT38snr1555HB7-M7kZbAPp-CX6T4lfmfr25Ov9pLpTwMFDS2Y6gXVQoQEEOwqu9p9DpVw1qRdzoWNDadNWbrgA-Md64Bu-sFfb0ImfxqXj_0bDjLrdt27wt1RSMLGNGIE8J1Ha8ZFK=w600-h600-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPDEZNfLqFvPJfGsVBqw-v381AiUx-kE_3zphGk5-PK8YhM5jjJsgdahO5MUVvkRLxnO9iuZ-bwdD7e-vfwYDN-bpZztmC6XbKklY_qZUoGEp4Kouvri9vFGYT1N-hZtTGybnGgk95KtuZSGl095E9B=w743-h991-s-no-gm?authuser=0'], details: 'Se requiere cotización según diseño y metros lineales.' }, { id: 6, name: 'Fachadas en Vidrio Templado', category: 'vidrio', description: 'Moderniza tu negocio o residencia con fachadas de alto impacto visual y seguridad.', images: ['https://lh3.googleusercontent.com/pw/AP1GczPR-AIlqjetU7J49-roVDnvaHHL3w5Q4G0TbbvSrd5eaRGQg-R1KBitDmMcdqmv96HY24MHjmyDdleOTFPGoUK8df5qQzDvJMKvypyyrdrTKvMbybkGW2eymkyFP6ePzmi852AwnNv8VTVFOsi7dcjr=w1487-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPMfLVMcEzExtcv2bgYkcmqJF1FJnOG__mioG24B01AZdgWsrHMH7q11_-PnVN7a34prAjy0hxJCvbcNGLfKlC8p3n1q6_k_2nr79VY--sNsp9LsPkll034g1TIttHHKtGQxTIdomCqluCaLZWuSy8o=w670-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNMTYPzB0PWX0eMH0nyFmrDh_A29I3TwZtp8rQymU4ZJ3UN3-ZlVJAPjBa1nIHHX_KwYTAOp9fKVRyNxJPZXwWgweL--jZ5nOx_Dg_emSp2HyjtRfsh4SMcGxn7Gqas-Ca5npO72q0N0zAh4KK_DHgz=w683-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczONC3rOxwttyrBL3c0ELeXbQxwbFu4VIyVmOHl-13DAoZpToM-hql0KFEIGkJIevd9SiIBzvhvJxfkRdUh-B9V-zdwyDl28x6UlwzEG7nurH_lBfW9rJ8ZIydywMxZRqJBnQMD9jG49hwVEqtbg05WG=w661-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPfjGa50QAex3OIRTZDrSMKtCRZBsbBPCW8tArltChkEGELNeDPwzEl34v2e-4wzdkg1kxity2Gk9BN8KVTcvy6-XHv-4szeZMZDrig6Tpx8Oha_xppI9uPMyiciGeCPLRVFCr4wqXwW5yx_xdYkL_g=w1346-h991-s-no-gm?authuser=0'], details: 'Se requiere cotización para evaluar la complejidad y área del proyecto.' }, { id: 7, name: 'Espejo Luminoso LED', category: 'vidrio', description: 'Espejos con iluminación LED integrada. Diseños modernos, táctiles y con sistema antiempañante. Perfectos para baños y tocadores.', images: ['https://lh3.googleusercontent.com/pw/AP1GczNvRC-4tS0Qlk8eHXIO6MCkQRfMfk0ztC4c5H1KWqI_Q-uKJ0Pr4RK_PbwsePAw-YJsW_VzXUQdG3nXTChLgZjnCXd7Mg8f4vdkwR1o1KZMKswsWwGchCG5HOQKLbE61axTt39OpMsjKFrH1Shff7vL=w723-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczN07dkp1T9BUAk8rOSmweIjufGyJwTzE2yWxaiL5ZnC9RGuj651Y1571_w9UNl9Saihqxk0ukAV8aCPZxYdg-EBUk_gZP2iMxmoyQFpRiqu0eVk36YTS8N34g0amg0yC88ZYQbcMoMykhIaXoRNgzKV=w723-h991-s-no-gm?authuser=0'], details: 'Se requiere cotización. Disponibles en varias formas y tamaños con diferentes temperaturas de luz.' }, { id: 8, name: 'Espejo Luminoso LED Redondo', category: 'vidrio', description: 'Modernos espejos redondos con iluminación LED perimetral. Ideales para dar un toque de elegancia y funcionalidad a baños, recibidores o tocadores.', images: ['https://lh3.googleusercontent.com/pw/AP1GczM9MSp6N9X3lpz2B6KMsXMNz0in6DttfYA147y8Ato8K8HY5l5CicaOeDwdXsLL7a1ZQ7MQ4TglXkYXHXo2zfJdPtBMSu0q_4Lw3gJl-cFJz3Tofl3ZiTub3k2rpB4dfE9JcPFbJKtW4Y70kuc9_PPl=w874-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPVgVxeK5G5ZjLDjvoEZPwzstZ_kFiN0abyiX6IYRWvRzast2YY875riO5j1h8dKq787eP8-WYajR6P0WjnFmhaw0iCarmF0v8vo13vZqgJkYdjPNZr6Wd4E-YW41piSVfLyKTyRIejvADBeKOt-mCc=w874-h991-s-no-gm?authuser=0'], details: 'Se requiere cotización. Disponibles en varias formas y tamaños con diferentes temperaturas de luz.' },
];
const values = [
    { emoji: '✨', title: 'Calidad', description: 'Utilizamos los mejores materiales y técnicas para garantizar acabados duraderos y estéticamente superiores.' },
    { emoji: '🤝', title: 'Compromiso', description: 'Cumplimos con los tiempos y acuerdos pactados, porque la confianza de nuestros clientes es nuestra prioridad.' },
    { emoji: '💡', title: 'Innovación', description: 'Estamos en constante búsqueda de nuevas tendencias y soluciones para ofrecerte lo último en diseño.' },
    { emoji: '⚖️', title: 'Honestidad', description: 'Te ofrecemos precios justos y una asesoría transparente en cada etapa de tu proyecto.' },
    { emoji: '😊', title: 'Servicio al Cliente', description: 'Te acompañamos y asesoramos para que tu experiencia sea excepcional, de principio a fin.' },
    { emoji: '🧑‍🤝‍🧑', title: 'Trabajo en Equipo', description: 'Nuestro personal calificado colabora estrechamente para asegurar que cada detalle de tu obra sea perfecto.' }
];
const testimonials: Testimonial[] = [ { name: 'Maria G.', rating: 5, comment: 'Excelente trabajo con el cielorraso de PVC en mi cocina. Resistente a la humedad y se ve increíble. ¡Totalmente recomendados!' }, { name: 'Juan P.', rating: 5, comment: 'El equipo fue muy profesional y cumplido. La instalación del cielorraso fue rápida, limpia y el resultado superó mis expectativas.' }, { name: 'Sofia L.', rating: 5, comment: 'Me encantaron las divisiones de baño en vidrio templado. Le dieron un toque de elegancia y modernidad a mi hogar.' }, { name: 'Carlos R.', rating: 5, comment: 'Se nota la experiencia de más de 20 años. La calidad de los materiales y el nivel de detalle en los acabados son de primera categoría.' }, { name: 'Ana M.', rating: 5, comment: 'Pedí una cotización y me respondieron de inmediato por WhatsApp. El proceso fue muy eficiente y la atención, excelente.' }, { name: 'David Z.', rating: 5, comment: 'Los pasamanos de acero inoxidable quedaron perfectos en mi escalera. Un trabajo de alta precisión y con un acabado impecable.' },
];
const faqData: FAQItem[] = [ { question: '¿En qué ciudades prestan servicio?', answer: 'Nuestra sede principal está en Dosquebradas, pero ofrecemos nuestros servicios en todo el Eje Cafetero y áreas aledañas. Contáctanos para confirmar la cobertura en tu ubicación específica.' }, { question: '¿Cómo puedo solicitar una cotización?', answer: 'Es muy fácil. Puedes navegar por nuestra tienda, añadir los productos o servicios que te interesan al carrito de cotización y enviarnos tus datos. También puedes usar el formulario de cotización directa al final de la página. En ambos casos, un asesor te contactará por WhatsApp a la brevefad.' }, { question: '¿Cuánto tiempo tarda la instalación?', answer: 'El tiempo de instalación varía según el tamaño y la complejidad del proyecto. Por ejemplo, un cielorraso para una habitación estándar puede tomar de 1 a 2 días. Al momento de cotizar, te daremos un cronograma estimado y detallado.' }, { question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos transferencias bancarias (Bancolombia), Nequi, Daviplata y efectivo. Generalmente, trabajamos con un anticipo del 50% para iniciar y el 50% restante al finalizar el trabajo a satisfacción.' }, { question: '¿Los productos y la instalación tienen garantía?', answer: '¡Claro que sí! Todos nuestros trabajos están respaldados por una garantía que cubre tanto los materiales como la mano de obra. La satisfacción y tranquilidad de nuestros clientes es fundamental.' },
];
const icoporDesigns = [ 'https://lh3.googleusercontent.com/pw/AP1GczMGv-f0jhQP3KU-vfYhYr-rBZbTNrI536HMgsdg6Q15MkRzvDDfMTOLZy28DGLw8_slcP4Ahtz_iArOz9X5YnpMSz2QCO3A37Cx-z6K2XqNG0J7XF8tmAnoohnawUeeWZRpv9ORUp6BfKvnqXR3WEY=w271-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNu_vANRAEBs8g-o7Cf_ei-60gWY0xY9tvNxpYNpa8wzGscwZDYlAP30UoFF1Obthl7cCYLcR9M8Lne5fZtcvoV_OqUoDtTTdmMAnU7tv7phpaIzT71CxO30zb9-FJqZyxWG_CsHh5NVN0dzhyYJ4U=w273-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOD-d2udQUKu8HvuwlNvJ46NEmR92JIV1g-NnONS707-3mygQ-PELnOikMvDoXTjMWv7FBRZ3sKwxUKc8V3-IE-rBa7fXJccSZjMwxVumWsnjht9Hc7NlNI4gsccMa1evmGxcVcNASzvylA-XqAC3o=w275-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczP-50-tydm1pREE8g2o6lf_Hel6h5J0t-Szu-8WvYYWt-mafT7usaTeyuYcNSioquEqKdy4SResTKwKYSzpNBCkd4kCTTenl2RgDK6qsIMmUB3Qokij-nPFIhFKD-oGemQaE759Sl3L75e7mhWgZ5k=w277-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOstEPzbBTYdM2m8j_ull49o5pwFzpsyXGGQtm5PikXg6oFDEjJZYOlabbUm12v5lB6E0ygiX6wk-qPewtJRn74Ii2wcLhY8KFopqB2tXfBO6dNScL3lMjRfu4CYf8EcNFF4nhPjPAO0hYkaaexKR4=w362-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNhtOPef7s1jGJ533x6qV4llEeeVkRVNGogg7fEcms37k34ZYo7EEpZTkKCGGZ7b7OgT604ek7aI9gVeA7VNJQkZLJXDWW4ntMhTQVpL33LdJnGYS_8iddwPJVtcZdOoBgfagVVHS2oPudtf8uXn-c=w277-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczP1Mgj4HS0suDNCk9iN49sIl-m4IV2l_6ldqRcYbBGN112fw2WY4ctV8nkKy_RSK9gOlQ1aQigC_H61cnl3HR-MLPv1tZzy-ep0EZjcshoalJcTT4MsAewX2LryNqqteRMnh8oFgtSrxPrtsGq-b7Y=w240-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPMfYBiOKERu1Q92F_TIs3aj-66nOo18v3D9BZTqIqW-7oKxHnt1s3dpiOHxYrZ-8EC1rPqEuwj2Weedkfu_UqVrVFEGt87-pXtzWDRl2fpYsCDxJ7khhHoAJya81lS6_LMEPd93DFneCA0Q6c5DhI=w239-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczM7oHwrjgrZl9EFYas996uSrCRh78P3BBdSc33-HeIORlt5CFofiVRTpusbi1EBNRMl27l8TQnGouU_cEbKu_VUtF44KVUaFrJ88xRf536lE4Q_pXSL36ycLfUa64dwOb1vmA3SATcuos4lPdn0MUw=w274-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNSENnab2F7qLwoqOufHTV1p4beu26HDOQoLFzkJA0ynPLbHvMdogAqdt8u831Sox93VaD6kqOCMAToNi6ksTJIT8Yl3u5jyQ9noF407ZLJuNNZJUDPPk_VPvvF_VyFLE7GyogFeb_jvGpaGFXhDho=w416-h991-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMWFOzYVXTPj-aHSyZkEgQpqRuSkdFTWPj9kz2X4QMM5yMogxP0wftl835pQPyWE3ICax8qXiRuXE_tCwJKl7n8mPeZbCZw9XrH1NzGY5LGT5odgwfjJqRfFbwaGSBPET7T7FlzeKDpEdrDef_DCEU=w682-h664-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczORl5KReYJzcXJdWt-ty9hfiKVQQvglbe-CwAHRvjjFobvfMohGPbVuWLrnnYDvLSWw-eIW_YdPtSUw2uGtgdj25llLUloUX3B8moOGL6--Kn4mJ-JqtMiYlodpSc7-A-X_aQg1GI80qJ1kZSQWwuQ=w493-h645-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMM0BmLX5ekS1oJNH069D6i0BQwCBHVDMKcr-B99V8m9CHLS_dtX0j9Czs508hwv0d3Cd5v8rHAYcdVXI422XtmaO1fEQurHRVeQCM2URhWv8Dm1ufoymtnN5YRZqFAFiyyjBdqBt6L8mKOz1U2vxp6=w417-h461-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczP1pJuqDpcmMXbG_3tv_dijPsQtr18VsI2urhouWmcEqGWTvTRwiYxJao0xLMvjsSOWd6tpaX5YVCHilQTkUrPFZNxRy1M-T1yupoPxtKkqyi88-JgHAegKct-0FTs22iZyWg9dasY-5usXwM70GIBE=w424-h487-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMPwn3DQ9Kt2VEsNLToObrnxgUCboM1le6SFju4zrpCWBnUnhl0wkpLd9df1b9Dx0qjqIHDNIwJsNC-fa40yLGiZkzkFcjVxgsRaC5FbpWUaZVIgeL-bpNjz2TD0veKorL-1011OwW0FdCFqsgcRZ3U=w446-h480-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPh9aTD2wF1Dx328VSHtRELK8jNzH-1yehPqjHrH3y8yqWZc_sB9dX5uB1qbaMcOmcQENHRVE-O60qVe_2WWEHysuqAfWC2kiTI5I-gwbEowI3v7mGD6l0sp1hRSx5mog4UjSxzRkbr9TjuIK-N9MDg=w421-h475-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOtFLwfNbQ8OuqvE1_A2obmdf2M-ha7FS2LRue9nldpvWJAADrBlRsD2hvM-kLd9okQAL7fwoaosfeXMYcWY8kv8lgS3547EoQOqkAYrGCUbvqChsW_uWC356dDSMotsRyfmtOcSO2jsqgPL1y_ru3J=w410-h464-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczP8lmr8JjGLl3uLzizZYkaTeUzMREjuKxUxKmEg1bDErAWzKdnkSlzOYosC00wghIGgFdWs41UBkZkoxkZwg0uJz73Hp-2Zg1Nz0OW-vYf_Bl1AC-Cw4S1IUt3PWk-Qgofh1qvaTbIeD9-em-bG7U89=w418-h472-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczPE9CII778GRYzsPf_npSr_-o5SG1eRet4aqvB9BEOM45pHCuKWxl1wsDVUf8qZKpPHC5LNC-vxU_qCDnciKOrgkkPVAkwgTYa_2Nez18OKIQRwl3TiTQMgTQwqcnrzTSF1hYDC7y6g-ml7UN0qV5CM=w410-h462-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOKyctDpxOz-AbWk7l_wjDDCvUcb2wMUMwl53Tdyo20Y04g82y-yplRWt0X5TVtSQiJIU6Y7EaDPqnMac8ABx2f28EdNaUQZUydXkvYiVhf3i3W8kAlB61FymxLhnA5xicFZH2-z_B_V64jD7bRIlS6=w800-h800-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczNvX0Dmgq-jDBXjNA7O5ovTcqpQbJM-mjJzGQ-71qjmDZq2WhaYpl7aKcRulF27sdPCMdp2ARMWlrjsbJjQnxiCnTCqJBoPAACDSy1xszXxe3oip1pSuNA2jxJo--Pi9AOXN9CisL_gG2xikb5bNVu2=w424-h487-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczO82Mw2qE1MZ17SDhg7bSRdPERXg8lAXHm2AY_eZvKF_3CAJVKnJzZ4Ak-yitMLEYLtvVpLcdegm2GgqziPsaT5GsqG_95_x6G1blvQPEuPkZYuxxTIxI1qXjuTbImLu89UdC-q30W74TxE0bLmnxfR=w437-h489-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOMiN9jmoYDrF8_65RrAByiYjKh8ZY2si6OseiJrCdSRY7coRoMaZ6fTr0UEW56P6pWYzwdgXghKRXEBrgocxZhcDG0w4e8vphC_DYGEBz9njy5jweFtTZvdbICNc-zHGBGqoVhv6EyyZCmNRXJkucY=w768-h512-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczMup_iId_1TAfiChuBOuwFRvbxh8qeJJjaXzg30pbK7ox_zx3C0cbTkfX_8Kn_vIHRJ9FQ6-b8ZLpARf9DxlF7nXRcXoEjjdQooyq7ImA7ZBOt_Jz3yDVViW-vdQzLT_WELvZgxlAZPcTJzmL6zZs81=w768-h650-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOn-D5I65phK4s4lnM79WXDxK5p1DeBtpHJZO0d5YJ2IuDmuv011_2O9GzyXMW8r-ImNkZkMvMQEPot0JYWjh59aKswu_IlXNAjwroBXTDVjtTp5V55aQBsgrcp2wgJHVtR--ewHPR_7y1zvj6kziSD=w600-h600-s-no-gm?authuser=0', 'https://lh3.googleusercontent.com/pw/AP1GczOTGRO69VvYMBFv_HhJg5eZjaX1mlDYGFIoitEgW2Ziwi9tIXXhLW5ffBJMpD8RbGSm1cVuj5VQOzzogmz8ffW4AQ8xAylBf7aKRisg5tqtcWsCDgWE9kxxm1r-uAIRJeJQ6AzFrO-XyF2BkFLDiVNy=w300-h300-s-no-gm?authuser=0',
];
const initialChatMessages: ChatMessage[] = [ { sender: 'bot', type: 'options', content: { text: '¡Hola! Soy OvidioBot, tu asistente virtual de Mundoicopor. ¿Cómo puedo ayudarte hoy?', options: [ { label: 'Ver Cielorrasos', query: 'show-ceilings' }, { label: 'Ver Catálogo Completo', query: 'show-all-products' }, { label: 'Cotizar un proyecto', query: 'quote' }, { label: 'Ver Ubicación', query: 'location' }, { label: 'Nuestro Instagram', query: 'instagram' }, { label: 'Dejar una Reseña', query: 'review' }, { label: 'Hablar con un asesor', query: 'contact' }, ] } }
];
const recentActivities = [
  { icon: '🛒', text: 'Alguien de Pereira acaba de cotizar un Cielorraso en PVC.' },
  { icon: '👀', text: 'Un visitante de Armenia está viendo Fachadas en Vidrio Templado.' },
  { icon: '💬', text: 'Maria G. ha dejado una reseña de 5 estrellas.' },
  { icon: '🛒', text: 'Una empresa en Manizales añadió Pasamanos en Acero a su cotización.' },
  { icon: '👀', text: 'Alguien de Dosquebradas está explorando los diseños de Icopor.' },
  { icon: '🛒', text: 'Juan P. acaba de solicitar una cotización para Divisiones de Baño.' },
  { icon: '👀', text: 'Un arquitecto de Santa Rosa de Cabal está viendo Ventanería en Aluminio.' }
];
const navLinks = [
    { name: 'Diseños', href: '#icopor-gallery' },
    { name: 'Tienda', href: '#tienda' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Testimonios', href: '#testimonios' },
    { name: 'Contacto', href: '#cotizacion' },
];

// --- Componentes ---

const WatermarkedImageWrapper: React.FC<{ children: React.ReactNode; className?: string; size?: 'sm' | 'lg'; }> = ({ children, className = '', size }) => {
    const waterMarkClass = size ? `watermarked-${size}` : 'watermarked';
    return ( <div className={`${waterMarkClass} ${className}`}> {children} </div> );
};

const StarRating = ({ rating }: { rating: number }) => ( <div className="flex"> {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rating} />)} </div> );

const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="neumorphic-card-inset rounded-lg overflow-hidden">
        <button onClick={onClick} className="w-full flex justify-between items-center p-4 text-left font-semibold text-sm sm:text-base">
            <span>{item.question}</span>
            <ChevronDownIcon className={`h-6 w-6 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-4 pt-0 text-gray-600 text-sm sm:text-base"> <p>{item.answer}</p> </div>
        </div>
    </div>
);

const ProductDetailModal: React.FC<{ product: Product; onClose: () => void; onAddToCart: (product: Product) => void; }> = ({ product, onClose, onAddToCart }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    
    useEffect(() => {
        // Reset state when a new product is opened
        setImageIndex(0);
        setShowVideo(false);
    }, [product]);

    const handleAddToCart = () => { onAddToCart(product); onClose(); };

    return (
        <div className="cart-modal-overlay open" onClick={onClose}>
            <div className="cart-modal open w-11/12 max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <div className="glassmorphic p-4 sm:p-6 text-gray-800 max-h-[90vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="relative group">
                            {showVideo && product.videoId ? (
                                <div className="aspect-video w-full">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${product.videoId}?autoplay=1&rel=0`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={product.name}
                                    className="w-full h-full rounded-lg"
                                  ></iframe>
                                </div>
                            ) : (
                                <>
                                 <WatermarkedImageWrapper className="rounded-lg">
                                    <img src={product.images[imageIndex]} alt={`${product.name} - imagen ${imageIndex + 1}`} className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg" />
                                 </WatermarkedImageWrapper>
                                {product.images.length > 1 && ( <> <button onClick={() => setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)} className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"> <ChevronLeftIcon /> </button> <button onClick={() => setImageIndex((prev) => (prev + 1) % product.images.length)} className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"> <ChevronRightIcon /> </button> </> )}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base">{product.description}</p>
                            {product.price && ( <div className="my-3"> <span className="text-2xl sm:text-3xl font-bold text-blue-600">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(product.price)}</span> <span className="text-gray-500 text-sm"> / {product.unit}</span> </div> )}
                            <p className="text-sm text-gray-500 mt-2 flex-grow">{product.details}</p>
                            <div className="mt-4 space-y-3">
                                {product.videoId && (
                                    <button onClick={() => setShowVideo(!showVideo)} className="neumorphic-button flex items-center justify-center w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors text-sm sm:text-base">
                                        {showVideo ? <PhotoIcon /> : <PlayIcon />}
                                        {showVideo ? 'Ver Galería de Fotos' : 'Ver Video del Producto'}
                                    </button>
                                )}
                                <button onClick={handleAddToCart} className="neumorphic-button w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base">Añadir a Cotización</button>
                            </div>
                        </div>
                    </div>
                     <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold">&times;</button>
                </div>
            </div>
        </div>
    );
};

const LiveVisitorCounter: React.FC = () => {
    const [count, setCount] = useState(42);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                const newCount = prevCount + change;
                return newCount < 15 ? 15 : newCount; // Ensure it doesn't drop too low
            });
        }, 4000); // Update every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="live-visitors neumorphic-card flex items-center gap-2 p-2 px-3 rounded-full shadow-lg">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold text-sm text-gray-700">{count}</span>
            <span className="text-sm text-gray-600">visitantes ahora</span>
        </div>
    );
};

const RecentActivityNotification: React.FC = () => {
    const [activity, setActivity] = useState<{ icon: string; text: string } | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showRandomActivity = () => {
        if (timeoutRef.current) { clearTimeout(timeoutRef.current); }

        const nextActivity = recentActivities[Math.floor(Math.random() * recentActivities.length)];
        setActivity(nextActivity);
        setIsVisible(true);

        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
            timeoutRef.current = setTimeout(showRandomActivity, Math.random() * 7000 + 8000); // 8-15 seconds
        }, 5000); // Show for 5 seconds
    };

    useEffect(() => {
        const initialTimeout = setTimeout(showRandomActivity, 5000);
        return () => {
            clearTimeout(initialTimeout);
            if (timeoutRef.current) { clearTimeout(timeoutRef.current); }
        };
    }, []);

    if (!activity) return null;

    return (
        <div className={`activity-notification glassmorphic ${isVisible ? 'visible' : ''}`}>
            <div className="p-3 flex items-center gap-3">
                <span className="text-xl">{activity.icon}</span>
                <p className="text-sm text-gray-800">{activity.text}</p>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todos');
    const [viewMode, setViewMode] = useState('grid');
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
    const [chatInput, setChatInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const chatEndRef = useRef<null | HTMLDivElement>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [scaledIcoporIndex, setScaledIcoporIndex] = useState<number | null>(null);
    const [icoporModalIndex, setIcoporModalIndex] = useState<number | null>(null);
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => { const timer = setTimeout(() => setIsSplashVisible(false), 2500); return () => clearTimeout(timer); }, []);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setShowHeader(false); // Scrolling down
            } else {
                setShowHeader(true); // Scrolling up
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'es-CO';

            recognitionRef.current.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                     interimTranscript += event.results[i][0].transcript;
                }
                setChatInput(interimTranscript);
            };
            recognitionRef.current.onend = () => setIsRecording(false);
            recognitionRef.current.onerror = (event) => console.error('Speech recognition error:', event.error);
        }
    }, []);

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';
            window.speechSynthesis.speak(utterance);
        }
    };
    
    const addToCart = (product: Product) => { 
        if (!cart.find(item => item.id === product.id)) { 
            setCart(prevCart => [...prevCart, product]); 
            setIsCartAnimating(true);
            setTimeout(() => setIsCartAnimating(false), 600);
        } 
        setIsCartOpen(true); 
    };

    const removeFromCart = (productId: number) => { setCart(cart.filter(item => item.id !== productId)); };
    
    const sendWhatsAppMessage = (message: string) => {
        const phoneNumber = '573117379402';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name'); const address = formData.get('address'); const phone = formData.get('phone'); const measures = formData.get('measures');
        const divisionMaterial = formData.get('division_material');

        const productsText = cart.map(item => {
            if (item.id === 4 && divisionMaterial) {
                return `- ${item.name} (Material: ${divisionMaterial})`;
            }
            return `- ${item.name}`;
        }).join('\n');
        
        const message = `*¡Nueva Solicitud de Cotización!*\n\n*Cliente:* ${name}\n*Teléfono:* ${phone}\n*Dirección:* ${address}\n\n*Productos de Interés:*\n${productsText}\n\n*Medidas y Detalles Adicionales:*\n${measures}\n\n_Mensaje generado desde la página web._`;
        sendWhatsAppMessage(message.trim());
        setCart([]); setIsCartOpen(false);
    };

    const handleDirectQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name'); const phone = formData.get('phone'); const address = formData.get('address'); const project = formData.get('project');
        const message = `*¡Nueva Cotización Directa!*\n\n*Cliente:* ${name}\n*Teléfono:* ${phone}\n*Dirección:* ${address}\n\n*Descripción del Proyecto:*\n${project}\n\n_Mensaje generado desde la página web._`;
        sendWhatsAppMessage(message.trim());
        (e.target as HTMLFormElement).reset();
    };

    const handleSendMessage = (message: string, query?: string) => {
        const userMessage = message.trim();
        if (!userMessage) return;

        setChatMessages(prev => [...prev, { sender: 'user', type: 'text', content: userMessage }]);
        setChatInput('');

        setTimeout(() => {
            let botResponse: ChatMessage;
            const userQuery = query || userMessage.toLowerCase();

            if (userQuery === 'show-ceilings' || userQuery.includes('cielorraso')) {
                botResponse = { sender: 'bot', type: 'text', content: '¡Claro! Tenemos dos tipos principales de cielorrasos. Te los muestro:' };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
                const icoporProduct = products.find(p => p.id === 1); const pvcProduct = products.find(p => p.id === 2);
                if (icoporProduct) setChatMessages(prev => [...prev, { sender: 'bot', type: 'product', content: icoporProduct }]);
                if (pvcProduct) setChatMessages(prev => [...prev, { sender: 'bot', type: 'product', content: pvcProduct }]);
            } else if (userQuery === 'show-all-products' || userQuery.includes('catálogo') || userQuery.includes('todos los productos')) {
                botResponse = { sender: 'bot', type: 'text', content: '¡Claro que sí! Aquí tienes un recorrido por todo nuestro catálogo. Haz clic en cualquiera para ver más detalles.' };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
                
                products.forEach((product, index) => {
                    setTimeout(() => {
                        setChatMessages(prev => [...prev, { sender: 'bot', type: 'product', content: product }]);
                    }, (index + 1) * 1200); // Stagger the messages
                });
            } else if (userQuery === 'quote' || userQuery.includes('cotizar')) {
                botResponse = { sender: 'bot', type: 'text', content: "Para cotizar, simplemente navega por nuestra tienda, añade los productos que te interesan al carrito y completa tus datos. Tu solicitud nos llegará directamente por WhatsApp." };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
            } else if (userQuery === 'contact' || userQuery.includes('contacto') || userQuery.includes('hablar')) {
                botResponse = { sender: 'bot', type: 'text', content: "Puedes comunicarte con un asesor experto llamando o escribiendo al 311 737 9402, o visitándonos en Dosquebradas. ¡Será un placer atenderte!" };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
            } else if (userQuery === 'location' || userQuery.includes('ubicación') || userQuery.includes('dirección') || userQuery.includes('mapa')) {
                botResponse = { sender: 'bot', type: 'text', content: "¡Claro! Nos encontramos en Dosquebradas. Puedes abrir nuestra ubicación exacta en Google Maps con este enlace: https://maps.app.goo.gl/9cRwnp4V7fR6Rz3G6" };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
            } else if (userQuery === 'instagram' || userQuery.includes('instagram') || userQuery.includes('redes')) {
                botResponse = { sender: 'bot', type: 'text', content: "Síguenos en Instagram para ver nuestros últimos proyectos y promociones. ¡Te esperamos!: https://www.instagram.com/cuelo_raso_pvc" };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
            } else if (userQuery === 'review' || userQuery.includes('reseña') || userQuery.includes('califícanos') || userQuery.includes('valoranos')) {
                botResponse = { sender: 'bot', type: 'text', content: "Tu opinión es muy importante para nosotros. Si te gustó nuestro trabajo, ¡déjanos una reseña de 5 estrellas en Google aquí!: https://g.page/r/CbwvlcxIYNs0EBM/review" };
                setChatMessages(prev => [...prev, botResponse]);
                speakText(botResponse.content as string);
            } else {
                botResponse = { sender: 'bot', type: 'text', content: "Entendido. No estoy programado para esa pregunta, pero un asesor te puede ayudar. ¿Quieres que te muestre las opciones iniciales de nuevo?" };
                const optionsResponse: ChatMessage = { sender: 'bot', type: 'options', content: { text: 'Puedes elegir una de estas:', options: [ { label: 'Ver Cielorrasos', query: 'show-ceilings' }, { label: 'Cotizar un proyecto', query: 'quote' }, { label: 'Ver Ubicación', query: 'location' }, { label: 'Nuestro Instagram', query: 'instagram' }, { label: 'Dejar una Reseña', query: 'review' }, { label: 'Hablar con un asesor', query: 'contact' }, ]}};
                setChatMessages(prev => [...prev, botResponse, optionsResponse]);
                speakText(botResponse.content as string);
            }
        }, 1000);
    };
    
    const handleVoiceInput = () => {
        if (recognitionRef.current) {
            if (isRecording) {
                recognitionRef.current.stop();
            } else {
                recognitionRef.current.start();
            }
            setIsRecording(!isRecording);
        } else {
            alert('Lo siento, tu navegador no soporta el reconocimiento de voz.');
        }
    };
    
    const handleIcoporClick = (index: number) => {
      setScaledIcoporIndex(prev => (prev === index ? null : index));
    };

    const handleIcoporDoubleClick = (index: number) => {
        setIcoporModalIndex(index);
    };
    
    const handleNextIcoporImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (icoporModalIndex !== null) {
            setIcoporModalIndex((icoporModalIndex + 1) % icoporDesigns.length);
        }
    };

    const handlePrevIcoporImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (icoporModalIndex !== null) {
            setIcoporModalIndex((icoporModalIndex - 1 + icoporDesigns.length) % icoporDesigns.length);
        }
    };

    const filteredProducts = useMemo(() => { return products.filter(p => filter === 'todos' || p.category === filter).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())); }, [filter, searchTerm]);

    if (isSplashVisible) { return ( <div className="splash-screen"> <img src={LOGO_URL_THUMB} alt="Mundoicopor Logo" className="splash-logo h-48 w-48 rounded-full" /> </div> ); }

  return (
    <div className="text-gray-700 font-sans">
      <header className={`glassmorphic sticky top-2 sm:top-4 mx-auto max-w-7xl z-40 px-4 transform transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto py-3 flex justify-between items-center gap-2 sm:gap-4">
          <a href="#" className="flex items-center"> <img src={LOGO_URL_ICON} alt="Mundoicopor Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" /> </a>
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-sm font-semibold hover:text-blue-600 transition-colors">{link.name}</a>
            ))}
          </nav>
          <div className='flex items-center gap-2'>
            <button onClick={() => setIsCartOpen(true)} className={`neumorphic-button relative p-2 sm:p-3 rounded-full ${isCartAnimating ? 'cart-bounce' : ''}`}> <CartIcon /> {cart.length > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{cart.length}</span>} </button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden neumorphic-button p-2 sm:p-3 rounded-full">
                <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-neutral-100 h-full w-full flex flex-col items-center justify-center">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-gray-700">
                <CloseIcon />
            </button>
            <nav className="flex flex-col items-center gap-8">
                {navLinks.map(link => (
                    <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold hover:text-blue-600 transition-colors">{link.name}</a>
                ))}
            </nav>
        </div>
      </div>
      
      <section className="py-4 md:py-8">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="neumorphic-card p-2 sm:p-4 rounded-xl overflow-hidden">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/2PUrO9R9x90?si=h6DbaMiUJN2scwLy&autoplay=1&playlist=iQ3AxEoCDwU&loop=1&rel=0" 
                        title="Proyectos Mundoicopor" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
      </section>

      <section id="icopor-gallery" className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-4">Galería Interactiva de Diseños</h2>
              <p className="max-w-2xl mx-auto text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">Explora nuestros diseños exclusivos en un carrusel infinito. Pasa el cursor o toca para ampliar, y haz doble clic para ver en detalle.</p>
          </div>
          <div className="w-full overflow-x-hidden">
            <div className="infinite-scroll-wrapper relative py-8">
                <div className="infinite-scroll-container flex items-center gap-16">
                    {[...icoporDesigns, ...icoporDesigns].map((src, index) => {
                        const originalIndex = index % icoporDesigns.length;
                        return (
                            <div
                                key={index}
                                className={`icopor-design-item relative flex-shrink-0 ${scaledIcoporIndex === originalIndex ? 'scaled' : ''}`}
                                onClick={() => handleIcoporClick(originalIndex)}
                                onDoubleClick={() => handleIcoporDoubleClick(originalIndex)}
                            >
                                <img src={src} alt={`Diseño de icopor ${originalIndex + 1}`} className="h-40 sm:h-48 w-auto object-contain" />
                            </div>
                        );
                    })}
                </div>
            </div>
          </div>
      </section>

      <section id="tienda" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 sm:mb-12 gap-4">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">Nuestros Productos y Servicios</h2>
                <div className="flex-1 flex items-center justify-center sm:justify-end gap-2 flex-row flex-wrap">
                    <input type="search" placeholder="Buscar producto..." onChange={(e) => setSearchTerm(e.target.value)} className="glassmorphic flex-grow sm:flex-grow-0 sm:w-48 px-4 py-2 text-sm bg-transparent placeholder:text-gray-700/70 focus:outline-none"/>
                    <div className="relative glassmorphic">
                        <select onChange={(e) => setFilter(e.target.value)} className="w-full pl-4 pr-10 py-2 text-sm bg-transparent appearance-none focus:outline-none"> <option value="todos">Todas</option> <option value="cielorrasos">Cielorrasos</option> <option value="aluminio">Aluminio</option> <option value="vidrio">Vidrio</option> <option value="remodelacion">Remodelación</option> </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><ChevronDownIcon /></div>
                    </div>
                    <div className="glassmorphic flex p-1 rounded-full"> 
                      <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-white/40' : 'hover:bg-white/20'}`}><GridViewIcon /></button> 
                      <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-white/40' : 'hover:bg-white/20'}`}><ListViewIcon /></button> 
                    </div>
                </div>
            </div>
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" : "flex flex-col gap-6 sm:gap-8"}>
            {filteredProducts.map(product => (
              <div key={product.id} className={`neumorphic-card overflow-hidden ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
                <WatermarkedImageWrapper className={`${viewMode === 'list' ? 'w-full sm:w-1/3' : 'w-full'}`}>
                    <img src={product.images[0]} alt={product.name} className={`w-full ${viewMode === 'list' ? 'object-cover h-full' : 'h-48 object-cover'} cursor-pointer transition-transform duration-300 hover:scale-105`} onClick={() => setSelectedProductForModal(product)} />
                </WatermarkedImageWrapper>
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{product.name}</h3> <p className="text-gray-600 mt-2 text-sm sm:text-base">{product.description}</p>
                     {product.price && ( <div className="my-3"> <span className="text-xl sm:text-2xl font-bold text-blue-600">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(product.price)}</span> <span className="text-gray-500 text-sm"> / {product.unit}</span> </div> )}
                    <p className="text-sm text-gray-500 mt-2 flex-grow">{product.details}</p>
                    <button onClick={() => addToCart(product)} className="neumorphic-button bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 self-start hover:bg-blue-700 transition-colors text-sm sm:text-base">Añadir a Cotización</button>
                </div>
              </div>  
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-8 bg-gray-100/50">
        <div className="container mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
            <div className="text-center">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-3">Conoce a Mundoicopor</h2>
                <p className="max-w-3xl mx-auto text-sm sm:text-lg text-gray-600">Con más de dos décadas de experiencia, somos artesanos de espacios en el Eje Cafetero. Nos especializamos en cielorrasos, soluciones en aluminio, vidrio templado y remodelaciones integrales, siempre con un compromiso inquebrantable con la calidad, el servicio y la atención al detalle.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
                <div className="neumorphic-card p-6 sm:p-8 text-center flex flex-col items-center"> <MissionIcon /> <h3 className="text-xl sm:text-2xl font-bold mb-3">Nuestra Misión</h3> <p className="text-sm sm:text-base">Ofrecer soluciones integrales y de alta calidad en cielorrasos y remodelaciones, superando las expectativas de nuestros clientes a través de la innovación, un servicio excepcional y el trabajo de personal altamente calificado.</p> </div>
                <div className="neumorphic-card p-6 sm:p-8 text-center flex flex-col items-center"> <VisionIcon /> <h3 className="text-xl sm:text-2xl font-bold mb-3">Nuestra Visión</h3> <p className="text-sm sm:text-base">Ser la empresa de referencia en el sector de la construcción y remodelación en Colombia, reconocida por nuestra calidad, cumplimiento, y por ser el mejor aliado estratégico para materializar los proyectos de nuestros clientes.</p> </div>
            </div>
             <div>
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">Nuestros Valores Fundamentales</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                    {values.map(value => ( <div key={value.title} className="neumorphic-card p-3 sm:p-6 text-center"> <span className="text-3xl sm:text-5xl">{value.emoji}</span> <h4 className="mt-3 font-bold text-sm sm:text-lg">{value.title}</h4> <p className="text-xs sm:text-sm text-gray-600 mt-1">{value.description}</p> </div> ))}
                </div>
            </div>
        </div>
      </section>

      <section id="testimonios" className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => ( <div key={index} className="neumorphic-card p-4 sm:p-6 flex flex-col"> <StarRating rating={testimonial.rating} /> <p className="text-gray-600 my-4 flex-grow text-sm sm:text-base">"{testimonial.comment}"</p> <p className="font-bold text-right text-sm sm:text-base">- {testimonial.name}</p> </div> ))}
          </div>
            <div className="text-center mt-10"> <a href="https://g.page/r/CbwvlcxIYNs0EBM/review" target="_blank" rel="noopener noreferrer" className="neumorphic-button inline-flex items-center gap-2 bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors"> <StarIcon filled={true} /> ¡Valóranos con 5 estrellas! </a> </div>
        </div>
      </section>

      <section id="preguntas-frecuentes" className="py-8 bg-gray-100/50">
          <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">Preguntas Frecuentes</h2>
              <div className="max-w-3xl mx-auto space-y-4"> {faqData.map((item, index) => ( <AccordionItem key={index} item={item} isOpen={openFaqIndex === index} onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} /> ))} </div>
          </div>
      </section>

      <section id="cotizacion" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="neumorphic-card max-w-4xl mx-auto p-6 sm:p-8 md:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">¿Tienes un Proyecto en Mente?</h2>
                <p className="text-center text-gray-600 mb-8">Completa el formulario y te contactaremos vía WhatsApp para darte una cotización detallada.</p>
                <form onSubmit={handleDirectQuoteSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <input name="name" type="text" placeholder="Nombre completo" required className="neumorphic-card-inset w-full p-3 rounded-lg md:col-span-2"/>
                    <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                    <input name="address" type="text" placeholder="Dirección del proyecto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                    <textarea name="project" placeholder="Describe tu proyecto aquí. Incluye el tipo de trabajo (ej. cielorraso, ventanas), medidas aproximadas y cualquier otro detalle relevante." required rows={5} className="neumorphic-card-inset w-full p-3 rounded-lg md:col-span-2"></textarea>
                    <button type="submit" className="neumorphic-button w-full md:col-span-2 bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"> Cotizar por WhatsApp </button>
                </form>
            </div>
        </div>
      </section>

      <footer id="contacto" className="py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="neumorphic-card overflow-hidden p-2 sm:p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.68303977543!2d-75.6778816239567!3d4.831916940348579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388160e10d2937%3A0x34db6048cc952fbc!2sCielo%20rasos%20Mundo%20Icopor!5e0!3m2!1ses!2sco!4v1722378931169!5m2!1ses!2sco"
                        className="w-full h-[250px] sm:h-[350px] border-0 rounded-lg"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de ubicación de Cielo rasos Mundo Icopor">
                    </iframe>
                    <div className="flex flex-col justify-center text-center p-4 text-gray-800">
                        <img src={LOGO_URL_ICON} alt="Mundoicopor Logo" className="h-16 w-16 rounded-full mx-auto mb-2" />
                         <h3 className="text-xl font-bold mb-4">Visítanos y Contáctanos</h3>
                        <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Mundoicopor. Todos los derechos reservados.</p>
                        <div className="text-xs sm:text-sm my-4 space-x-4">
                            <button onClick={() => setIsPolicyModalOpen(true)} className="hover:underline">Políticas y Condiciones</button> <span>|</span> <a href="#preguntas-frecuentes" className="hover:underline">Preguntas Frecuentes</a>
                        </div>
                        <div className="flex justify-center gap-4">
                            <a href="https://www.instagram.com/cuelo_raso_pvc" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Mundoicopor" className="neumorphic-button p-3 rounded-full text-gray-700 hover:text-pink-600 transition-colors"> <InstagramIcon /> </a>
                            <a href="https://wa.me/573117379402" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Mundoicopor" className="neumorphic-button p-3 rounded-full text-gray-700 hover:text-green-600 transition-colors"> <WhatsAppIcon /> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </footer>
      
       <div className={`cart-modal-overlay ${isCartOpen || isPolicyModalOpen || selectedProductForModal || icoporModalIndex !== null ? 'open' : ''}`} onClick={() => { setIsCartOpen(false); setIsPolicyModalOpen(false); setSelectedProductForModal(null); setIcoporModalIndex(null); }}></div>
       <div className={`cart-modal w-11/12 max-w-4xl max-h-[90vh] ${isCartOpen ? 'open' : ''}`}>
        <div className="glassmorphic p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] text-gray-800">
            <div className="flex justify-between items-center mb-6"> <h2 className="text-2xl sm:text-3xl font-bold">Solicitar Cotización</h2> <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button> </div>
            {cart.length === 0 ? ( <p>Tu carrito de cotización está vacío.</p> ) : (
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div> <h3 className="text-lg sm:text-xl font-semibold mb-4">Productos seleccionados</h3> <div className="space-y-4"> {cart.map(item => ( <div key={item.id} className="flex items-center gap-2 sm:gap-4"> <WatermarkedImageWrapper size="sm" className="rounded-lg w-16 h-16 flex-shrink-0"><img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/></WatermarkedImageWrapper> <div className="flex-grow"><p className="font-semibold text-sm sm:text-base">{item.name}</p></div> <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Quitar</button> </div> ))} </div> </div>
                    <form onSubmit={handleQuoteSubmit}>
                        <h3 className="text-lg sm:text-xl font-semibold mb-4">Completa tus datos</h3>
                        <div className="space-y-4">
                            <input name="name" type="text" placeholder="Nombre completo" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <input name="address" type="text" placeholder="Dirección de entrega/instalación" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            {cart.some(item => item.id === 4) && (
                                <select name="division_material" required defaultValue="" className="neumorphic-card-inset w-full p-3 rounded-lg">
                                    <option value="" disabled>Elegir material para División...</option>
                                    <option value="Acrílico">Acrílico</option>
                                    <option value="Vidrio Templado">Vidrio Templado</option>
                                </select>
                            )}
                            <textarea name="measures" placeholder="Medidas y detalles adicionales" rows={3} className="neumorphic-card-inset w-full p-3 rounded-lg"></textarea>
                            <button type="submit" className="neumorphic-button w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"> Enviar por WhatsApp </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
       </div>

    <div className={`cart-modal w-11/12 max-w-2xl max-h-[90vh] ${isPolicyModalOpen ? 'open' : ''}`}>
        <div className="glassmorphic p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] text-gray-800">
            <div className="flex justify-between items-center mb-6"> <h2 className="text-2xl sm:text-3xl font-bold">Políticas y Condiciones</h2> <button onClick={() => setIsPolicyModalOpen(false)} className="text-2xl">&times;</button> </div>
            <div className="space-y-4 text-sm">
                <h3 className="font-bold text-lg">1. Cotizaciones</h3> <p>Todas las cotizaciones tienen una validez de 15 días calendario. Los precios están sujetos a cambios basados en una visita técnica para verificar medidas y condiciones del área de trabajo. Cualquier modificación al proyecto original puede generar costos adicionales.</p>
                <h3 className="font-bold text-lg">2. Pagos</h3> <p>Para iniciar cualquier proyecto, se requiere un anticipo del 50% del valor total de la cotización. El 50% restante deberá ser cancelado al momento de la finalización y entrega del trabajo a satisfacción del cliente.</p>
                <h3 className="font-bold text-lg">3. Instalación</h3> <p>El cliente es responsable de asegurar que el área de trabajo se encuentre despejada de muebles y objetos personales antes del inicio de la instalación. Nuestro equipo tomará las precauciones necesarias para proteger las áreas circundantes, pero no nos hacemos responsables por daños a objetos no retirados.</p>
                <h3 className="font-bold text-lg">4. Garantía</h3> <p>Ofrecemos una garantía de 12 meses sobre la instalación y por defectos de fabricación en los materiales suministrados. La garantía no cubre daños causados por mal uso, desastres naturales, modificaciones por terceros o falta de mantenimiento adecuado.</p>
                <h3 className="font-bold text-lg">5. Cancelaciones y Reprogramaciones</h3> <p>Las cancelaciones deben ser notificadas con un mínimo de 48 horas de antelación. Si la cancelación ocurre después de la compra de materiales, el anticipo podría no ser reembolsable en su totalidad para cubrir los costos incurridos.</p>
            </div>
        </div>
    </div>
    
    {icoporModalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 group" onClick={() => setIcoporModalIndex(null)}>
            <img src={icoporDesigns[icoporModalIndex]} alt="Diseño de icopor ampliado" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
            <button onClick={handlePrevIcoporImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"> <ChevronLeftIcon /> </button>
            <button onClick={handleNextIcoporImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100"> <ChevronRightIcon /> </button>
        </div>
    )}

    <div className={`chatbot-window glassmorphic ${isChatOpen ? 'open' : ''} overflow-hidden`}>
      <div className="bg-teal-600/80 p-3 text-white font-bold text-center shadow-md">OvidioBot</div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {chatMessages.map((msg, index) => {
          if (msg.type === 'product' && typeof msg.content === 'object' && 'id' in msg.content) {
            const product = msg.content;
            return ( <div key={index} className="flex justify-start"> <div className="bg-white rounded-xl rounded-bl-none p-2 max-w-[85%] shadow-sm space-y-2"> <WatermarkedImageWrapper className="rounded-lg"><img src={product.images[0]} alt={product.name} className="rounded-lg w-full h-auto" /></WatermarkedImageWrapper> <p className="font-bold text-sm px-1">{product.name}</p> <button onClick={() => setSelectedProductForModal(product)} className="w-full text-center text-sm font-semibold text-blue-600 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-md transition-colors"> Ver Detalles </button> </div> </div> );
          }
          if (msg.type === 'options' && typeof msg.content === 'object' && 'text' in msg.content) {
            return ( <div key={index} className="flex flex-col items-start space-y-2"> <div className="bg-white rounded-xl rounded-bl-none p-3 max-w-[85%] shadow-sm"> {msg.content.text} </div> <div className="flex flex-wrap gap-2"> {msg.content.options.map((opt, i) => ( <button key={i} onClick={() => handleSendMessage(opt.label, opt.query)} className="text-sm bg-white/80 backdrop-blur-sm border border-gray-300 text-blue-600 font-semibold py-1 px-3 rounded-full hover:bg-white transition-all"> {opt.label} </button> ))} </div> </div> )
          }
          return ( <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> <div className={`relative rounded-xl py-2 px-3 max-w-[85%] shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}> {msg.content as string} <div className={`absolute bottom-0 w-3 h-3 ${msg.sender === 'user' ? '-right-1.5 bg-blue-500' : '-left-1.5 bg-white'}`} style={{ clipPath: msg.sender === 'user' ? 'polygon(0 0, 100% 100%, 100% 0)' : 'polygon(0 0, 100% 0, 0 100%)' }} /> </div> </div> );
        })}
        <div ref={chatEndRef} />
      </div>
      <div className="p-2 border-t border-white/20 bg-white/30">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(chatInput); }} className="flex items-center gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Escribe un mensaje..." className="neumorphic-card-inset flex-1 px-3 py-2 rounded-full text-sm bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"/>
            <button type="button" onClick={handleVoiceInput} className="neumorphic-button p-2.5 rounded-full text-gray-600">
                <MicIcon className={isRecording ? 'mic-recording' : ''} />
            </button>
            <button type="submit" className="neumorphic-button p-2.5 rounded-full text-blue-600">
                <SendIcon />
            </button>
        </form>
      </div>
    </div>
    <button onClick={() => setIsChatOpen(!isChatOpen)} className="chatbot-fab neumorphic-button bg-gradient-to-br from-blue-600 to-green-500 text-white p-4 rounded-full shadow-lg"> <ChatIcon /> </button>
    
    <LiveVisitorCounter />
    <RecentActivityNotification />

    {selectedProductForModal && ( <ProductDetailModal product={selectedProductForModal} onClose={() => setSelectedProductForModal(null)} onAddToCart={addToCart} /> )}
    </div>
  );
};

export default App;
