let tasks = [
	{
		"id": "task-1",
		"title": "Task 1",
		"description": "The first task",
		"priority": 3,
		"completed": false
	},
	{
		"id": "task-2",
		"title": "Task 2",
		"description": "The second task",
		"priority": 1,
		"completed": false
	},
	{
		"id": "task-3",
		"title": "Task 3",
		"description": "The third task",
		"priority": 1,
		"completed": true
	},
	{
		"id": "task-4",
		"title": "Task 4",
		"description": "The fourth task",
		"priority": 5,
		"completed": true
	},
	{
		"id": "task-5",
		"title": "Task 5",
		"description": "The fifth task",
		"priority": 2,
		"completed": false
	}
];
console.log("all:", tasks);

let uncompleted = tasks.filter( task => !task.completed );
console.log("uncompleted:", uncompleted);

let titles = tasks.map( task => task.title );
console.log("titles:", titles);

let sorted = tasks.sort( (left, right) => {
	if (left.priority > right.priority) {
		return -1;
	} else if (left.priority < right.priority) {
		return 1;
	} else {
		return 0;
	}
} );
console.log("sorted:", sorted);

let totalCompleted = tasks.reduce( (total, next) => total = next.completed ? total + 1 : total, 0 );
console.log("total completed:", totalCompleted);

let highestPriority = sorted[0].priority;
let highestPriorityTask = tasks.find( task => task.priority === highestPriority );
console.log("highest priority task:", highestPriorityTask);

let anyTaskCompleted = tasks.some( task => task.priority > 5 && task.completed );
console.log("any task with priority higher 5 completed?", anyTaskCompleted);

let allCompleted = tasks.every( task => task.completed );
console.log("all tasks completed?", allCompleted);

tasks.forEach( task => console.log("Task: [ id: " + task.id +
	", title: '" + task.title +
	"', description: '" + task.description +
	"', priority: " + task.priority +
	", completed: " + task.completed + "]") );

tasks.splice(0, 1);
console.log("after deletion: ", tasks);

tasks.push({
	id: "task-6",
	title: "Task 6",
	description: "The sixth task",
	priority: 3,
	completed: false
});
console.log("after push:", tasks);

tasks.unshift({
	id: "task-7",
	title: "Task 7",
	description: "The seventh task",
	priority: 5,
	completed: true
});
console.log("after unshift:", tasks);