import { Metadata } from 'next';
import HeroSection from './HeroSection';
import MissionSection from './MissionSection';
import StatsSection from './StatsSection';
import InstructorsSection from './InstructorsSection';
import ValuesSection from './ValuesSection';




export interface Instructor {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    expertise: string[];
    students: number;
    courses: number;
    rating: number;
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
}



export const metadata: Metadata = {
    title: 'About Us | LearnCourse',
    description: 'Learn more about LearnCourse, our mission, and our amazing instructors.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <MissionSection />
            <StatsSection />
            <InstructorsSection />
            <ValuesSection />
            {/* <CTASection /> */}
        </div>
    );
}
