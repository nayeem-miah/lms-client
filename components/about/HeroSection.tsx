/* eslint-disable react/no-unescaped-entities */
export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-block">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            About LearnCourse
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Empowering Learners Worldwide
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                        We're on a mission to make quality education accessible to everyone, everywhere.
                        Join thousands of students learning from world-class instructors.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4">
                            <div className="text-3xl font-bold">50K+</div>
                            <div className="text-sm text-blue-100">Active Students</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4">
                            <div className="text-3xl font-bold">500+</div>
                            <div className="text-sm text-blue-100">Expert Instructors</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4">
                            <div className="text-3xl font-bold">1000+</div>
                            <div className="text-sm text-blue-100">Quality Courses</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}