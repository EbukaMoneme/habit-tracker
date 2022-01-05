import { prisma } from "../../../src/db";

export default async function (req, res) {
	try {
		// Create habit with info from form
		const data = JSON.parse(req.body);

		await prisma.habit.create({
			data: data
		})
		
		res.json("Successfully created habit")
	} catch (err) {
		res.status(500).json({err: `Unable to save habit to database because ${err}`})
	} finally {
		await prisma.$disconnect(); 
	}
}
