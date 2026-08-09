import React, { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   VANA — Ancient Wisdom, Living Roots
   React + responsive port of the original static build.
   Single-file component: styles, data and UI all live here so it
   can be dropped into any React app as-is.
   ──────────────────────────────────────────────────────────────── */

const DOSHA_INFO = {
  vata: {
    name: "VATA",
    subtitle: "Air · Space · Movement",
    description:
      "Your Vata constitution moves like wind through open sky — quick, creative, endlessly curious. Ayurveda teaches that grounding rituals of warmth, oil and rhythm will steady this beautiful, restless energy.",
    recommendations: [
      { name: "Rasayana Elixir", reason: "Warms and steadies a restless mind" },
      { name: "Brahmi Sleep Tea", reason: "Calms Vata before rest" },
      { name: "Kumkumadi Face Oil", reason: "Nourishes dry, Vata-prone skin" },
    ],
  },
  pitta: {
    name: "PITTA",
    subtitle: "Fire · Water · Transformation",
    description:
      "Your Pitta constitution burns bright — sharp, driven, transformative. Ayurveda offers cooling rituals to temper the inner flame so its heat becomes clarity rather than heat that consumes.",
    recommendations: [
      { name: "Brahmi Sleep Tea", reason: "Cools an overheated mind" },
      { name: "Triphala Churna", reason: "Balances excess Pitta in digestion" },
      { name: "Kumkumadi Face Oil", reason: "Soothes reactive, Pitta-warm skin" },
    ],
  },
  kapha: {
    name: "KAPHA",
    subtitle: "Earth · Water · Stability",
    description:
      "Your Kapha constitution is the earth itself — steady, nourishing, enduring. Ayurveda calls for light, stimulating rituals that keep this deep well of stability from settling into stillness.",
    recommendations: [
      { name: "Triphala Churna", reason: "Kindles sluggish digestion" },
      { name: "Rasayana Elixir", reason: "Lifts and energises Kapha heaviness" },
      { name: "Brahmi Sleep Tea", reason: "Keeps rest light, not heavy" },
    ],
  },
};

const QUIZ_QUESTIONS = [
  {
    q: "How would you describe your body frame?",
    sub: "Choose the answer that feels most natural to you",
    options: [
      { v: "vata", label: "Option A", text: "Thin, light, bony frame — difficult to gain weight" },
      { v: "pitta", label: "Option B", text: "Medium, muscular build — moderate weight" },
      { v: "kapha", label: "Option C", text: "Broad, sturdy frame — tendency to gain weight easily" },
      { v: "vata", label: "Option D", text: "Variable — changes with seasons or stress" },
    ],
  },
  {
    q: "How does your mind typically respond to stress?",
    sub: "Be honest — this shapes your Dosha profile most",
    options: [
      { v: "vata", label: "Option A", text: "Anxiety, racing thoughts, overthinking — mind becomes scattered" },
      { v: "pitta", label: "Option B", text: "Irritability, frustration, sharp words — fire builds up inside" },
      { v: "kapha", label: "Option C", text: "Withdrawal, heaviness, sluggishness — I go quiet and still" },
      { v: "pitta", label: "Option D", text: "Shifts between all of the above depending on the situation" },
    ],
  },
  {
    q: "What describes your skin and complexion?",
    sub: "Think of how your skin behaves without any products",
    options: [
      { v: "vata", label: "Option A", text: "Dry, rough, thin — tends to crack in cold or dry weather" },
      { v: "pitta", label: "Option B", text: "Warm, reddish, sensitive — prone to rashes or inflammation" },
      { v: "kapha", label: "Option C", text: "Oily, smooth, thick — pores visible, but rarely irritated" },
      { v: "kapha", label: "Option D", text: "Combination — varies across face and body" },
    ],
  },
  {
    q: "What is your natural relationship with sleep?",
    sub: "Your sleep nature reveals your dominant energy",
    options: [
      { v: "vata", label: "Option A", text: "Light sleeper — wakes easily, vivid dreams, often restless" },
      { v: "pitta", label: "Option B", text: "Moderate — usually 6–7 hours, intense dreams, falls asleep quickly" },
      { v: "kapha", label: "Option C", text: "Deep, long sleeper — 8–10 hours, hard to wake, groggy mornings" },
      { v: "vata", label: "Option D", text: "Irregular — varies based on season, stress, or routine" },
    ],
  },
  {
    q: "Which flavors and foods feel most nourishing to you?",
    sub: "Trust your instinct — the body knows what it needs",
    options: [
      { v: "vata", label: "Option A", text: "Warm, oily, sweet, salty — soups, ghee, root vegetables" },
      { v: "pitta", label: "Option B", text: "Cool, sweet, bitter — coconut, cucumber, fresh greens" },
      { v: "kapha", label: "Option C", text: "Light, pungent, bitter, astringent — spices, beans, dry foods" },
      { v: "pitta", label: "Option D", text: "Cravings constantly shift — no consistent pattern" },
    ],
  },
];

const PRODUCTS = [
  {
    id: "rasayana",
    tag: "Bestseller",
    name: "Rasayana Elixir",
    desc: "The supreme rejuvenator. A trinity of Amalaki, Ashwagandha & Brahmi in a base of raw wild honey — crafted for cellular renewal and cognitive radiance.",
    price: "₹2,400 · 30ml",
    featured: true,
    colors: ["#1a2a1e", "#0d1a10"],
  },
  {
    id: "kumkumadi",
    tag: "New",
    name: "Kumkumadi Face Oil",
    desc: "24-karat gold-infused saffron facial elixir for ancient luminosity.",
    price: "₹3,800 · 15ml",
    colors: ["#2a1a0a", "#0d1a10"],
  },
  {
    id: "triphala",
    tag: "Dosha Balance",
    name: "Triphala Churna",
    desc: "The timeless trifruit powder. Gut wisdom in a morning ritual of three sacred fruits.",
    price: "₹980 · 100g",
    colors: ["#0a1a14", "#142218"],
  },
  {
    id: "brahmi",
    tag: "Sleep Ritual",
    name: "Brahmi Sleep Tea",
    desc: "Brahmi, Jatamansi & warm spices — a nighttime ceremony for deep, dreamful rest.",
    price: "₹680 · 30 cups",
    colors: ["#1a1008", "#0d1a10"],
  },
];

const INGREDIENTS = [
  { num: "01", latin: "Withania somnifera", name: "Ashwagandha", text: "The kingly herb. An adaptogen that fortifies the nervous system and kindles vital force — Ojas." },
  { num: "02", latin: "Centella asiatica", name: "Brahmi", text: "The herb of clarity and consciousness. Nourishes the mind, enhances memory, calms restless Vata." },
  { num: "03", latin: "Emblica officinalis", name: "Amalaki · Amla", text: "The supreme Rasayana. One fruit contains more Vitamin C than 20 oranges — a profound rejuvenator." },
  { num: "04", latin: "Curcuma longa", name: "Haridra · Turmeric", text: "Sacred golden root. The universal healer — anti-inflammatory, luminosity-enhancing, Pitta-balancing." },
];

const TESTIMONIALS = [
  { text: "The Rasayana Elixir changed my mornings completely. After two months, my skin luminosity, energy, and focus have shifted in ways I cannot explain through science alone.", author: "Meera R. — Mumbai" },
  { text: "I have tried many Ayurvedic brands. VANA is different. The purity you can smell, feel, and taste. The Brahmi tea is now my non-negotiable evening ritual.", author: "Arjun K. — Bengaluru" },
  { text: "Kumkumadi oil has replaced my entire skincare cabinet. My esthetician asked what I changed. The answer is simply — back to roots, back to VANA.", author: "Priya S. — Delhi" },
];

const TICKER_ITEMS = ["Ashwagandha", "Brahmi", "Turmeric", "Shatavari", "Triphala", "Neem", "Amla", "Guduchi", "Moringa", "Tulsi", "Saffron", "Sandalwood"];

const PILLARS = [
  {
    num: "01 — PURITY",
    title: "Source\nIntegrity",
    text: "Each botanical is traceable to a specific farm, forest, or watershed. We work with indigenous cultivators who follow traditional Sattvic farming methods — never synthetic, never rushed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
        <path d="M12 2c0 0-7 5.5-7 11a7 7 0 0 0 14 0c0-5.5-7-11-7-11z" />
        <path d="M12 22v-8" />
        <path d="M12 16l3.5-3.5" />
      </svg>
    ),
  },
  {
    num: "02 — PROCESS",
    title: "Vedic\nFormulation",
    text: "Our Vaidyas — traditional Ayurvedic physicians — collaborate with botanists to preserve ancient synergistic combinations proven across millennia, translated into modern bioavailability.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" fill="rgba(201,168,76,.3)" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    num: "03 — BALANCE",
    title: "Dosha\nHarmony",
    text: "Every VANA blend is crafted with conscious awareness of the three Doshas — Vata, Pitta, Kapha. Your ritual is designed to restore equilibrium, not just treat symptoms.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
        <path d="M8 21l4-18 4 18" />
        <line x1="5" y1="21" x2="19" y2="21" />
        <circle cx="12" cy="10" r="2" stroke="#7a9e7e" />
      </svg>
    ),
  },
];

