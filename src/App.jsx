import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  Calendar,
  Shield,
  Sparkles,
  Droplets,
  ArrowRight,
  Menu,
  X,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  Instagram,
  Mail,
  Heart,
  ExternalLink
} from 'lucide-react';

/**
 * GBT Aesthetics - Master Web Application
 * Version: 1.8 (Pricing & Services Update)
 * Tech: React, Tailwind CSS
 */

// --- DATA & CONFIGURATION ---

const THEME = {
  colors: {
    bgMain: "bg-neutral-950", // #0A0A0A
    bgSec: "bg-neutral-900", // #161616
    accent: "text-amber-400", // #D4AF37 (Gold)
    accentBg: "bg-amber-400",
    accentBorder: "border-amber-400",
    textMain: "text-neutral-100",
    textMuted: "text-neutral-400"
  },
  images: {
    heroBg: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
    services: {
      ceramic: "https://images.unsplash.com/photo-1621994364402-4091a1a5b675?q=80&w=800&auto=format&fit=crop",
      correction: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?q=80&w=800&auto=format&fit=crop",
      detailing: "https://images.unsplash.com/photo-1605161578332-94fa9154a43a?q=80&w=800&auto=format&fit=crop"
    },
    compare: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    wrap: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=1000&auto=format&fit=crop"
  },
  links: {
    instagram: "https://www.instagram.com/gbt.esthetique?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  }
};

const INSTAGRAM_POSTS = [
  {
    id: 1,
    likes: 243,
    img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop",
    desc: "Audi R8 protégée et prête pour la route ! 🏁 Céramique 5 ans appliquée. #AudiR8 #CeramicPro #Mascouche"
  },
  {
    id: 2,
    likes: 132,
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=600&auto=format&fit=crop",
    desc: "Lamborghini Huracan : Protection complète PPF. Prête à dévorer l'asphalte ! 🐂💨 #Lamborghini #PPF #Mascouche"
  },
  {
    id: 3,
    likes: 95,
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
    desc: "Bye bye le calcium ! 👋 Un intérieur remis à neuf pour la saison. Réservez votre place maintenant. #DetailingInterieur"
  },
  {
    id: 4,
    likes: 210,
    img: "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=600&auto=format&fit=crop",
    desc: "Ce reflet... 🤤 Polissage 2 étapes terminé. La profondeur de la couleur est revenue ! 💎 #PaintCorrection"
  }
];

// Données détaillées pour le Modal de Réservation
const PRICING_DATA = {
  detailing: {
    title: "Detailing / Nettoyage",
    items: [
      { id: 'detailing_full', name: "Nettoyage Complet", price: "149,95 $", note: "Durée ≈ 2,5 h" },
      { id: 'restoration_full', name: "Remise à neuf Véhicule", price: "399,95 $", note: "Intérieur & Extérieur" }
    ]
  },
  polishing: {
    title: "Polissage & Correction",
    items: [
      { id: 'headlight_basic', name: "Polissage Phares (1 étape)", price: "59,95 $", note: "" },
      { id: 'headlight_restoration', name: "Remise à neuf Phares (3 étapes)", price: "149,95 $", note: "" },
      { id: 'polish_1step', name: "Polissage 1 étape", price: "379,95 $", note: "Durée ≈ 4 h" },
      { id: 'polish_2step', name: "Polissage 2 étapes", price: "769,95 $", note: "Durée ≈ 8 h" }
    ]
  },
  protection: {
    title: "Cirage & Protection",
    items: [
      { id: 'hydro_shine', name: "Cire Hydro Shine", price: "30,00 $", note: "1 à 2 semaines" },
      { id: 'sealant', name: "Scellant à peinture", price: "80,00 $", note: "6 mois" },
      { id: 'nano_1yr', name: "Nanocéramique 1 an", price: "149,95 $", note: "Protection durable" },
      { id: 'nano_3yr', name: "Nanocéramique 3 ans", price: "399,95 $", note: "Protection supérieure" },
      { id: 'nano_5yr', name: "Nanocéramique 5 ans", price: "599,95 $", note: "L'ultime protection" }
    ]
  },
  glass: {
    title: "Protection Vitres",
    items: [
      { id: 'aquapel', name: "Aquapel", price: "40,00 $", note: "6 à 8 mois" },
      { id: 'nano_windshield', name: "Nanocéramique Pare-brise", price: "99,95 $", note: "2 ans" }
    ]
  },
  wrap: {
    title: "Wrap & Esthétique",
    items: [
      { id: 'tint_front', name: "Teinte Lumières Avant", price: "129,95 $", note: "" },
      { id: 'tint_rear', name: "Teinte Lumières Arrière", price: "129,95 $", note: "" },
      { id: 'chrome_delete', name: "Chrome Delete Complet", price: "399,95 $", note: "" },
      { id: 'full_wrap', name: "Wrap Complet", price: "2 999,95 $", note: "Couleur au choix" }
    ]
  }
};

// Services affichés sur la page d'accueil (Résumé)
const SERVICES_HIGHLIGHTS = [
  {
    id: 'ceramic',
    title: { fr: 'Protection Céramique', en: 'Ceramic Coating' },
    desc: { fr: 'De Hydro Shine à la Nanocéramique 5 ans. Une brillance incomparable.', en: 'From Hydro Shine to 5-Year Nano. Unmatched shine.' },
    price: { fr: 'À partir de 149,95$', en: 'Starting at $149.95' },
    icon: Shield,
    image: THEME.images.services.ceramic
  },
  {
    id: 'correction',
    title: { fr: 'Correction de Peinture', en: 'Paint Correction' },
    desc: { fr: 'Polissage 1 ou 2 étapes pour éliminer les micro-rayures et tourbillons.', en: '1 or 2 step polishing to remove micro-scratches and swirls.' },
    price: { fr: 'À partir de 379,95$', en: 'Starting at $379.95' },
    icon: Sparkles,
    image: THEME.images.services.correction
  },
  {
    id: 'detailing',
    title: { fr: 'Esthétique Complète', en: 'Full Detailing' },
    desc: { fr: 'Nettoyage complet ou remise à neuf totale du véhicule.', en: 'Complete cleaning or total vehicle refurbishment.' },
    price: { fr: 'À partir de 149,95$', en: 'Starting at $149.95' },
    icon: Droplets,
    image: THEME.images.services.detailing
  }
];

const REVIEWS = [
  { name: "Marc-André L.", rating: 5, text: "Ma Tesla a l'air plus neuve que lors de la livraison. Service incroyable à Mascouche." },
  { name: "Sophie B.", rating: 5, text: "Le traitement céramique a sauvé ma peinture cet hiver. Je recommande le club VIP!" },
  { name: "Jean-Pierre G.", rating: 5, text: "Vrais pros. Ils ont récupéré des rayures que je pensais permanentes." }
];

// --- HELPERS ---

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = "https://placehold.co/800x600/161616/D4AF37?text=Image+Unavailable";
};

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-md font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-sm cursor-pointer select-none";
  const variants = {
    primary: "bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] active:scale-95",
    secondary: "bg-transparent border border-neutral-700 text-white hover:border-amber-400 hover:text-amber-400 active:scale-95",
    outline: "bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400/10 active:scale-95",
    ghost: "bg-transparent text-neutral-400 hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
      {Icon && <Icon size={18} />}
    </button>
  );
};

