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
    Save,
    Camera,
    Mail,
    Edit3,
    CheckCircle2,
    ShieldAlert
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { useUpdateProfileMutation } from '@/lib/redux/features/users/usersApi'
import { useChangePasswordMutation } from '@/lib/redux/features/auth/authApi'
import { Avatar } from '@/components/ui/Avater'

export default function SettingsPage() {
    const user = useAppSelector(selectCurrentUser)
    const [activeTab, setActiveTab] = useState('profile')
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation()
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation()

    // Form states for Profile
    const [profileName, setProfileName] = useState(user?.name || '')
    const [profileBio, setProfileBio] = useState(user?.bio || '')

    // Form states for Password
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateProfile({ name: profileName }).unwrap()
            toast.success('Profile updated successfully!')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update profile')
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match')
        }
        try {
            await changePassword({ oldPassword, newPassword }).unwrap()
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
            toast.success('Password changed successfully!')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to change password')
        }
    }

    const tabs = [
        { id: 'profile', label: 'Account Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        ...(user?.role === 'ADMIN' ? [{ id: 'general', label: 'General Configuration', icon: Globe }] : []),
        { id: 'advanced', label: 'Advanced', icon: Database },
    ]

    return (
        <div className="space-y-8 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-slate-100 mb-2 uppercase tracking-tight">Settings</h1>
                <p className="text-slate-400 font-medium tracking-wide">Customize your experience and manage your account security.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:w-72 space-y-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-[2rem] transition-all duration-300 group border ${activeTab === tab.id
                                ? 'bg-cyan-500 border-cyan-400 text-slate-900 shadow-2xl shadow-cyan-500/20'
                                : 'text-slate-400 hover:bg-slate-800 border-transparent hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-600 group-hover:text-cyan-400 transition-colors'}`} />
                                <span className="font-black text-xs uppercase tracking-widest">{tab.label}</span>
                            </div>
                            {activeTab === tab.id && <motion.div layoutId="activeTabIndicator" className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32" />

                    {activeTab === 'profile' && (
                        <form onSubmit={handleUpdateProfile} className="space-y-10">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="relative group">
                                    <Avatar
                                        src={user?.profilePhoto}
                                        alt={user?.name}
                                        size="xl"
                                        className="h-32 w-32 ring-4 ring-cyan-500/20 border-4 border-slate-900"
                                    />
                                    <button className="absolute bottom-0 right-0 p-3 bg-cyan-500 rounded-2xl text-slate-900 shadow-xl hover:scale-110 transition-all border-4 border-slate-800">
                                        <Camera className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-100 mb-1">{user?.name}</h3>
                                    <p className="text-sm font-medium text-slate-500 flex items-center justify-center md:justify-start gap-2">
                                        <Mail className="w-4 h-4" /> {user?.email}
                                    </p>
                                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                        <span className="py-1 px-3 bg-slate-700/50 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest border border-white/5">Role: {user?.role}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <User className="w-3 h-3" /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profileName}
                                        onChange={(e) => setProfileName(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-bold focus:outline-none focus:border-cyan-500/50 transition-all"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Edit3 className="w-3 h-3" /> Bio / Headline
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={profileBio}
                                        onChange={(e) => setProfileBio(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-medium focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                                        placeholder="Write something about yourself..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-5">
                                <button
                                    type="submit"
                                    disabled={isUpdatingProfile}
                                    className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-cyan-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                                >
                                    {isUpdatingProfile ? <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent animate-spin rounded-full" /> : <Save className="w-4 h-4" />}
                                    <span>Update Details</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'security' && (
                        <form onSubmit={handleChangePassword} className="space-y-10">
                            <div className="flex items-center gap-4 mb-8">
                                <Shield className="w-10 h-10 text-amber-500" />
                                <div>
                                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight">Security & Privacy</h2>
                                    <p className="text-xs font-bold text-slate-500">Protect your account with a strong password.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Password</label>
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50 transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Min. 8 characters"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Match passwords"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-5">
                                <button
                                    type="submit"
                                    disabled={isChangingPassword}
                                    className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                                >
                                    {isChangingPassword ? <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent animate-spin rounded-full" /> : <Lock className="w-4 h-4" />}
                                    <span>Reset Password</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'general' && user?.role === 'ADMIN' && (
                        <div className="space-y-10">
                            <h2 className="text-2xl font-black text-slate-100 flex items-center uppercase tracking-tight">
                                <Globe className="w-8 h-8 mr-4 text-cyan-400" />
                                Platform Configuration
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Name</label>
                                    <input
                                        type="text"
                                        defaultValue="EduLearn LMS Pro"
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-bold focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Root Contact Email</label>
                                    <input
                                        type="email"
                                        defaultValue="admin@edulearn.pro"
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 py-4 text-slate-100 font-bold focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-8 bg-slate-900/50 rounded-[2rem] border border-slate-700/40">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-red-500/10 rounded-2xl">
                                            <ShieldAlert className="w-8 h-8 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-100 uppercase text-sm tracking-tight leading-none mb-1">Global Maintenance Mode</p>
                                            <p className="text-xs font-bold text-slate-500">Enable to lock the platform for all non-admin users.</p>
                                        </div>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500 ring-4 ring-transparent peer-checked:ring-red-500/20"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 flex justify-end">
                                <button className="flex items-center gap-3 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                                    <Save className="w-4 h-4" />
                                    <span>Sync Global Settings</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Bell className="w-20 h-20 text-slate-800 animate-bounce" />
                            <h3 className="text-xl font-black text-slate-500 uppercase italic">Notification Preferences</h3>
                            <p className="text-slate-600 font-bold">You will receive all essential alerts via email. Customizable preferences launching soon.</p>
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Database className="w-20 h-20 text-slate-800 opacity-50" />
                            <h3 className="text-xl font-black text-slate-500 uppercase tracking-tighter">System Console</h3>
                            <p className="text-slate-600 font-bold text-center max-w-xs italic">Server-side logs and database triggers are optimized for your region.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
