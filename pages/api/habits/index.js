import { prisma } from "../../../src/db";

export default async function (req, res) {
	try {
		// Fetch all habits
		const habits = await prisma.habit.findMany();
		res.status(200).json({ habits })
	} catch (err) {
		res.status(500).json({err: `Unable to fetch habits because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
}