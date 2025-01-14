const taskLists = [];

const createTask = (
    title = 'New Task', 
    description = '', 
    dueDate, 
    priority = 'none', 
    notes = '', 
    taskList = 'default') => {

    const task = { title, description, dueDate, priority, notes, taskList };
    return { task };
};

const createList = (title = 'New List', description = '') => {
    const tasks = [];
    const taskList = { title, description, tasks };
    taskLists.push(taskList);
};

export { taskLists, createTask, createList };
