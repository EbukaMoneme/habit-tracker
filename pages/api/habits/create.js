// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
	const prisma = new PrismaClient({log: ["query"]});

	try {
		const { habit: habitData } = req.body;
		const habit = await prisma.habit.create({
			data: {
				title: habitData.title,
				description: habitData.description,
				color: habitData.color,
				frequency: habitData.frequency
			}
		});
		res.status(201).json({ habit });
	} catch (err) {
		res.status(500).json({err: `Unable to save habit to database because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
	
	
}
