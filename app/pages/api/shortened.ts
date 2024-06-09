import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {shortened} = req.query;

    try {
        const url = await prisma.uRL.findUnique({
            where: {shortened: String(shortened)}
        });

        if (url){
            res.redirect(url.original);
        } else {
            res.status(404).json({error: 'URL not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
}