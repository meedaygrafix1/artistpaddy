import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Deal from '@/models/Deal';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const payload = await verifyJWT(token);
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await connectToDatabase();

        // Fetch recent deals
        const deals = await Deal.find({ userId: payload.id })
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json({ deals });

    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch deals', details: error.message },
            { status: 500 }
        );
    }
}
