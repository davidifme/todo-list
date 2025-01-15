import { toDoManager } from "./toDoManager.js";

const newProject = toDoManager.createProject('testProject');

toDoManager.addToDo('test', 'description', 'testProject');

console.log(newProject)