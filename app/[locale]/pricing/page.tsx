"use client"
import { Check, Shield, Zap, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'

const plans = [
    {
        name: 'Basic',
        price: 'Free',
        description: 'Explore our free library and start your journey.',
        features: [
            'Access to 20+ free courses',
            'Community support',
            'Course progress tracking',
            'Mobile app access'
        ],
        cta: 'Get Started',
        popular: false
    },
    {
        name: 'Pro',
        price: '$19',
        period: '/month',
        description: 'Perfect for dedicated learners seeking certification.',
        features: [
            'Access to all 500+ courses',
            'Verified certificates',
            'Offline viewing',
            'Priority support',
            'Downloadable resources'
        ],
        cta: 'Join Pro',
        popular: true
    },
    {
        name: 'Business',
        price: '$49',
        period: '/user',
        description: 'Scale your team\'s skills with tailored solutions.',
        features: [
            'Everything in Pro',
            'Advanced analytics',
            'Team management',
            'Custom learning paths',
            'Dedicated success manager'
        ],
        cta: 'Contact Sales',
        popular: false
    }
]

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4"
                    >
                        Invest in Your <span className="text-cyan-400">Future</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg font-medium max-w-2xl mx-auto"
                    >
                        Choose a plan that fits your goals. Upgrade or cancel anytime.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative bg-slate-900 border ${plan.popular ? 'border-cyan-500 shadow-2xl shadow-cyan-500/10' : 'border-slate-800'} rounded-[2.5rem] p-8 flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-10 -translate-y-1/2 bg-cyan-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase italic tracking-widest">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-white italic tracking-tighter">{plan.price}</span>
                                    {plan.period && <span className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">{plan.period}</span>}
                                </div>
                                <p className="mt-4 text-slate-400 text-sm font-medium leading-relaxed">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                                        <div className="h-5 w-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="h-3 w-3 text-cyan-400" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/auth/login" className="w-full">
                                <Button 
                                    className={`w-full py-6 rounded-2xl font-black uppercase italic tracking-widest transition-all active:scale-95 ${
                                        plan.popular 
                                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/20' 
                                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-slate-900 pt-20">
                    <div className="space-y-2">
                        <Shield className="h-8 w-8 text-cyan-500 mx-auto mb-4" />
                        <h4 className="text-white font-bold uppercase italic tracking-wider">Secure Payment</h4>
                        <p className="text-slate-500 text-sm">Industry standard encryption for all transactions.</p>
                    </div>
                    <div className="space-y-2">
                        <Star className="h-8 w-8 text-cyan-500 mx-auto mb-4" />
                        <h4 className="text-white font-bold uppercase italic tracking-wider">Money Back</h4>
                        <p className="text-slate-500 text-sm">30-day money back guarantee across all plans.</p>
                    </div>
                    <div className="space-y-2">
                        <Zap className="h-8 w-8 text-cyan-500 mx-auto mb-4" />
                        <h4 className="text-white font-bold uppercase italic tracking-wider">Instant Access</h4>
                        <p className="text-slate-500 text-sm">Start learning immediately after your purchase.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
