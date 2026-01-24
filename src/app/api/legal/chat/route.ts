import OpenAI from "openai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, previousMessages } = await req.json();
        const apiKey = process.env.GROQ_API_KEY;

        console.log("Legal Copilot Request Received");
        console.log("API Key present:", !!apiKey);

        if (!apiKey) {
            console.error("Groq API Key missing");
            return NextResponse.json(
                { error: 'Groq API key not configured' },
                { status: 500 }
            );
        }

        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });

        // Build conversation messages
        const systemMessage = {
            role: "system" as const,
            content: "You are a helpful and knowledgeable AI music lawyer called 'Legal Copilot'. You explain complex music contract terms in simple English or Nigerian Pidgin depending on the user's language style. Keep answers concise and helpful. Warn users about dangerous clauses like 'Perpetuity' or '360 deals'. Disclaimer: You are an AI, not a real lawyer."
        };

        const chatHistory = previousMessages.map((msg: any) => ({
            role: msg.role === 'bot' ? 'assistant' as const : 'user' as const,
            content: msg.text
        }));

        const messages = [
            systemMessage,
            ...chatHistory,
            { role: "user" as const, content: message }
        ];

        const response = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            max_tokens: 500,
        });

        const text = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error('Groq API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response', details: error.message },
            { status: 500 }
        );
    }
}
