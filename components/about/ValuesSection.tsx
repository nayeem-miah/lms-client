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
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                            >
                                <div className={`w - 12 h - 12 bg - ${value.color} -100 rounded - lg flex items - center justify - center mb - 4`}>
                                    <value.icon className={`w - 6 h - 6 text - ${value.color} -600`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
