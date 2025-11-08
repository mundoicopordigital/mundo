import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- Iconos SVG ---
const CeilingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z" /> </svg> );
const WindowIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /> </svg> );
const GlassIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4M5 11h14M5 15h14M17 3v4m2-2h-4m2 14v4m2-2h-4" /> </svg> );
const HandrailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" /> </svg> );
const MissionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-3.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12H3" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12h-3.75" /> </svg> );
const VisionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> </svg> );
const ShieldIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.5-5.5a.5.5 0 01.707 0l5.5 5.5a12.02 12.02 0 008.618-14.482z" /> </svg> );
const CartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg> );
const ListViewIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> );
const GridViewIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> );
const ChatIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> );
const InstagramIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect> <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path> <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line> </svg> );
const WhatsAppIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38c1.44.82 3.08 1.25 4.69 1.25h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.15 15.28c-.22-.11-.76-.38-1.04-.49-.28-.11-.48-.11-.68.11-.2.22-.39.49-.48.59-.09.1-.18.11-.33.06s-.6-.22-1.14-.7c-.43-.37-.71-.84-.8-1-.09-.16 0-.25.09-.34.08-.08.18-.22.27-.33.09-.11.12-.18.18-.3.06-.11 0-.22-.05-.33-.06-.11-.68-1.63-.93-2.23s-.49-.52-.68-.52h-.48c-.2 0-.48.06-.68.33s-.76.74-.76 1.8c0 1.06.78 2.08.88 2.23.11.16 1.54 2.45 3.74 3.3.52.2.92.33 1.24.42.5.13.95.11 1.3.07.39-.04.76-.16.98-.38.28-.27.28-.52.2-.59-.09-.06-.22-.11-.48-.22z"/> </svg> );


// --- Tipos de Datos ---
interface Product { id: number; name: string; category: string; description: string; images: string[]; }
interface ChatMessage { sender: 'user' | 'bot'; text: string; }

// --- Datos de Muestra ---
const products: Product[] = [
    { id: 1, name: 'Cielorraso Icopor Liso', category: 'cielorrasos', description: 'Panel de icopor liso de alta densidad, ideal para acabados modernos.', images: ['https://aluminiosega.com/images/galerias/cielo-rasos/cieloraso1.jpg', 'https://via.placeholder.com/400x300.png?text=Icopor+Liso+2'] },
    { id: 2, name: 'Cielorraso PVC Blanco', category: 'cielorrasos', description: 'Lámina de PVC resistente a la humedad y de fácil limpieza.', images: ['https://via.placeholder.com/400x300.png?text=PVC+Blanco'] },
    { id: 3, name: 'Ventana de Aluminio', category: 'aluminio', description: 'Ventana corrediza con marco de aluminio y vidrio de 4mm.', images: ['https://via.placeholder.com/400x300.png?text=Ventana'] },
    { id: 4, name: 'Puerta de Vidrio Templado', category: 'vidrio', description: 'Puerta batiente de 8mm para oficinas y locales comerciales.', images: ['https://via.placeholder.com/400x300.png?text=Puerta+Vidrio'] },
    { id: 5, name: 'Pasamanos en Acero', category: 'remodelacion', description: 'Pasamanos de acero inoxidable para escaleras y balcones.', images: ['https://via.placeholder.com/400x300.png?text=Pasamanos'] },
    { id: 6, name: 'División de Oficina en Aluminio', category: 'aluminio', description: 'Estructura modular para crear espacios de trabajo privados.', images: ['https://via.placeholder.com/400x300.png?text=Division+Oficina'] },
];
const values = [ "Calidad", "Compromiso", "Innovación", "Honestidad", "Servicio al Cliente", "Trabajo en Equipo" ];

