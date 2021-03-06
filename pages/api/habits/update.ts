import { prisma } from "../../../src/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		// recieve habit-day info
		const {id, day, status} = JSON.parse(req.body);
		// toggle status for day
		status[day] = !status[day]
		// update database record
		await prisma.habit.update({
			where: {
				id: Number(id)
			},
			data: {
				status: status
			}
		})
		res.json("Successfully updated habit!");
	} catch (err) {
		res.status(500).json({err: `Unable to update habit because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
}