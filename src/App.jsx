import React, { useState, useEffect, useRef } from 'react';
import hero4k from './assets/hero-4k.jpg';
import hero3x2 from './assets/hero-3x2.jpg';
import heroPortrait from './assets/hero-portrait.jpg';
import beforeCompare from './assets/before.jpg';
import afterCompare from './assets/after.jpg';
import instagramPorsche from './assets/instagram-porsche.jpg';
import instagramBmw from './assets/instagram-bmw.jpg';
import instagramAudiRs6 from './assets/instagram-audi-rs6.jpg';
import instagramRangeRover from './assets/instagram-range-rover-sport.jpg';
import logoWide from './assets/Horizontal-GBT-LOGO.png';
import serviceCeramic from './assets/service-protection-ceramique.jpg';
import serviceCorrection from './assets/service-correction-peinture.jpg';
import serviceDetailing from './assets/service-esthetique-complete.jpg';
import protectionPrestigeLogo from './assets/Protection-Prestige-Transparent-logo-640x160px.png';
import {
  MAKE_OPTIONS_CA,
  MODELS_BY_MAKE_CA,
  POPULAR_CHIPS_BY_VEHICLE_TYPE
} from './data/vehicleCatalog.ca';
import {
  Car,
  CarFront,
  Truck,
  Gauge,
  Zap,
  Bike,
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
    heroBg: hero4k,
    services: {
      ceramic: serviceCeramic,
      correction: serviceCorrection,
      detailing: serviceDetailing
    },
    compareBefore: beforeCompare,
    compareAfter: afterCompare,
    wrap: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=1000&auto=format&fit=crop"
  },
  links: {
    instagram: "https://www.instagram.com/gbt.esthetique?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  }
};

