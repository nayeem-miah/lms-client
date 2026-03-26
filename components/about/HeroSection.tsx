'use client';

import { useTranslations } from 'next-intl';
import { useGetAllCoursesQuery } from '@/lib/redux/features/courses/coursesApi';
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi';

export default function HeroSection() {
    const t = useTranslations('About.hero');
    
    const { data: coursesData } = useGetAllCoursesQuery({ limit: 1 });
    const { data: studentsData } = useGetAllUsersQuery({ role: 'STUDENT', limit: 1 });
    const { data: instructorsData } = useGetAllUsersQuery({ role: 'INSTRUCTOR', limit: 1 });

    const totalStudents = studentsData?.meta?.total ? `${(studentsData.meta.total / 1000).toFixed(0)}K+` : '50K+';
    const totalInstructors = instructorsData?.meta?.total ? `${instructorsData.meta.total}+` : '500+';
    const totalCourses = coursesData?.meta?.total ? `${coursesData.meta.total}+` : '1000+';

    return (
        <section className="relative bg-slate-950 text-white py-24 overflow-hidden border-b border-slate-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -ml-48 -mb-48"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-block">
                        <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md rounded-full text-sm font-bold text-cyan-400 uppercase tracking-widest italic">
                            {t('badge')}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight italic text-slate-100">
                        {t('title')}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 pt-8">
                        <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-md rounded-2xl px-10 py-6 shadow-2xl hover:border-cyan-500/30 transition-all group">
                            <div className="text-4xl font-black text-slate-100 italic group-hover:text-cyan-400 transition-colors uppercase tracking-tighter">
                                {totalStudents}
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t('stats.activeStudents')}</div>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-md rounded-2xl px-10 py-6 shadow-2xl hover:border-purple-500/30 transition-all group">
                            <div className="text-4xl font-black text-slate-100 italic group-hover:text-purple-400 transition-colors uppercase tracking-tighter">
                                {totalInstructors}
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t('stats.expertInstructors')}</div>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-md rounded-2xl px-10 py-6 shadow-2xl hover:border-cyan-500/30 transition-all group">
                            <div className="text-4xl font-black text-slate-100 italic group-hover:text-cyan-400 transition-colors uppercase tracking-tighter">
                                {totalCourses}
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t('stats.qualityCourses')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}