import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  ShieldAlert, 
  BrainCircuit, 
  Target, 
  Zap, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  Activity,
  Lock,
  Phone
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { cn } from './lib/utils';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';

// --- Mock Data ---
const chartData = [
  { time: '09:30', price: 150.20 },
  { time: '09:45', price: 151.50 },
  { time: '10:00', price: 150.80 },
  { time: '10:15', price: 152.40 },
  { time: '10:30', price: 153.10 },
  { time: '10:45', price: 152.60 },
  { time: '11:00', price: 154.20 },
  { time: '11:15', price: 155.80 },
  { time: '11:30', price: 154.90 },
  { time: '11:45', price: 156.30 },
  { time: '12:00', price: 157.10 },
];

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Day Trader",
    content: "AI Trader saved me from three 'revenge trades' in my first week. It's like having a professional mentor watching my back.",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    name: "Sarah Chen",
    role: "Swing Trader",
    content: "The pre-trade feedback is a game changer. I've cut my losing trades by 40% just by waiting for the AI's confirmation.",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    name: "Marcus Thorne",
    role: "Crypto Specialist",
    content: "Finally, a tool that focuses on discipline rather than just signals. AI Trader helps me stick to my plan when emotions run high.",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Features', path: '/#features' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Demo', path: '/#demo' },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-brand-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-purple/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">AI<span className="text-brand-blue">Trader</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.path.startsWith('/#') ? (
              <a key={item.name} href={item.path} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {item.name}
              </a>
            ) : (
              <Link key={item.name} to={item.path} className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === item.path ? "text-white" : "text-slate-400 hover:text-white"
              )}>
                {item.name}
              </Link>
            )
          ))}
          <a 
            href="tel:6361703787" 
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-full text-sm font-bold hover:bg-brand-blue/20 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Us</span>
          </a>
          <button className="px-5 py-2.5 bg-white text-brand-black rounded-full text-sm font-bold hover:bg-slate-200 transition-all">
            Get Early Access
          </button>
        </div>

        <button 
          className="md:hidden text-white w-10 h-10 flex items-center justify-center relative z-[60]" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <motion.div
            animate={isMobileMenuOpen ? "open" : "closed"}
            className="relative w-6 h-6"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 }
              }}
              className="absolute top-0 left-0 w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              className="absolute top-[11px] left-0 w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 }
              }}
              className="absolute bottom-0 left-0 w-6 h-0.5 bg-white rounded-full"
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-black/60 backdrop-blur-md z-40 md:hidden"
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-brand-dark border-l border-white/10 p-10 flex flex-col md:hidden z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center gap-2 mb-12">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-blue rounded-lg flex items-center justify-center">
                  <BrainCircuit className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-display font-bold text-white">AI<span className="text-brand-blue">Trader</span></span>
              </div>

              <div className="flex flex-col gap-4 mb-12">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    {item.path.startsWith('/#') ? (
                      <a 
                        href={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="text-3xl font-bold text-white py-2 block active:scale-95 transition-transform"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link 
                        to={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className={cn(
                          "text-3xl font-bold py-2 block active:scale-95 transition-transform",
                          location.pathname === item.path ? "text-brand-blue" : "text-white"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-8 border-t border-white/5 mt-auto">
                <a 
                  href="tel:6361703787" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-2xl font-bold text-lg active:scale-95 transition-transform"
                >
                  <Phone className="w-6 h-6" />
                  <span>Call Support</span>
                </a>
                <button className="w-full py-5 bg-brand-purple text-white rounded-2xl font-bold text-lg shadow-lg shadow-brand-purple/20 active:scale-95 transition-transform">
                  Get Early Access
                </button>
                
                <div className="flex justify-center gap-6 mt-8">
                  {['Twitter', 'Discord', 'Telegram'].map(social => (
                    <div key={social} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
                      <div className="w-6 h-6 bg-slate-400 rounded-sm" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-brand-purple uppercase mb-6">
            The Future of Trading Psychology
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-tight">
            Trade Smarter. <br />
            <span className="gradient-text">Not Alone.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Get a second perspective on every trade. Your AI partner analyzes the same chart — helping you avoid costly mistakes and think like a pro.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-brand-purple/25 flex items-center justify-center gap-2">
              Try Demo <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              See How It Works
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="glass rounded-2xl p-4 md:p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-blue" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="h-6 w-px bg-white/10 mx-2" />
                <span className="text-xs font-mono text-slate-500">BTC/USD · 15M · BINANCE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20">LIVE</div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
            
            <div className="h-[300px] md:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #ffffff10', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  <ReferenceLine y={156} stroke="#3B82F6" strokeDasharray="3 3" label={{ position: 'right', value: 'AI Entry Target', fill: '#3B82F6', fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Floating Insight */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 right-10 md:right-20 glass p-4 rounded-xl border-brand-blue/50 shadow-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-4 h-4 text-brand-blue" />
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Trader Insight</span>
              </div>
              <p className="text-xs text-white leading-tight">
                "Volume is diverging. Wait for a retest of the support level before entry."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const ProblemSection = () => {
  const problems = [
    { icon: <ShieldAlert className="text-red-400" />, title: "Emotional Decisions", desc: "FOMO and revenge trading destroy more accounts than bad strategies." },
    { icon: <Activity className="text-yellow-400" />, title: "No Structure", desc: "Trading without a checklist leads to inconsistent results and confusion." },
    { icon: <Lock className="text-blue-400" />, title: "Trading Alone", desc: "Without a second set of eyes, you're prone to confirmation bias." },
    { icon: <Zap className="text-purple-400" />, title: "Repeating Mistakes", desc: "Losing trades are often patterns you fail to recognize in real-time." }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Most Traders Lose Money</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">It's rarely the strategy. It's almost always the execution and psychology.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SolutionSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <span className="text-brand-blue font-bold text-sm tracking-widest uppercase mb-4 block">The Solution</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Meet Your AI <br />Trading Partner</h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            AI Trader doesn't just give you signals. It acts as a co-pilot, analyzing your charts in real-time to ensure you're following your own rules.
          </p>
          
          <ul className="space-y-6">
            {[
              { title: "Reviews Your Setup", desc: "AI checks if your setup meets your predefined criteria." },
              { title: "Challenges Decisions", desc: "Prompts you to think twice when market conditions shift." },
              { title: "Highlights Risk", desc: "Calculates R:R and highlights potential pitfalls before entry." },
              { title: "Learns & Adapts", desc: "Identifies your personal bias patterns from past trades." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] rounded-full" />
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative glass rounded-3xl p-8 border-brand-blue/30 glow-blue"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center">
                <BrainCircuit className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold">AI Trader Co-Pilot</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Analyzing Chart...</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Risk/Reward Ratio</span>
                  <span className="text-xs font-bold text-green-400">3.2 : 1</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[75%] h-full bg-green-400" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Warning</span>
                </div>
                <p className="text-xs text-slate-300">High impact news (CPI) in 15 minutes. Consider waiting for post-volatility.</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                <div className="flex items-center gap-2 text-brand-purple mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Strategy Match</span>
                </div>
                <p className="text-xs text-slate-300">Bullish engulfing on 4H support. 82% match with your 'Trend Reversal' strategy.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesGrid = () => {
  const features = [
    { title: "Second Perspective Engine", desc: "AI analyzes the same chart as you, providing an unbiased technical view.", icon: <BarChart3 /> },
    { title: "Pre-Trade Feedback", desc: "Get a detailed risk assessment and strategy check before you click 'Buy'.", icon: <MessageSquare /> },
    { title: "Mistake Detection", desc: "Identifies behavioral patterns in your losing trades to stop the cycle.", icon: <ShieldAlert /> },
    { title: "Discipline Builder", desc: "Enforces your trading plan with interactive checklists and alerts.", icon: <Target /> }
  ];

  return (
    <section id="features" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Engineered for Performance</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Tools designed by traders, powered by advanced machine learning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-brand-purple/30 hover:to-brand-blue/30 transition-all duration-500"
            >
              <div className="bg-brand-dark rounded-[22px] p-10 h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-brand-blue">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DemoSection = () => {
  return (
    <section id="demo" className="py-24 bg-brand-dark/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-6">See AI Trader in Action</h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <XCircle className="text-red-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold">The Mistake</h4>
                  <p className="text-sm text-slate-400">"You entered too early. Volume is weak. Wait for confirmation."</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-green-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold">The Correction</h4>
                  <p className="text-sm text-slate-400">"Support held. Bullish divergence confirmed on RSI. Entry valid."</p>
                </div>
              </div>
            </div>
            <button className="mt-10 px-8 py-4 bg-white text-brand-black rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
              Start Your Free Demo <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 w-full">
            <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
              <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">AI TRADER INTERFACE v1.0</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <BrainCircuit className="text-white w-5 h-5" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-[80%]">
                    <p className="text-sm text-white">I've analyzed the current BTC/USD chart. You're looking at a potential Long entry, correct?</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 justify-end">
                  <div className="bg-brand-blue/20 p-4 rounded-2xl rounded-tr-none border border-brand-blue/30 max-w-[80%]">
                    <p className="text-sm text-white">Yes, looks like a breakout of the descending wedge.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <BrainCircuit className="text-white w-5 h-5" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-[80%]">
                    <p className="text-sm text-white">
                      <span className="text-red-400 font-bold block mb-1">Wait!</span>
                      The breakout is on low relative volume (20% below average). Historical data shows a 74% chance of a fakeout in these conditions. Recommend waiting for a 15m candle close above $64,200.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SocialProof = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          {['BINANCE', 'COINBASE', 'TRADINGVIEW', 'BYBIT', 'KRAKEN'].map(brand => (
            <span key={brand} className="text-xl font-display font-black text-white tracking-tighter">{brand}</span>
          ))}
        </div>

        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Zap key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Trusted by 10,000+ Traders</h2>
          <p className="text-slate-400">Join the community of disciplined professionals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 relative">
              <p className="text-slate-300 italic mb-8">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-purple/30" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto relative rounded-[40px] overflow-hidden p-12 md:p-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-blue opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">Stop Trading Alone.</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join the waitlist for AI Trader and be the first to experience the future of trading discipline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full sm:w-80 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-brand-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Get Early Access
            </button>
          </div>
          <p className="mt-6 text-sm text-white/60">No credit card required. Limited spots available.</p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-blue rounded-lg flex items-center justify-center">
            <BrainCircuit className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-white">AI<span className="text-brand-blue">Trader</span></span>
        </div>

        <div className="flex gap-8 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="tel:6361703787" className="flex items-center gap-1 hover:text-white transition-colors">
            <Phone className="w-3 h-3" />
            Contact: 6361703787
          </a>
        </div>

        <div className="flex gap-4">
          {['Twitter', 'Discord', 'Telegram'].map(social => (
            <div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
              <span className="sr-only">{social}</span>
              <div className="w-5 h-5 bg-slate-400 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12 text-xs text-slate-600">
        © 2026 AI Trader. All rights reserved. Trading involves significant risk.
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const FloatingCallButton = () => {
  return (
    <motion.a
      href="tel:6361703787"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-blue/40 border border-white/20"
    >
      <Phone className="w-6 h-6" />
    </motion.a>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-brand-purple selection:text-white">
        <Navbar />
        <FloatingCallButton />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
