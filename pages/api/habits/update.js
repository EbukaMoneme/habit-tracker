
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
	const prisma = new PrismaClient({log: ["query"]});

	try {
		const {id, day, status} = JSON.parse(req.body);
		console.log(day)
		console.log(status)
		status[day] = !status[day]
		console.log(status)

		await prisma.habit.update({
			where: {
				id: Number(id)
			},
			data: {
				status: status
			}
		})
		res.json("Successfully cleared habits!");
	} catch (err) {
		res.status(500).json({err: `Unable to update habit because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
}