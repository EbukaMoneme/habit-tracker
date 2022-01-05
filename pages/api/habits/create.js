// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
// import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/db";


export default async function (req, res) {
	// const prisma = new PrismaClient({log: ["query"]});

	try {
		const data = JSON.parse(req.body);

		console.log(data)
		console.log(data.frequency)

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
