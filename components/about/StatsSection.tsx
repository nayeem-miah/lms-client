/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';
import { useGetAllCoursesQuery } from '@/lib/redux/features/courses/coursesApi';
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi';
import { useTranslations } from 'next-intl';

export default function StatsSection() {
    const t = useTranslations('LandingPage.stats');
    
    const { data: coursesData } = useGetAllCoursesQuery({ limit: 1 });
    const { data: studentsData } = useGetAllUsersQuery({ role: 'STUDENT', limit: 1 });
    const { data: instructorsData } = useGetAllUsersQuery({ role: 'INSTRUCTOR', limit: 1 });

    const stats = useMemo(() => [
        {
            icon: Users,
            value: studentsData?.meta?.total || 50000,
            label: t('activeStudents'),
            suffix: '+',
        },
        {
            icon: BookOpen,
            value: coursesData?.meta?.total || 1000,
            label: t('totalCourses'),
            suffix: '+',
        },
        {
            icon: Award,
            value: instructorsData?.meta?.total || 500,
            label: t('expertInstructors'),
            suffix: '+',
        },
        {
            icon: Globe,
            value: 150,
            label: 'Countries Reached', // Fallback as this key is not in LandingPage.stats
            suffix: '+',
        },
    ], [coursesData, studentsData, instructorsData, t]);

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-100 italic tracking-tight uppercase">Our Impact in Numbers</h2>
                        <p className="text-xl text-slate-400 font-medium">
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
        <div className="text-center p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 group">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-slate-700 group-hover:border-cyan-500/50">
                <Icon className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-4xl font-black text-white mb-2 italic tracking-tighter">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{label}</div>
        </div>
    );
}