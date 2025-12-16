import { NextResponse } from 'next/server'

/**
 * Health check endpoint for Railway and other monitoring services.
 * This endpoint does not require database connection and returns immediately.
 * Use this for Railway health checks instead of /admin to avoid database dependency.
 */
export async function GET() {
  try {
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
