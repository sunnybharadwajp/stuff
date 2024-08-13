import prisma from '$lib/prisma';

// GET /api/tasks/:id - Get a specific task
export async function GET({ params }) {
	const task = await prisma.task.findUnique({
		where: { id: parseInt(params.id) }
	});
	if (task) {
		return {
			status: 200,
			body: task
		};
	} else {
		return {
			status: 404,
			body: { error: 'Task not found' }
		};
	}
}

// PUT /api/tasks/:id - Update a specific task
export async function PUT({ params, request }) {
	const data = await request.json();
	const updatedTask = await prisma.task.update({
		where: { id: parseInt(params.id) },
		data
	});
	return {
		status: 200,
		body: updatedTask
	};
}

// DELETE /api/tasks/:id - Delete a specific task
export async function DELETE({ params }) {
	await prisma.task.delete({
		where: { id: parseInt(params.id) }
	});
	return {
		status: 204
	};
}
