import React from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  BarChart3, 
  ShieldCheck, 
  History, 
  Zap, 
  Globe, 
  Cpu, 
  LineChart 
} from 'lucide-react';

interface ServiceItemProps {
  title: string;
  description: string;
  icon: any;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  index 
}) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex flex-col md:flex-row gap-8 items-center py-16 border-b border-white/5 last:border-0"
  >
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-blue/20 blur-[60px] rounded-full" />
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center shadow-2xl">
          <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 text-lg leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

export default function ServicesPage() {
  const services = [
    {
      title: "Real-time Chart Intelligence",
      description: "Our AI processes millions of data points across multiple timeframes simultaneously. It identifies hidden liquidity zones, institutional order blocks, and complex harmonic patterns that the human eye often misses.",
      icon: BarChart3
    },
    {
      title: "Psychological Guardrails",
      description: "AI Trader monitors your trading behavior in real-time. If it detects signs of 'revenge trading' or emotional distress based on your entry patterns, it provides immediate intervention to protect your capital.",
      icon: BrainCircuit
    },
    {
      title: "Risk Management Engine",
      description: "Automatically calculate position sizes based on your account equity and desired risk percentage. AI Trader ensures you never over-leverage and always maintain a positive expectancy.",
      icon: ShieldCheck
    },
    {
      title: "Historical Performance Audit",
      description: "Upload your trade history and let AI Trader find the 'leak' in your strategy. Our deep learning model identifies exactly which market conditions lead to your losses and which ones are your gold mines.",
      icon: History
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-6"
          >
            Our <span className="gradient-text">AI Services</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Beyond signals. We provide a comprehensive ecosystem designed to turn retail traders into disciplined professionals.
          </p>
        </div>

        <div className="space-y-0">
          {services.map((service, i) => (
            <ServiceItem key={i} {...service} index={i} />
          ))}
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Cpu, title: "Edge Computing", desc: "Ultra-low latency analysis." },
            { icon: Globe, title: "Global Markets", desc: "Forex, Crypto, Stocks, Indices." },
            { icon: Zap, title: "Instant Alerts", desc: "Mobile & Desktop notifications." },
            { icon: LineChart, title: "Backtesting", desc: "Validate ideas in seconds." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <item.icon className="w-8 h-8 text-brand-blue mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
