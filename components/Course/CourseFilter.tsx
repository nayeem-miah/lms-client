import { Search, SlidersHorizontal, X } from 'lucide-react'
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

    const categories = [
        { value: '', label: 'All Categories' },
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Mobile Development', label: 'Mobile Development' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Machine Learning', label: 'Machine Learning' },
        { value: 'UI/UX Design', label: 'UI/UX Design' },
        { value: 'Digital Marketing', label: 'Digital Marketing' },
        { value: 'Business', label: 'Business' },
    ]

    const sortOptions = [
        { value: '-createdAt', label: 'Newest First' },
        { value: '-totalEnrollments', label: 'Most Popular' },
        { value: 'price', label: 'Price: Low to High' },
        { value: '-price', label: 'Price: High to Low' },
    ]

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
                {/* Search */}
                <div className="lg:col-span-5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block ml-1">Search Courses</label>
                    <Input
                        placeholder="What do you want to learn?"
                        icon={<Search className="h-4 w-4 text-slate-400" />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-blue-500/20"
                    />
                </div>

                {/* Category */}
                <div className="lg:col-span-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block ml-1">Category</label>
                    <Select
                        options={categories}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-blue-500/20"
                    />
                </div>

                {/* Sort */}
                <div className="lg:col-span-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block ml-1">Sort By</label>
                    <Select
                        options={sortOptions}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-blue-500/20"
                    />
                </div>

                {/* Reset Button */}
                <div className="lg:col-span-1">
                    <Button
                        variant="outline"
                        className="w-full h-12 border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-xl transition-all duration-300"
                        onClick={onReset}
                        title="Reset Filters"
                    >
                        <X className="h-5 w-5" />
                        <span className="lg:hidden ml-2 font-medium">Reset Filters</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
