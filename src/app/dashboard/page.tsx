"use client";

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from "../../components/LanguageContext";
import DealSimulator from "../../components/DealSimulator";
import LegalCopilot from "../../components/LegalCopilot";
import Sidebar from "../../components/Sidebar";
import { Menu, Globe, Bell, Moon, Calculator, Scale, BarChart3 } from "lucide-react";

function Dashboard() {
    const { translate, toggleLanguage, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userName, setUserName] = useState('');

    // Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUserName(data.user?.name || '');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        fetchUser();
    }, []);

    // Content Renderer
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">

                        {/* Greeting Section */}
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{translate("Dashboard", "Dashboard")}</h2>
                                <p className="text-slate-500 mt-1">{translate(`Welcome back, ${userName.split(' ')[0] || 'there'}.`, `How far, ${userName.split(' ')[0] || 'boss'}`)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleLanguage}
                                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
                                >
                                    {language === 'en' ? '🇳🇬 Pidgin' : '🇬🇧 English'}
                                </button>
                                <button
                                    onClick={() => setActiveTab('simulator')}
                                    className="bg-black text-white px-6 py-2 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-black/20"
                                >
                                    {translate("New Analysis", "Check Deal")}
                                </button>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {/* Simulator Card */}
                            <div
                                onClick={() => setActiveTab('simulator')}
                                className="group bg-emerald-50/70 hover:bg-emerald-50 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden border border-slate-200/60"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-white/80 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Tool</span>
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                        <Calculator className="text-emerald-600" size={24} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{translate("Shark Detector", "Shark Detector")}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    {translate("Analyze contract splits and debt.", "Check if deal make sense.")}
                                </p>
                                <button className="w-full py-2.5 border border-slate-300 hover:border-slate-400 bg-transparent hover:bg-white/50 text-slate-700 rounded-xl text-sm font-semibold transition-colors">
                                    {translate("Analyze Deal", "Check Deal")}
                                </button>
                            </div>

                            {/* Legal Card */}
                            <div
                                onClick={() => setActiveTab('legal')}
                                className="group bg-orange-50/70 hover:bg-orange-50 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden border border-slate-200/60"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-white/80 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">AI Chat</span>
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                        <Scale className="text-orange-600" size={24} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{translate("Legal Guard", "Legal Padi")}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    {translate("Ask questions about contracts.", "Ask about your rights.")}
                                </p>
                                <button className="w-full py-2.5 border border-slate-300 hover:border-slate-400 bg-transparent hover:bg-white/50 text-slate-700 rounded-xl text-sm font-semibold transition-colors">
                                    {translate("Ask Lawyer", "Ask Question")}
                                </button>
                            </div>

                            {/* Stats Card */}
                            <div
                                className="bg-amber-50/70 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden border border-slate-200/60"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-white/80 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Stats</span>
                                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <BarChart3 className="text-amber-600" size={24} />
                                    </div>
                                </div>
                                <h4 className="font-bold text-lg text-slate-900 mb-4">Quick Stats</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-600">Deals Checked</span>
                                        <span className="font-mono font-bold text-slate-900">12</span>
                                    </div>
                                    <div className="w-full bg-white/60 h-2 rounded-full overflow-hidden">
                                        <div className="bg-amber-400 w-[60%] h-full rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-600">Risk Averted</span>
                                        <span className="font-mono font-bold text-emerald-600">High</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                );

            case 'simulator':
                return (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">
                                {translate("Deal Simulator", "Shark Detector")}
                            </h2>
                            <p className="text-slate-500">
                                {translate("Visualize the financial outcome of your contract.", "See clean clear how the money go share.")}
                            </p>
                        </div>
                        <DealSimulator />
                    </div>
                );

            case 'legal':
                return (
                    <div className="animate-in slide-in-from-bottom-4 duration-500 h-full">
                        <LegalCopilot />
                    </div>
                );

            case 'education':
                return (
                    <div className="max-w-4xl animate-in fade-in duration-500 space-y-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">
                                {translate("Education Center", "Learn the Work")}
                            </h2>
                            <p className="text-slate-500">
                                {translate("Articles and guides to help you navigate the music business.", "Read updates make dem no ripper you.")}
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { title: "Understanding 360 Deals", desc: "Why labels want a piece of everything you earn.", tag: "Contracts", color: "bg-purple-100 text-purple-700" },
                                { title: "What is an Advance?", desc: "It's not free money. Learn how recoupment works.", tag: "Finance", color: "bg-emerald-100 text-emerald-700" },
                                { title: "Masters vs Publishing", desc: "The difference between owning the song and the recording.", tag: "Rights", color: "bg-amber-100 text-amber-700" },
                                { title: "Music Distribution 101", desc: "How to get your music on Spotify and Apple Music.", tag: "Distribution", color: "bg-blue-100 text-blue-700" },
                            ].map((article, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${article.color}`}>
                                            {article.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">{article.title}</h3>
                                    <p className="text-sm text-slate-500">{article.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="max-w-2xl animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            {translate("Settings", "Settings")}
                        </h2>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-100 rounded-lg">
                                        <Globe size={20} className="text-slate-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{translate("Language", "Language")}</h3>
                                        <p className="text-xs text-slate-500">{translate("Toggle between English and Nigerian Pidgin", "Change between English and Pidgin")}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleLanguage}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors"
                                >
                                    {language === 'en' ? 'English' : 'Pidgin'}
                                </button>
                            </div>

                        </div>
                    </div>
                );

            default:
                return <div>Not found</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-500 selection:text-white">

            {/* Sidebar (Desktop) */}
            <div className="hidden md:block w-64 h-screen sticky top-0">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
                    <span className="font-bold text-lg">Artist<span className="text-brand-600">Paddy</span></span>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
                        <Menu />
                    </button>
                </header>

                {/* Mobile Sidebar Overlay (Simplified) */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
                        <div className="w-64 h-full bg-white p-4" onClick={(e) => e.stopPropagation()}>
                            <Sidebar activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setMobileMenuOpen(false); }} />
                        </div>
                    </div>
                )}

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
                    <div className="max-w-6xl mx-auto">
                        {renderContent()}
                    </div>
                </div>

            </main>

        </div>
    );
}

export default function DashboardPage() {
    return (
        <LanguageProvider>
            <Dashboard />
        </LanguageProvider>
    );
}
