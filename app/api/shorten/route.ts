import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { original } = await request.json();

    if (!original || typeof original !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const shortened = nanoid(7);

    const newUrl = await prisma.uRL.create({
      data: {
        original,
        shortened,
      },
    });

    return NextResponse.json(newUrl, { status: 200 });
  } catch (error) {
    console.error('Error creating shortened URL:', error);
    return NextResponse.json({ error: 'Failed to shorten URL' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method is not allowed' }, { status: 405 });
}