"use client";

import React from 'react';
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

    return (
        <div className="flex flex-col w-full h-full bg-white md:border-r border-slate-200">

            {/* Brand */}
            <div className="p-8 pb-4">
                <h1 className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <span>ArtistPaddy</span>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-4 space-y-1">
                <div className="ml-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main</div>
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm ${isActive
                                ? 'bg-slate-100 text-black font-semibold'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={18} className={`transition-colors ${isActive ? 'text-black' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 space-y-1">
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${activeTab === 'settings'
                        ? 'bg-slate-100 text-slate-900 font-medium'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                >
                    <Settings size={20} />
                    <span>{translate('Settings', 'Settings')}</span>
                </button>

                <div className="mt-4 pt-4 flex items-center gap-3 px-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                        OL
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 truncate">Olami</p>
                        <p className="text-xs text-slate-500 truncate">Artist Account</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
