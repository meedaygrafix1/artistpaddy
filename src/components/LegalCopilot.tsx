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

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        const newMessages = [...messages, { role: 'user', text: userMsg } as Message];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/legal/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    previousMessages: messages.map(m => ({ role: m.role, text: m.text }))
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: translate(
                    "Sorry, I'm having trouble connecting to the legal database right now. Please try again.",
                    "No vex, network or server dey mess up. Try ask me again small time."
                )
            }]);
        } finally {
            setIsLoading(false);
        }
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
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%] flex-row">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-brand-600 text-white">
                                <Bot size={14} />
                            </div>
                            <div className="p-4 rounded-2xl text-sm leading-relaxed bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
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
                        disabled={isLoading}
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