/* ── Simple rule-based Vaidya chat (no external API needed) ── */
function vaidyaReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("dosha")) {
    return "Your Dosha is your unique elemental blueprint — Vata, Pitta or Kapha. Scroll to 'Discover Your Dosha' and take the five-question ritual to find yours. 🌿";
  }
  if (m.includes("stress") || m.includes("anxiety") || m.includes("sleep")) {
    return "For stress and restless nights, our Brahmi Sleep Tea is beloved — Brahmi and Jatamansi calm the nervous system and invite deep rest.";
  }
  if (m.includes("ashwagandha")) {
    return "Ashwagandha (Withania somnifera) is the kingly adaptogen — it fortifies the nervous system and builds Ojas, your vital reserve. You'll find it at the heart of our Rasayana Elixir.";
  }
  if (m.includes("skin") || m.includes("face") || m.includes("glow")) {
    return "For radiant skin, the Kumkumadi Face Oil is our crown jewel — 24-karat gold and saffron, a ritual used by royalty for centuries.";
  }
  if (m.includes("digest") || m.includes("gut")) {
    return "Triphala Churna is Ayurveda's timeless answer for gut wisdom — three sacred fruits, one gentle morning ritual.";
  }
  if (m.includes("price") || m.includes("cost") || m.includes("₹")) {
    return "Our rituals range from ₹680 for the Brahmi Sleep Tea to ₹3,800 for the Kumkumadi Face Oil. Every price reflects the purity of what's inside.";
  }
  return "Namaste 🌿 Ayurveda teaches that true wellness is a daily ritual, not a quick fix. Ask me about your Dosha, our botanicals, or which ritual might suit you.";
}

/* ── Reveal-on-scroll wrapper ── */
function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ── Animated counter for stats ── */
function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            if (target === 0) {
              setVal(0);
              return;
            }
            let c = 0;
            const inc = target / 60;
            const tick = () => {
              c = Math.min(c + inc, target);
              setVal(Math.floor(c));
              if (c < target) requestAnimationFrame(tick);
            };
            tick();
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div className="stat-num" ref={ref}>
      {val}
      {target >= 1000 ? "+" : ""}
      {suffix}
    </div>
  );
}

