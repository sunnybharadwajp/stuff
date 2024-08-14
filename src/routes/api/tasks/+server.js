import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

// GET /api/tasks - List all tasks
export async function GET() {
	console.log('GET /api/tasks');
	const tasks = await prisma.task.findMany({});

	return json(tasks);
}

// POST /api/tasks - Create a new task
export async function POST({ request }) {
	const data = await request.json();
	try {
		const newTask = await prisma.task.create({
			data
		});
		return json(newTask);
	} catch (error) {
		console.log(error);
		return json({
			status: 400,
			body: {
				error: 'Error creating task'
			}
		});
	}
}