const SectionHeading = ({ sub, title, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">{sub}</span>
    <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-sans tracking-tight leading-tight">
      {title}
    </h2>
    <div className={`h-1 w-20 bg-amber-400 mt-4 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </div>
);

// --- SECTIONS ---

const Navbar = ({ lang, setLang, openBooking, page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    if (page !== 'home') {
      setPage('home');
      // Wait for page transition then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenu(false);
  };

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Réalisations', id: 'results' },
    { label: 'Club VIP', id: 'vip' },
    { label: 'Avis', id: 'reviews' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => setPage('home')}
          className="text-2xl font-black text-white tracking-tighter cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <div className="w-8 h-8 bg-amber-400 flex items-center justify-center rounded text-black font-bold">G</div>
          GBT <span className="text-neutral-500 font-light">AESTHETICS</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors uppercase tracking-wide cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => setPage('wrap')} className="text-sm font-bold text-neutral-300 hover:text-blue-400 transition-colors uppercase tracking-wide flex items-center gap-1 cursor-pointer">
            <Shield size={14} className="text-blue-400" /> Wrap
          </button>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-neutral-500 hover:text-white font-bold text-xs">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Button onClick={openBooking} icon={Calendar}>
            {lang === 'fr' ? 'Réserver' : 'Book Now'}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="text-lg font-bold text-white text-left py-2 active:text-amber-400"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { setPage('wrap'); setMobileMenu(false); }} className="text-lg font-bold text-white text-left py-2 active:text-blue-400 flex items-center gap-2">
            <Shield size={18} className="text-blue-400" /> Wrap
          </button>
          <hr className="border-neutral-800 my-2" />
          <Button onClick={() => { openBooking(); setMobileMenu(false); }} className="w-full">
            {lang === 'fr' ? 'Réserver' : 'Book Now'}
          </Button>
        </div>
      )}
    </nav>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const position = ((pageX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden cursor-col-resize select-none border border-neutral-800 shadow-2xl bg-neutral-900 group"
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0">
        <img src={THEME.images.compare} alt="After" className="w-full h-full object-cover" onError={handleImageError} />
        <div className="absolute top-4 right-4 bg-amber-400 text-black font-bold px-3 py-1 rounded text-xs z-10 shadow-lg">APRÈS / AFTER</div>
      </div>

      <div className="absolute inset-0 overflow-hidden border-r-2 border-amber-400" style={{ width: `${sliderPosition}%` }}>
        <div className="relative h-full" style={{ width: containerWidth ? `${containerWidth}px` : '100vw' }}>
          <img
            src={THEME.images.compare}
            alt="Before"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%) brightness(0.6) sepia(0.2) contrast(1.2) blur(0.5px)' }}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-neutral-500/10 mix-blend-overlay"></div>
        </div>
        <div className="absolute top-4 left-4 bg-neutral-900 text-white font-bold px-3 py-1 rounded text-xs border border-neutral-700 z-10 shadow-lg">AVANT / BEFORE</div>
      </div>

      <div className="absolute top-0 bottom-0 w-10 -ml-5 cursor-col-resize z-20 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ left: `${sliderPosition}%` }}>
        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] text-black border-2 border-white">
          <div className="flex gap-1"><ChevronLeft size={14} className="stroke-[3]" /><ChevronRight size={14} className="stroke-[3]" /></div>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    vehicle: { type: '', make: '', model: '' },
    condition: '',
    service: [], // Changed to array for multiple selections if needed, keeping simple for now
    date: { time: '' },
    contact: { name: '', email: '', phone: '' }
  });

  const toggleService = (serviceId) => {
    // For now, single select logic for simplicity in this flow, but adaptable
    setFormData({ ...formData, service: [serviceId] });
  };

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleConfirm = () => {
    setIsSubmitting(true);
    console.log("Booking Data Submitted:", formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden relative z-10 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              {submitted ? (lang === 'fr' ? 'Confirmé' : 'Confirmed') : (lang === 'fr' ? 'Réservation' : 'Booking')}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {lang === 'fr' ? 'Esthétique Automobile GBT - Mascouche' : 'GBT Auto Aesthetics - Mascouche'}
            </p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-2"><X /></button>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="w-full bg-neutral-800 h-1">
            <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto">

          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} />
              </div>
              <h4 className="text-3xl font-bold text-white mb-4">
                {lang === 'fr' ? 'Demande Reçue !' : 'Request Received!'}
              </h4>
              <p className="text-neutral-400 max-w-md mx-auto mb-8">
                {lang === 'fr'
                  ? "Merci pour votre confiance. Un membre de l'équipe GBT vous contactera d'ici 2 heures pour confirmer le rendez-vous."
                  : "Thank you for trusting us. A GBT team member will contact you within 2 hours to confirm the appointment."}
              </p>
              <Button onClick={onClose} className="w-full max-w-xs">
                {lang === 'fr' ? 'Retour au site' : 'Back to site'}
              </Button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {lang === 'fr' ? 'Quel est votre véhicule ?' : 'What is your vehicle?'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {['Sedan', 'SUV', 'Truck', 'Exotic'].map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, vehicle: { ...formData.vehicle, type } })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${formData.vehicle.type === type ? 'border-amber-400 bg-amber-400/10 text-white' : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'}`}
                      >
                        <Car size={32} />
                        <span className="font-bold">{type}</span>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder={lang === 'fr' ? "Marque (ex: Tesla)" : "Make"}
                      className="bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => setFormData({ ...formData, vehicle: { ...formData.vehicle, make: e.target.value } })}
                    />
                    <input
                      placeholder={lang === 'fr' ? "Modèle (ex: Model 3)" : "Model"}
                      className="bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => setFormData({ ...formData, vehicle: { ...formData.vehicle, model: e.target.value } })}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {lang === 'fr' ? 'Condition actuelle' : 'Current Condition'}
                  </h4>
                  <div className="space-y-3">
                    {[
                      { val: 'new', label: 'Neuf / Excellent', desc: 'Peu ou pas de défauts' },
                      { val: 'avg', label: 'Moyen', desc: 'Quelques tourbillons, saleté normale' },
                      { val: 'bad', label: 'Intense', desc: "Rayures, poils d'animaux, calcium" },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setFormData({ ...formData, condition: opt.val })}
                        className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all ${formData.condition === opt.val ? 'border-amber-400 bg-amber-400/10' : 'border-neutral-800 hover:bg-neutral-800'}`}
                      >
                        <div>
                          <div className="font-bold text-lg text-white">{opt.label}</div>
                          <div className="text-neutral-400 text-sm">{opt.desc}</div>
                        </div>
                        {formData.condition === opt.val && <CheckCircle className="text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {lang === 'fr' ? 'Services Requis' : 'Required Services'}
                  </h4>

                  <div className="space-y-6">
                    {Object.entries(PRICING_DATA).map(([key, category]) => (
                      <div key={key}>
                        <h5 className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3 border-b border-neutral-800 pb-2">
                          {category.title}
                        </h5>
                        <div className="space-y-2">
                          {category.items.map(item => (
                            <button
                              key={item.id}
                              onClick={() => toggleService(item.id)}
                              className={`w-full text-left p-3 rounded-lg border flex justify-between items-center transition-all ${formData.service.includes(item.id) ? 'border-amber-400 bg-amber-400/10' : 'border-neutral-800 hover:bg-neutral-800'}`}
                            >
                              <div>
                                <div className="font-bold text-white">{item.name}</div>
                                {item.note && <div className="text-neutral-500 text-xs italic">{item.note}</div>}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-amber-400 font-mono text-sm">
                                  {item.price.includes('à partir') ? <span className="text-xs text-neutral-500 mr-1">dès</span> : ''}
                                  {item.price.replace('à partir de ', '')}
                                </span>
                                {formData.service.includes(item.id) ? <CheckCircle size={18} className="text-amber-400" /> : <div className="w-[18px] h-[18px] rounded-full border border-neutral-600"></div>}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {lang === 'fr' ? 'Vos Coordonnées' : 'Your Details'}
                  </h4>
                  <div className="space-y-4">
                    <input
                      placeholder="Nom Complet / Full Name"
                      className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })}
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                    />
                    <input
                      placeholder="Téléphone / Phone"
                      type="tel"
                      className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                    />
                    <div className="p-4 bg-neutral-800 rounded-lg">
                      <div className="text-neutral-400 text-xs uppercase tracking-wider mb-2">Disponibilité (Demain)</div>
                      <div className="flex gap-2">
                        {['09:00', '13:00', '15:00'].map(time => (
                          <button
                            key={time}
                            onClick={() => setFormData({ ...formData, date: { time } })}
                            className={`flex-1 p-2 text-center rounded text-sm font-bold transition-all ${formData.date.time === time
                              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                              : 'bg-neutral-900 border border-neutral-700 text-white hover:border-amber-400'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        {!submitted && (
          <div className="p-6 border-t border-neutral-800 flex justify-between bg-neutral-950">
            {step > 1 ? (
              <Button variant="ghost" onClick={prevStep}>
                {lang === 'fr' ? 'Retour' : 'Back'}
              </Button>
            ) : <div></div>}

            {step < 4 ? (
              <Button onClick={nextStep} icon={ArrowRight}>
                {lang === 'fr' ? 'Suivant' : 'Next'}
              </Button>
            ) : (
              <Button onClick={handleConfirm} icon={isSubmitting ? null : CheckCircle} className={isSubmitting ? 'opacity-80 cursor-wait' : ''}>
                {isSubmitting ? (lang === 'fr' ? 'Envoi...' : 'Sending...') : (lang === 'fr' ? 'Confirmer' : 'Confirm')}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGES ---

const HomePage = ({ lang, openBooking }) => {
  const [vehicleQuery, setVehicleQuery] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const handleVehicleSearch = (e) => {
    e.preventDefault();
    setRecommendation(true);
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={THEME.images.heroBg}
            alt="Detailing Studio"
            className="w-full h-full object-cover transform scale-105 animate-in fade-in duration-1000"
            onError={handleImageError}
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-neutral-950/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50"></div>
          {/* Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Star size={14} className="fill-amber-400" />
              {lang === 'fr' ? '#1 Esthétique Auto Rive-Nord' : '#1 Auto Detailing North Shore'}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-2xl">
              {lang === 'fr' ? <span>L'Art de la<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Perfection</span></span> : <span>The Art of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Perfection</span></span>}
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-md">
              {lang === 'fr'
                ? "Redonnez à votre véhicule son éclat de salle de montre. Protection céramique, esthétique complète et restauration de précision à Mascouche."
                : "Restore your vehicle to showroom shine. Ceramic coating, full detailing, and precision restoration in Mascouche."}
            </p>

            {/* Vehicle Selector Widget */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-2xl max-w-xl mx-auto shadow-2xl animate-in fade-in zoom-in duration-500 delay-300">
              <form onSubmit={handleVehicleSearch} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                  <input
                    type="text"
                    placeholder={lang === 'fr' ? "Entrez votre véhicule (ex: Audi Q5)" : "Enter your vehicle (e.g. Audi Q5)"}
                    className="w-full h-14 bg-neutral-900/80 rounded-xl pl-12 pr-4 text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    value={vehicleQuery}
                    onChange={(e) => setVehicleQuery(e.target.value)}
                  />
                </div>
                <Button className="h-14 rounded-xl px-8" icon={ArrowRight}>
                  {lang === 'fr' ? 'Voir Forfaits' : 'See Packages'}
                </Button>
              </form>
            </div>

            {/* Recommendation Result */}
            {recommendation && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                <span
                  className="text-amber-400 font-bold text-sm bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 cursor-pointer hover:bg-amber-400/20 transition-colors"
                  onClick={openBooking}
                >
                  {lang === 'fr' ? `✨ Offre recommandée pour ${vehicleQuery || 'votre véhicule'} (Cliquez ici)` : `✨ Recommended offer for ${vehicleQuery || 'your vehicle'} (Click here)`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          aria-label={lang === 'fr' ? 'Aller aux services' : 'Go to services'}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="group absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {lang === 'fr' ? 'Défiler' : 'Scroll'}
          </span>
          <div className="w-6 h-10 border-2 border-neutral-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full scroll-wheel"></div>
          </div>
        </button>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 bg-neutral-950 border-b border-neutral-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Ceramic Pro', 'Gtechniq', 'Rupes', 'XPEL'].map(brand => (
              <div key={brand} className="text-center font-black text-2xl text-white flex items-center justify-center border border-white/10 h-20 rounded-lg cursor-default hover:bg-white/5 transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-neutral-950 relative" id="services">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={lang === 'fr' ? "Nos Services" : "Our Services"}
            sub={lang === 'fr' ? "Expertise Certifiée" : "Certified Expertise"}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES_HIGHLIGHTS.map((service) => (
              <div
                key={service.id}
                className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={openBooking}
              >
                {/* Image Area */}
                <div className="h-64 bg-neutral-800 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={lang === 'fr' ? service.title.fr : service.title.en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>

                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-amber-400 font-mono text-sm border border-amber-400/20">
                    {lang === 'fr' ? service.price.fr : service.price.en}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-black mb-6 shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform -mt-14 relative z-10 border-4 border-neutral-900">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase font-sans">{lang === 'fr' ? service.title.fr : service.title.en}</h3>
                  <p className="text-neutral-400 mb-6 leading-relaxed">{lang === 'fr' ? service.desc.fr : service.desc.en}</p>

                  <button className="text-white font-bold uppercase text-sm tracking-wider flex items-center gap-2 group-hover:text-amber-400 transition-colors">
                    {lang === 'fr' ? 'Réserver' : 'Book Now'} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER SHOWCASE */}
      <section className="py-24 bg-neutral-900 overflow-hidden" id="results">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <SectionHeading
                align="left"
                title={lang === 'fr' ? "Résultats Prouvés" : "Proven Results"}
                sub="Transformation"
              />
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                {lang === 'fr'
                  ? "Les micro-rayures ternissent la couleur de votre véhicule. Notre processus de correction de peinture en plusieurs étapes restaure la profondeur et la clarté d'origine."
                  : "Micro-scratches dull your vehicle's color. Our multi-step paint correction process restores original depth and clarity."}
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  lang === 'fr' ? 'Élimination des tourbillons' : 'Swirl mark removal',
                  lang === 'fr' ? 'Restauration de la brillance' : 'Gloss restoration',
                  lang === 'fr' ? 'Protection céramique longue durée' : 'Long-term ceramic protection'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <CheckCircle className="text-amber-400" size={20} /> {item}
                  </li>
                ))}
              </ul>

              <Button onClick={openBooking}>
                {lang === 'fr' ? 'Obtenir ces résultats' : 'Get These Results'}
              </Button>
            </div>
            <div className="lg:w-1/2 w-full">
              <BeforeAfterSlider />
              <p className="text-center text-neutral-500 text-sm mt-4 flex items-center justify-center gap-2">
                <Sparkles size={14} /> {lang === 'fr' ? 'Glissez pour comparer' : 'Drag to compare'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLUB VIP */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900" id="vip">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 md:p-12 border border-neutral-800 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="md:w-1/2">
                <span className="bg-amber-400 text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Club VIP</span>
                <h2 className="text-4xl font-black text-white uppercase mb-4">
                  {lang === 'fr' ? "Gardez votre auto neuve à l'année" : "Keep your car new all year round"}
                </h2>
                <p className="text-neutral-400 mb-8 text-lg">
                  {lang === 'fr'
                    ? "Rejoignez le club exclusif pour seulement 59.99$/mois. Lavages inclus, rabais sur les protections et priorité de réservation."
                    : "Join the exclusive club for just $59.99/mo. Washes included, discounts on protection, and priority booking."}
                </p>
                <Button variant="outline" onClick={openBooking}>
                  {lang === 'fr' ? 'Devenir Membre' : 'Become a Member'}
                </Button>
              </div>

              <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
                {[
                  { title: '1 Lavage/mois', sub: 'Inclus' },
                  { title: '10% Rabais', sub: 'Services' },
                  { title: 'Priorité', sub: 'Booking' },
                  { title: 'Lave-glace', sub: 'Gratuit' },
                ].map((perk, i) => (
                  <div key={i} className="bg-neutral-950/50 p-6 rounded-xl border border-white/5 text-center cursor-default hover:bg-neutral-900 transition-colors">
                    <div className="text-amber-400 font-bold text-xl mb-1">{perk.title}</div>
                    <div className="text-neutral-500 text-sm uppercase tracking-wide">{perk.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-neutral-950" id="reviews">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading title="Avis Clients" sub="Google 5.0 ★★★★★" />
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 text-left relative hover:-translate-y-1 transition-transform duration-300">
                <div className="text-amber-400 flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-neutral-300 mb-6 italic">"{rev.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-neutral-500">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{rev.name}</div>
                    <div className="text-neutral-500 text-xs">Client Vérifié</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading
            title={lang === 'fr' ? "Suivez-Nous" : "Follow Us"}
            sub="@GBT_AESTHETICS"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                href={THEME.links.instagram}
                target="_blank"
                rel="noreferrer"
                key={post.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-900 cursor-pointer block"
              >
                <img
                  src={post.img}
                  alt={post.desc}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={handleImageError}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                  <div className="flex items-center gap-2 font-bold text-lg">
                    <Heart className="fill-white text-white" size={20} /> {post.likes}
                  </div>
                  <p className="text-xs text-neutral-300 px-4 text-center line-clamp-2">{post.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href={THEME.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-neutral-800 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group"
            >
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              {lang === 'fr' ? 'Voir le Profil' : 'View Profile'} <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const WrapPage = ({ lang, openBooking }) => {
  return (
    <div className="w-full pt-20 bg-neutral-950 min-h-screen animate-in fade-in duration-500">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-600/30">
              Partenaire Exclusif
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-6 leading-tight">
              Changement de couleur & <span className="text-blue-500">Protection</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
              {lang === 'fr'
                ? "Réalisé par nos experts partenaires chez Protection Prestige, directement dans nos installations de Mascouche."
                : "Executed by our partners at Protection Prestige, right here in our Mascouche facility."}
            </p>

            <div className="flex gap-4 mb-12">
              <Button className="bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20 text-white" onClick={openBooking}>
                {lang === 'fr' ? 'Soumission Wrap' : 'Get Wrap Quote'}
              </Button>
              <div className="px-6 py-3 border border-neutral-700 rounded-md text-neutral-400 flex items-center gap-2">
                Powered by <span className="font-bold text-white">PROTECTION PRESTIGE</span>
              </div>
            </div>

            {/* Tableau de prix Wrap mis à jour */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                <div className="text-blue-400 font-bold mb-1">Teinte de Lumières</div>
                <div className="text-2xl font-black text-white">129,95 $ <span className="text-sm font-normal text-neutral-500">/ paire</span></div>
                <div className="text-neutral-500 text-xs mt-1">Avant ou Arrière</div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                <div className="text-blue-400 font-bold mb-1">Chrome Delete</div>
                <div className="text-2xl font-black text-white"><span className="text-sm font-normal text-neutral-500">à partir de</span> 399,95 $</div>
                <div className="text-neutral-500 text-xs mt-1">Finition Noir Gloss/Mat</div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl md:col-span-2">
                <div className="text-blue-400 font-bold mb-1">Wrap Complet</div>
                <div className="text-3xl font-black text-white"><span className="text-sm font-normal text-neutral-500">à partir de</span> 2 999,95 $</div>
                <div className="text-neutral-500 text-xs mt-1">Vinyle Premium (Avery/3M) • Garantie Incluse</div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="aspect-square rounded-3xl bg-neutral-900 border border-neutral-800 relative overflow-hidden group shadow-2xl">
              <img
                src={THEME.images.wrap}
                alt="Wrap texture"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-neutral-900/80 mix-blend-multiply"></div>

              {/* Visual Representation of Wrap */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-neutral-800 rounded-xl relative overflow-hidden shadow-2xl transform group-hover:rotate-3 transition-transform duration-700 border border-white/10">
                  {/* Half/Half color change simulation */}
                  <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                    <span className="text-black/20 font-black text-4xl rotate-12">ORIGINAL</span>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 clip-path-diagonal group-hover:w-full transition-all duration-1000 flex items-center justify-center">
                    <span className="text-white/20 font-black text-4xl rotate-12">WRAPPED</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-black font-bold text-xs bg-white px-2 py-1 rounded z-10 shadow-lg">MATTE BLUE METALLIC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT ---

const App = () => {
  const [lang, setLang] = useState('fr'); // 'fr' or 'en'
  const [page, setPage] = useState('home'); // 'home' or 'wrap'
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className={`min-h-screen ${THEME.colors.bgMain} ${THEME.colors.textMain} font-sans selection:bg-amber-400 selection:text-black`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@400;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Oswald', sans-serif; }
        .clip-path-diagonal { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0); }
        .cursor-wait { cursor: wait; }
        .scroll-wheel { animation: scroll-wheel 1.6s ease-in-out infinite; }
        @keyframes scroll-wheel {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>

      <Navbar
        lang={lang}
        setLang={setLang}
        openBooking={() => setIsBookingOpen(true)}
        page={page}
        setPage={setPage}
      />

      <main>
        {page === 'home' && <HomePage lang={lang} openBooking={() => setIsBookingOpen(true)} />}
        {page === 'wrap' && <WrapPage lang={lang} openBooking={() => setIsBookingOpen(true)} />}
      </main>

      {/* Sticky Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 p-4 flex gap-4 z-40 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
        <a href="tel:+15142587909" className="flex-1 bg-neutral-800 text-white py-3 rounded font-bold flex items-center justify-center gap-2 active:bg-neutral-700">
          <Phone size={18} /> {lang === 'fr' ? 'Appeler' : 'Call'}
        </a>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-1 bg-amber-400 text-black py-3 rounded font-bold uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:bg-amber-500"
        >
          <Calendar size={18} /> {lang === 'fr' ? 'Réserver' : 'Book'}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-24 md:pb-16 text-neutral-400 text-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-black text-white tracking-tighter mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-400 flex items-center justify-center rounded text-black font-bold">G</div>
                GBT
              </div>
              <p className="mb-4">
                {lang === 'fr' ? "L'excellence en esthétique automobile sur la Rive-Nord." : 'Excellence in automotive detailing on the North Shore.'}
              </p>
              <div className="flex gap-4">
                <a href={THEME.links.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="hover:text-amber-400 cursor-pointer" />
                </a>
                <Mail className="hover:text-amber-400 cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase mb-6">Services</h4>
              <ul className="space-y-3">
                <li className="hover:text-white cursor-pointer transition-colors">Protection Céramique</li>
                <li className="hover:text-white cursor-pointer transition-colors">Correction Peinture</li>
                <li className="hover:text-white cursor-pointer transition-colors">Lavage Signature</li>
                <li className="hover:text-white cursor-pointer transition-colors">Wrap & PPF</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase mb-6">{lang === 'fr' ? 'Villes Desservies' : 'Service Areas'}</h4>
              <ul className="space-y-3">
                <li>Mascouche</li>
                <li>Blainville</li>
                <li>Mirabel</li>
                <li>Prévost</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><MapPin size={16} className="text-amber-400" /> 122B Chemin des Anglais, Mascouche, J7L 3N6</li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-amber-400" />
                  <a href="tel:+15142587909" className="hover:text-white transition-colors">(514) 258-7909</a>
                </li>
                <li className="flex items-center gap-2"><Clock size={16} className="text-amber-400" /> Lun-Ven: 9h - 18h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© 2026 GBT Aesthetics. All rights reserved.</div>
            <div className="flex gap-2 items-center text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {lang === 'fr' ? 'Système Opérationnel' : 'System Operational'}
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
      />
    </div>
  );
};

export default App;