export default function VanaAyurveda() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Namaste 🌿 I am VANA's Vaidya assistant. Ask me about Ayurveda, our botanicals, or finding your perfect ritual." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatTyping, setChatTyping] = useState(false);
  const [showQuickBtns, setShowQuickBtns] = useState(true);
  const chatMsgsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (chatMsgsRef.current) {
      chatMsgsRef.current.scrollTop = chatMsgsRef.current.scrollHeight;
    }
  }, [chatMessages, chatTyping]);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quizNext = () => {
    if (!quizSelected) return;
    const answers = [...quizAnswers];
    answers[quizStep] = quizSelected;
    setQuizAnswers(answers);
    setQuizSelected(null);
    setQuizStep((s) => s + 1);
  };

  const quizBack = () => {
    if (quizStep <= 0) return;
    setQuizSelected(quizAnswers[quizStep - 1] || null);
    setQuizStep((s) => s - 1);
  };

  const quizSubmit = () => {
    if (!quizSelected) return;
    const answers = [...quizAnswers];
    answers[quizStep] = quizSelected;
    setQuizAnswers(answers);
    setQuizLoading(true);

    const count = { vata: 0, pitta: 0, kapha: 0 };
    answers.forEach((a) => {
      if (a && count[a] !== undefined) count[a]++;
    });
    const dom = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];

    setTimeout(() => {
      setQuizLoading(false);
      setQuizResult(dom);
    }, 1500);
  };

  const quizReset = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizSelected(null);
    setQuizResult(null);
    setQuizLoading(false);
  };

  const selectOption = (val) => setQuizSelected(val);

  const sendChat = (overrideMsg) => {
    const msg = (overrideMsg ?? chatInput).trim();
    if (!msg) return;
    setChatInput("");
    setShowQuickBtns(false);
    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setChatTyping(true);
    setTimeout(() => {
      setChatTyping(false);
      setChatMessages((prev) => [...prev, { role: "bot", text: vaidyaReply(msg) }]);
    }, 900 + Math.random() * 500);
  };

  const activeQ = QUIZ_QUESTIONS[quizStep];

  return (
    <div className="vana-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600&family=Jost:wght@200;300;400;500&display=swap');

        .vana-root {
          --forest:#1a2a1e; --deep:#0d1a10; --gold:#c9a84c; --gold-light:#e8c96e;
          --gold-dim:rgba(201,168,76,0.15); --cream:#f5efe2; --earth:#8b5e3c;
          --sage:#7a9e7e; --mist:#d4c9b0; --rust:#a04f2b; --black:#070f09;
          background:var(--deep); color:var(--cream); font-family:'Jost',sans-serif;
          font-weight:300; overflow-x:hidden; position:relative; width:100%;
        }
        .vana-root *,.vana-root *::before,.vana-root *::after{box-sizing:border-box;}
        .vana-root a{color:inherit;}
        .vana-root ::-webkit-scrollbar{width:5px;}
        .vana-root ::-webkit-scrollbar-thumb{background:rgba(201,168,76,.3);}

        /* grain */
        .vana-grain{position:fixed;inset:0;pointer-events:none;z-index:9990;opacity:.5;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          animation:grain 8s steps(10) infinite;}
        @keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-2%,-3%)}20%{transform:translate(3%,1%)}30%{transform:translate(-1%,4%)}40%{transform:translate(2%,-2%)}50%{transform:translate(-3%,3%)}60%{transform:translate(1%,-4%)}70%{transform:translate(-2%,1%)}80%{transform:translate(3%,-1%)}90%{transform:translate(-1%,2%)}}

        /* page loader */
        .page-loader{position:fixed;inset:0;background:var(--black);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;transition:opacity .6s ease,visibility .6s ease;}
        .page-loader.gone{opacity:0;visibility:hidden;pointer-events:none;}
        .loader-logo{font-family:'Cinzel',serif;font-size:2rem;letter-spacing:.5em;color:var(--gold);animation:pulse2 1.5s ease-in-out infinite;}
        @keyframes pulse2{0%,100%{opacity:.4}50%{opacity:1}}
        .loader-bar-wrap{width:200px;height:1px;background:rgba(201,168,76,.15);}
        .loader-bar{height:100%;background:var(--gold);animation:loadBar 1.4s ease forwards;}
        @keyframes loadBar{from{width:0}to{width:100%}}
        .loader-sub{font-size:.58rem;letter-spacing:.6em;text-transform:uppercase;color:var(--mist);opacity:.4;}

        /* nav */
        nav{position:fixed;top:0;left:0;right:0;padding:1.6rem 5rem;display:flex;justify-content:space-between;align-items:center;z-index:1000;transition:all .4s ease;}
        nav.scrolled{background:rgba(7,15,9,0.92);backdrop-filter:blur(20px);padding:1.1rem 5rem;border-bottom:1px solid rgba(201,168,76,0.1);}
        .nav-logo{font-family:'Cinzel',serif;font-size:1.4rem;letter-spacing:.4em;color:var(--gold);text-decoration:none;display:flex;flex-direction:column;cursor:pointer;background:none;border:none;}
        .nav-logo span{font-size:.45rem;letter-spacing:.5em;color:var(--mist);font-family:'Jost',sans-serif;font-weight:200;margin-top:-1px;}
        .nav-links{display:flex;gap:2.2rem;list-style:none;}
        .nav-links a{color:var(--mist);text-decoration:none;font-size:.66rem;letter-spacing:.28em;text-transform:uppercase;transition:color .3s;position:relative;cursor:pointer;}
        .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--gold);transition:width .4s ease;}
        .nav-links a:hover{color:var(--gold);}
        .nav-links a:hover::after{width:100%;}
        .nav-cta{background:transparent;border:1px solid rgba(201,168,76,.4);color:var(--gold);padding:.6rem 1.5rem;font-family:'Jost',sans-serif;font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;cursor:pointer;transition:all .3s;text-decoration:none;}
        .nav-cta:hover{background:var(--gold);color:var(--deep);}
        .nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;}
        .nav-burger span{width:22px;height:1.5px;background:var(--gold);display:block;transition:.3s;}
        .nav-burger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
        .nav-burger.open span:nth-child(2){opacity:0;}
        .nav-burger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}
        .mobile-menu{position:fixed;top:0;right:0;height:100vh;width:78vw;max-width:340px;background:rgba(7,15,9,.98);backdrop-filter:blur(20px);z-index:1200;display:flex;flex-direction:column;gap:2rem;padding:6rem 2.5rem;transform:translateX(100%);transition:transform .4s cubic-bezier(.77,0,.18,1);border-left:1px solid rgba(201,168,76,.15);}
        .mobile-menu.open{transform:translateX(0);}
        .mobile-menu a{font-size:.9rem;letter-spacing:.15em;text-transform:uppercase;color:var(--mist);text-decoration:none;}
        .mobile-menu a:hover{color:var(--gold);}
        .menu-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1100;opacity:0;pointer-events:none;transition:opacity .3s;}
        .menu-backdrop.open{opacity:1;pointer-events:all;}

        /* hero */
        .hero{min-height:100vh;position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 5rem;overflow:hidden;}
        .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 100% 80% at 60% 50%,rgba(26,42,30,.7) 0%,transparent 70%),radial-gradient(ellipse 50% 60% at 10% 90%,rgba(138,94,60,.12) 0%,transparent 60%),linear-gradient(135deg,#070f09 0%,#0d1a10 40%,#1a2a1e 70%,#0d1a10 100%);}
        .aurora{position:absolute;inset:0;overflow:hidden;}
        .aurora-blob{position:absolute;border-radius:50%;filter:blur(80px);animation:auroraMove ease-in-out infinite;}
        .aurora-1{width:600px;height:600px;background:radial-gradient(circle,rgba(26,90,40,.25),transparent 70%);top:-100px;right:-100px;animation-duration:12s;}
        .aurora-2{width:500px;height:400px;background:radial-gradient(circle,rgba(138,94,60,.15),transparent 70%);bottom:-50px;left:-50px;animation-duration:15s;animation-delay:-5s;}
        .aurora-3{width:400px;height:500px;background:radial-gradient(circle,rgba(201,168,76,.08),transparent 70%);top:20%;right:20%;animation-duration:10s;animation-delay:-3s;}
        @keyframes auroraMove{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.05)}66%{transform:translate(-20px,30px) scale(.95)}}
        .mandala{position:absolute;right:-5%;top:50%;transform:translateY(-50%);width:650px;height:650px;opacity:.06;animation:spin 70s linear infinite;pointer-events:none;z-index:2;}
        @keyframes spin{to{transform:translateY(-50%) rotate(360deg)}}
        .hero-content{position:relative;z-index:3;padding-top:5rem;}
        .hero-eyebrow{font-size:.6rem;letter-spacing:.65em;text-transform:uppercase;color:var(--gold);margin-bottom:2rem;display:flex;align-items:center;gap:1rem;opacity:0;animation:fadeUp .8s ease .3s forwards;}
        .hero-eyebrow-line{width:50px;height:1px;background:linear-gradient(to right,transparent,var(--gold));}
        .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.6rem,6.5vw,6.5rem);font-weight:300;line-height:.95;color:var(--cream);opacity:0;animation:fadeUp .9s ease .5s forwards;}
        .hero-title em{font-style:italic;color:var(--gold-light);display:inline-block;}
        .hero-title .indent{display:block;padding-left:4rem;}
        .hero-title .indent2{display:block;padding-left:1.5rem;}
        .hero-sub{margin-top:2.2rem;max-width:400px;font-size:.83rem;line-height:2;color:var(--mist);letter-spacing:.03em;opacity:0;animation:fadeUp .9s ease .7s forwards;}
        .hero-cta{margin-top:2.6rem;display:flex;gap:2rem;align-items:center;flex-wrap:wrap;opacity:0;animation:fadeUp .9s ease .9s forwards;}
        .btn-primary{position:relative;background:var(--gold);color:var(--deep);padding:.95rem 2.6rem;font-family:'Jost',sans-serif;font-size:.66rem;letter-spacing:.3em;text-transform:uppercase;border:none;cursor:pointer;text-decoration:none;overflow:hidden;display:inline-block;transition:transform .2s;}
        .btn-primary::before{content:'';position:absolute;inset:0;background:var(--gold-light);transform:translateX(-102%);transition:transform .45s cubic-bezier(.77,0,.18,1);}
        .btn-primary:hover::before{transform:translateX(0);}
        .btn-primary:hover{transform:translateY(-2px);}
        .btn-primary span{position:relative;z-index:1;}
        .btn-ghost{color:var(--mist);text-decoration:none;font-size:.66rem;letter-spacing:.25em;text-transform:uppercase;display:flex;align-items:center;gap:1rem;transition:color .3s;background:none;border:none;cursor:pointer;}
        .btn-ghost:hover{color:var(--gold);}
        .ghost-line{width:35px;height:1px;background:currentColor;position:relative;transition:width .3s;}
        .btn-ghost:hover .ghost-line{width:55px;}
        .ghost-line::after{content:'';position:absolute;right:-1px;top:-4px;width:9px;height:9px;border-right:1.5px solid currentColor;border-top:1.5px solid currentColor;transform:rotate(45deg);}

        .hero-visual{position:relative;z-index:3;display:flex;justify-content:center;align-items:center;opacity:0;animation:fadeIn 1.2s ease .4s forwards;}
        .bottle-scene{position:relative;width:340px;height:470px;max-width:90vw;}
        .bottle-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:280px;height:280px;background:radial-gradient(circle,rgba(201,168,76,.12),transparent 70%);animation:pulse 3s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6}50%{transform:translate(-50%,-50%) scale(1.2);opacity:1}}
        .bottle-card{position:absolute;inset:0;border:1px solid rgba(201,168,76,.15);background:rgba(13,26,16,.5);backdrop-filter:blur(12px);}
        .bottle-inner-border{position:absolute;inset:10px;border:1px solid rgba(201,168,76,.07);}
        .bottle-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:2rem;}
        .badge-float{position:absolute;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);padding:.5rem 1rem;font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);backdrop-filter:blur(10px);white-space:nowrap;}
        .badge-float.b1{top:-18px;right:-10px;animation:floatAnim 4s ease-in-out infinite;}
        .badge-float.b2{bottom:50px;left:-15px;animation:floatAnim 4s ease-in-out infinite .8s;}
        .badge-float.b3{bottom:-15px;right:20px;animation:floatAnim 4s ease-in-out infinite 1.6s;}
        @keyframes floatAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .herb-label{font-family:'Cinzel',serif;font-size:.68rem;letter-spacing:.4em;color:var(--gold);}
        .herb-name-big{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-style:italic;color:var(--cream);}
        .herb-latin{font-size:.62rem;letter-spacing:.15em;color:var(--mist);opacity:.7;text-align:center;}

        /* stats */
        .stats{display:grid;grid-template-columns:repeat(4,1fr);background:rgba(201,168,76,.04);border-top:1px solid rgba(201,168,76,.1);border-bottom:1px solid rgba(201,168,76,.1);}
        .stat{padding:2.4rem 1rem;text-align:center;border-right:1px solid rgba(201,168,76,.08);position:relative;overflow:hidden;transition:background .3s;}
        .stat:last-child{border-right:none;}
        .stat:hover{background:rgba(201,168,76,.06);}
        .stat-num{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:300;color:var(--gold);line-height:1;margin-bottom:.5rem;}
        .stat-label{font-size:.56rem;letter-spacing:.3em;text-transform:uppercase;color:var(--mist);opacity:.5;}

        /* ticker */
        .ticker{padding:1.2rem 0;background:var(--gold);overflow:hidden;}
        .ticker-track{display:flex;width:max-content;animation:tick 25s linear infinite;}
        .ticker-item{display:flex;align-items:center;gap:2rem;padding:0 2rem;font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.4em;text-transform:uppercase;color:var(--deep);white-space:nowrap;}
        .ticker-dot{width:5px;height:5px;background:var(--deep);border-radius:50%;opacity:.3;}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* section shared */
        .section-label{font-size:.56rem;letter-spacing:.6em;text-transform:uppercase;color:var(--gold);text-align:center;margin-bottom:1rem;}
        .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3.8rem);font-weight:300;text-align:center;color:var(--cream);line-height:1.2;}
        .section-title em{font-style:italic;color:var(--gold-light);}

        /* pillars */
        .pillars{padding:5rem 5rem;background:linear-gradient(to bottom,var(--deep),var(--forest));}
        .pillars-grid{margin-top:4rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(201,168,76,.06);}
        .pillar{padding:3rem 2.2rem;background:var(--forest);position:relative;overflow:hidden;transition:background .4s;}
        .pillar:hover{background:rgba(26,50,30,.9);}
        .pillar-num{font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.4em;color:var(--gold);opacity:.4;margin-bottom:1.8rem;}
        .pillar-icon-wrap{width:50px;height:50px;border:1px solid rgba(201,168,76,.2);display:flex;align-items:center;justify-content:center;margin-bottom:1.6rem;transition:border-color .3s;}
        .pillar:hover .pillar-icon-wrap{border-color:rgba(201,168,76,.5);}
        .pillar h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:400;color:var(--cream);margin-bottom:1rem;line-height:1.2;white-space:pre-line;}
        .pillar p{font-size:.78rem;line-height:2;color:var(--mist);opacity:.75;}

        /* products */
        .products{padding:5.5rem 5rem;background:var(--forest);position:relative;overflow:hidden;}
        .products-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4rem;gap:1rem;flex-wrap:wrap;}
        .products-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;grid-template-rows:auto auto;gap:1.4rem;}
        .product-card{background:rgba(13,26,16,.8);border:1px solid rgba(201,168,76,.07);overflow:hidden;position:relative;cursor:default;transition:transform .5s cubic-bezier(.25,.46,.45,.94),border-color .4s;}
        .product-card:hover{transform:translateY(-6px);border-color:rgba(201,168,76,.2);}
        .product-card.featured{grid-row:span 2;}
        .product-visual{aspect-ratio:1;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
        .product-card.featured .product-visual{aspect-ratio:3/4;}
        .product-tag{position:absolute;top:1.1rem;left:1.1rem;font-size:.5rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);background:rgba(7,15,9,.85);padding:.3rem .75rem;border:1px solid rgba(201,168,76,.2);}
        .product-info{padding:1.4rem;}
        .product-info h4{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;color:var(--cream);margin-bottom:.4rem;}
        .product-info p{font-size:.72rem;color:var(--mist);opacity:.65;line-height:1.8;margin-bottom:1rem;}
        .product-footer{display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap;}
        .product-price{font-family:'Cinzel',serif;font-size:.8rem;color:var(--gold);letter-spacing:.08em;}
        .product-btn{font-size:.56rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mist);cursor:pointer;background:none;border:none;transition:color .3s;padding:0;}
        .product-btn:hover{color:var(--gold);}

        /* ritual */
        .ritual{padding:6rem 0;position:relative;background:var(--deep);overflow:hidden;}
        .ritual-content{position:relative;z-index:2;text-align:center;padding:0 5rem;max-width:900px;margin:0 auto;}
        .ritual-quote{font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3.5vw,3.2rem);font-weight:300;font-style:italic;line-height:1.5;color:var(--cream);}
        .ritual-quote span{color:var(--gold-light);}
        .ritual-attr{margin-top:2rem;font-size:.6rem;letter-spacing:.5em;text-transform:uppercase;color:var(--sage);}
        .ornament{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:2.5rem 5rem;color:var(--gold);opacity:.4;}
        .ornament-line{flex:1;max-width:200px;height:1px;background:linear-gradient(to right,transparent,var(--gold),transparent);}

        /* quiz */
        .dosha-section{padding:5.5rem 5rem;background:linear-gradient(135deg,var(--black),#0d1f12,var(--deep));position:relative;overflow:hidden;}
        .quiz-container{max-width:780px;margin:3.5rem auto 0;position:relative;}
        .quiz-card{background:rgba(26,42,30,.4);border:1px solid rgba(201,168,76,.12);backdrop-filter:blur(10px);padding:2.5rem;position:relative;}
        .quiz-q{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:300;color:var(--cream);margin-bottom:.6rem;line-height:1.4;}
        .quiz-sub{font-size:.76rem;color:var(--mist);opacity:.6;margin-bottom:2.2rem;letter-spacing:.05em;}
        .quiz-options{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:2.2rem;}
        .quiz-opt{background:rgba(13,26,16,.6);border:1px solid rgba(201,168,76,.12);padding:1.1rem 1.3rem;cursor:pointer;transition:all .3s;text-align:left;color:var(--mist);font-family:'Jost',sans-serif;font-size:.78rem;letter-spacing:.03em;position:relative;}
        .quiz-opt:hover,.quiz-opt.selected{border-color:rgba(201,168,76,.4);color:var(--cream);}
        .quiz-opt.selected{border-color:var(--gold);background:rgba(201,168,76,.08);}
        .quiz-opt-label{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);opacity:.5;display:block;margin-bottom:.4rem;}
        .quiz-progress{display:flex;gap:.5rem;margin-bottom:2.2rem;}
        .quiz-progress-dot{flex:1;height:2px;background:rgba(201,168,76,.15);transition:background .4s;}
        .quiz-progress-dot.done{background:var(--gold);}
        .quiz-progress-dot.active{background:rgba(201,168,76,.5);}
        .quiz-nav{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;}
        .quiz-step-label{font-size:.56rem;letter-spacing:.3em;text-transform:uppercase;color:var(--mist);opacity:.4;}
        .btn-quiz-next{background:var(--gold);color:var(--deep);border:none;padding:.8rem 2rem;font-family:'Jost',sans-serif;font-size:.63rem;letter-spacing:.28em;text-transform:uppercase;cursor:pointer;transition:background .3s,transform .2s;}
        .btn-quiz-next:disabled{opacity:.4;cursor:not-allowed;}
        .btn-quiz-next:not(:disabled):hover{background:var(--gold-light);transform:translateY(-2px);}
        .btn-quiz-back{background:none;border:1px solid rgba(201,168,76,.2);color:var(--mist);padding:.8rem 1.6rem;font-family:'Jost',sans-serif;font-size:.63rem;letter-spacing:.28em;text-transform:uppercase;cursor:pointer;transition:all .3s;}
        .btn-quiz-back:hover{border-color:rgba(201,168,76,.5);color:var(--gold);}
        .quiz-loading{text-align:center;padding:2.5rem;}
        .quiz-loading-text{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-style:italic;color:var(--mist);}
        .loading-dots span{display:inline-block;width:6px;height:6px;background:var(--gold);border-radius:50%;margin:0 3px;animation:loadDot 1.2s ease-in-out infinite;}
        .loading-dots span:nth-child(2){animation-delay:.2s;}
        .loading-dots span:nth-child(3){animation-delay:.4s;}
        @keyframes loadDot{0%,80%,100%{transform:scale(.7);opacity:.4}40%{transform:scale(1);opacity:1}}
        .quiz-result{text-align:center;padding:1rem;}
        .dosha-badge{display:inline-flex;flex-direction:column;align-items:center;gap:.5rem;padding:1.8rem 2.5rem;border:1px solid rgba(201,168,76,.3);background:rgba(201,168,76,.06);margin:1.2rem auto;}
        .dosha-badge-name{font-family:'Cinzel',serif;font-size:1.8rem;letter-spacing:.35em;color:var(--gold);}
        .dosha-badge-sub{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--mist);opacity:.6;}
        .dosha-desc{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;color:var(--mist);line-height:1.9;margin:1.2rem auto;max-width:600px;}
        .dosha-products-rec h5{font-family:'Cinzel',serif;font-size:.6rem;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:1.1rem;}
        .rec-products{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
        .rec-product{background:rgba(13,26,16,.7);border:1px solid rgba(201,168,76,.12);padding:.9rem 1.3rem;font-size:.73rem;color:var(--mist);text-align:left;max-width:220px;}
        .rec-product strong{display:block;color:var(--cream);font-weight:400;margin-bottom:.2rem;font-family:'Cormorant Garamond',serif;font-size:1rem;}

        /* ingredients */
        .ingredients{padding:5.5rem 5rem;background:var(--forest);}
        .ingredients-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:4rem;align-items:center;margin-top:4rem;}
        .ingredient-item{padding:1.7rem 0;border-bottom:1px solid rgba(201,168,76,.08);display:grid;grid-template-columns:36px 1fr;gap:1.3rem;align-items:start;transition:padding-left .35s ease;}
        .ingredient-item:hover{padding-left:.8rem;}
        .ingredient-num{font-family:'Cinzel',serif;font-size:.56rem;color:var(--gold);opacity:.4;padding-top:5px;}
        .ingredient-text h5{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:400;color:var(--cream);margin-bottom:.3rem;}
        .ing-latin{font-size:.6rem;letter-spacing:.18em;color:var(--gold);text-transform:uppercase;margin-bottom:.5rem;display:block;}
        .ingredient-text p{font-size:.75rem;color:var(--mist);opacity:.65;line-height:1.8;max-width:300px;}
        .ingredients-visual{position:relative;display:flex;align-items:center;justify-content:center;}

        /* testimonials */
        .testimonials{padding:5.5rem 5rem;background:var(--deep);}
        .testimonials-grid{margin-top:4rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;}
        .t-card{padding:2.4rem;border:1px solid rgba(201,168,76,.08);background:rgba(26,42,30,.25);position:relative;transition:border-color .4s,background .4s;}
        .t-card:hover{border-color:rgba(201,168,76,.2);background:rgba(26,42,30,.5);}
        .t-stars{color:var(--gold);font-size:.62rem;margin-bottom:1.4rem;letter-spacing:.18em;}
        .t-text{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:var(--cream);line-height:1.85;margin-bottom:1.6rem;}
        .t-author{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);}

        /* footer */
        .vana-root footer{background:var(--black);padding:4.5rem 5rem 2.5rem;border-top:1px solid rgba(201,168,76,.08);}
        .footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3.5rem;padding-bottom:3.5rem;border-bottom:1px solid rgba(201,168,76,.06);}
        .footer-brand p{font-size:.76rem;color:var(--mist);opacity:.5;line-height:1.9;max-width:250px;margin-top:1.1rem;}
        .footer-col h6{font-family:'Cinzel',serif;font-size:.56rem;letter-spacing:.4em;color:var(--gold);margin-bottom:1.6rem;}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:.65rem;padding:0;margin:0;}
        .footer-col ul li a{font-size:.73rem;color:var(--mist);opacity:.5;text-decoration:none;transition:all .3s;letter-spacing:.05em;cursor:pointer;}
        .footer-col ul li a:hover{opacity:1;color:var(--gold);}
        .footer-bottom{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;}
        .footer-bottom p{font-size:.6rem;letter-spacing:.12em;color:var(--mist);opacity:.25;}
        .footer-socials{display:flex;gap:1rem;}
        .footer-social{width:32px;height:32px;border:1px solid rgba(201,168,76,.15);display:flex;align-items:center;justify-content:center;transition:border-color .3s;}
        .footer-social:hover{border-color:rgba(201,168,76,.5);}
        .footer-social svg{width:14px;height:14px;fill:var(--mist);opacity:.5;transition:opacity .3s;}
        .footer-social:hover svg{opacity:1;}

        /* reveal */
        .reveal{opacity:0;transform:translateY(45px);transition:opacity .9s ease,transform .9s ease;}
        .reveal.visible{opacity:1;transform:translateY(0);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}

        /* chat widget */
        .chat-widget{position:fixed;bottom:1.8rem;right:1.8rem;z-index:5000;}
        .chat-toggle{width:56px;height:56px;background:var(--gold);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .3s,box-shadow .3s;box-shadow:0 0 30px rgba(201,168,76,.3);}
        .chat-toggle:hover{transform:scale(1.08);box-shadow:0 0 50px rgba(201,168,76,.5);}
        .chat-toggle svg{width:22px;height:22px;fill:var(--deep);transition:transform .3s;}
        .chat-toggle.open svg{transform:rotate(180deg);}
        .chat-panel{position:absolute;bottom:70px;right:0;width:min(380px,88vw);background:rgba(7,15,9,.97);border:1px solid rgba(201,168,76,.15);backdrop-filter:blur(20px);transform:scale(.9) translateY(20px);transform-origin:bottom right;opacity:0;pointer-events:none;transition:all .35s cubic-bezier(.34,1.56,.64,1);overflow:hidden;}
        .chat-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
        .chat-head{padding:1.1rem 1.4rem;border-bottom:1px solid rgba(201,168,76,.1);display:flex;align-items:center;gap:1rem;background:rgba(26,42,30,.4);}
        .chat-head-avatar{width:34px;height:34px;border:1px solid rgba(201,168,76,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .chat-head-avatar svg{width:17px;height:17px;fill:var(--gold);}
        .chat-head-info{flex:1;}
        .chat-head-info h6{font-family:'Cinzel',serif;font-size:.63rem;letter-spacing:.28em;color:var(--gold);margin:0;}
        .chat-head-info p{font-size:.58rem;color:var(--sage);letter-spacing:.1em;margin:1px 0 0;}
        .chat-online{width:7px;height:7px;background:#4caf72;border-radius:50%;animation:blink 2s ease-in-out infinite;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
        .chat-messages{height:300px;overflow-y:auto;padding:1.1rem;display:flex;flex-direction:column;gap:.75rem;}
        .chat-msg{max-width:85%;font-size:.75rem;line-height:1.65;padding:.75rem 1rem;}
        .chat-msg.bot{background:rgba(26,42,30,.6);border:1px solid rgba(201,168,76,.1);color:var(--mist);align-self:flex-start;}
        .chat-msg.user{background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.2);color:var(--cream);align-self:flex-end;}
        .chat-msg.typing{display:flex;gap:4px;align-items:center;padding:.85rem 1rem;align-self:flex-start;}
        .chat-msg.typing span{width:6px;height:6px;background:var(--sage);border-radius:50%;animation:loadDot 1.2s ease-in-out infinite;}
        .chat-msg.typing span:nth-child(2){animation-delay:.2s;}
        .chat-msg.typing span:nth-child(3){animation-delay:.4s;}
        .chat-input-area{padding:.75rem 1.1rem;border-top:1px solid rgba(201,168,76,.08);display:flex;gap:.7rem;align-items:center;}
        .chat-input{flex:1;background:rgba(26,42,30,.4);border:1px solid rgba(201,168,76,.1);color:var(--cream);padding:.65rem .9rem;font-family:'Jost',sans-serif;font-size:.73rem;outline:none;transition:border-color .3s;min-width:0;}
        .chat-input:focus{border-color:rgba(201,168,76,.35);}
        .chat-send{background:var(--gold);border:none;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .3s,transform .2s;flex-shrink:0;}
        .chat-send:hover{background:var(--gold-light);transform:scale(1.05);}
        .chat-send svg{width:15px;height:15px;fill:var(--deep);}
        .chat-quick-btns{display:flex;gap:.5rem;flex-wrap:wrap;padding:.5rem 1.1rem 0;}
        .chat-quick-btn{background:none;border:1px solid rgba(201,168,76,.15);color:var(--mist);padding:.32rem .75rem;font-size:.58rem;letter-spacing:.1em;cursor:pointer;transition:all .3s;white-space:nowrap;}
        .chat-quick-btn:hover{border-color:rgba(201,168,76,.4);color:var(--gold);}

        /* ── RESPONSIVE ─────────────────────────────────────── */
        @media (max-width: 1180px){
          nav, .hero, .pillars, .products, .ritual-content, .ornament, .dosha-section, .ingredients, .testimonials, .vana-root footer{padding-left:2.5rem;padding-right:2.5rem;}
          nav.scrolled{padding-left:2.5rem;padding-right:2.5rem;}
        }
        @media (max-width: 1024px){
          .hero{grid-template-columns:1fr;padding-top:8rem;padding-bottom:4rem;gap:3rem;}
          .hero-visual{order:-1;}
          .products-grid{grid-template-columns:1fr 1fr;}
          .product-card.featured{grid-column:span 2;grid-row:auto;}
          .product-card.featured .product-visual{aspect-ratio:16/9;}
          .footer-top{grid-template-columns:1fr 1fr;}
          .ingredients-layout{grid-template-columns:1fr;}
          .ingredients-visual{order:-1;height:320px;}
        }
        @media (max-width: 860px){
          .nav-links, .nav-cta{display:none;}
          .nav-burger{display:flex;}
          .pillars-grid{grid-template-columns:1fr;}
          .testimonials-grid{grid-template-columns:1fr;}
          .stats{grid-template-columns:repeat(2,1fr);}
          .stat:nth-child(2){border-right:none;}
          .stat{border-bottom:1px solid rgba(201,168,76,.08);}
          .quiz-options{grid-template-columns:1fr;}
          .hero-title .indent, .hero-title .indent2{padding-left:0;}
        }
        @media (max-width: 640px){
          nav, .hero, .pillars, .products, .ritual-content, .ornament, .dosha-section, .ingredients, .testimonials, .vana-root footer{padding-left:1.3rem;padding-right:1.3rem;}
          nav.scrolled{padding-left:1.3rem;padding-right:1.3rem;}
          .products-grid{grid-template-columns:1fr;}
          .product-card.featured{grid-column:auto;}
          .footer-top{grid-template-columns:1fr;gap:2.2rem;}
          .quiz-card{padding:1.6rem;}
          .dosha-badge{padding:1.4rem 1.6rem;}
          .chat-widget{bottom:1rem;right:1rem;}
          .mandala{opacity:.04;}
          .ornament{padding:2rem 1rem;}
          .ritual{padding:4rem 0;}
          .stats{grid-template-columns:1fr 1fr;}
        }
      `}</style>

      <div className="vana-grain" />

      {/* PAGE LOADER */}
      <div className={`page-loader ${!loading ? "gone" : ""}`}>
        <div className="loader-logo">VANA</div>
        <div className="loader-bar-wrap"><div className="loader-bar" /></div>
        <div className="loader-sub">Preparing your sacred experience</div>
      </div>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#top" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          VANA<span>Ayurveda since 1987</span>
        </a>
        <ul className="nav-links">
          <li><a onClick={scrollToId("products")}>Rituals</a></li>
          <li><a onClick={scrollToId("ingredients")}>Botanicals</a></li>
          <li><a onClick={scrollToId("dosha")}>Dosha Quiz</a></li>
          <li><a onClick={scrollToId("philosophy")}>Philosophy</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Journal</a></li>
        </ul>
        <a href="#products" className="nav-cta" onClick={scrollToId("products")}>Shop Now</a>
        <button className={`nav-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`menu-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a onClick={scrollToId("products")}>Rituals</a>
        <a onClick={scrollToId("ingredients")}>Botanicals</a>
        <a onClick={scrollToId("dosha")}>Dosha Quiz</a>
        <a onClick={scrollToId("philosophy")}>Philosophy</a>
        <a href="#" className="nav-cta" style={{ display: "inline-block", width: "fit-content" }} onClick={scrollToId("products")}>Shop Now</a>
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="aurora">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
          <div className="aurora-blob aurora-3" />
        </div>

        <svg className="mandala" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#c9a84c" fill="none">
            <circle cx="200" cy="200" r="185" /><circle cx="200" cy="200" r="160" /><circle cx="200" cy="200" r="120" /><circle cx="200" cy="200" r="80" /><circle cx="200" cy="200" r="40" />
            <line x1="200" y1="15" x2="200" y2="385" /><line x1="15" y1="200" x2="385" y2="200" />
            <line x1="68" y1="68" x2="332" y2="332" /><line x1="332" y1="68" x2="68" y2="332" />
            <line x1="40" y1="140" x2="360" y2="260" /><line x1="140" y1="40" x2="260" y2="360" />
            <line x1="360" y1="140" x2="40" y2="260" /><line x1="260" y1="40" x2="140" y2="360" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse key={deg} cx="200" cy="108" rx="20" ry="75" transform={`rotate(${deg},200,200)`} opacity=".4" />
            ))}
          </g>
        </svg>

        <div className="hero-content">
          <div className="hero-eyebrow"><div className="hero-eyebrow-line" />The Sacred Science of Life</div>
          <h1 className="hero-title">
            Ancient <em>wisdom</em>
            <span className="indent">for the</span>
            <span className="indent2"><em>modern</em> soul</span>
          </h1>
          <p className="hero-sub">Where 5,000-year-old Vedic formulations meet the precision of modern botanical science. Each VANA creation is a ritual — a conversation between you and the living intelligence of nature.</p>
          <div className="hero-cta">
            <a href="#products" className="btn-primary" onClick={scrollToId("products")}><span>Explore Rituals</span></a>
            <a href="#dosha" className="btn-ghost" onClick={scrollToId("dosha")}><div className="ghost-line" />Find Your Dosha</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="bottle-scene">
            <div className="bottle-glow" />
            <div className="bottle-card" />
            <div className="bottle-inner-border" />
            <div className="bottle-content">
              <svg viewBox="0 0 200 220" style={{ width: 160 }} xmlns="http://www.w3.org/2000/svg">
                <line x1="100" y1="210" x2="100" y2="85" stroke="#7a9e7e" strokeWidth="2.5" />
                <path d="M100,155 Q68,133 46,108" stroke="#7a9e7e" strokeWidth="2" fill="none" />
                <path d="M100,130 Q134,112 152,92" stroke="#7a9e7e" strokeWidth="2" fill="none" />
                <ellipse cx="46" cy="108" rx="24" ry="13" fill="#203a24" stroke="#7a9e7e" strokeWidth="1" transform="rotate(-32,46,108)" />
                <ellipse cx="63" cy="118" rx="19" ry="10" fill="#1a3020" stroke="#7a9e7e" strokeWidth=".8" transform="rotate(-20,63,118)" />
                <ellipse cx="152" cy="92" rx="23" ry="12" fill="#203a24" stroke="#7a9e7e" strokeWidth="1" transform="rotate(25,152,92)" />
                <ellipse cx="135" cy="101" rx="17" ry="9" fill="#1a3020" stroke="#7a9e7e" strokeWidth=".8" transform="rotate(15,135,101)" />
                <ellipse cx="100" cy="70" rx="21" ry="11" fill="#203a24" stroke="#7a9e7e" strokeWidth="1" />
                <ellipse cx="84" cy="77" rx="18" ry="9" fill="#1a3020" stroke="#7a9e7e" strokeWidth=".8" transform="rotate(-18,84,77)" />
                <ellipse cx="117" cy="77" rx="18" ry="9" fill="#1a3020" stroke="#7a9e7e" strokeWidth=".8" transform="rotate(15,117,77)" />
                <circle cx="100" cy="52" r="11" fill="#c9a84c" opacity=".9" />
                <circle cx="83" cy="62" r="8" fill="#a04f2b" opacity=".75" />
                <circle cx="117" cy="63" r="8" fill="#c9a84c" opacity=".65" />
                <circle cx="100" cy="52" r="5" fill="#e8c96e" opacity=".55" />
                <path d="M100,210 Q86,216 80,213" stroke="#5a3e28" strokeWidth="2" fill="none" />
                <path d="M100,210 Q114,217 120,214" stroke="#5a3e28" strokeWidth="2" fill="none" />
                <path d="M100,210 Q99,220 97,224" stroke="#5a3e28" strokeWidth="1.5" fill="none" />
              </svg>
              <div className="herb-label">Featured Botanical</div>
              <div className="herb-name-big">Ashwagandha</div>
              <div className="herb-latin">Withania somnifera · Adaptogen · Rasayana</div>
            </div>
            <div className="badge-float b1">100% Organic</div>
            <div className="badge-float b2">Vedic Sourced</div>
            <div className="badge-float b3">Lab Verified</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <Reveal className="stat"><Counter target={5000} /><div className="stat-label">Years of Tradition</div></Reveal>
        <Reveal className="stat" delay={0.15}><Counter target={84} /><div className="stat-label">Sacred Botanicals</div></Reveal>
        <Reveal className="stat" delay={0.3}><Counter target={12} /><div className="stat-label">Vaidya Formulas</div></Reveal>
        <Reveal className="stat" delay={0.45}><Counter target={0} /><div className="stat-label">Synthetic Additives</div></Reveal>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span className="ticker-item" key={i}>{item}<span className="ticker-dot" /></span>
          ))}
        </div>
      </div>

      {/* PILLARS */}
      <section className="pillars" id="philosophy">
        <div className="section-label">The VANA Philosophy</div>
        <h2 className="section-title">Three Pillars of<br /><em>Sacred Wellness</em></h2>
        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <Reveal as="div" className="pillar" key={p.num} delay={i * 0.15}>
              <div className="pillar-num">{p.num}</div>
              <div className="pillar-icon-wrap">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div className="products-header">
          <div>
            <div className="section-label" style={{ textAlign: "left" }}>Sacred Rituals</div>
            <h2 className="section-title" style={{ textAlign: "left" }}>The <em>Collection</em></h2>
          </div>
          <a href="#" className="btn-ghost" onClick={(e) => e.preventDefault()}><div className="ghost-line" />View All</a>
        </div>
        <div className="products-grid">
          {PRODUCTS.map((p, i) => (
            <Reveal as="div" className={`product-card ${p.featured ? "featured" : ""}`} key={p.id} delay={i * 0.12}>
              <div className="product-visual">
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id={`pg-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: p.colors[0] }} />
                      <stop offset="100%" style={{ stopColor: p.colors[1] }} />
                    </linearGradient>
                  </defs>
                  <rect width="250" height="250" fill={`url(#pg-${p.id})`} />
                  <text x="125" y="118" textAnchor="middle" fill="#c9a84c" fontSize="6" letterSpacing="3" fontFamily="Cinzel,serif">VANA</text>
                  <text x="125" y="136" textAnchor="middle" fill="#f5efe2" fontSize="11" fontFamily="Cormorant Garamond,serif" fontStyle="italic">{p.name.split(" ")[0]}</text>
                  <text x="125" y="150" textAnchor="middle" fill="#d4c9b0" fontSize="5" letterSpacing="1.5" fontFamily="Jost,sans-serif">{p.name.split(" ").slice(1).join(" ").toUpperCase()}</text>
                </svg>
                <div className="product-tag">{p.tag}</div>
              </div>
              <div className="product-info">
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
                <div className="product-footer">
                  <div className="product-price">{p.price}</div>
                  <button className="product-btn">Add to Ritual →</button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RITUAL QUOTE */}
      <section className="ritual">
        <div className="ornament">
          <div className="ornament-line" />
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#c9a84c" }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          <div className="ornament-line" />
        </div>
        <div className="ritual-content">
          <p className="ritual-quote">"The body is a <span>sacred vessel</span> — tending it with wisdom is not vanity, it is <span>devotion.</span>"</p>
          <div className="ritual-attr">— Charaka Samhita, circa 600 BCE</div>
        </div>
        <div className="ornament">
          <div className="ornament-line" />
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#c9a84c" }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          <div className="ornament-line" />
        </div>
      </section>

      {/* DOSHA QUIZ */}
      <section className="dosha-section" id="dosha">
        <div className="section-label">Personalised Wisdom</div>
        <h2 className="section-title">Discover Your <em>Dosha</em></h2>
        <p style={{ textAlign: "center", fontSize: ".85rem", color: "var(--mist)", opacity: 0.6, marginTop: ".8rem", letterSpacing: ".05em" }}>
          Five questions, one ancient answer
        </p>

        <div className="quiz-container">
          <div className="quiz-card">
            {!quizResult && !quizLoading && (
              <>
                <div className="quiz-progress">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div key={i} className={`quiz-progress-dot ${i < quizStep ? "done" : i === quizStep ? "active" : ""}`} />
                  ))}
                </div>
                <div className="quiz-q">{activeQ.q}</div>
                <div className="quiz-sub">{activeQ.sub}</div>
                <div className="quiz-options">
                  {activeQ.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`quiz-opt ${quizSelected === opt.v ? "selected" : ""}`}
                      onClick={() => selectOption(opt.v)}
                    >
                      <span className="quiz-opt-label">{opt.label}</span>
                      {opt.text}
                    </button>
                  ))}
                </div>
                <div className="quiz-nav">
                  {quizStep > 0 ? <button className="btn-quiz-back" onClick={quizBack}>Back</button> : <span />}
                  <span className="quiz-step-label">Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  {quizStep < QUIZ_QUESTIONS.length - 1 ? (
                    <button className="btn-quiz-next" disabled={!quizSelected} onClick={quizNext}>Continue</button>
                  ) : (
                    <button className="btn-quiz-next" disabled={!quizSelected} onClick={quizSubmit}>Reveal My Dosha</button>
                  )}
                </div>
              </>
            )}

            {quizLoading && (
              <div className="quiz-loading">
                <div className="quiz-loading-text">Our Vaidya wisdom is reading your energy</div>
                <div style={{ marginTop: "1.5rem" }} className="loading-dots"><span></span><span></span><span></span></div>
              </div>
            )}

            {quizResult && !quizLoading && (
              <div className="quiz-result">
                <div className="dosha-badge">
                  <div className="dosha-badge-sub">Your primary dosha is</div>
                  <div className="dosha-badge-name">{DOSHA_INFO[quizResult].name}</div>
                  <div className="dosha-badge-sub">{DOSHA_INFO[quizResult].subtitle}</div>
                </div>
                <div className="dosha-desc">{DOSHA_INFO[quizResult].description}</div>
                <div className="dosha-products-rec">
                  <h5>Recommended Rituals for You</h5>
                  <div className="rec-products">
                    {DOSHA_INFO[quizResult].recommendations.map((r) => (
                      <div className="rec-product" key={r.name}><strong>{r.name}</strong>{r.reason}</div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="btn-quiz-back" onClick={quizReset}>Retake Quiz</button>
                  <a href="#products" className="btn-primary" style={{ display: "inline-block" }} onClick={scrollToId("products")}><span>Shop Your Rituals</span></a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="ingredients" id="ingredients">
        <div className="section-label">The Botanical Library</div>
        <h2 className="section-title">Sacred <em>Ingredients</em></h2>
        <div className="ingredients-layout">
          <div>
            {INGREDIENTS.map((ing, i) => (
              <Reveal as="div" className="ingredient-item" key={ing.num} delay={i * 0.12}>
                <div className="ingredient-num">{ing.num}</div>
                <div className="ingredient-text">
                  <span className="ing-latin">{ing.latin}</span>
                  <h5>{ing.name}</h5>
                  <p>{ing.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="ingredients-visual">
            <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 340, opacity: 0.88 }}>
              <defs>
                <radialGradient id="lglow" cx="50%" cy="50%" r="50%"><stop offset="0%" style={{ stopColor: "#c9a84c", stopOpacity: 0.07 }} /><stop offset="100%" style={{ stopColor: "transparent" }} /></radialGradient>
                <path id="cp" d="M200,58 m-162,0 a162,162 0 1,1 324,0 a162,162 0 1,1 -324,0" />
              </defs>
              <rect width="400" height="500" fill="url(#lglow)" rx="4" />
              <path d="M200,480 C200,480 196,420 198,380 C200,350 200,300 200,240 C200,180 200,130 200,80" stroke="#5a7a5e" strokeWidth="3.5" fill="none" />
              <path d="M200,380 Q138,340 108,288 Q130,278 162,310 Q182,330 200,380Z" fill="#1a3a1e" stroke="#7a9e7e" strokeWidth="1.2" />
              <path d="M200,350 Q262,312 292,258 Q272,248 242,278 Q222,300 200,350Z" fill="#1e4022" stroke="#7a9e7e" strokeWidth="1.2" />
              <path d="M200,300 Q128,260 98,208 Q124,198 155,229 Q178,254 200,300Z" fill="#1a3a1e" stroke="#7a9e7e" strokeWidth="1.2" />
              <path d="M200,270 Q272,236 296,184 Q274,175 245,205 Q222,228 200,270Z" fill="#1e4022" stroke="#7a9e7e" strokeWidth="1.2" />
              <path d="M200,218 Q144,183 122,132 Q148,124 174,153 Q190,174 200,218Z" fill="#1a3a1e" stroke="#7a9e7e" strokeWidth="1.2" />
              <path d="M200,188 Q260,158 276,110 Q254,103 228,130 Q213,154 200,188Z" fill="#1e4022" stroke="#7a9e7e" strokeWidth="1.2" />
              <circle cx="200" cy="66" r="26" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity=".55" />
              <circle cx="200" cy="66" r="17" fill="rgba(201,168,76,.09)" stroke="#c9a84c" strokeWidth="1" />
              <circle cx="200" cy="66" r="9" fill="rgba(201,168,76,.28)" />
              <circle cx="200" cy="66" r="4" fill="#c9a84c" />
              <circle cx="174" cy="90" r="7" fill="#8b3a1e" opacity=".65" />
              <circle cx="226" cy="87" r="6" fill="#a04f2b" opacity=".55" />
              <circle cx="187" cy="74" r="5" fill="#c9a84c" opacity=".45" />
              <circle cx="200" cy="248" r="190" fill="none" stroke="#c9a84c" strokeWidth=".4" opacity=".12" strokeDasharray="4 8" />
              <circle cx="200" cy="248" r="173" fill="none" stroke="#c9a84c" strokeWidth=".3" opacity=".08" />
              <text fontFamily="Cinzel,serif" fontSize="8" fill="#c9a84c" opacity=".22" letterSpacing="6">
                <textPath href="#cp">VANA · AYURVEDA · SACRED BOTANICALS · VEDIC WISDOM · </textPath>
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-label">From Our Community</div>
        <h2 className="section-title">Living <em>Testimonies</em></h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="div" className="t-card" key={t.author} delay={i * 0.15}>
              <div className="t-stars">★★★★★</div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">{t.author}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="nav-logo" style={{ fontSize: "1.7rem" }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              VANA<span>Ayurveda since 1987</span>
            </a>
            <p>Rooted in the Himalayan foothills, guided by Vedic tradition, perfected for the modern seeker. Every VANA product is a covenant with nature.</p>
          </div>
          <div className="footer-col">
            <h6>Rituals</h6>
            <ul>
              <li><a>Rasayana Collection</a></li><li><a>Face &amp; Body</a></li><li><a>Herbal Teas</a></li><li><a>Wellness Powders</a></li><li><a>Gift Sets</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Wisdom</h6>
            <ul>
              <li><a onClick={scrollToId("dosha")}>Dosha Quiz</a></li><li><a onClick={scrollToId("ingredients")}>Botanical Library</a></li><li><a>The Journal</a></li><li><a>Ritual Guides</a></li><li><a>Our Vaidyas</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Support</h6>
            <ul>
              <li><a>About VANA</a></li><li><a>Sustainability</a></li><li><a>Wholesale</a></li><li><a>Contact</a></li><li><a>FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 VANA Ayurveda. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" className="footer-social" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="#" className="footer-social" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
          </div>
          <p>Crafted with intention · Grown with reverence · Made with love</p>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <div className="chat-widget">
        <div className={`chat-panel ${chatOpen ? "open" : ""}`}>
          <div className="chat-head">
            <div className="chat-head-avatar"><svg viewBox="0 0 24 24"><path d="M12 2a6 6 0 0 1 6 6c0 3.31-2.69 6-6 6s-6-2.69-6-6a6 6 0 0 1 6-6zm0 14c6.63 0 10 2.24 10 4v2H2v-2c0-1.76 3.37-4 10-4z" /></svg></div>
            <div className="chat-head-info"><h6>VANA Vaidya</h6><p>AI Wellness Assistant</p></div>
            <div className="chat-online" />
          </div>
          {showQuickBtns && (
            <div className="chat-quick-btns">
              <button className="chat-quick-btn" onClick={() => sendChat("What is my dosha?")}>Find my dosha</button>
              <button className="chat-quick-btn" onClick={() => sendChat("Best product for stress")}>Stress relief</button>
              <button className="chat-quick-btn" onClick={() => sendChat("Tell me about Ashwagandha")}>Ashwagandha</button>
            </div>
          )}
          <div className="chat-messages" ref={chatMsgsRef}>
            {chatMessages.map((m, i) => (
              <div className={`chat-msg ${m.role === "user" ? "user" : "bot"}`} key={i}>{m.text}</div>
            ))}
            {chatTyping && <div className="chat-msg typing"><span></span><span></span><span></span></div>}
          </div>
          <div className="chat-input-area">
            <input
              className="chat-input"
              placeholder="Ask about wellness, doshas, herbs..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }}
            />
            <button className="chat-send" onClick={() => sendChat()}>
              <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
            </button>
          </div>
        </div>
        <button className={`chat-toggle ${chatOpen ? "open" : ""}`} onClick={() => setChatOpen((o) => !o)} aria-label="Toggle chat">
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6V10h12v2zm0-3H6V7h12v2z" /></svg>
        </button>
      </div>
    </div>
  );
}
