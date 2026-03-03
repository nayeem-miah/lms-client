import { Instructor } from "./About";
import InstructorCard from "./InstructorCard";


export default function InstructorsSection() {
    // Mock data - Replace with API call
    const instructors: Instructor[] = [
        {
            id: '1',
            name: 'Dr. Sarah Johnson',
            title: 'Senior Software Architect',
            bio: 'Former Google engineer with 15+ years of experience in full-stack development and cloud architecture.',
            avatar: '/images/instructors/sarah.jpg',
            expertise: ['React', 'Node.js', 'AWS', 'System Design'],
            students: 12500,
            courses: 8,
            rating: 4.9,
            socialLinks: {
                twitter: 'https://twitter.com/sarahjohnson',
                linkedin: 'https://linkedin.com/in/sarahjohnson',
                github: 'https://github.com/sarahjohnson',
            },
        },
        {
            id: '2',
            name: 'Prof. Michael Chen',
            title: 'Data Science Lead',
            bio: 'PhD in Machine Learning with expertise in AI, deep learning, and statistical analysis. Previously at Meta.',
            avatar: '/images/instructors/michael.jpg',
            expertise: ['Python', 'Machine Learning', 'TensorFlow', 'Statistics'],
            students: 15000,
            courses: 12,
            rating: 4.8,
            socialLinks: {
                twitter: 'https://twitter.com/michaelchen',
                linkedin: 'https://linkedin.com/in/michaelchen',
            },
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            title: 'UX/UI Design Expert',
            bio: 'Award-winning designer with 10+ years creating beautiful, user-centric digital experiences for Fortune 500 companies.',
            avatar: '/images/instructors/emily.jpg',
            expertise: ['Figma', 'UI Design', 'UX Research', 'Design Systems'],
            students: 9800,
            courses: 6,
            rating: 5.0,
            socialLinks: {
                twitter: 'https://twitter.com/emilyrodriguez',
                linkedin: 'https://linkedin.com/in/emilyrodriguez',
                website: 'https://emilyrodriguez.com',
            },
        },
        {
            id: '4',
            name: 'David Park',
            title: 'DevOps Architect',
            bio: 'Kubernetes expert and cloud infrastructure specialist. Built scalable systems serving millions of users.',
            avatar: '/images/instructors/david.jpg',
            expertise: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
            students: 8500,
            courses: 5,
            rating: 4.9,
            socialLinks: {
                github: 'https://github.com/davidpark',
                linkedin: 'https://linkedin.com/in/davidpark',
            },
        },
        {
            id: '5',
            name: 'Lisa Thompson',
            title: 'Mobile Development Guru',
            bio: 'iOS and Android expert with apps downloaded over 50 million times. Former lead developer at Uber.',
            avatar: '/images/instructors/lisa.jpg',
            expertise: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
            students: 11200,
            courses: 9,
            rating: 4.9,
            socialLinks: {
                twitter: 'https://twitter.com/lisathompson',
                github: 'https://github.com/lisathompson',
            },
        },
        {
            id: '6',
            name: 'James Wilson',
            title: 'Blockchain Specialist',
            bio: 'Smart contract developer and Web3 pioneer. Building the decentralized future with Ethereum and Solidity.',
            avatar: '/images/instructors/james.jpg',
            expertise: ['Solidity', 'Ethereum', 'Web3', 'Smart Contracts'],
            students: 7300,
            courses: 4,
            rating: 4.7,
            socialLinks: {
                twitter: 'https://twitter.com/jameswilson',
                github: 'https://github.com/jameswilson',
                website: 'https://jameswilson.dev',
            },
        },
    ];

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
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-100 italic tracking-tight">
                            World-Class Instructors
                        </h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">
                            Learn from industry experts who have worked at top tech companies and are
                            passionate about sharing their knowledge with you.
                        </p>
                    </div>

                    {/* Instructors Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {instructors.map((instructor) => (
                            <InstructorCard key={instructor.id} instructor={instructor} />
                        ))}
                    </div>

                    {/* Become Instructor CTA */}
                    <div className="relative bg-slate-950 border border-slate-800 rounded-[2rem] p-12 text-center text-white overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-black mb-6 italic text-slate-100">
                                Want to Become an Instructor?
                            </h3>
                            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
                                Share your expertise with millions of students worldwide. Join our community
                                of instructors and make an impact.
                            </p>
                            <button className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/25 active:scale-95 italic">
                                Apply to Teach
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
