import { taskLists, createTask, createList } from './taskFactory.js';

createList('default');
const task1 = createTask('test', "task's description", 'today', 'high');
console.log(task1);
console.log(taskLists);