const App: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todos');
    const [viewMode, setViewMode] = useState('grid');
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: '¡Hola! Soy el asistente virtual de Mundoicopor. ¿Cómo puedo ayudarte hoy?' }
    ]);
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsSplashVisible(false), 2500);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const addToCart = (product: Product) => {
        if (!cart.find(item => item.id === product.id)) {
            setCart([...cart, product]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    
    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = { address: formData.get('address'), phone: formData.get('phone'), budget: formData.get('budget'), items: cart.map(item => item.name) };
        alert(`Solicitud de cotización enviada con éxito! Nos pondremos en contacto pronto.\n\nDetalles:\n${JSON.stringify(data, null, 2)}`);
        setCart([]);
        setIsCartOpen(false);
    };

    const handleChatInteraction = (userMessage: string, userQuery: string) => {
        setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        
        setTimeout(() => {
            let botResponse = "No estoy seguro de cómo responder a eso. ¿Puedes intentar con otra opción?";
            if (userQuery === 'quote') {
                botResponse = "¡Claro! Para cotizar, simplemente busca los productos que te interesan en nuestra tienda, añádelos al carrito de cotización (el ícono de carrito arriba) y completa tus datos. ¡Es muy fácil!";
            } else if (userQuery === 'info') {
                botResponse = "Tenemos una amplia gama de productos, incluyendo cielorrasos en icopor y PVC, perfilería, y todo lo relacionado con aluminio arquitectónico y vidrio templado.";
            } else if (userQuery === 'contact') {
                botResponse = "Puedes comunicarte con un asesor experto llamando al 312 123 4567 o visitándonos en nuestra sede en Pereira. Estaremos encantados de atenderte.";
            }
            setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        }, 1000);
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => filter === 'todos' || p.category === filter)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [filter, searchTerm]);

  if (isSplashVisible) {
    return (
      <div className={`splash-screen ${!isSplashVisible && 'hidden'}`}>
        <img src="https://lh3.googleusercontent.com/pw/AP1GczO_avgeyzyvXEExqKVMZQkpr595OS5HvQYE71aM8vXECNuAYBHIiyXIxJdb8tZj2I3fNPIGro4nBM5ktjSHo3-tS40SwPaaBDVgXdsORcr_fu3eVyTccB2uBfShnmjH_re5jj7Tcd6mH-WO-Sc28G8=w256-h256-s-no-gm?authuser=0" alt="Mundoicopor Logo" className="splash-logo h-48 w-48 rounded-full" />
      </div>
    );
  }

  return (
    <div className="text-gray-700 font-sans">
      <header className="glassmorphic sticky top-4 mx-auto max-w-7xl z-20 px-4">
        <div className="container mx-auto py-3 flex justify-between items-center gap-4">
          <a href="#" className="flex items-center">
            <img src="https://lh3.googleusercontent.com/pw/AP1GczO_avgeyzyvXEExqKVMZQkpr595OS5HvQYE71aM8vXECNuAYBHIiyXIxJdb8tZj2I3fNPIGro4nBM5ktjSHo3-tS40SwPaaBDVgXdsORcr_fu3eVyTccB2uBfShnmjH_re5jj7Tcd6mH-WO-Sc28G8=w64-h64-s-no-gm?authuser=0" alt="Mundoicopor Logo" className="h-12 w-12 rounded-full" />
          </a>
          <div className="flex-1 flex items-center justify-center gap-2">
            <input type="search" placeholder="Buscar producto..." onChange={(e) => setSearchTerm(e.target.value)} className="neumorphic-card-inset w-full max-w-xs px-4 py-2 rounded-full text-sm"/>
            <select onChange={(e) => setFilter(e.target.value)} className="neumorphic-card-inset px-4 py-2 rounded-full text-sm">
                <option value="todos">Todas</option>
                <option value="cielorrasos">Cielorrasos</option>
                <option value="aluminio">Aluminio</option>
                <option value="vidrio">Vidrio</option>
                <option value="remodelacion">Remodelación</option>
            </select>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="neumorphic-button relative p-3 rounded-full">
            <CartIcon />
            {cart.length > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{cart.length}</span>}
          </button>
        </div>
      </header>

      <section className="relative text-white text-center py-24 -mt-16 overflow-hidden" style={{ background: 'linear-gradient(45deg, var(--brand-blue), var(--brand-green))' }}>
        <div className="container mx-auto px-6 relative z-10 pt-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Soluciones Arquitectónicas de Calidad</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Más de 20 años de experiencia en cielorrasos, aluminio y vidrio templado.</p>
          <a href="#tienda" className="glassmorphic inline-block text-white font-bold py-3 px-8 hover:bg-white/30 transition-colors text-lg"> Ver Tienda </a>
        </div>
      </section>

      <section id="tienda" className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Nuestra Tienda</h2>
            <div className="neumorphic-card flex p-1 rounded-full">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full ${viewMode === 'grid' ? 'neumorphic-button active' : ''}`}><GridViewIcon /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-full ${viewMode === 'list' ? 'neumorphic-button active' : ''}`}><ListViewIcon /></button>
            </div>
          </div>
          <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" : "flex flex-col gap-8"}>
            {filteredProducts.map(product => (
              <div key={product.id} className={`neumorphic-card overflow-hidden ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}>
                <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className={`${viewMode === 'list' ? 'w-full sm:w-1/3 object-cover' : 'w-full h-48 object-cover'} cursor-pointer transition-transform duration-300 hover:scale-105`}
                    onClick={() => setSelectedImage(product.images[0])}
                />
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-2 flex-grow">{product.description}</p>
                    <button onClick={() => addToCart(product)} className="neumorphic-button bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 self-start hover:bg-blue-700 transition-colors">Añadir a Cotización</button>
                </div>
              </div>  
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-10">
        <div className="container mx-auto px-6 space-y-16">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Conoce a Mundoicopor</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-600">Somos una empresa líder en la venta, distribución e instalación de cielorrasos y servicios de remodelación, comprometidos con la calidad y la satisfacción del cliente en todo el Eje Cafetero.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="neumorphic-card p-8 text-center flex flex-col items-center"> <MissionIcon /> <h3 className="text-2xl font-bold mb-3">Misión</h3> <p>Ofrecer soluciones integrales y de alta calidad en cielorrasos y remodelaciones, superando las expectativas de nuestros clientes a través de la innovación y un servicio excepcional.</p> </div>
                <div className="neumorphic-card p-8 text-center flex flex-col items-center"> <VisionIcon /> <h3 className="text-2xl font-bold mb-3">Visión</h3> <p>Ser la empresa de referencia en el sector de la construcción y remodelación en Colombia, reconocida por nuestra calidad, compromiso con el medio ambiente y por ser el mejor lugar para trabajar.</p> </div>
            </div>
             <div>
                <h3 className="text-2xl font-bold text-center mb-8">Nuestros Valores</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                    {values.map(value => ( <div key={value} className="neumorphic-card p-4 flex flex-col items-center justify-center"> <ShieldIcon /> <span className="mt-2 font-semibold text-sm">{value}</span> </div> ))}
                </div>
            </div>
        </div>
      </section>

      <footer className="glassmorphic mt-20 mb-4 mx-auto max-w-6xl text-gray-800">
        <div className="container mx-auto px-6 py-4 text-center">
          <img src="https://lh3.googleusercontent.com/pw/AP1GczO_avgeyzyvXEExqKVMZQkpr595OS5HvQYE71aM8vXECNuAYBHIiyXIxJdb8tZj2I3fNPIGro4nBM5ktjSHo3-tS40SwPaaBDVgXdsORcr_fu3eVyTccB2uBfShnmjH_re5jj7Tcd6mH-WO-Sc28G8=w64-h64-s-no-gm?authuser=0" alt="Mundoicopor Logo" className="h-16 w-16 rounded-full mx-auto mb-2" />
          <p>&copy; {new Date().getFullYear()} Mundoicopor. Todos los derechos reservados.</p>
          <p className="text-sm">Calidad y Servicio en el Eje Cafetero.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://www.instagram.com/cielo_raso_pvc" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Mundoicopor" className="neumorphic-button p-3 rounded-full text-gray-700 hover:text-pink-600 transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://wa.me/573121234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Mundoicopor" className="neumorphic-button p-3 rounded-full text-gray-700 hover:text-green-600 transition-colors">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </footer>

       <div className={`cart-modal-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
       <div className={`cart-modal w-11/12 max-w-4xl max-h-[90vh] ${isCartOpen ? 'open' : ''}`}>
        <div className="glassmorphic p-6 md:p-8 overflow-y-auto max-h-[90vh] text-gray-800">
            <div className="flex justify-between items-center mb-6"> <h2 className="text-3xl font-bold">Solicitar Cotización</h2> <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button> </div>
            {cart.length === 0 ? ( <p>Tu carrito de cotización está vacío.</p> ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Productos seleccionados</h3>
                        <div className="space-y-4">
                            {cart.map(item => ( <div key={item.id} className="flex items-center gap-4"> <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/> <div className="flex-grow"><p className="font-semibold">{item.name}</p></div> <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Quitar</button> </div> ))}
                        </div>
                    </div>
                    <form onSubmit={handleQuoteSubmit}>
                        <h3 className="text-xl font-semibold mb-4">Completa tus datos</h3>
                        <div className="space-y-4">
                            <input name="address" type="text" placeholder="Dirección de entrega/instalación" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <input name="phone" type="tel" placeholder="Teléfono de contacto" required className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <input name="budget" type="number" placeholder="Presupuesto estimado (COP)" className="neumorphic-card-inset w-full p-3 rounded-lg"/>
                            <button type="submit" className="neumorphic-button w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors"> Enviar Solicitud </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    </div>
    
    {/* Chatbot */}
    <div className={`chatbot-window glassmorphic ${isChatOpen ? 'open' : ''}`}>
        <div className="p-4 border-b border-white/20">
            <h3 className="font-bold text-center text-gray-800">Asistente Virtual</h3>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-2xl py-2 px-4 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
        <div className="p-4 border-t border-white/20 space-y-2">
            <button onClick={() => handleChatInteraction('¿Cómo puedo cotizar?', 'quote')} className="w-full text-sm neumorphic-button bg-white/50 py-2 px-4 rounded-lg">¿Cómo cotizar?</button>
            <button onClick={() => handleChatInteraction('Información de productos', 'info')} className="w-full text-sm neumorphic-button bg-white/50 py-2 px-4 rounded-lg">Info de productos</button>
            <button onClick={() => handleChatInteraction('Hablar con un asesor', 'contact')} className="w-full text-sm neumorphic-button bg-white/50 py-2 px-4 rounded-lg">Hablar con un asesor</button>
        </div>
    </div>
    <button onClick={() => setIsChatOpen(!isChatOpen)} className="chatbot-fab neumorphic-button bg-gradient-to-br from-blue-600 to-green-500 text-white p-4 rounded-full shadow-lg">
        <ChatIcon />
    </button>
    
    {/* Image Modal */}
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