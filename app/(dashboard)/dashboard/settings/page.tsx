"use client"

import { motion } from 'framer-motion'
import {
    Settings as SettingsIcon,
    Bell,
    Lock,
    User,
    Globe,
    Shield,
    Database,
    Palette,
    Save
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general')

    const tabs = [
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'profile', label: 'Account Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'advanced', label: 'Advanced System', icon: Database },
    ]

    return (
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Platform Settings</h1>
                <p className="text-slate-400">Manage global configurations and account preferences.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all duration-300 font-medium ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
                >
                    {activeTab === 'general' && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-slate-100 flex items-center">
                                <Globe className="w-6 h-6 mr-3 text-cyan-400" />
                                General Configuration
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Platform Name</label>
                                    <input
                                        type="text"
                                        defaultValue="EduLearn LMS"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Contact Email</label>
                                    <input
                                        type="email"
                                        defaultValue="support@edulearn.com"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                                    <div>
                                        <p className="font-bold text-slate-100 italic">Maintenance Mode</p>
                                        <p className="text-sm text-slate-500">Temporarily disable student access to the platform.</p>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-700 flex justify-end">
                                <button
                                    onClick={() => toast.success('Settings saved!')}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>Save Global Changes</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8 text-center py-20">
                            <Shield className="w-16 h-16 text-amber-500 mx-auto opacity-20 mb-4" />
                            <h2 className="text-2xl font-bold text-slate-100">Security Parameters</h2>
                            <p className="text-slate-500 max-w-sm mx-auto italic">Advanced security and encryption protocols are currently managed by the root administrator.</p>
                        </div>
                    )}

                    {activeTab !== 'general' && activeTab !== 'security' && (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Palette className="w-12 h-12 text-slate-700 animate-pulse" />
                            <p className="text-slate-600 font-medium italic">Settings module under development...</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
