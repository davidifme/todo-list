import { idGenerator } from "./idGenerator";

export const toDoManager = (function() {

    const projects = [];
    let defaultProject = createProject('Default')
    let currentProject = defaultProject;
    
    function addTask(title, description, dueDate, priority, projectID) {
        const newTask = createToDo(title, description, dueDate, priority);

        if (!projectID) {
            getCurrentProject().tasks.push(newTask);
            console.log(`"${newTask.title}" has been added to the project "${getCurrentProject().title}"`);
        } else {
            projects.forEach(project => {
                if (project.id === projectID) {
                    project.tasks.push(newTask);
                    console.log(`"${newTask.title}" has been added to the project "${project.title}"`);
                }
            });
        }
    }

    function removeTask(id) {
        projects.forEach(project => project.tasks.forEach((task, taskIndex) => {
            if (task.id === id) {
                let removedTaskTitle = task.title;
                project.tasks = project.tasks.filter((_, index) => index !== taskIndex);
                console.log(`"${removedTaskTitle}" has been removed from "${project.title}"`);
            }
        }));
    }

    function moveTask(taskID, projectID) {
        const task = getTaskByID(taskID);

        removeTask(taskID);
        getProjectByID(projectID).tasks.push(task);
        console.log(`"${task.title}" has been moved to "${getProjectByID(projectID).title}"`);
    }

    function getTaskByID(id) {
        for (let project of projects) {
            for (let task of project.tasks) {
                if (task.id === id) {
                    return task;
                }
            }
        }
        return undefined;
    }

    function getProjectByID(id) {
        for (let project of projects) {
            if (project.id === id) {
                return project;
            }
        }
        return undefined;
    }

    function createToDo(title = 'New task', description, dueDate, priority = 'low', id = idGenerator.generateUniqueId()) {
        return {
            title,
            description,
            dueDate,
            priority,
            id
        };
    }

    function createProject(title = 'New Project', description = '') {
        let newProject = {
            title,
            description,
            tasks: [],
            id: idGenerator.generateUniqueId()
        };

        projects.push(newProject);
        console.log(`Project: "${newProject.title}" has been created`);

        return newProject;
    }

    function getCurrentProject() {
        return currentProject;
    }

    function setCurrentProject(project) {
        currentProject = project;
    }

    function getProjects() {
        return projects;
    }

    function printTasks() {
        projects.forEach(project => {
            console.log(`Project title: "${project.title}" | ID: ${project.id}`);
            project.tasks.forEach(task => console.log(`Task title: "${task.title}" | ID: ${task.id}`));
        });
    }

    function printProjects() {
        projects.forEach(project => console.log(project));
    }

    return {
        getCurrentProject,
        setCurrentProject,
        getProjects,
        addTask,
        removeTask,
        moveTask,
        createProject,
        printTasks,
        printProjects
    };
})();