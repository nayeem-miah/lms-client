"use client"

import { useState } from 'react'
import { Search, X, SlidersHorizontal, ChevronDown, Sparkles, Code2, Smartphone, BarChart3, Brain, Palette, Megaphone, Briefcase, Globe, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

interface CourseFilterProps {
    searchTerm: string
    setSearchTerm: (val: string) => void
    category: string
    setCategory: (val: string) => void
    sortBy: string
    setSortBy: (val: string) => void
    onReset: () => void
}

const categoryConfig = [
    { value: '', label: 'All', icon: <Globe className="h-3.5 w-3.5" />, color: 'from-slate-600 to-slate-700' },
    { value: 'Web Development', label: 'Web Dev', icon: <Code2 className="h-3.5 w-3.5" />, color: 'from-cyan-600 to-blue-600' },
    { value: 'Mobile Development', label: 'Mobile', icon: <Smartphone className="h-3.5 w-3.5" />, color: 'from-emerald-600 to-teal-600' },
    { value: 'Data Science', label: 'Data Sci', icon: <BarChart3 className="h-3.5 w-3.5" />, color: 'from-amber-600 to-orange-600' },
    { value: 'Machine Learning', label: 'ML / AI', icon: <Brain className="h-3.5 w-3.5" />, color: 'from-violet-600 to-purple-600' },
    { value: 'UI/UX Design', label: 'UI/UX', icon: <Palette className="h-3.5 w-3.5" />, color: 'from-pink-600 to-rose-600' },
    { value: 'Digital Marketing', label: 'Marketing', icon: <Megaphone className="h-3.5 w-3.5" />, color: 'from-orange-600 to-red-600' },
    { value: 'Business', label: 'Business', icon: <Briefcase className="h-3.5 w-3.5" />, color: 'from-slate-500 to-slate-600' },
]

export const CourseFilter = ({
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    onReset
}: CourseFilterProps) => {
    const t = useTranslations('CourseFilter')
    const [showAdvanced, setShowAdvanced] = useState(false)

    const sortOptions = [
        { value: '-createdAt', label: t('sortOptions.newest') },
        { value: '-totalEnrollments', label: t('sortOptions.popular') },
        { value: 'price', label: t('sortOptions.priceLow') },
        { value: '-price', label: t('sortOptions.priceHigh') },
        { value: '-ratingAvg', label: 'Highest Rated' },
    ]

    const hasActiveFilters = searchTerm || category || sortBy

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
        >
            {/* Main Filter Card */}
            <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-slate-800/60 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-1/4 w-64 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-violet-500/5 blur-3xl pointer-events-none" />

                <div className="relative z-10 p-6">
                    {/* Search Bar Row */}
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="flex-1 relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                                <Search className="h-4.5 w-4.5" />
                            </div>
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 bg-slate-800/60 border border-slate-700/50 rounded-2xl pl-11 pr-10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/10 focus:bg-slate-800/80 transition-all duration-200"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Sort Select */}
                        <div className="relative hidden sm:block w-46">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full h-12 bg-slate-800/60 border border-slate-700/50 rounded-2xl pl-4 pr-9 text-sm text-slate-300 focus:outline-none focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10 appearance-none cursor-pointer transition-all hover:border-slate-600"
                            >
                                <option value="" className="bg-slate-900">Sort By</option>
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                        </div>

                        {/* Advanced Toggle */}
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={`h-12 px-4 flex items-center gap-2 rounded-2xl border text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                                showAdvanced || category
                                    ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                                    : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'
                            }`}
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:block">Filter</span>
                            {category && (
                                <span className="h-2 w-2 rounded-full bg-violet-400" />
                            )}
                        </button>

                        {/* Reset Button - shown when filters are active */}
                        <AnimatePresence>
                            {hasActiveFilters && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={onReset}
                                    className="h-12 px-4 flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-semibold hover:bg-rose-500/20 transition-all flex-shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                    <span className="hidden sm:block">Clear</span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Category Chips Row */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {categoryConfig.map((cat) => {
                            const isSelected = category === cat.value
                            return (
                                <button
                                    key={cat.value}
                                    onClick={() => setCategory(isSelected ? '' : cat.value)}
                                    className={`flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                                        isSelected
                                            ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                                            : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white hover:bg-slate-800'
                                    }`}
                                >
                                    <span className={isSelected ? 'text-white/90' : 'text-slate-500'}>{cat.icon}</span>
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Advanced Filters */}
                    <AnimatePresence>
                        {showAdvanced && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 pt-4 border-t border-slate-800/60">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Level Filter */}
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                                                Level
                                            </label>
                                            <div className="flex gap-2 flex-wrap">
                                                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                                                    <button
                                                        key={lvl}
                                                        className="h-8 px-3 rounded-xl text-xs font-semibold bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
                                                    >
                                                        {lvl}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sort (mobile) */}
                                        <div className="sm:hidden">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                                                Sort By
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={sortBy}
                                                    onChange={(e) => setSortBy(e.target.value)}
                                                    className="w-full h-10 bg-slate-800/60 border border-slate-700/50 rounded-xl pl-3 pr-8 text-sm text-slate-300 focus:outline-none focus:border-violet-500/40 appearance-none cursor-pointer transition-all"
                                                >
                                                    <option value="" className="bg-slate-900">Default</option>
                                                    {sortOptions.map(opt => (
                                                        <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Rating Filter */}
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                                                Min Rating
                                            </label>
                                            <div className="flex gap-2">
                                                {[4.5, 4.0, 3.5].map((r) => (
                                                    <button
                                                        key={r}
                                                        className="flex items-center gap-1 h-8 px-3 rounded-xl text-xs font-semibold bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:border-amber-500/30 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
                                                    >
                                                        <Star className="h-3 w-3 fill-current" />
                                                        {r}+
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Active Filters Tag */}
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-slate-800/60 px-6 py-3 flex items-center gap-3 flex-wrap bg-slate-950/20"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex-shrink-0">Active:</span>
                            {searchTerm && (
                                <span className="flex items-center gap-1.5 h-6 px-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs font-semibold text-cyan-400">
                                    &quot;{searchTerm}&quot;
                                    <button onClick={() => setSearchTerm('')}><X className="h-3 w-3" /></button>
                                </span>
                            )}
                            {category && (
                                <span className="flex items-center gap-1.5 h-6 px-2.5 bg-violet-500/10 border border-violet-500/20 rounded-lg text-xs font-semibold text-violet-400">
                                    {categoryConfig.find(c => c.value === category)?.label}
                                    <button onClick={() => setCategory('')}><X className="h-3 w-3" /></button>
                                </span>
                            )}
                            {sortBy && (
                                <span className="flex items-center gap-1.5 h-6 px-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-semibold text-amber-400">
                                    {sortOptions.find(s => s.value === sortBy)?.label}
                                    <button onClick={() => setSortBy('')}><X className="h-3 w-3" /></button>
                                </span>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
