"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Calculator, Scale, Settings, LogOut, ShieldCheck, BookOpen } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const { translate } = useLanguage();

    const menuItems = [
        { id: 'dashboard', label: translate('Dashboard', 'Dashboard'), icon: LayoutDashboard },
        { id: 'simulator', label: translate('Shark Detector', 'Shark Detector'), icon: Calculator },
        { id: 'legal', label: translate('Legal Guard', 'Legal Padi'), icon: Scale },
        { id: 'education', label: translate('Education', 'Learn Work'), icon: BookOpen },
    ];

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userName, setUserName] = useState('');

    // Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUserName(data.user?.name || 'Artist');
                } else {
                    setUserName('Artist');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUserName('Artist');
            }
        };
        fetchUser();
    }, []);

    // Get initials from name
    const getInitials = (name: string) => {
        if (!name) return '??';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <>
            <div className="flex flex-col w-full h-full bg-white md:border-r border-slate-200 overflow-hidden">

                {/* Brand */}
                <div className="p-8 pb-4 shrink-0">
                    <Link href="/dashboard" className="font-bold text-2xl tracking-tight text-slate-900 flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                        <span>ArtistPaddy</span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    <div className="ml-4 mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Main</div>
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group text-base ${isActive
                                    ? 'bg-slate-100 text-black font-semibold'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon size={22} className={`transition-colors ${isActive ? 'text-black' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-100 space-y-2 shrink-0">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-base ${activeTab === 'settings'
                            ? 'bg-slate-100 text-slate-900 font-medium'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <Settings size={22} />
                        <span>{translate('Settings', 'Settings')}</span>
                    </button>

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-base text-slate-500 hover:bg-red-50 hover:text-fintech-danger"
                    >
                        <LogOut size={22} />
                        <span>{translate('Logout', 'Log Out')}</span>
                    </button>

                    <div className="mt-4 pt-4 flex items-center gap-4 px-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-base">
                            {getInitials(userName)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-base font-bold text-slate-900 truncate">{userName.split(' ')[0] || 'Loading...'}</p>
                            <p className="text-sm text-slate-500 truncate">Artist Account</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                                <LogOut size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Log out?</h3>
                            <p className="text-sm text-slate-500">
                                Are you sure you want to sign out of your account?
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await fetch('/api/auth/logout', { method: 'POST' });
                                    window.location.href = '/';
                                }}
                                className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-center"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
