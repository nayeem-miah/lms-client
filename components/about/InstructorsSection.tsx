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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                Meet Our Team
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            World-Class Instructors
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Learn from industry experts who have worked at top tech companies and are
                            passionate about sharing their knowledge with you.
                        </p>
                    </div>

                    {/* Instructors Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {instructors.map((instructor) => (
                            <InstructorCard key={instructor.id} instructor={instructor} />
                        ))}
                    </div>

                    {/* Become Instructor CTA */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">
                            Want to Become an Instructor?
                        </h3>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Share your expertise with millions of students worldwide. Join our community
                            of instructors and make an impact.
                        </p>
                        <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Apply to Teach
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
