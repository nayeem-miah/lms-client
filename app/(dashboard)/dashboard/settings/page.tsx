"use client"
import { motion } from 'framer-motion'
import { Settings, User, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
    const sections = [
        { icon: User, title: 'Profile Settings', description: 'Update your personal information and profile photo.' },
        { icon: Bell, title: 'Notifications', description: 'Configure how you receive alerts and updates.' },
        { icon: Shield, title: 'Security', description: 'Manage your password and account security.' },
        { icon: Palette, title: 'Appearance', description: 'Customize the look and feel of your dashboard.' },
    ]

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
                <p className="text-slate-400">Configure your personal preferences and account settings.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition-all cursor-pointer group"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-lg bg-slate-900 group-hover:bg-cyan-500/10 text-slate-400 group-hover:text-cyan-400 transition-colors">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">{section.title}</h3>
                                <p className="text-sm text-slate-400">{section.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
