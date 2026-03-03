/* eslint-disable react/no-unescaped-entities */
import { Target, Heart, Sparkles } from 'lucide-react';

export default function MissionSection() {
    const missions = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To democratize education by providing affordable, high-quality courses that empower individuals to achieve their career goals and pursue their passions.',
        },
        {
            icon: Heart,
            title: 'Our Vision',
            description: 'A world where anyone, anywhere can transform their life through learning and unlock opportunities they never thought possible.',
        },
        {
            icon: Sparkles,
            title: 'Our Values',
            description: 'Excellence, accessibility, innovation, and community. We believe in creating an inclusive learning environment where everyone can thrive.',
        },
    ];

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] -ml-32"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-100 italic tracking-tight">What Drives Us</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                            We're passionate about creating meaningful impact through education
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {missions.map((item, index) => (
                            <div
                                key={index}
                                className="bg-slate-950/50 border border-slate-800 rounded-2xl p-8 shadow-2xl hover:border-cyan-500/30 transition-all group"
                            >
                                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-100 italic">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}