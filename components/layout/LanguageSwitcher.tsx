"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = (newLocale: "en" | "bn") => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    const languages = [
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "bn", label: "বাংলা", flag: "🇧🇩" },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
                <Languages className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => toggleLanguage(lang.code as "en" | "bn")}
                                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${locale === lang.code
                                        ? "bg-primary-50 text-primary-600"
                                        : "text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                <span>{lang.flag}</span>
                                {lang.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
