
import { BookOpen, ExternalLink, Github, Linkedin, Star, Twitter, Users } from 'lucide-react';
import { Instructor } from './About';
import { Badge } from '../ui/Badge';

interface InstructorCardProps {
    instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
    return (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden group">
            {/* Instructor Image */}
            <div className="relative h-72 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black italic shadow-2xl shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-500">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex items-center justify-center gap-4">
                    {instructor.socialLinks?.twitter && (
                        <a
                            href={instructor.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
                        >
                            <Twitter size={22} />
                        </a>
                    )}
                    {instructor.socialLinks?.linkedin && (
                        <a
                            href={instructor.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                        >
                            <Linkedin size={22} />
                        </a>
                    )}
                    {instructor.socialLinks?.github && (
                        <a
                            href={instructor.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-slate-900 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-300"
                        >
                            <Github size={22} />
                        </a>
                    )}
                </div>
            </div>

            {/* Instructor Info */}
            <div className="p-8">
                <h3 className="text-2xl font-black text-slate-100 mb-1 italic tracking-tight group-hover:text-cyan-400 transition-colors">{instructor.name}</h3>
                <p className="text-cyan-500 font-bold text-sm uppercase tracking-widest mb-4 italic">{instructor.title}</p>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 font-medium leading-relaxed">{instructor.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                        <span className="text-slate-200">{instructor.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-200">{(instructor.students / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-200">{instructor.courses}</span>
                    </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                    {instructor.expertise.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-900 text-slate-400 border-slate-800 text-[10px] uppercase font-black tracking-tighter px-2 py-0.5">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}