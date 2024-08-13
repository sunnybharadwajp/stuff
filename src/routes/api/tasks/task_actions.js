async function addTaskBetween(prisma, taskIdBefore, taskIdAfter, newTaskData) {
	const taskBefore = await prisma.task.findUnique({ where: { id: taskIdBefore } });
	const taskAfter = await prisma.task.findUnique({ where: { id: taskIdAfter } });

	const newOrder = (taskBefore.order + taskAfter.order) / 2;

	const newTask = await prisma.task.create({
		data: {
			...newTaskData,
			order: newOrder
		}
	});

	return newTask;
}

async function findOrderCollisions(prisma) {
	const tasks = await prisma.task.findMany({
		orderBy: { order: 'asc' }
	});

	const orderMap = new Map();

	for (const task of tasks) {
		if (orderMap.has(task.order)) {
			return true; // Collision found
		}
		orderMap.set(task.order, task.id);
	}

	return false; // No collisions found
}

async function handleTaskOrder(prisma) {
	const hasCollision = await findOrderCollisions(prisma);

	if (hasCollision) {
		await normalizeTaskOrder(prisma);
	}
}
