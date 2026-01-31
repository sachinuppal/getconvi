
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, company } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, or message' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name,
                    email,
                    message,
                    company: company || null,
                    status: 'new'
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Request processing error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
