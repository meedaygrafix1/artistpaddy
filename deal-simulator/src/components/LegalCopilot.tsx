"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Message {
    role: 'user' | 'bot';
    text: string;
}

export default function LegalCopilot() {
    const { translate } = useLanguage();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'bot', text: translate(
                "Hello! I am your AI Legal Assistant. Ask me about terms like 'Perpetuity', 'Recoupable', or '360 Deal'.",
                "How far! I be your Legal Padi. Ask me anything about your contract, like '360 Deal', 'Advance', or 'Masters'."
            )
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Update initial message when language changes
    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 1 && prev[0].role === 'bot') {
                return [{
                    role: 'bot', text: translate(
                        "Hello! I am your AI Legal Assistant. Ask me about terms like 'Perpetuity', 'Recoupable', or '360 Deal'.",
                        "How far! I be your Legal Padi. Ask me anything about your contract, like '360 Deal', 'Advance', or 'Masters'."
                    )
                }];
            }
            return prev;
        })
    }, [translate]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim().toLowerCase();
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput('');

        // Simulate AI Delay
        setTimeout(() => {
            let response = "";

            // Keyword "AI" Logic
            if (userMsg.includes("perpetuity") || userMsg.includes("forever")) {
                response = translate(
                    "⚠️ DANGER: 'Perpetuity' means FOREVER. If you sign this, you never get your rights back. Never!",
                    "⚠️ WAHALA: 'Perpetuity' mean say dem don carry your market GO. You no go see am again FOREVER. No gree o!"
                );
            } else if (userMsg.includes("360") || userMsg.includes("three sixty")) {
                response = translate(
                    "A 360 Deal means the label takes a % of EVERYTHING: Shows, Endorsements, Merch, and Music. Usually 15-30% of net income.",
                    "360 Deal mean say dem go chop from everywhere: Show money, endorsement, even if you sell pure water. Dem go collect their share."
                );
            } else if (userMsg.includes("advance")) {
                response = translate(
                    "An Advance is NOT free money. It is a LOAN you pay back with your earnings. You don't get royalties until it's paid back.",
                    "Advance no be dash o! Na GBESE. Na loan wey you go pay back with your music money. If you chop am finish, hunger fit wire you."
                );
            } else if (userMsg.includes("master") || userMsg.includes("own the song")) {
                response = translate(
                    "Masters are the ownership of the recording. If the label owns the masters, they control the song. Try to negotiate a reversion clause.",
                    "Masters na who get the song. If label hold am, na dem get final say. Try tell dem say after 5-10 years, make dem return am give you."
                );
            } else if (userMsg.includes("recoup")) {
                response = translate(
                    "Recoupable means you must pay it back. Non-recoupable is better (like a fee), but rare for advances.",
                    "Recoupable mean say na debt. Dem must collect am back from your streaming money."
                );
            } else if (userMsg.includes("lawyer")) {
                response = translate(
                    "Always get a music lawyer to read your contract. I am a robot, not a substitute for a real lawyer!",
                    "Find correct lawyer o! Me na robot, I no fit go court for you. No dey do 'I can read it myself'."
                );
            } else {
                response = translate(
                    "I didn't catch that specific legal term. Try asking about 'Masters', 'Advance', or '360 Deals'.",
                    "I no grab dat one. Ask me about 'Masters', 'Advance', or '360' make I explain give you."
                );
            }

            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 600);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">

            {/* Chat Header */}
            <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Legal Copilot</h3>
                        <p className="text-xs text-slate-500">AI Contract Assistant</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-brand-600 text-white'
                                }`}>
                                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>

                            {/* Bubble */}
                            <div
                                className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-slate-900 text-white rounded-tr-none'
                                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 text-slate-900 placeholder:text-slate-400"
                        placeholder={translate("Message your Legal Padi...", "Ask me anything...")}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-slate-400">
                        {translate("AI can make mistakes. Consult a real lawyer.", "AI fit dey whine sometimes. Ask real lawyer.")}
                    </p>
                </div>
            </div>
        </div>
    );
}
