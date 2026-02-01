"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetCourseByIdQuery } from "@/lib/redux/features/courses/coursesApi";
import { useCreatePaymentIntentMutation } from "@/lib/redux/features/payments/paymentsApi";
import { useCreateEnrollmentMutation } from "@/lib/redux/features/enrollments/enrollmentsApi";
import { Button } from "@/components/ui/Button";
import { Loader2, CreditCard, ShieldCheck, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseId = searchParams.get("courseId");

    const { data: course, isLoading: isCourseLoading } = useGetCourseByIdQuery(courseId as string, { skip: !courseId });
    const [createPaymentIntent, { isLoading: isCreatingIntent }] = useCreatePaymentIntentMutation();
    const [createEnrollment] = useCreateEnrollmentMutation();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements || !courseId) return;

        try {
            setLoading(true);
            setMessage("");

            // 1️⃣ Create payment intent using mutation
            const intentResponse = await createPaymentIntent({ courseId }).unwrap();
            const clientSecret = intentResponse.data.clientSecret;

            // 2️⃣ Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                toast.error(result.error.message || "Payment failed");
                setMessage(result.error.message || "❌ Payment failed");
            } else if (result.paymentIntent?.status === "succeeded") {
                toast.success("Payment successful! Enrolling you now...");

                // 3️⃣ Enroll user after success
                await createEnrollment({
                    courseId,
                    paymentId: result.paymentIntent.id,
                    transactionId: result.paymentIntent.id
                }).unwrap();

                toast.success("Enrolled successfully!");
                setTimeout(() => router.push("/dashboard/my-courses"), 2000);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Something went wrong during checkout");
            setMessage("❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (isCourseLoading) return (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
            <p className="text-slate-500 font-medium">Preparing secure checkout...</p>
        </div>
    );

    if (!course) return (
        <div className="text-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Lock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Invalid Checkout</h3>
            <p className="text-slate-500 mt-2">We couldn't find the course you're looking for.</p>
            <Button variant="outline" className="mt-6" onClick={() => router.push("/courses")}>Back to Courses</Button>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 px-8 py-10 text-white">
                    <h2 className="text-2xl font-bold mb-2">Secure Checkout</h2>
                    <p className="text-slate-400 text-sm">Complete your purchase for</p>
                    <p className="text-emerald-400 font-semibold mt-1">{course.title}</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Order Summary */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <span className="text-slate-600">Course Price</span>
                            <span className="font-bold text-slate-900">৳{course.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                            <span>Total Amount</span>
                            <span className="text-primary-600">৳{course.price}</span>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700 block uppercase tracking-wider">Card Details</label>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 transition-all focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20">
                                <CardElement options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#1e293b',
                                            '::placeholder': { color: '#94a3b8' },
                                        },
                                        invalid: { color: '#ef4444' },
                                    }
                                }} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-white bg-slate-900 hover:bg-slate-800 rounded-2xl font-bold text-lg transition-all"
                            disabled={!stripe || loading || isCreatingIntent}
                            isLoading={loading || isCreatingIntent}
                            leftIcon={!loading && <CreditCard className="w-5 h-5" />}
                        >
                            {loading ? "Processing Payment..." : `Pay ৳${course.price}`}
                        </Button>
                    </form>

                    {/* Trust Badges */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-400 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs font-medium">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>SSL SECURE PAYMENT</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium">
                            <Lock className="w-4 h-4" />
                            <span>ENCRYPTED TRANSACTIONS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
