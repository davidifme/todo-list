import { idGenerator } from "./idGenerator";

export const toDoManager = (function() {

    const projects = [];
    let defaultProject = createProject('Default')
    let currentProject = defaultProject;
    
    function addTask(title = "New Task", description = "", dueDate = new Date().toISOString().split('T')[0], priority = "low", projectID) {
        const newTask = createToDo(title, description, dueDate, priority, false);

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

    function removeProject(id) {
        projects.forEach((project, projectIndex) => {
            if (project.id === id) {
                let removedProjectTitle = project.title;
                projects.splice(projectIndex, 1);
                console.log(`"${removedProjectTitle}" has been removed`);
            }
        });
    }
    

    function editTask(item, text, id) {
        for (const project of projects) {
            const toDo = project.tasks.find(task => task.id === id);
            if (toDo) {
                switch (item) {
                    case 'title':
                        toDo.title = text;
                        break;
                    case 'description':
                        toDo.description = text;
                        break;
                    case 'duedate':
                        toDo.dueDate = text;
                        break;
                    case 'priority':
                        toDo.priority = text;
                        break;
                    default:
                        console.error('Invalid item');
                }
                break;
            }
        }
    }

    function editProject(item, text, id) {
        const project = getProjectByID(id);
        if (project) {
            switch (item) {
                case 'title':
                    project.title = text;
                    break;
                case 'description':
                    project.description = text;
                    break;
                default:
                    console.error('Invalid item');
            }
        } else {
            console.error('Project not found');
        }
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

    function getAllTasks() {
        return projects.flatMap(project => project.tasks);
    }

    function createToDo(
        title = 'New task',
        description,
        dueDate = new Date().toISOString().split('T')[0],
        priority = 'low',
        completed = false,
        id = idGenerator.generateUniqueId()
    ) {
        return {
            title,
            description,
            dueDate,
            priority,
            completed,
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
        console.log(`Project: "${newProject.title}" has been created with ID: ${newProject.id}`);

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

    function setProjects(updatedProjects) {
        projects = updatedProjects;
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
        setProjects,
        getAllTasks,
        getTaskByID,
        getProjectByID,
        addTask,
        editTask,
        editProject,
        removeTask,
        removeProject,
        moveTask,
        createProject,
        printTasks,
        printProjects
    };
})();   