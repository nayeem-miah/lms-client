
import { BookOpen, ExternalLink, Github, Linkedin, Star, Twitter, Users } from 'lucide-react';
import { Instructor } from './About';
import { Badge } from '../ui/Badge';

interface InstructorCardProps {
    instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Instructor Image */}
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-5xl font-bold">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {instructor.socialLinks?.twitter && (
                        <a
                            href={instructor.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
                        >
                            <Twitter size={20} />
                        </a>
                    )}
                    {instructor.socialLinks?.linkedin && (
                        <a
                            href={instructor.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                    )}
                    {instructor.socialLinks?.github && (
                        <a
                            href={instructor.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            <Github size={20} />
                        </a>
                    )}
                    {instructor.socialLinks?.website && (
                        <a
                            href={instructor.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            {/* Instructor Info */}
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{instructor.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{instructor.title}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{instructor.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{instructor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{(instructor.students / 1000).toFixed(1)}K students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{instructor.courses} courses</span>
                    </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                    {instructor.expertise.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}