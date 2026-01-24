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

        return NextResponse.json({
            user: {
                id: payload.id,
                name: payload.name,
                email: payload.email,
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to get user', details: error.message },
            { status: 500 }
        );
    }
}
