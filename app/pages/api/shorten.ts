
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { original } = req.body;

    if (!original || typeof original !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const shortened = nanoid(7);

    try {
      const newUrl = await prisma.uRL.create({
        data: {
          original,
          shortened,
        },
      });
      res.status(200).json(newUrl);
    } catch (error) {
      console.error('Failed to create URL:', error);
      res.status(500).json({ error: 'Failed to shorten URL' });
    }
  } else {
    res.status(405).end();
  }
}
