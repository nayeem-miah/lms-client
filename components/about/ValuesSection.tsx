import { Shield, Zap, Users, Award } from 'lucide-react';

export default function ValuesSection() {
    const values = [
        {
            icon: Shield,
            title: 'Quality First',
            description: 'Every course is carefully vetted to ensure the highest standards of content and instruction.',
            color: 'blue',
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'We constantly evolve our platform with cutting-edge technology and learning methodologies.',
            color: 'purple',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a supportive network where students and instructors can connect and grow together.',
            color: 'pink',
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Committed to delivering exceptional learning experiences that drive real career outcomes.',
            color: 'indigo',
        },
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px] -mr-32"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-100 italic tracking-tight underline decoration-cyan-500/30 underline-offset-8">Our Core Values</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-[2rem] bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all group"
                            >
                                <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                    <value.icon className="w-7 h-7 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-100 italic">{value.title}</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
