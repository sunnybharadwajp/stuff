<script>
	import { Plus, CalendarDays, ArrowRight, Search, Trash2, Ellipsis } from 'lucide-svelte';
	import { addToTasks } from '$lib/stores/tasks.js';
	import { setEditingTask, setSelectedTask } from '$lib/stores/viewer_state.js';

	const addDefaultTask = async () => {
		console.log('Add default task');

		const task = {
			title: ''
		};

		const request = await fetch('/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		});

		const data = await request.json();
		addToTasks(data);
		setSelectedTask(data);
		setEditingTask(data);
	};
</script>

<div class="page-footer">
	<div class="button-group">
		<button on:click={addDefaultTask}>
			<Plus size={16} />
		</button>
		<button class="disabled">
			<CalendarDays size={16} />
		</button>
		<button class="disabled">
			<ArrowRight size={16} />
		</button>
		<button>
			<Search size={16} />
		</button>
		<div class="focus hidden">
			<button>
				<ArrowRight size={16} />
			</button>
			<button>
				<Trash2 size={16} />
			</button>
			<button>
				<Ellipsis size={16} />
			</button>
		</div>
	</div>
</div>

<style>
	.page-footer {
		position: fixed;
		bottom: 0;
		right: 0;
		width: calc(100vw - var(--sidebar-width));
		background: #f5f6f8;
		padding: 0.2rem 1rem;
		font-size: 0.9rem;
		z-index: 10;
		border-top: 1px solid #d0d0d0;
	}

	.page-footer .button-group {
		display: flex;
		justify-content: center;
	}

	.page-footer button {
		padding: 0.2rem 2rem;
		border-radius: 6px;
		border: 1px solid #f5f6f8;
	}

	.page-footer button.disabled svg {
		stroke: #c6c6c6;
	}

	.page-footer button:hover {
		border: 1px solid #c6c6c6;
	}

	.page-footer button:not(.disabled):hover svg {
		stroke: #767676;
	}

	.page-footer button.disabled:hover {
		border: 1px solid #f5f6f8;
	}

	.page-footer button svg {
		stroke: #9a9a9a;
	}
</style>
