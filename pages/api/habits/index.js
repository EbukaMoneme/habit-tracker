
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
	const prisma = new PrismaClient({log: ["query"]});

	try {
		const habits = await prisma.habit.findMany();
		res.status(200).json({ habits })
	} catch (err) {
		res.status(500).json({err: `Unable to fetch habits because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}

}