"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Scale, BookOpen, CheckCircle, Play, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900 selection:bg-indigo-500 selection:text-white overflow-x-hidden">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-200/40 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed z-50 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] left-1/2 -translate-x-1/2 ${isScrolled
          ? 'top-4 w-[90%] max-w-2xl bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20'
          : 'top-0 w-full px-6 py-6 bg-transparent border-transparent'
          }`}
      >
        <div className={`mx-auto flex items-center justify-between ${isScrolled ? 'w-full' : 'max-w-7xl'}`}>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ArtistPaddy Logo" className="w-8 h-8 object-contain" />
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-lg' : ''}`}>
              Artist<span className="text-indigo-600">Paddy</span>
            </span>
          </div>



          <div className="flex items-center gap-4">
            <Link href="/signin" className="hidden md:block text-sm font-semibold hover:text-indigo-600 transition-colors">
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-semibold rounded-full transition-all flex items-center gap-2 shadow-lg ${isScrolled
                ? 'px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                : 'px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                }`}
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-8 animate-delay-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">New: AI Contract Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] animate-delay-200">
            Your Personal <span className="text-indigo-600 font-serif italic">Music Lawyer</span> <br />
            <span className="text-slate-400">&amp;</span> Deal Simulator
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-delay-300">
            Protect your rights and visualize your financial future.
            Analyze contracts instantly and simulate deal splits before you sign.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-delay-300">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={20} />
            </Link>

          </div>


        </div>
      </section>

      {/* Services/Features Grid */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Why you should use ArtistPaddy as an artist
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We empower you with the same legal and financial insights major labels use, so you can sign confidently and build a sustainable career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-pink-50/80 p-8 rounded-3xl border border-pink-100 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Calculator className="text-pink-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Deal Simulator</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Calculate your actual earnings from any record deal. Visualize splits, recoupment, and advances instantly.
              </p>
              <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-pink-600 group-hover:gap-2 transition-all">
                Try Simulator <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-emerald-50/80 p-8 rounded-3xl border border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-emerald-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Legal Guard AI</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Instant contract reviews. Get a plain English explanation of predatory clauses and protect your rights.
              </p>
              <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-emerald-600 group-hover:gap-2 transition-all">
                Ask Legal Guard <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-sky-50/80 p-8 rounded-3xl border border-sky-100 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-sky-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Artist Academy</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Learn the business. Access guides on royalties, publishing, and distribution to stay independent.
              </p>
              <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-sky-600 group-hover:gap-2 transition-all">
                Start Learning <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Big Feature Showcase (Dark Mode Style) */}
      <section id="tools" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Big Feature Showcase (Dark Mode Style) */}
          <section id="cta" className="relative z-10 py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-black rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center">

                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-indigo-900/40 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Ready to Sign Your Best Deal?
                  </h2>
                  <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                    Don't leave your music career to chance. Join ArtistPaddy today and get the legal superpowers used by major labels.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/signup"
                      className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-200 text-black rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-white/10"
                    >
                      Create Free Account
                    </Link>

                  </div>

                  <p className="mt-8 text-sm text-slate-500">
                    No credit card required • Free tier available
                  </p>
                </div>

              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ArtistPaddy Logo" className="w-6 h-6 object-contain" />
            <span className="font-bold">ArtistPaddy</span>
          </div>

          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="#" className="hover:text-black">Privacy Policy</Link>
            <Link href="#" className="hover:text-black">Terms of Service</Link>
            <Link href="#" className="hover:text-black">Support</Link>
          </div>

          <div className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ArtistPaddy. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
