import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const payload = await verifyJWT(token);

        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Connect to DB and fetch user
        const { default: connectToDatabase } = await import('@/lib/mongodb');
        await connectToDatabase();
        const { default: User } = await import('@/models/User');

        const user = await User.findById(payload.id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                dealsChecked: user.dealsChecked || 0,
                highRiskDealsFound: user.highRiskDealsFound || 0
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to get user', details: error.message },
            { status: 500 }
        );
    }
}
