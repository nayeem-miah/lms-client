"use client"

import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/types/types";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                router.push(`/login?redirect=${pathname}`);
            } else if (allowedRoles && user && !allowedRoles.includes(user.role as UserRole)) {
                // Redirect to unauthorized or home if role not allowed
                router.push("/dashboard"); // Or a specific /unauthorized page
            }
        }
    }, [isAuthenticated, isLoading, user, allowedRoles, router, pathname]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                    <p className="text-slate-500 font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role as UserRole)) {
        return null;
    }

    return <>{children}</>;
}
