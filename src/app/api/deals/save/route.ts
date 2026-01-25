import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
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

        const body = await request.json();
        const { isHighRisk } = body;

        await connectToDatabase();

        // Update user stats
        await User.findByIdAndUpdate(payload.id, {
            $inc: {
                dealsChecked: 1,
                highRiskDealsFound: isHighRisk ? 1 : 0
            }
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to save deal', details: error.message },
            { status: 500 }
        );
    }
}
