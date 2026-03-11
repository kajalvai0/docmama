import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'
const ADMIN_SECRET = 'docmama-admin-secret-key-2024'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${ADMIN_SECRET}`).toString('base64')
      
      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
      })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
