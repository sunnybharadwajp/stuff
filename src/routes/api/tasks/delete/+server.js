import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET({}) {
	const tasks = await prisma.task.findMany({
		where: {
			deletedAt: {
				not: null
			}
		}
	});
	return json(tasks);
}

export async function DELETE({}) {
	const tasks = await prisma.task.deleteMany({
		where: {
			deletedAt: {
				not: null
			}
		}
	});

	return json([]);
}
