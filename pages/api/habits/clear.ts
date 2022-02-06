import { prisma } from "../../../src/db";

export default async function (req, res) {
	try {
		// Clear all habits
		await prisma.habit.deleteMany({})
		res.json("Successfully cleared habits!");
	} catch (err) {
		res.status(500).json({err: `Unable to clear habits because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
}