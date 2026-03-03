import { Search, SlidersHorizontal, X, Filter, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { motion } from 'framer-motion'

interface CourseFilterProps {
    searchTerm: string
    setSearchTerm: (val: string) => void
    category: string
    setCategory: (val: string) => void
    sortBy: string
    setSortBy: (val: string) => void
    onReset: () => void
}

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

    const categories = [
        { value: '', label: t('categories.all') },
        { value: 'Web Development', label: t('categories.web') },
        { value: 'Mobile Development', label: t('categories.mobile') },
        { value: 'Data Science', label: t('categories.dataScience') },
        { value: 'Machine Learning', label: t('categories.ml') },
        { value: 'UI/UX Design', label: t('categories.uiux') },
        { value: 'Digital Marketing', label: t('categories.marketing') },
        { value: 'Business', label: t('categories.business') },
    ]

    const sortOptions = [
        { value: '-createdAt', label: t('sortOptions.newest') },
        { value: '-totalEnrollments', label: t('sortOptions.popular') },
        { value: 'price', label: t('sortOptions.priceLow') },
        { value: '-price', label: t('sortOptions.priceHigh') },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-800/50 p-8 shadow-2xl mb-16 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row gap-8 items-end relative z-10">
                {/* Search */}
                <div className="flex-1 w-full group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4 italic group-hover:text-cyan-400 transition-colors">
                        {t('searchLabel')}
                    </label>
                    <div className="relative">
                        <Input
                            placeholder={t('searchPlaceholder')}
                            icon={<Search className="h-4 w-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors" />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-950/50 border-slate-800/50 h-16 rounded-[1.25rem] focus:ring-cyan-500/20 px-14 text-slate-100 font-medium placeholder:text-slate-600 border-2 focus:border-cyan-500/30 transition-all"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="w-full lg:w-64 group/select">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4 italic group-hover/select:text-purple-400 transition-colors">
                        {t('categoryLabel')}
                    </label>
                    <div className="relative">
                        <Select
                            options={categories}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-slate-950/50 border-slate-800/50 h-16 rounded-[1.25rem] focus:ring-purple-500/20 text-slate-100 font-medium border-2 focus:border-purple-500/30 appearance-none transition-all cursor-pointer"
                        />
                    </div>
                </div>

                {/* Sort */}
                <div className="w-full lg:w-64 group/select">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-4 italic group-hover/select:text-amber-400 transition-colors">
                        {t('sortLabel')}
                    </label>
                    <div className="relative">
                        <Select
                            options={sortOptions}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-950/50 border-slate-800/50 h-16 rounded-[1.25rem] focus:ring-amber-500/20 text-slate-100 font-medium border-2 focus:border-amber-500/30 appearance-none transition-all cursor-pointer"
                        />
                    </div>
                </div>

                {/* Reset Button */}
                <div className="w-full lg:w-auto">
                    <Button
                        variant="ghost"
                        className="w-full lg:w-16 h-16 bg-slate-950/50 border-2 border-slate-800/50 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/50 rounded-[1.25rem] transition-all duration-300 group/reset active:scale-95 flex items-center justify-center shadow-lg hover:shadow-rose-500/10"
                        onClick={onReset}
                        title={t('resetFilters')}
                    >
                        <X className="h-6 w-6 group-hover/reset:rotate-90 transition-transform duration-500" />
                        <span className="lg:hidden ml-3 font-black uppercase italic tracking-widest text-xs">{t('resetFilters')}</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
