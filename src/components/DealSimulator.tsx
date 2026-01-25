"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, Music, Info, TrendingUp, DollarSign } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function DealSimulator() {
    const { translate } = useLanguage();

    // Inputs
    const [advance, setAdvance] = useState<number>(5000000); // 5M Naira default
    const [marketing, setMarketing] = useState<number>(2000000); // 2M Naira default
    const [royaltySplit, setRoyaltySplit] = useState<number>(20); // 20% Artist Share
    const [estimatedStreams, setEstimatedStreams] = useState<number>(100000); // Monthly streams
    const [isMarketingRecoupable, setIsMarketingRecoupable] = useState<boolean>(true);

    // Constants
    const [streamRegion, setStreamRegion] = useState<'NG' | 'INTL'>('NG');

    // Constants
    const STREAM_RATE = streamRegion === 'NG' ? 4.5 : 18.0; // 4.5 Naira Local, 18.0 Naira International

    // Calculations
    const totalDebt = advance + (isMarketingRecoupable ? marketing : 0);
    const grossRevenueNeeded = totalDebt / (royaltySplit / 100);
    const streamsNeeded = grossRevenueNeeded / STREAM_RATE;
    const monthlyRevenue = estimatedStreams * STREAM_RATE;
    const artistMonthlyShare = monthlyRevenue * (royaltySplit / 100);
    const monthsToRecoup = artistMonthlyShare > 0 ? totalDebt / artistMonthlyShare : Infinity;
    const yearsToRecoup = monthsToRecoup / 12;
    const recoupAfterOneYear = (artistMonthlyShare * 12) / totalDebt * 100;
    const progressValue = Math.min(recoupAfterOneYear, 100);

    // Verdict Logic
    const getVerdict = () => {
        if (royaltySplit < 15) return {
            label: translate("PREDATORY! RUN!!", "WEYREY DEAL! JAPA!!"),
            color: "text-red-600",
            bg: "bg-red-50 border-red-100",
            desc: translate("This split is extremely low.", "Waitin be dis? 15%? Dem wan rob you!"),
            icon: (
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <path d="M50 85C70 85 85 70 85 50C85 30 70 15 50 15C30 15 15 30 15 50C15 70 30 85 50 85Z" fill="#ef4444" />
                    <circle cx="35" cy="45" r="5" fill="white" />
                    <circle cx="65" cy="45" r="5" fill="white" />
                    <ellipse cx="50" cy="65" rx="10" ry="12" fill="#3f0000" />
                    <path d="M75 25C75 25 80 35 70 35C65 35 70 25 75 25Z" fill="#93c5fd" />
                </svg>
            )
        };
        if (yearsToRecoup > 5) return {
            label: translate("SLAVE SHIP (High Risk)", "SLAVE SHIP (O Por!)"),
            color: "text-red-500",
            bg: "bg-red-50 border-red-100",
            desc: translate("It will take > 5 years to be free.", "E go take over 5 years before you see shishi."),
            icon: (
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <rect x="20" y="20" width="60" height="60" rx="20" fill="#f87171" />
                    <path d="M35 45C35 45 40 40 45 45" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M55 45C55 45 60 40 65 45" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M40 70C40 70 50 60 60 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M65 55C65 55 60 60 65 65C70 65 65 55 65 55Z" fill="#bfdbfe" />
                </svg>
            )
        };
        if (royaltySplit >= 50 && yearsToRecoup < 1) return {
            label: translate("LEGENDARY DEAL", "ODOGWU DEAL"),
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
            desc: translate("High split and quick recoupment.", "You be boss! Sharp money."),
            icon: (
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <path d="M50 10L60 35H90L65 55L75 85L50 65L25 85L35 55L10 35H40L50 10Z" fill="#10b981" />
                    <path d="M30 45H70V55C70 58 68 60 65 60H35C32 60 30 58 30 55V45Z" fill="#111827" />
                    <line x1="48" y1="45" x2="52" y2="45" stroke="#10b981" strokeWidth="2" />
                    <path d="M45 70C45 70 50 72 55 68" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
            )
        };
        if (royaltySplit >= 20 && yearsToRecoup < 3) return {
            label: translate("STANDARD / FAIR", "NORMAL LEVEL"),
            color: "text-brand-600",
            bg: "bg-brand-50 border-brand-100",
            desc: translate("Industry standard depending on advance.", "E fair small via Standard levels."),
            icon: (
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <circle cx="50" cy="50" r="35" fill="#6366f1" />
                    <path d="M35 45Q40 40 45 45" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M55 45Q60 40 65 45" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <path d="M35 60Q50 75 65 60" stroke="white" strokeWidth="4" strokeLinecap="round" />
                </svg>
            )
        };
        return {
            label: translate("BAD / RISKY", "HALFWAY TO HELL"),
            color: "text-amber-600",
            bg: "bg-amber-50 border-amber-100",
            desc: translate("Hard to recoup.", "E go hard small."),
            icon: (
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="mb-4 mx-auto hover:scale-110 transition-transform duration-300">
                    <path d="M50 15L85 80H15L50 15Z" fill="#fbbf24" stroke="#d97706" strokeWidth="4" strokeLinejoin="round" />
                    <circle cx="40" cy="55" r="4" fill="#78350f" />
                    <circle cx="60" cy="55" r="4" fill="#78350f" />
                    <path d="M35 50H45" stroke="#78350f" strokeWidth="3" />
                    <path d="M55 48L65 52" stroke="#78350f" strokeWidth="3" />
                    <line x1="42" y1="70" x2="58" y2="70" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                </svg>
            )
        };
    };

    const verdict = getVerdict();

    // Contract Type Logic
    const getContractType = () => {
        if (royaltySplit < 15) return translate("Predatory / 360 Deal", "Waitin be dis? 360 Gbege");
        if (royaltySplit < 50) return translate("Standard Major Label Deal", "Normal Label Deal");
        if (royaltySplit < 80) return translate("Indie / Joint Venture", "Indie / Partnership");
        return translate("Distribution Deal", "Distribution Run");
    };

    const contractType = getContractType();

    const formatNumber = (val: number) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(val);
    };

    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 lg:p-10 space-y-10">

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">

                {/* INPUTS SECTION */}
                <div className="space-y-8">

                    {/* Money Inputs */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Financials</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex justify-between">
                                {translate("Advance Amount", "Advance Money")}
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 group-focus-within:text-brand-600 transition-colors">₦</div>
                                <input
                                    type="number"
                                    value={advance}
                                    onChange={(e) => setAdvance(Number(e.target.value))}
                                    className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-brand-500 rounded-2xl py-4 pl-10 pr-6 text-right font-mono text-lg font-bold text-slate-900 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex justify-between">
                                {translate("Marketing Budget", "Marketing Money")}
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 group-focus-within:text-brand-600 transition-colors">₦</div>
                                <input
                                    type="number"
                                    value={marketing}
                                    onChange={(e) => setMarketing(Number(e.target.value))}
                                    className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-brand-500 rounded-2xl py-4 pl-10 pr-6 text-right font-mono text-lg font-bold text-slate-900 outline-none transition-all"
                                />
                            </div>
                            <div className="flex items-center space-x-3 mt-3 px-1">
                                <input
                                    type="checkbox"
                                    id="recoupable"
                                    checked={isMarketingRecoupable}
                                    onChange={(e) => setIsMarketingRecoupable(e.target.checked)}
                                    className="w-5 h-5 text-brand-600 rounded bg-slate-100 border-slate-300 focus:ring-brand-500 cursor-pointer"
                                />
                                <label htmlFor="recoupable" className="text-sm font-medium text-slate-600 cursor-pointer select-none">
                                    {translate("Recoupable Marketing?", "Label fit collect am back?")}
                                </label>
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-slate-400 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {translate(
                                            "If checked, the label will deduct marketing costs from your royalties before you get paid.",
                                            "If you check am, label go first collect all the money wey dem spend for promo before YOU see shishi."
                                        )}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 w-full" />

                    {/* Terms Inputs */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Terms</h3>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-700">{translate("Your Royalty Split", "Your Share")}</label>
                                <span className={`text-xl font-bold font-mono ${royaltySplit < 20 ? 'text-red-500' : 'text-slate-900'}`}>{royaltySplit}%</span>
                            </div>
                            <input
                                type="range" min="0" max="100" step="1"
                                value={royaltySplit}
                                onChange={(e) => setRoyaltySplit(Number(e.target.value))}
                                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-600 hover:accent-brand-700"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2 uppercase">
                                <span>0% (Slave)</span>
                                <span>50% (Indie)</span>
                                <span>100% (Boss)</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-700">{translate("Monthly Streams", "Streams per Month")}</label>
                                <div className="flex bg-slate-200 rounded-lg p-1">
                                    <button
                                        onClick={() => setStreamRegion('NG')}
                                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${streamRegion === 'NG' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        NG 🇳🇬
                                    </button>
                                    <button
                                        onClick={() => setStreamRegion('INTL')}
                                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${streamRegion === 'INTL' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        INTL 🌍
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end mb-2">
                                <input
                                    type="number"
                                    value={estimatedStreams}
                                    onChange={(e) => setEstimatedStreams(Number(e.target.value))}
                                    className="bg-transparent text-right font-mono font-bold text-slate-900 outline-none w-32 border-b border-slate-300 focus:border-brand-500 focus:bg-white px-1"
                                />
                            </div>
                            <input
                                type="range" min="1000" max="10000000" step="10000"
                                value={estimatedStreams}
                                onChange={(e) => setEstimatedStreams(Number(e.target.value))}
                                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-600 hover:accent-brand-700"
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2 uppercase">
                                <span>Upcomers</span>
                                <span>Superstars</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* OUTPUTS SECTION */}
                <div className="space-y-6">

                    {/* Verdict Card */}
                    <div className={`text-center p-10 rounded-3xl border transition-all duration-500 ${verdict.bg}`}>
                        <div className="transform transition-transform hover:scale-110 duration-500 cursor-grab active:cursor-grabbing">
                            {verdict.icon}
                        </div>
                        <h3 className="text-xs uppercase tracking-widest opacity-60 font-bold mb-3 mt-2">
                            {translate("THE VERDICT", "THE MATTER")}
                        </h3>
                        <div className={`text-3xl lg:text-4xl font-black mb-3 ${verdict.color} tracking-tight leading-tight`}>
                            {verdict.label}
                        </div>
                        <p className="text-slate-600 font-medium max-w-xs mx-auto mb-6">
                            {verdict.desc}
                        </p>
                        <div className={`inline-flex items-center px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-black/5 shadow-sm`}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-2">TYPE:</span>
                            <span className="text-xs font-bold text-slate-900">{contractType}</span>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={async () => {
                                    const isHighRisk = yearsToRecoup > 5 || royaltySplit < 15;
                                    try {
                                        const res = await fetch('/api/deals/save', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ isHighRisk })
                                        });
                                        if (res.ok) {
                                            alert(translate("Analysis Saved!", "We don save ham!"));
                                        }
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                            >
                                {translate("Save Analysis", "Save This One")}
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{translate("Total Debt", "Gbege / Debt")}</div>
                            <div className="text-xl lg:text-2xl font-black text-red-500 font-mono tracking-tight">{formatNumber(totalDebt)}</div>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{translate("Gross Rev Goal", "Money Goal")}</div>
                            <div className="text-xl lg:text-2xl font-black text-slate-900 font-mono tracking-tight">{formatNumber(grossRevenueNeeded)}</div>
                        </div>
                        <div className="col-span-2 p-5 bg-brand-50/50 rounded-2xl border border-brand-100">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Music className="w-4 h-4 text-brand-500" />
                                    <div className="text-xs font-bold text-brand-400 uppercase tracking-wider">{translate("Streams to Freedom", "Streams to Freedom")}</div>
                                </div>
                                <div className="text-[10px] font-mono text-brand-400 opacity-60">@ ₦{STREAM_RATE}/stream</div>
                            </div>
                            <div className="text-3xl font-black text-brand-600 font-mono tracking-tight">{formatNumber(streamsNeeded)}</div>
                        </div>
                    </div>

                    {/* Time to Freedom */}
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-slate-900 text-sm">{translate("Estimated Time to Freedom", "How Long E Go Take?")}</span>
                            <span className="font-mono font-bold text-slate-900 text-lg">
                                {monthsToRecoup === Infinity ? "∞ Forever" :
                                    yearsToRecoup > 1 ? `${yearsToRecoup.toFixed(1)} years` :
                                        `${Math.ceil(monthsToRecoup)} months`}
                            </span>
                        </div>

                        {/* Visual Bar */}
                        <div className="h-5 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
                            <div
                                className={`h-full transition-all duration-1000 ease-out ${yearsToRecoup > 5 ? 'bg-red-500' :
                                    yearsToRecoup > 2 ? 'bg-amber-500' : 'bg-emerald-500'
                                    }`}
                                style={{ width: `${progressValue}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1">
                            <span>Start</span>
                            <span>1 Year Milestone</span>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}
