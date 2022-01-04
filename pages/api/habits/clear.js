// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
	const prisma = new PrismaClient({log: ["query"]});

	try {
		await prisma.habit.deleteMany({})
		res.json("Successfully cleared habits!");
	} catch (err) {
		res.status(500).json({err: `Unable to clear habits because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
}