import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const PricingCard = ({ 
  tier, 
  price, 
  description, 
  features, 
  isPopular, 
  icon: Icon 
}: { 
  tier: string; 
  price: string; 
  description: string; 
  features: string[]; 
  isPopular?: boolean;
  icon: any;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className={cn(
      "relative p-8 rounded-3xl border transition-all duration-500 flex flex-col h-full",
      isPopular 
        ? "bg-brand-purple/10 border-brand-purple/50 glow-purple" 
        : "bg-white/5 border-white/10 hover:border-white/20"
    )}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full text-xs font-bold text-white uppercase tracking-widest">
        Most Popular
      </div>
    )}
    
    <div className="mb-8">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
        isPopular ? "bg-brand-purple text-white" : "bg-white/10 text-brand-blue"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{tier}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>

    <div className="mb-8">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">{price}</span>
        {price !== "Free" && <span className="text-slate-500">/month</span>}
      </div>
    </div>

    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
          <Check className="w-4 h-4 text-brand-blue flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>

    <button className={cn(
      "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
      isPopular 
        ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg shadow-brand-purple/25 hover:scale-[1.02]" 
        : "bg-white/10 text-white hover:bg-white/20"
    )}>
      Get Started <ArrowRight className="w-4 h-4" />
    </button>
  </motion.div>
);

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-6"
          >
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your trading style. From casual retail to institutional grade analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            tier="Free"
            price="Free"
            description="Perfect for getting started and learning the basics."
            icon={Zap}
            features={[
              "Real-time Chart Analysis (15m+)",
              "Basic Risk Calculator",
              "Daily Market Sentiment",
              "Community Support",
              "Limited AI Insights (5/day)"
            ]}
          />
          <PricingCard 
            tier="Pro"
            price="$49"
            description="For serious traders who want a full-time AI partner."
            isPopular
            icon={Shield}
            features={[
              "Everything in Free",
              "Low Latency Analysis (1m+)",
              "Pre-Trade Feedback Engine",
              "Mistake Pattern Detection",
              "Unlimited AI Insights",
              "Priority Discord Access"
            ]}
          />
          <PricingCard 
            tier="Institutional"
            price="$199"
            description="Advanced tools for prop firms and high-volume traders."
            icon={Crown}
            features={[
              "Everything in Pro",
              "Custom Strategy Training",
              "Multi-Chart Correlation",
              "API Access for Bots",
              "1-on-1 Psychology Coaching",
              "Dedicated Account Manager"
            ]}
          />
        </div>

        <div className="mt-24 glass p-12 rounded-[40px] border-white/10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a custom solution?</h2>
          <p className="text-slate-400 mb-8">We offer tailored enterprise packages for hedge funds and trading schools.</p>
          <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  );
}
