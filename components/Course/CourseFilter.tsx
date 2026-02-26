import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

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
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
                {/* Search */}
                <div className="lg:col-span-5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">{t('searchLabel')}</label>
                    <Input
                        placeholder={t('searchPlaceholder')}
                        icon={<Search className="h-4 w-4 text-slate-500" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-800 border-slate-700 h-12 rounded-xl focus:ring-cyan-500/20"
                    />
                </div>

                {/* Category */}
                <div className="lg:col-span-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">{t('categoryLabel')}</label>
                    <Select
                        options={categories}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-slate-800 border-slate-700 h-12 rounded-xl focus:ring-cyan-500/20"
                    />
                </div>

                {/* Sort */}
                <div className="lg:col-span-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">{t('sortLabel')}</label>
                    <Select
                        options={sortOptions}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-800 border-slate-700 h-12 rounded-xl focus:ring-cyan-500/20"
                    />
                </div>

                {/* Reset Button */}
                <div className="lg:col-span-1">
                    <Button
                        variant="ghost"
                        className="w-full h-12 border border-slate-700 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 rounded-xl transition-all duration-300"
                        onClick={onReset}
                        title={t('resetFilters')}
                    >
                        <X className="h-5 w-5" />
                        <span className="lg:hidden ml-2 font-medium">{t('resetFilters')}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
