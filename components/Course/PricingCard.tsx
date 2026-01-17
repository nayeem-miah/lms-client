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
                'relative flex flex-col h-full',
                plan.isPopular
                    ? 'border-primary-500 shadow-lg scale-105 z-10'
                    : 'border-slate-200',
            )}
        >
            {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                        variant="accent"
                        className="px-3 py-1 pt-4 text-xs uppercase tracking-wide"
                    >
                        Most Popular
                    </Badge>
                </div>
            )}

            <CardHeader className="text-center pb-2">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-slate-900">
                        ${plan.price}
                    </span>
                    <span className="text-sm text-slate-500">/{plan.interval}</span>
                </div>
            </CardHeader>

            <CardContent className="flex-1 pt-6">
                <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-slate-600"
                        >
                            <div className=" rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
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
                    className="w-full text-black hover:bg-slate-100"
                    disabled={isCurrent}
                >
                    {isCurrent ? 'Current Plan' : 'Get Started'}
                </Button>
            </CardFooter>
        </Card>
    )
}
