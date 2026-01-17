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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Drives Us</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're passionate about creating meaningful impact through education
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {missions.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <item.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}