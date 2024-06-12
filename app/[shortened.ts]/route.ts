import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const shortened = pathname.split('/')[1];

  try {
    const urlRecord = await prisma.uRL.findUnique({
      where: { shortened },
    });

    if (!urlRecord) {
      return NextResponse.redirect('/404');
    }

    return NextResponse.redirect(urlRecord.original);
  } catch (error) {
    console.error('Error finding shortened URL:', error);
    return NextResponse.redirect('/500'); // You can create a custom 500 error page if you want
  }
}