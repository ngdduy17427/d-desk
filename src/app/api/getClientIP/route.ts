import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse<any>> => {
  const clientIP = (await headers()).get('x-forwarded-for')
  return NextResponse.json({ clientIP }, { status: 200 })
}
