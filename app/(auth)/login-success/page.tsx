"use client"

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

function LoginSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            // 1. Save token to localStorage
            localStorage.setItem("accessToken", token);

            // 2. Set credentials in Redux (user will be null, ReduxAuthProvider will fetch it via getMe)
            dispatch(setCredentials({ token, user: null as any }));

            toast.success("Login successful! Redirecting...");

            // 3. Redirect to dashboard
            const timeout = setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            toast.error("Invalid login attempt. Please try again.");
            router.push("/login");
        }
    }, [searchParams, router, dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center space-y-4">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                <h1 className="text-xl font-bold text-slate-900">Finalizing Login...</h1>
                <p className="text-slate-500">Please wait while we set up your session.</p>
            </div>
        </div>
    );
}

export default function LoginSuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
            </div>
        }>
            <LoginSuccessContent />
        </Suspense>
    );
}
