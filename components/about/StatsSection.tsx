/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

export default function StatsSection() {
    const stats = [
        {
            icon: Users,
            value: 50000,
            label: 'Active Students',
            suffix: '+',
        },
        {
            icon: BookOpen,
            value: 1000,
            label: 'Quality Courses',
            suffix: '+',
        },
        {
            icon: Award,
            value: 500,
            label: 'Expert Instructors',
            suffix: '+',
        },
        {
            icon: Globe,
            value: 150,
            label: 'Countries Reached',
            suffix: '+',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
                        <p className="text-xl text-gray-600">
                            Growing every day, making education accessible worldwide
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}




function StatCard({ icon: Icon, value, label, suffix }: any) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-gray-600 font-medium">{label}</div>
        </div>
    );
}