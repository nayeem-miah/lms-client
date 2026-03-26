'use client';

import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApi";
import { Instructor } from "./About";
import InstructorCard from "./InstructorCard";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Link from "next/link";

export default function InstructorsSection() {
    const t = useTranslations('LandingPage.instructor'); // Reusing translations
    const { data: instructorsData, isLoading } = useGetAllUsersQuery({ role: 'INSTRUCTOR', limit: 6 });

    const instructors: Instructor[] = useMemo(() => {
        if (!instructorsData?.users) return [];
        return instructorsData.users.map((user: any) => ({
            id: user._id,
            name: user.name,
            title: user.title || 'Expert Instructor',
            bio: user.bio || 'Experienced professional dedicated to teaching.',
            avatar: user.profilePhoto || '',
            expertise: user.expertise || ['General'],
            students: user.totalStudents || 0,
            courses: user.totalCourses || 0,
            rating: user.ratingAvg || 4.5,
            socialLinks: user.socialLinks || {},
        }));
    }, [instructorsData]);

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold uppercase tracking-widest italic">
                                Meet Our Team
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-100 italic tracking-tight uppercase">
                            World-Class Instructors
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            Learn from industry experts who have worked at top tech companies and are
                            passionate about sharing their knowledge with you.
                        </p>
                    </div>

                    {/* Instructors Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-96 bg-slate-800 rounded-[2rem] animate-pulse border border-slate-700" />
                            ))
                        ) : (
                            instructors.map((instructor) => (
                                <InstructorCard key={instructor.id} instructor={instructor} />
                            ))
                        )}
                    </div>

                    {/* Become Instructor CTA */}
                    <div className="relative bg-slate-950 border border-slate-800 rounded-[2rem] p-12 text-center text-white overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-black mb-6 italic text-slate-100 uppercase">
                                {t('title')}
                            </h3>
                            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
                                {t('subtitle')}
                            </p>
                            <Link href={'/login'}> <button className="px-10 py-6 h-auto bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/25 active:scale-95 italic uppercase tracking-widest text-sm">
                                {t('button')}
                            </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

