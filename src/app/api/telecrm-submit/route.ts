import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { fields } = await request.json()

        // Validate required fields
        if (!fields || !fields.name || !fields.phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Call teleCRM API
        const response = await fetch(process.env.TELECRM_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TELECRM_API_TOKEN!}`
            },
            body: JSON.stringify({ fields })
        })

        // Forward the response from teleCRM
        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error submitting to teleCRM:', error)
        return NextResponse.json({ error: 'Failed to submit to teleCRM' }, { status: 500 })
    }
}