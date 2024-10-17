import { NextResponse } from 'next/server'
import faqData from '@/data/faq-data.json'

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(faqData)
  } catch (error) {
    console.error('Error in FAQ API route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}