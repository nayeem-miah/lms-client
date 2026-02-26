import { Check } from 'lucide-react'

import { cn } from '../../lib/utils'
import { SubscriptionPlan } from '@/types/types'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
interface PricingCardProps {
    plan: SubscriptionPlan
    isCurrent?: boolean
}
export const PricingCard = ({ plan, isCurrent }: PricingCardProps) => {
    return (
        <Card
            className={cn(
                'relative flex flex-col h-full bg-slate-900 transition-all duration-300',
                plan.isPopular
                    ? 'border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105 z-10'
                    : 'border-slate-800 hover:border-slate-700',
            )}
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge
                    className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-none shadow-xl text-xs uppercase tracking-wide"
                >
                    Most Popular
                </Badge>
            </div>

            <CardHeader className="text-center pb-2 pt-8">
                <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-slate-100">
                        ৳{plan.price}
                    </span>
                    <span className="text-sm text-slate-400">/{plan.interval}</span>
                </div>
            </CardHeader>

            <CardContent className="flex-1 pt-6">
                <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-slate-300"
                        >
                            <div className=" rounded-full bg-cyan-500/10 p-1 text-cyan-400 mt-0.5">
                                <Check className="h-3 w-3" />
                            </div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="pt-6">
                <Button
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    className={cn(
                        "w-full transition-all",
                        plan.isPopular
                            ? "bg-cyan-600 hover:bg-cyan-500 text-white border-none shadow-lg shadow-cyan-500/20"
                            : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    )}
                    disabled={isCurrent}
                >
                    {isCurrent ? 'Current Plan' : 'Get Started'}
                </Button>
            </CardFooter>
        </Card>
    )
}
