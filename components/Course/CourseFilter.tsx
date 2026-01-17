import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export const CourseFilter = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Search */}
                <div className="md:col-span-5">
                    <Input
                        placeholder="Search courses..."
                        icon={<Search className="h-4 w-4" />}
                        className="bg-slate-50"
                    />
                </div>

                {/* Category */}
                <div className="md:col-span-3">
                    <Select
                        options={[
                            {
                                value: 'all',
                                label: 'All Categories',
                            },
                            {
                                value: 'development',
                                label: 'Development',
                            },
                            {
                                value: 'design',
                                label: 'Design',
                            },
                            {
                                value: 'business',
                                label: 'Business',
                            },
                            {
                                value: 'marketing',
                                label: 'Marketing',
                            },
                        ]}
                        className="bg-slate-50"
                    />
                </div>

                {/* Sort */}
                <div className="md:col-span-3">
                    <Select
                        options={[
                            {
                                value: 'popular',
                                label: 'Most Popular',
                            },
                            {
                                value: 'newest',
                                label: 'Newest',
                            },
                            {
                                value: 'price-low',
                                label: 'Price: Low to High',
                            },
                            {
                                value: 'price-high',
                                label: 'Price: High to Low',
                            },
                        ]}
                        className="bg-slate-50"
                    />
                </div>

                {/* Filter Button (Mobile/Tablet) */}
                <div className="md:col-span-1">
                    <Button
                        variant="outline"
                        className="w-full"
                    // icon={<SlidersHorizontal className="h-4 w-4" />}
                    >
                        <SlidersHorizontal className="h-4 w-4 md:hidden" />
                        <span className="hidden md:inline">Filters</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