const INSTAGRAM_POSTS = [
  {
    id: 1,
    likes: 95,
    img: instagramPorsche,
    desc: "Magnifique Porsche 911 Turbo S 2023\n\nNettoyage complet intérieur + extérieur",
    link: "https://www.instagram.com/p/DKsoZDCSk68/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 2,
    likes: 243,
    img: instagramAudiRs6,
    desc: "Magnifique Audi RS6 !\n\nDetailing intérieur + extérieur complet",
    link: "https://www.instagram.com/p/DLs8xWfvpAl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 3,
    likes: 210,
    img: instagramRangeRover,
    desc: "Detailing complet sur ce magnifique Range Rover Sport !",
    link: "https://www.instagram.com/p/DLDrI-mycbt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  },
  {
    id: 4,
    likes: 132,
    img: instagramBmw,
    desc: "BMW — Correction de peinture & brillance miroir.",
    link: THEME.links.instagram
  }
];

// Données détaillées pour le Modal de Réservation
const PRICING_DATA = {
  detailing: {
    title: { fr: "Detailing / Nettoyage", en: "Detailing / Cleaning" },
    items: [
      {
        id: 'detailing_full',
        name: { fr: "Nettoyage Complet", en: "Full Cleaning" },
        price: { fr: "149,95 $", en: "$149.95" },
        note: { fr: "Durée ≈ 2,5 h", en: "Duration ≈ 2.5 h" }
      },
      {
        id: 'restoration_full',
        name: { fr: "Remise à neuf Véhicule", en: "Vehicle Reconditioning" },
        price: { fr: "399,95 $", en: "$399.95" },
        note: { fr: "Intérieur & Extérieur", en: "Interior & Exterior" }
      }
    ]
  },
  polishing: {
    title: { fr: "Polissage & Correction", en: "Polishing & Correction" },
    items: [
      {
        id: 'headlight_basic',
        name: { fr: "Polissage Phares (1 étape)", en: "Headlight Polish (1 step)" },
        price: { fr: "59,95 $", en: "$59.95" },
        note: { fr: "", en: "" }
      },
      {
        id: 'headlight_restoration',
        name: { fr: "Remise à neuf Phares (3 étapes)", en: "Headlight Restoration (3 steps)" },
        price: { fr: "149,95 $", en: "$149.95" },
        note: { fr: "", en: "" }
      },
      {
        id: 'polish_1step',
        name: { fr: "Polissage 1 étape", en: "1-Step Polish" },
        price: { fr: "379,95 $", en: "$379.95" },
        note: { fr: "Durée ≈ 4 h", en: "Duration ≈ 4 h" }
      },
      {
        id: 'polish_2step',
        name: { fr: "Polissage 2 étapes", en: "2-Step Polish" },
        price: { fr: "769,95 $", en: "$769.95" },
        note: { fr: "Durée ≈ 8 h", en: "Duration ≈ 8 h" }
      }
    ]
  },
  protection: {
    title: { fr: "Cirage & Protection", en: "Wax & Protection" },
    items: [
      {
        id: 'hydro_shine',
        name: { fr: "Cire Hydro Shine", en: "Hydro Shine Wax" },
        price: { fr: "30,00 $", en: "$30.00" },
        note: { fr: "1 à 2 semaines", en: "1–2 weeks" }
      },
      {
        id: 'sealant',
        name: { fr: "Scellant à peinture", en: "Paint Sealant" },
        price: { fr: "80,00 $", en: "$80.00" },
        note: { fr: "6 mois", en: "6 months" }
      },
      {
        id: 'nano_1yr',
        name: { fr: "Nanocéramique 1 an", en: "Nano Ceramic 1 year" },
        price: { fr: "149,95 $", en: "$149.95" },
        note: { fr: "Protection durable", en: "Long-lasting protection" }
      },
      {
        id: 'nano_3yr',
        name: { fr: "Nanocéramique 3 ans", en: "Nano Ceramic 3 years" },
        price: { fr: "399,95 $", en: "$399.95" },
        note: { fr: "Protection supérieure", en: "Superior protection" }
      },
      {
        id: 'nano_5yr',
        name: { fr: "Nanocéramique 5 ans", en: "Nano Ceramic 5 years" },
        price: { fr: "599,95 $", en: "$599.95" },
        note: { fr: "L'ultime protection", en: "Ultimate protection" }
      }
    ]
  },
  glass: {
    title: { fr: "Protection Vitres", en: "Glass Protection" },
    items: [
      {
        id: 'aquapel',
        name: { fr: "Aquapel", en: "Aquapel" },
        price: { fr: "40,00 $", en: "$40.00" },
        note: { fr: "6 à 8 mois", en: "6–8 months" }
      },
      {
        id: 'nano_windshield',
        name: { fr: "Nanocéramique Pare-brise", en: "Windshield Nano Ceramic" },
        price: { fr: "99,95 $", en: "$99.95" },
        note: { fr: "2 ans", en: "2 years" }
      }
    ]
  },
  wrap: {
    title: { fr: "Wrap & Esthétique", en: "Wrap & Styling" },
    items: [
      {
        id: 'tint_front',
        name: { fr: "Teinte Lumières Avant", en: "Front Lights Tint" },
        price: { fr: "129,95 $", en: "$129.95" },
        note: { fr: "", en: "" }
      },
      {
        id: 'tint_rear',
        name: { fr: "Teinte Lumières Arrière", en: "Rear Lights Tint" },
        price: { fr: "129,95 $", en: "$129.95" },
        note: { fr: "", en: "" }
      },
      {
        id: 'chrome_delete',
        name: { fr: "Chrome Delete Complet", en: "Full Chrome Delete" },
        price: { fr: "399,95 $", en: "$399.95" },
        note: { fr: "", en: "" }
      },
      {
        id: 'full_wrap',
        name: { fr: "Wrap Complet", en: "Full Wrap" },
        price: { fr: "2 999,95 $", en: "$2,999.95" },
        note: { fr: "Couleur au choix", en: "Color of your choice" }
      }
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

const POPULAR_SERVICES = [
  { label: { fr: 'Nettoyage complet', en: 'Full cleaning' }, action: 'booking', serviceId: 'detailing_full' },
  { label: { fr: 'Nanocéramique 3 ans', en: '3-year nano ceramic' }, action: 'booking', serviceId: 'nano_3yr' },
  { label: { fr: 'Wrap', en: 'Wrap' }, action: 'wrap' }
];

const BRAND_BADGES = [
  {
    id: 'ceramic-pro',
    name: 'Ceramic Pro',
    tooltip: { fr: 'Protection nanocéramique (1 à 5 ans).', en: 'Nano-ceramic protection (1–5 years).' },
    about: {
      fr: 'Protection nanocéramique pour renforcer la brillance et aider à protéger la peinture.',
      en: 'Nano-ceramic protection to boost gloss and help protect paint.'
    },
    services: {
      fr: ['Cire nanocéramique 1 an', 'Cire nanocéramique 3 ans', 'Cire nanocéramique 5 ans'],
      en: ['Nano ceramic 1 year', 'Nano ceramic 3 years', 'Nano ceramic 5 years']
    },
    cta: { label: { fr: 'Voir les protections céramiques', en: 'See ceramic protection' }, scroll: 'service-ceramic' }
  },
  {
    id: 'gtechniq',
    name: 'Gtechniq',
    tooltip: { fr: 'Scellants et traitements de protection.', en: 'Sealants and protection treatments.' },
    about: {
      fr: 'Scellants et traitements pour protéger la finition et faciliter l’entretien.',
      en: 'Sealants and treatments to protect the finish and simplify maintenance.'
    },
    services: {
      fr: ['Scellant à peinture (durée 6 mois)', 'Cire hydro shine (1–2 semaines)', 'Traitements / protections'],
      en: ['Paint sealant (6 months)', 'Hydro shine wax (1–2 weeks)', 'Treatments / protection']
    },
    cta: { label: { fr: 'Voir les protections', en: 'See protection options' }, scroll: 'service-ceramic' }
  },
  {
    id: 'rupes',
    name: 'Rupes',
    tooltip: { fr: 'Outils pro pour polissage et correction.', en: 'Pro tools for polishing and correction.' },
    about: {
      fr: 'Équipements professionnels de polissage pour corriger la peinture et améliorer la finition.',
      en: 'Professional polishing equipment to correct paint and improve finish.'
    },
    services: {
      fr: ['Polissage 1 étape (≈4h)', 'Polissage 2 étapes (≈8h)', 'Remise à neuf du véhicule'],
      en: ['1-step polish (≈4h)', '2-step polish (≈8h)', 'Vehicle reconditioning']
    },
    cta: { label: { fr: 'Voir le polissage', en: 'See polishing' }, scroll: 'service-correction' }
  },
  {
    id: 'xpel',
    name: 'XPEL',
    tooltip: { fr: 'Films de protection / wrap.', en: 'Protection films / wrap.' },
    about: {
      fr: 'Films pour protection et personnalisation (wrap, chrome delete, teinte, etc.).',
      en: 'Films for protection and personalization (wrap, chrome delete, tint, etc.).'
    },
    services: {
      fr: ['Lumières avant teintées', 'Lumières arrière teintées', 'Chrome delete complet', 'Wrap complet'],
      en: ['Tinted front lights', 'Tinted rear lights', 'Full chrome delete', 'Full wrap']
    },
    cta: { label: { fr: 'Voir la section wrap', en: 'See wrap section' }, page: 'wrap' }
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => setPage('home')}
          className="text-2xl font-black text-white tracking-tighter cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <img
            src={logoWide}
            alt="GBT Aesthetics"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-center">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="text-base lg:text-lg font-medium text-neutral-300 hover:text-amber-400 transition-colors uppercase tracking-wide cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => setPage('wrap')} className="text-base lg:text-lg font-bold text-neutral-300 hover:text-blue-400 transition-colors uppercase tracking-wide flex items-center gap-2 cursor-pointer">
            <Shield size={18} className="text-blue-400" /> Wrap
          </button>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="text-neutral-500 hover:text-white font-bold text-sm">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Button
            onClick={openBooking}
            icon={Calendar}
            className="text-base px-7 py-3.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 hover:from-amber-200 hover:via-amber-300 hover:to-amber-500 shadow-[0_0_18px_rgba(212,175,55,0.35)]"
          >
            {lang === 'fr' ? 'Réserver' : 'Book Now'}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-3" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 p-7 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="text-xl font-bold text-white text-left py-3 active:text-amber-400"
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { setPage('wrap'); setMobileMenu(false); }} className="text-xl font-bold text-white text-left py-3 active:text-blue-400 flex items-center gap-3">
            <Shield size={20} className="text-blue-400" /> Wrap
          </button>
          <hr className="border-neutral-800 my-2" />
          <Button onClick={() => { openBooking(); setMobileMenu(false); }} className="w-full text-base py-3.5">
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
  const isAfterActive = sliderPosition < 50;

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
      className="relative w-full h-[280px] sm:h-[380px] md:h-[600px] rounded-xl overflow-hidden cursor-col-resize select-none border border-neutral-800 shadow-2xl bg-neutral-900 group"
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0">
        <img src={THEME.images.compareAfter} alt="After" className="w-full h-full object-cover" onError={handleImageError} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"></div>
        <div
          className={`absolute top-4 right-4 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest z-10 shadow-[0_8px_30px_rgba(0,0,0,0.45)] border transition-colors ${
            isAfterActive
              ? 'bg-amber-400 text-black border-amber-200/40'
              : 'bg-neutral-950/70 text-amber-200 border-amber-400/30'
          }`}
        >
          APRÈS / AFTER
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden border-r-2 border-amber-400 shadow-[0_0_24px_rgba(212,175,55,0.35)]" style={{ width: `${sliderPosition}%` }}>
        <div className="relative h-full" style={{ width: containerWidth ? `${containerWidth}px` : '100vw' }}>
          <img
            src={THEME.images.compareBefore}
            alt="Before"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
        <div
          className={`absolute top-4 left-4 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest border z-10 shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-colors ${
            isAfterActive
              ? 'bg-neutral-950/90 text-amber-200 border-amber-400/30'
              : 'bg-amber-400 text-black border-amber-200/40'
          }`}
        >
          AVANT / BEFORE
        </div>
      </div>

      <div className="absolute top-0 bottom-0 w-10 -ml-5 cursor-col-resize z-20 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ left: `${sliderPosition}%` }}>
        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.55)] text-black border-2 border-white/80 ring-4 ring-amber-400/20">
          <div className="flex gap-1"><ChevronLeft size={14} className="stroke-[3]" /><ChevronRight size={14} className="stroke-[3]" /></div>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ isOpen, onClose, lang, prefill, prefillServiceId, entry = 'browse_services' }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    vehicle: { type: '', make: '', model: '', year: '', notes: '' },
    condition: '',
    service: [], // Changed to array for multiple selections if needed, keeping simple for now
    date: { time: '' },
    contact: { name: '', email: '', phone: '' }
  });
  const [showDetails, setShowDetails] = useState(false);
  const [pendingScroll, setPendingScroll] = useState(false);
  const [detailsAnimatedIn, setDetailsAnimatedIn] = useState(false);
  const [pendingOptionalScroll, setPendingOptionalScroll] = useState(false);
  const [makeSuggestionsOpen, setMakeSuggestionsOpen] = useState(false);
  const [modelSuggestionsOpen, setModelSuggestionsOpen] = useState(false);
  const [showAllPopularChips, setShowAllPopularChips] = useState(false);
  const detailsRef = useRef(null);
  const makeInputRef = useRef(null);
  const optionalButtonRef = useRef(null);
  const prevRequiredRef = useRef(false);
  const [errors, setErrors] = useState({});

  const toggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.service.includes(serviceId);
      const nextServices = exists
        ? prev.service.filter((id) => id !== serviceId)
        : [...prev.service, serviceId];
      return { ...prev, service: nextServices };
    });
    setErrors((prev) => ({ ...prev, service: undefined }));
  };

  const normalizeVehicleTypeKey = (value) => {
    if (!value) return '';
    const trimmed = value.toString().trim();
    const normalizedMap = {
      sedan: 'sedan',
      suv: 'suv',
      pickup: 'pickup',
      exotic: 'exotic',
      electric: 'electric',
      motorcycle: 'motorcycle',
      berline: 'sedan',
      'v.u.s.': 'suv',
      vus: 'suv',
      'pick-up': 'pickup',
      'pick‑up': 'pickup',
      camion: 'pickup',
      exotique: 'exotic',
      electrique: 'electric',
      électrique: 'electric',
      moto: 'motorcycle'
    };

    const direct = normalizedMap[trimmed];
    if (direct) return direct;
    const lower = trimmed.toLowerCase();
    return normalizedMap[lower] || trimmed;
  };

  const updateVehicleType = (typeId) => {
    const normalizedType = normalizeVehicleTypeKey(typeId);
    setFormData((prev) => ({ ...prev, vehicle: { ...prev.vehicle, type: normalizedType } }));
    setErrors((prev) => ({ ...prev, type: undefined }));
  };

  const updateVehicleField = (field, value) => {
    setFormData((prev) => ({ ...prev, vehicle: { ...prev.vehicle, [field]: value } }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const applyMakeSelection = (make) => {
    setFormData((prev) => {
      const models = MODELS_BY_MAKE_CA[make] || [];
      const hasModelMatch = models.some(
        (model) => model.toLowerCase() === prev.vehicle.model.trim().toLowerCase()
      );
      return {
        ...prev,
        vehicle: {
          ...prev.vehicle,
          make,
          model: prev.vehicle.model && !hasModelMatch ? '' : prev.vehicle.model
        }
      };
    });
    setErrors((prev) => ({ ...prev, make: undefined }));
  };

  const applyModelSelection = (model) => {
    updateVehicleField('model', model);
  };

  const handlePopularChipSelect = (make, model) => {
    setShowDetails(true);
    setPendingScroll(true);
    setFormData((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        make,
        model
      }
    }));
    setErrors((prev) => ({ ...prev, make: undefined, model: undefined }));
  };

  const conditionOptions = [
    { val: 'new', label: { fr: 'Neuf / Excellent', en: 'New / Excellent' }, desc: { fr: 'Peu ou pas de défauts', en: 'Few or no defects' } },
    { val: 'avg', label: { fr: 'Moyen', en: 'Average' }, desc: { fr: 'Quelques tourbillons, saleté normale', en: 'Some swirls, normal dirt' } },
    { val: 'bad', label: { fr: 'Intense', en: 'Heavy' }, desc: { fr: "Rayures, poils d'animaux, calcium", en: 'Scratches, pet hair, calcium' } },
  ];

  const bookingText = {
    fr: {
      title: 'Réservation',
      confirmed: 'Confirmé',
      subtitle: 'Esthétique Automobile GBT - Mascouche',
      requestReceived: 'Demande Reçue !',
      requestBody: "Merci pour votre confiance. Un membre de l'équipe GBT vous contactera d'ici 2 heures pour confirmer le rendez-vous.",
      backToSite: 'Retour au site',
      step1Title: 'Quel est votre véhicule ?',
      step2Title: 'Condition actuelle',
      step3Title: 'Services requis',
      step4Title: 'Vos coordonnées',
      back: 'Retour',
      next: 'Suivant',
      confirm: 'Confirmer',
      sending: 'Envoi...',
      availability: 'Disponibilité (Demain)',
      required: 'Requis',
      vehicleTypes: {
        sedan: 'Berline',
        suv: 'VUS',
        pickup: 'Pick-up',
        exotic: 'Exotique',
        electric: 'Électrique',
        motorcycle: 'Moto'
      },
      vehicleDetailsTitle: 'Détails du véhicule',
      addDetailsOptional: 'Ajouter les détails du véhicule (optionnel)',
      makeLabel: 'Marque',
      makeHelp: 'Ex : Toyota',
      modelLabel: 'Modèle',
      modelHelp: 'Ex : Corolla',
      yearLabel: 'Année',
      yearHelp: 'Ex : 2021',
      notesLabel: 'Notes (optionnel)',
      notesHelp: "Ex : peinture noire, micro-rayures, jantes, intérieur très sale",
      popularChipsTitle: 'Suggestions populaires',
      popularChipsMore: 'Voir plus',
      popularChipsLess: 'Voir moins',
      fullName: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      summaryTitle: 'Résumé',
      summaryVehicle: 'Véhicule',
      summaryType: 'Type',
      summaryServices: 'Services',
      summaryMakeModel: 'Marque/Modèle',
      summaryYear: 'Année',
      summaryNotProvided: 'Non précisé',
      servicesSingular: 'service',
      servicesPlural: 'services',
      validation: {
        typeRequired: 'Veuillez choisir un type de véhicule.',
        serviceRequired: 'Veuillez sélectionner un service.',
        nameRequired: 'Veuillez entrer votre nom.',
        emailRequired: 'Veuillez entrer votre email.',
        emailInvalid: 'Email invalide.',
        phoneRequired: 'Veuillez entrer votre téléphone.',
        makeRequired: 'Veuillez ajouter la marque.',
        modelRequired: 'Veuillez ajouter le modèle.',
        makeNeeded: 'Veuillez ajouter la marque.',
        modelNeeded: 'Veuillez ajouter le modèle.',
        yearRequired: 'Veuillez ajouter l’année.',
        yearInvalid: 'Année invalide (1900–2099).'
      }
    },
    en: {
      title: 'Booking',
      confirmed: 'Confirmed',
      subtitle: 'GBT Auto Aesthetics - Mascouche',
      requestReceived: 'Request Received!',
      requestBody: 'Thank you for trusting us. A GBT team member will contact you within 2 hours to confirm the appointment.',
      backToSite: 'Back to site',
      step1Title: 'What is your vehicle?',
      step2Title: 'Current condition',
      step3Title: 'Required services',
      step4Title: 'Your details',
      back: 'Back',
      next: 'Next',
      confirm: 'Confirm',
      sending: 'Sending...',
      availability: 'Availability (Tomorrow)',
      required: 'Required',
      vehicleTypes: {
        sedan: 'Sedan',
        suv: 'SUV',
        pickup: 'Pickup',
        exotic: 'Exotic',
        electric: 'Electric',
        motorcycle: 'Motorcycle'
      },
      vehicleDetailsTitle: 'Vehicle details',
      addDetailsOptional: 'Add vehicle details (optional)',
      makeLabel: 'Make',
      makeHelp: 'E.g., Toyota',
      modelLabel: 'Model',
      modelHelp: 'E.g., Corolla',
      yearLabel: 'Year',
      yearHelp: 'E.g., 2021',
      notesLabel: 'Notes (optional)',
      notesHelp: 'E.g., black paint, micro-scratches, wheels, very dirty interior',
      popularChipsTitle: 'Popular suggestions',
      popularChipsMore: 'Show more',
      popularChipsLess: 'Show less',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      summaryTitle: 'Summary',
      summaryVehicle: 'Vehicle',
      summaryType: 'Type',
      summaryServices: 'Services',
      summaryMakeModel: 'Make/Model',
      summaryYear: 'Year',
      summaryNotProvided: 'Not provided',
      servicesSingular: 'service',
      servicesPlural: 'services',
      validation: {
        typeRequired: 'Please select a vehicle type.',
        serviceRequired: 'Please select a service.',
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'Invalid email.',
        phoneRequired: 'Please enter your phone.',
        makeRequired: 'Please add the make.',
        modelRequired: 'Please add the model.',
        makeNeeded: 'Please add the make.',
        modelNeeded: 'Please add the model.',
        yearRequired: 'Please add the year.',
        yearInvalid: 'Invalid year (1900–2099).'
      }
    }
  };

  const bt = bookingText[lang];

  const vehicleTypes = [
    { id: 'sedan', label: bt.vehicleTypes.sedan, icon: Car },
    { id: 'suv', label: bt.vehicleTypes.suv, icon: CarFront },
    { id: 'pickup', label: bt.vehicleTypes.pickup, icon: Truck },
    { id: 'exotic', label: bt.vehicleTypes.exotic, icon: Gauge },
    { id: 'electric', label: bt.vehicleTypes.electric, icon: Zap },
    { id: 'motorcycle', label: bt.vehicleTypes.motorcycle, icon: Bike }
  ];

  const effectiveEntry = entry === 'popular_service' && !prefillServiceId ? 'browse_services' : entry;
  const stepsByEntry = {
    popular_service: ['vehicle', 'condition', 'contact'],
    browse_services: ['services', 'vehicle', 'condition', 'contact'],
    default: ['vehicle', 'condition', 'services', 'contact']
  };
  const steps = stepsByEntry[effectiveEntry] || stepsByEntry.default;
  const currentStep = steps[stepIndex] || steps[0];
  const isLastStep = stepIndex === steps.length - 1;

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStepIndex(0);
      setSubmitted(false);
      setIsSubmitting(false);
      setShowDetails(false);
      setPendingScroll(false);
      setDetailsAnimatedIn(false);
      setPendingOptionalScroll(false);
      setMakeSuggestionsOpen(false);
      setModelSuggestionsOpen(false);
      setErrors({});
      setFormData({
        vehicle: {
          type: normalizeVehicleTypeKey(prefill?.type || ''),
          make: prefill?.make || '',
          model: prefill?.model || '',
          year: prefill?.year || '',
          notes: prefill?.notes || ''
        },
        condition: '',
        service: prefillServiceId ? [prefillServiceId] : [],
        date: { time: '' },
        contact: { name: '', email: '', phone: '' }
      });
    }
  }, [isOpen, prefill, prefillServiceId]);

  const wrapServiceIds = new Set(['tint_front', 'tint_rear', 'chrome_delete', 'full_wrap']);
  const isWrapSelected = formData.service.some((id) => wrapServiceIds.has(id));
  const requiresDetailsByType = ['exotic', 'motorcycle'].includes(formData.vehicle.type);
  const requiresDetails = isWrapSelected || requiresDetailsByType;
  const requiresYear = isWrapSelected || requiresDetailsByType;
  const hasAnyDetails = [
    formData.vehicle.make?.trim(),
    formData.vehicle.model?.trim(),
    formData.vehicle.year?.trim(),
    formData.vehicle.notes?.trim()
  ].some(Boolean);

  const selectedTypeLabel = vehicleTypes.find((type) => type.id === formData.vehicle.type)?.label || bt.summaryNotProvided;
  const summaryMakeModel = formData.vehicle.make.trim() && formData.vehicle.model.trim()
    ? `${formData.vehicle.make.trim()} ${formData.vehicle.model.trim()}`
    : bt.summaryNotProvided;
  const summaryYear = formData.vehicle.year.trim() || bt.summaryNotProvided;
  const serviceCount = formData.service.length;
  const summaryServicesCount = serviceCount === 0
    ? bt.summaryNotProvided
    : `${serviceCount} ${serviceCount > 1 ? bt.servicesPlural : bt.servicesSingular}`;

  const normalizedVehicleTypeKey = normalizeVehicleTypeKey(formData.vehicle.type);
  const popularChipGroups = POPULAR_CHIPS_BY_VEHICLE_TYPE[normalizedVehicleTypeKey] || [];
  const popularChipItems = popularChipGroups
    .flatMap((entry) => entry.models.map((model) => ({ make: entry.make, model })))
    .slice(0, 6);
  const showPopularChipsToggle = popularChipItems.length > 3;
  const normalizeMakeKey = (value) => value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  const makeLookup = MAKE_OPTIONS_CA.reduce((acc, make) => {
    acc[normalizeMakeKey(make)] = make;
    return acc;
  }, {});
  const makeAliasLookup = {
    mercedes: 'Mercedes-Benz',
    mercedesbenz: 'Mercedes-Benz',
    benz: 'Mercedes-Benz',
    landrover: 'Land Rover',
    rangerover: 'Land Rover',
    vw: 'Volkswagen',
    chevy: 'Chevrolet',
    harley: 'Harley-Davidson',
    harleydavidson: 'Harley-Davidson',
    bmwmotorrad: 'BMW Motorrad',
    bmwmoto: 'BMW Motorrad',
    canam: 'Can-Am'
  };
  const resolveMakeFromInput = (input) => {
    const key = normalizeMakeKey(input || '');
    return makeLookup[key] || makeAliasLookup[key] || '';
  };
  const makeInputValue = formData.vehicle.make.trim();
  const makeKey = normalizeMakeKey(makeInputValue);
  const normalizedMake = resolveMakeFromInput(makeInputValue);
  const makeSuggestions = MAKE_OPTIONS_CA
    .filter((make) => (makeKey ? normalizeMakeKey(make).includes(makeKey) : true))
    .slice(0, 6);
  const modelOptions = normalizedMake ? (MODELS_BY_MAKE_CA[normalizedMake] || []) : [];
  const modelInputValue = formData.vehicle.model.trim();
  const modelSuggestions = modelOptions
    .filter((model) => model.toLowerCase().includes(modelInputValue.toLowerCase()))
    .slice(0, 6);

  useEffect(() => {
    if (requiresDetails || hasAnyDetails) {
      setShowDetails(true);
    }
  }, [requiresDetails, hasAnyDetails]);

  const scrollToVehicleDetails = () => {
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      requestAnimationFrame(() => {
        makeInputRef.current?.focus();
      });
    });
  };

  const scrollToOptionalDetails = () => {
    requestAnimationFrame(() => {
      optionalButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  useEffect(() => {
    const wasRequired = prevRequiredRef.current;
    const nowRequired = requiresDetails;
    if (!wasRequired && nowRequired) {
      setShowDetails(true);
      const vehicleIndex = steps.indexOf('vehicle');
      if (currentStep !== 'vehicle' && vehicleIndex >= 0) {
        setStepIndex(vehicleIndex);
        setPendingScroll(true);
      } else {
        setPendingScroll(true);
      }
    }
    prevRequiredRef.current = nowRequired;
  }, [requiresDetails, currentStep, steps]);

  useEffect(() => {
    if (pendingScroll && currentStep === 'vehicle') {
      scrollToVehicleDetails();
      setPendingScroll(false);
    }
  }, [pendingScroll, currentStep]);

  useEffect(() => {
    if (!isOpen || currentStep !== 'services' || !prefillServiceId) return;
    requestAnimationFrame(() => {
      document
        .querySelector(`[data-service-id="${prefillServiceId}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, [isOpen, currentStep, prefillServiceId]);

  useEffect(() => {
    if (!formData.vehicle.type || requiresDetails || showDetails || currentStep !== 'vehicle') return;
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (!window.matchMedia('(max-width: 767px)').matches) return;
    }
    setPendingOptionalScroll(true);
  }, [formData.vehicle.type, requiresDetails, showDetails, currentStep]);

  useEffect(() => {
    if (!pendingOptionalScroll) return;
    scrollToOptionalDetails();
    setPendingOptionalScroll(false);
  }, [pendingOptionalScroll]);

  useEffect(() => {
    if (showDetails) {
      setDetailsAnimatedIn(true);
    } else {
      setDetailsAnimatedIn(false);
    }
  }, [showDetails]);

  useEffect(() => {
    setShowAllPopularChips(false);
  }, [normalizedVehicleTypeKey]);

  if (!isOpen) return null;

  const validateVehicleDetails = () => {
    const nextErrors = {};
    if (!formData.vehicle.type) {
      nextErrors.type = bt.validation.typeRequired;
    }

    const make = formData.vehicle.make.trim();
    const model = formData.vehicle.model.trim();
    const year = formData.vehicle.year.trim();

    const makeValid = make.length >= 2;
    const modelValid = model.length >= 1;
    const yearValid = !year
      ? true
      : /^\d{4}$/.test(year) && Number(year) >= 1900 && Number(year) <= 2099;

    if (requiresDetails) {
      if (!makeValid) nextErrors.make = bt.validation.makeRequired;
      if (!modelValid) nextErrors.model = bt.validation.modelRequired;
      if (requiresYear) {
        if (!year) nextErrors.year = bt.validation.yearRequired;
        if (year && !yearValid) nextErrors.year = bt.validation.yearInvalid;
      } else if (year && !yearValid) {
        nextErrors.year = bt.validation.yearInvalid;
      }
    } else if (showDetails) {
      if ((make && !modelValid) || (!make && model)) {
        if (!make) nextErrors.make = bt.validation.makeNeeded;
        if (!model) nextErrors.model = bt.validation.modelNeeded;
      }
      if (year && !yearValid) {
        nextErrors.year = bt.validation.yearInvalid;
      }
    }

    return {
      valid: Object.keys(nextErrors).length === 0,
      errors: nextErrors
    };
  };

  const parsePriceFrom = (priceLabel) => {
    if (!priceLabel) return null;
    let numeric = priceLabel.replace(/[^\d.,]/g, '');
    if (numeric.includes(',') && numeric.includes('.')) {
      numeric = numeric.replace(/,/g, '');
    } else if (numeric.includes(',')) {
      numeric = numeric.replace(',', '.');
    }
    const value = Number.parseFloat(numeric);
    return Number.isNaN(value) ? null : value;
  };

  const buildBookingPayload = () => {
    const fullName = formData.contact.name.trim();
    const [firstName = '', ...lastParts] = fullName.split(/\s+/);
    const lastName = lastParts.join(' ');

    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() + 1);
    const date = bookingDate.toISOString().slice(0, 10);

    const allServices = Object.values(PRICING_DATA).flatMap((category) => category.items);
    const services = allServices
      .filter((item) => formData.service.includes(item.id))
      .map((item) => ({
        id: item.id,
        name: item.name[lang],
        priceFrom: parsePriceFrom(item.price[lang])
      }));

    const selectedType = vehicleTypes.find((type) => type.id === formData.vehicle.type);

    return {
      locale: lang === 'fr' ? 'fr-CA' : 'en-US',
      customer: {
        firstName,
        lastName,
        email: formData.contact.email.trim(),
        phone: formData.contact.phone.trim()
      },
      booking: {
        location: 'Mascouche',
        date,
        time: formData.date.time,
        services
      },
      vehicle: {
        type: selectedType?.label || '',
        make: formData.vehicle.make.trim(),
        model: formData.vehicle.model.trim(),
        year: formData.vehicle.year.trim(),
        notes: formData.vehicle.notes.trim()
      }
    };
  };

  const validateContact = () => {
    const nextErrors = {};
    const name = formData.contact.name.trim();
    const email = formData.contact.email.trim();
    const phone = formData.contact.phone.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneDigits = phone.replace(/[^\d]/g, '');

    if (!name) nextErrors.name = bt.validation.nameRequired;
    if (!email) nextErrors.email = bt.validation.emailRequired;
    if (email && !emailValid) nextErrors.email = bt.validation.emailInvalid;
    if (!phone) nextErrors.phone = bt.validation.phoneRequired;

    // Soft validation: if provided but too short, treat as required error
    if (phone && phoneDigits.length < 10) nextErrors.phone = bt.validation.phoneRequired;

    return {
      valid: Object.keys(nextErrors).length === 0,
      errors: nextErrors
    };
  };

  const nextStep = () => {
    if (currentStep === 'services') {
      if (formData.service.length === 0) {
        setErrors({ service: bt.validation.serviceRequired });
        return;
      }
    }

    if (currentStep === 'vehicle') {
      const { valid, errors: nextErrors } = validateVehicleDetails();
      if (!valid) {
        setErrors(nextErrors);
        return;
      }
      setErrors({});
    }

    if (currentStep === 'services' && formData.service.length > 0) {
      setErrors({});
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleConfirm = () => {
    const { valid, errors: nextErrors } = validateContact();
    if (!valid) {
      setErrors(nextErrors);
      return;
    }
    setIsSubmitting(true);
    const payload = buildBookingPayload();
    console.log('Booking Payload:', payload);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden relative z-10 flex flex-col max-h-[90svh]">

        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              {submitted ? bt.confirmed : bt.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {bt.subtitle}
            </p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-2"><X /></button>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="w-full bg-neutral-800 h-1">
            <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">

          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} />
              </div>
              <h4 className="text-3xl font-bold text-white mb-4">
                {bt.requestReceived}
              </h4>
              <p className="text-neutral-400 max-w-md mx-auto mb-8">
                {bt.requestBody}
              </p>
              <Button onClick={onClose} className="w-full max-w-xs">
                {bt.backToSite}
              </Button>
            </div>
          ) : (
            <>
              {currentStep === 'vehicle' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {bt.step1Title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {vehicleTypes.map(type => {
                      const Icon = type.icon;
                      return (
                      <button
                        key={type.id}
                        onClick={() => updateVehicleType(type.id)}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${formData.vehicle.type === type.id ? 'border-amber-400 bg-amber-400/10 text-white' : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'}`}
                      >
                        <Icon size={32} />
                        <span className="font-bold">{type.label}</span>
                      </button>
                      );
                    })}
                  </div>
                  {errors.type && (
                    <p className="text-sm text-red-400">{errors.type}</p>
                  )}

                  {(formData.vehicle.type || requiresDetails || showDetails) && (
                    (requiresDetails || showDetails) ? (
                      <section
                        ref={detailsRef}
                        id="vehicle-details"
                        className={`border-t border-neutral-800 pt-6 space-y-4 transition-all duration-300 ${detailsAnimatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs uppercase tracking-widest text-neutral-400">{bt.vehicleDetailsTitle}</h5>
                          {requiresDetails && (
                            <span className="text-[11px] font-semibold uppercase text-amber-400">
                              {bt.required}
                            </span>
                          )}
                        </div>

                        {popularChipItems.length > 0 && (
                          <div className="space-y-3">
                            <div className="text-xs uppercase tracking-widest text-neutral-500">
                              {bt.popularChipsTitle}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {popularChipItems.map((chip, index) => (
                                <button
                                  key={`${chip.make}-${chip.model}`}
                                  type="button"
                                  onClick={() => handlePopularChipSelect(chip.make, chip.model)}
                                  className={`px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/60 text-xs font-semibold text-neutral-200 hover:border-amber-400/60 hover:text-amber-200 transition-colors ${index >= 3 && !showAllPopularChips ? 'hidden sm:inline-flex' : 'inline-flex'}`}
                                >
                                  {chip.make} {chip.model}
                                </button>
                              ))}
                            </div>
                            {showPopularChipsToggle && (
                              <button
                                type="button"
                                onClick={() => setShowAllPopularChips((prev) => !prev)}
                                className="sm:hidden text-xs font-semibold text-neutral-400 hover:text-neutral-200 transition-colors"
                              >
                                {showAllPopularChips ? bt.popularChipsLess : bt.popularChipsMore}
                              </button>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs uppercase tracking-widest text-neutral-400">
                              {bt.makeLabel}{requiresDetails && <span className="text-amber-400"> *</span>}
                            </label>
                            <div className="relative">
                              <input
                                ref={makeInputRef}
                                value={formData.vehicle.make}
                                onChange={(e) => updateVehicleField('make', e.target.value)}
                                onFocus={() => setMakeSuggestionsOpen(true)}
                                onBlur={() => {
                                  const resolved = resolveMakeFromInput(formData.vehicle.make);
                                  if (resolved && resolved !== formData.vehicle.make) {
                                    applyMakeSelection(resolved);
                                  }
                                  setTimeout(() => setMakeSuggestionsOpen(false), 120);
                                }}
                                autoCapitalize="words"
                                autoCorrect="off"
                                className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                                aria-invalid={Boolean(errors.make)}
                              />
                              {makeSuggestionsOpen && makeSuggestions.length > 0 && (
                                <div className="absolute z-20 mt-2 w-full max-h-48 overflow-auto rounded-xl border border-neutral-700/80 bg-neutral-900/95 shadow-2xl backdrop-blur-sm ring-1 ring-black/40 divide-y divide-neutral-800/70 mb-2">
                                  {makeSuggestions.map((make) => (
                                    <button
                                      key={make}
                                      type="button"
                                      onMouseDown={(event) => {
                                        event.preventDefault();
                                        applyMakeSelection(make);
                                        setMakeSuggestionsOpen(false);
                                      }}
                                      className="w-full text-left px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800/80 transition-colors"
                                    >
                                      {make}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">{bt.makeHelp}</p>
                            {errors.make && <p className="text-xs text-red-400 mt-1">{errors.make}</p>}
                          </div>

                          <div>
                            <label className="text-xs uppercase tracking-widest text-neutral-400">
                              {bt.modelLabel}{requiresDetails && <span className="text-amber-400"> *</span>}
                            </label>
                            <div className="relative">
                              <input
                                value={formData.vehicle.model}
                                onChange={(e) => updateVehicleField('model', e.target.value)}
                                onFocus={() => setModelSuggestionsOpen(true)}
                                onBlur={() => setTimeout(() => setModelSuggestionsOpen(false), 120)}
                                autoCapitalize="words"
                                autoCorrect="off"
                                className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                                aria-invalid={Boolean(errors.model)}
                              />
                              {modelSuggestionsOpen && modelSuggestions.length > 0 && (
                                <div className="absolute z-20 mt-2 w-full max-h-48 overflow-auto rounded-xl border border-neutral-700/80 bg-neutral-900/95 shadow-2xl backdrop-blur-sm ring-1 ring-black/40 divide-y divide-neutral-800/70 mb-2">
                                  {modelSuggestions.map((model) => (
                                    <button
                                      key={model}
                                      type="button"
                                      onMouseDown={(event) => {
                                        event.preventDefault();
                                        applyModelSelection(model);
                                        setModelSuggestionsOpen(false);
                                      }}
                                      className="w-full text-left px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800/80 transition-colors"
                                    >
                                      {model}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">{bt.modelHelp}</p>
                            {errors.model && <p className="text-xs text-red-400 mt-1">{errors.model}</p>}
                          </div>

                          <div>
                            <label className="text-xs uppercase tracking-widest text-neutral-400">
                              {bt.yearLabel}{requiresYear && <span className="text-amber-400"> *</span>}
                            </label>
                            <input
                              value={formData.vehicle.year}
                              onChange={(e) => updateVehicleField('year', e.target.value.replace(/[^\d]/g, '').slice(0, 4))}
                              className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                              inputMode="numeric"
                              aria-invalid={Boolean(errors.year)}
                            />
                            <p className="text-xs text-neutral-500 mt-1">{bt.yearHelp}</p>
                            {errors.year && <p className="text-xs text-red-400 mt-1">{errors.year}</p>}
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-xs uppercase tracking-widest text-neutral-400">
                              {bt.notesLabel}
                            </label>
                            <textarea
                              value={formData.vehicle.notes}
                              onChange={(e) => updateVehicleField('notes', e.target.value)}
                              rows={3}
                              className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none resize-none"
                            />
                            <p className="text-xs text-neutral-500 mt-1">{bt.notesHelp}</p>
                          </div>
                        </div>
                      </section>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setShowDetails(true);
                          setPendingScroll(true);
                        }}
                        ref={optionalButtonRef}
                        className="w-full sm:w-auto text-center text-sm font-semibold text-amber-300 border border-amber-400/40 bg-amber-400/5 px-4 py-2.5 rounded-lg hover:bg-amber-400/10 hover:text-amber-200 transition-colors"
                      >
                        {bt.addDetailsOptional}
                      </button>
                    )
                  )}
                </div>
              )}

              {currentStep === 'condition' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {bt.step2Title}
                  </h4>
                  <div className="space-y-3">
                    {conditionOptions.map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setFormData({ ...formData, condition: opt.val })}
                        className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all ${formData.condition === opt.val ? 'border-amber-400 bg-amber-400/10' : 'border-neutral-800 hover:bg-neutral-800'}`}
                      >
                        <div>
                          <div className="font-bold text-lg text-white">{opt.label[lang]}</div>
                          <div className="text-neutral-400 text-sm">{opt.desc[lang]}</div>
                        </div>
                        {formData.condition === opt.val && <CheckCircle className="text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'services' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {bt.step3Title}
                  </h4>
                  {errors.service && (
                    <p className="text-sm text-red-400">{errors.service}</p>
                  )}

                  <div className="space-y-6">
                    {Object.entries(PRICING_DATA).map(([key, category]) => (
                      <div key={key}>
                        <h5 className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3 border-b border-neutral-800 pb-2">
                          {category.title[lang]}
                        </h5>
                        <div className="space-y-2">
                          {category.items.map(item => (
                            <button
                              key={item.id}
                              onClick={() => toggleService(item.id)}
                              data-service-id={item.id}
                              className={`w-full text-left p-3 rounded-lg border flex justify-between items-center transition-all ${formData.service.includes(item.id) ? 'border-amber-400 bg-amber-400/10' : 'border-neutral-800 hover:bg-neutral-800'}`}
                            >
                              <div>
                                <div className="font-bold text-white">{item.name[lang]}</div>
                                {item.note?.[lang] && <div className="text-neutral-500 text-xs italic">{item.note[lang]}</div>}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-amber-400 font-mono text-sm">
                                  {item.price[lang]}
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

              {currentStep === 'contact' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    {bt.step4Title}
                  </h4>
                  <div className="space-y-4">
                    <input
                      placeholder={bt.fullName}
                      className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => {
                        setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } });
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    <input
                      placeholder={bt.email}
                      type="email"
                      className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => {
                        setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } });
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    <input
                      placeholder={bt.phone}
                      type="tel"
                      className="w-full bg-neutral-800 border-none p-4 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none"
                      onChange={(e) => {
                        setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } });
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    <div className="p-4 bg-neutral-800 rounded-lg">
                      <div className="text-neutral-400 text-xs uppercase tracking-wider mb-2">
                        {bt.availability}
                      </div>
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

                    <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-lg">
                      <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">{bt.summaryTitle}</div>
                      <div className="text-sm font-semibold text-white mb-3">{bt.summaryVehicle}</div>
                      <div className="space-y-2 text-sm text-neutral-300">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">{bt.summaryType}</span>
                          <span className="text-white font-semibold">{selectedTypeLabel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">{bt.summaryServices}</span>
                          <span className="text-white font-semibold">{summaryServicesCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">{bt.summaryMakeModel}</span>
                          <span className="text-white font-semibold">{summaryMakeModel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">{bt.summaryYear}</span>
                          <span className="text-white font-semibold">{summaryYear}</span>
                        </div>
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
            {stepIndex > 0 ? (
              <Button variant="ghost" onClick={prevStep}>
                {bt.back}
              </Button>
            ) : <div></div>}

            {!isLastStep ? (
              <Button onClick={nextStep} icon={ArrowRight}>
                {bt.next}
              </Button>
            ) : (
              <Button onClick={handleConfirm} icon={isSubmitting ? null : CheckCircle} className={isSubmitting ? 'opacity-80 cursor-wait' : ''}>
                {isSubmitting ? bt.sending : bt.confirm}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- PAGES ---

const HomePage = ({ lang, openBooking, setPage }) => {
  const [activeBadge, setActiveBadge] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const handlePopularService = (item) => {
    if (item.action === 'wrap') {
      setPage('wrap');
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    openBooking({ entry: 'popular_service', serviceId: item.serviceId });
  };

  const activeBrand = BRAND_BADGES.find((brand) => brand.id === activeBadge);

  const handleBadgeCTA = (cta) => {
    if (!cta) return;
    setActiveBadge(null);
    if (cta.page === 'wrap') {
      setPage('wrap');
      return;
    }
    if (cta.scroll) {
      const element = document.getElementById(cta.scroll);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden" id="home">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={heroPortrait} />
            <source
              media="(max-width: 1280px)"
              srcSet={`${hero3x2} 3000w, ${hero4k} 3840w`}
              sizes="100vw"
            />
            <img
              src={THEME.images.heroBg}
              srcSet={`${hero3x2} 3000w, ${hero4k} 3840w`}
              sizes="100vw"
              alt="Detailing Studio"
              className="w-full h-full object-cover transform scale-105 animate-in fade-in duration-1000"
              onError={handleImageError}
            />
          </picture>
          {/* Gradients */}
          <div className="absolute inset-0 bg-neutral-950/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50"></div>
          {/* Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Star size={14} className="fill-amber-400" />
              {lang === 'fr' ? '#1 Esthétique Auto Rive-Nord' : '#1 Auto Detailing North Shore'}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-2xl">
              {lang === 'fr' ? <span>L'Art de la<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Perfection</span></span> : <span>The Art of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Perfection</span></span>}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-md">
              {lang === 'fr'
                ? "Redonnez à votre véhicule son éclat de salle de montre. Protection céramique, esthétique complète et restauration de précision à Mascouche."
                : "Restore your vehicle to showroom shine. Ceramic coating, full detailing, and precision restoration in Mascouche."}
            </p>

            {/* Popular Services + CTA */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl max-w-xl mx-auto shadow-2xl animate-in fade-in zoom-in duration-500 delay-300 mb-16 sm:mb-0">
              <div className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
                {lang === 'fr' ? 'Services populaires' : 'Popular services'}
              </div>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {POPULAR_SERVICES.map((item) => (
                  <button
                    key={item.label.fr}
                    type="button"
                    onClick={() => handlePopularService(item)}
                    className="px-3 py-2 rounded-full text-xs sm:text-sm font-semibold bg-neutral-900/80 border border-neutral-800 text-neutral-200 hover:border-amber-400/60 hover:text-amber-300 transition-colors"
                  >
                    {item.label[lang]}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <Button className="h-12 rounded-xl px-8 w-full sm:w-auto" icon={ArrowRight} onClick={() => openBooking({ entry: 'browse_services' })}>
                  {lang === 'fr' ? 'Voir Nos Forfaits' : 'See Packages'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          aria-label={lang === 'fr' ? 'Aller aux services' : 'Go to services'}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="group absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-amber-400 transition-colors cursor-pointer hidden sm:flex flex-col items-center"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="text-center mb-6 md:mb-8">
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                {lang === 'fr' ? 'Produits et équipements reconnus.' : 'Recognized products & equipment.'}
              </div>
              <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
                {lang === 'fr'
                  ? 'Nous utilisons des produits et équipements reconnus : céramique, polissage, films et protection.'
                  : 'We use recognized products and equipment: ceramic, polishing, films, and protection.'}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {BRAND_BADGES.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => setActiveBadge(brand.id)}
                  className={`group text-center font-black text-2xl text-white flex items-center justify-center border h-20 rounded-lg transition-all duration-300 ${
                    activeBadge === brand.id
                      ? 'border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                      : 'border-white/10'
                  } bg-neutral-900/40 hover:bg-white/5`}
                >
                  <span className="relative">
                    {brand.name}
                    <span className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-9 text-xs font-semibold text-neutral-200 bg-neutral-950/90 border border-neutral-800 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {brand.tooltip[lang]}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeBrand && !isMobile && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
            <button className="absolute inset-0 bg-black/60" onClick={() => setActiveBadge(null)} aria-label="Close"></button>
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-[min(560px,92vw)] p-6">
              <button
                className="absolute top-4 right-4 text-neutral-500 hover:text-white"
                onClick={() => setActiveBadge(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">{activeBrand.name}</h3>
              <div className="text-amber-400 font-semibold uppercase text-xs tracking-widest mb-2">
                {lang === 'fr' ? 'À quoi ça sert ?' : 'What is it for?'}
              </div>
              <p className="text-neutral-300 mb-4">{activeBrand.about[lang]}</p>
              <div className="text-amber-400 font-semibold uppercase text-xs tracking-widest mb-2">
                {lang === 'fr' ? 'Services associés' : 'Associated services'}
              </div>
              <ul className="text-neutral-300 text-sm space-y-1 mb-4">
                {activeBrand.services[lang].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              {activeBrand.cta && (
                <Button onClick={() => handleBadgeCTA(activeBrand.cta)} className="w-full">
                  {activeBrand.cta.label[lang]}
                </Button>
              )}
            </div>
          </div>
        )}

        {activeBrand && isMobile && (
          <div className="fixed inset-0 z-50 flex items-end">
            <button className="absolute inset-0 bg-black/60" onClick={() => setActiveBadge(null)} aria-label="Close"></button>
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-t-2xl w-full p-6">
              <button
                className="absolute top-4 right-4 text-neutral-500 hover:text-white"
                onClick={() => setActiveBadge(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">{activeBrand.name}</h3>
              <div className="text-amber-400 font-semibold uppercase text-xs tracking-widest mb-2">
                {lang === 'fr' ? 'À quoi ça sert ?' : 'What is it for?'}
              </div>
              <p className="text-neutral-300 mb-4">{activeBrand.about[lang]}</p>
              <div className="text-amber-400 font-semibold uppercase text-xs tracking-widest mb-2">
                {lang === 'fr' ? 'Services associés' : 'Associated services'}
              </div>
              <ul className="text-neutral-300 text-sm space-y-1 mb-4">
                {activeBrand.services[lang].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              {activeBrand.cta && (
                <Button onClick={() => handleBadgeCTA(activeBrand.cta)} className="w-full">
                  {activeBrand.cta.label[lang]}
                </Button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-neutral-950 relative" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={lang === 'fr' ? "Nos Services" : "Our Services"}
            sub={lang === 'fr' ? "Expertise Certifiée" : "Certified Expertise"}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_HIGHLIGHTS.map((service) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer scroll-mt-24 md:scroll-mt-32"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  { title: '1 Lavage/mois', mobileTitle: ['1 Lavage', 'par mois'], sub: 'Inclus' },
                  { title: '10% Rabais', sub: 'Services' },
                  { title: 'Priorité', sub: 'Booking' },
                  { title: 'Lave-glace', sub: 'Gratuit' },
                ].map((perk, i) => (
                  <div key={i} className="bg-neutral-950/50 p-5 sm:p-6 rounded-xl border border-white/5 text-center cursor-default hover:bg-neutral-900 transition-colors">
                    <div className="text-amber-400 font-bold leading-tight text-[clamp(1rem,3.4vw,1.4rem)] sm:text-xl md:text-2xl break-words whitespace-normal">
                      {perk.mobileTitle ? (
                        <>
                          <span className="sm:hidden">
                            {perk.mobileTitle.map((line, idx) => (
                              <span key={idx} className="block">{line}</span>
                            ))}
                          </span>
                          <span className="hidden sm:inline">{perk.title}</span>
                        </>
                      ) : (
                        <span>{perk.title}</span>
                      )}
                    </div>
                    <div className="text-neutral-500 text-xs sm:text-sm uppercase tracking-wide mt-2">
                      {perk.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-neutral-950" id="reviews">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Avis Clients" sub="Google 5.0 ★★★★★" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title={lang === 'fr' ? "Suivez-Nous" : "Follow Us"}
            sub="@GBT_AESTHETICS"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                href={post.link || THEME.links.instagram}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="text-center">
              <div className="flex justify-center">
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border"
                  style={{
                    color: 'var(--wrap-accent)',
                    backgroundColor: 'rgba(var(--wrap-accent-rgb), 0.2)',
                    borderColor: 'rgba(var(--wrap-accent-rgb), 0.3)'
                  }}
                >
                  Partenaire Exclusif
                </div>
              </div>
              <div className="mt-2.5 mb-[18px] flex justify-center">
                <img
                  src={protectionPrestigeLogo}
                  alt="Protection Prestige"
                  className="w-[220px] sm:w-[260px] md:w-[320px] lg:w-[360px] max-w-[90%] h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-6 leading-tight">
                Changement de couleur & <span style={{ color: 'var(--wrap-accent)' }}>Protection</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-8 leading-relaxed max-w-[60ch] mx-auto">
                {lang === 'fr'
                  ? "Réalisé par nos experts partenaires chez Protection Prestige, directement dans nos installations de Mascouche."
                  : "Executed by our partners at Protection Prestige, right here in our Mascouche facility."}
              </p>
            </div>

            {/* Tableau de prix Wrap mis à jour */}
            <div className="grid md:grid-cols-2 gap-4 text-left" id="wrap-prices">
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl relative overflow-hidden">
                <div
                  className="pointer-events-none absolute top-0 right-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"
                  style={{ backgroundColor: 'rgba(var(--wrap-accent-rgb), 0.12)' }}
                ></div>
                <div className="relative z-10">
                  <div className="font-bold mb-1" style={{ color: 'var(--wrap-accent)' }}>Teinte de Lumières</div>
                  <div className="text-2xl font-black text-white">129,95 $ <span className="text-sm font-normal text-neutral-500">/ paire</span></div>
                  <div className="text-neutral-500 text-xs mt-1">Avant ou Arrière</div>
                </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl relative overflow-hidden">
                <div
                  className="pointer-events-none absolute top-0 right-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"
                  style={{ backgroundColor: 'rgba(var(--wrap-accent-rgb), 0.12)' }}
                ></div>
                <div className="relative z-10">
                  <div className="font-bold mb-1" style={{ color: 'var(--wrap-accent)' }}>Chrome Delete</div>
                  <div className="text-2xl font-black text-white"><span className="text-sm font-normal text-neutral-500">à partir de</span> 399,95 $</div>
                  <div className="text-neutral-500 text-xs mt-1">Finition Noir Gloss/Mat</div>
                </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl md:col-span-2 relative overflow-hidden">
                <div
                  className="pointer-events-none absolute top-0 right-0 h-28 w-28 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"
                  style={{ backgroundColor: 'rgba(var(--wrap-accent-rgb), 0.12)' }}
                ></div>
                <div className="relative z-10">
                  <div className="font-bold mb-1" style={{ color: 'var(--wrap-accent)' }}>Wrap Complet</div>
                  <div className="text-3xl font-black text-white"><span className="text-sm font-normal text-neutral-500">à partir de</span> 2 999,95 $</div>
                  <div className="text-neutral-500 text-xs mt-1">Vinyle Premium (Avery/3M) • Garantie Incluse</div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <Button
                className="w-full sm:w-auto hover:opacity-90"
                style={{
                  backgroundColor: 'var(--wrap-accent)',
                  color: '#0b0b0b',
                  boxShadow: '0 0 20px rgba(var(--wrap-accent-rgb), 0.35)'
                }}
                onClick={openBooking}
              >
                {lang === 'fr' ? 'Soumission Wrap' : 'Get Wrap Quote'}
              </Button>
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
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: 'linear-gradient(135deg, rgba(var(--wrap-accent-rgb), 0.2), rgba(10, 10, 10, 0.8))' }}
              ></div>

              {/* Visual Representation of Wrap */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-neutral-800 rounded-xl relative overflow-hidden shadow-2xl transform group-hover:rotate-3 transition-transform duration-700 border border-white/10">
                  {/* Half/Half color change simulation */}
                  <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
                    <span className="text-black/20 font-black text-4xl rotate-12">ORIGINAL</span>
                  </div>
                  <div
                    className="absolute inset-0 clip-path-diagonal group-hover:w-full transition-all duration-1000 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--wrap-accent)' }}
                  >
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
  const [bookingPrefill, setBookingPrefill] = useState(null);
  const [bookingServicePrefill, setBookingServicePrefill] = useState(null);
  const [bookingEntry, setBookingEntry] = useState('default');

  const openBooking = (options = {}) => {
    const isEvent = options && typeof options.preventDefault === 'function';
    const normalized =
      !isEvent && options && (options.vehicle || options.serviceId || options.entry)
        ? options
        : !isEvent
          ? { vehicle: options }
          : {};

    setBookingPrefill(normalized.vehicle || null);
    setBookingServicePrefill(normalized.serviceId || null);
    setBookingEntry(normalized.entry || (normalized.serviceId ? 'popular_service' : 'default'));
    setIsBookingOpen(true);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className={`min-h-screen ${THEME.colors.bgMain} ${THEME.colors.textMain} font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@400;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Oswald', sans-serif; }
        :root {
          --wrap-accent: #7FC7E4;
          --wrap-accent-rgb: 127, 199, 228;
        }
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
        openBooking={openBooking}
        page={page}
        setPage={setPage}
      />

      <main>
        {page === 'home' && (
          <HomePage
            lang={lang}
            openBooking={openBooking}
            setPage={setPage}
          />
        )}
        {page === 'wrap' && <WrapPage lang={lang} openBooking={openBooking} />}
      </main>

      {/* Sticky Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 p-4 flex gap-4 z-40 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
        <a href="tel:+15142587909" className="flex-1 bg-neutral-800 text-white py-3 rounded font-bold flex items-center justify-center gap-2 active:bg-neutral-700">
          <Phone size={18} /> {lang === 'fr' ? 'Appeler' : 'Call'}
        </a>
        <button
          onClick={() => openBooking()}
          className="flex-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 text-black py-3 rounded font-bold uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 hover:from-amber-200 hover:via-amber-300 hover:to-amber-500 active:opacity-90"
        >
          <Calendar size={18} /> {lang === 'fr' ? 'Réserver' : 'Book'}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-24 md:pb-16 text-neutral-400 text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6 flex items-center">
                <img
                  src={logoWide}
                  alt="GBT Aesthetics"
                  className="h-9 md:h-10 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
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
            <div className="flex gap-4 items-center text-xs">
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-neutral-300 font-semibold uppercase tracking-wider hover:text-amber-400 transition-colors"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        prefill={bookingPrefill}
        prefillServiceId={bookingServicePrefill}
        entry={bookingEntry}
      />
    </div>
  );
};

export default App;
