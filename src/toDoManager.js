import { idGenerator } from "./idGenerator";

export const toDoManager = (function() {

    let projects = [];
    let defaultProject = createProject('Default')
    let currentProject = defaultProject;

    function saveToLocalStorage() {
        console.log('Saving projects to localStorage:', projects);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function loadFromLocalStorage() {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            projects = JSON.parse(storedProjects);
            console.log('Loaded projects from localStorage:', projects);
            currentProject = projects.find(project => project.id === currentProject.id) || projects[0] || defaultProject;
        } else {
            projects.push(defaultProject);
            currentProject = defaultProject;
        }
    }

    loadFromLocalStorage();

    function logLocalStorage() {
        console.log(localStorage.getItem('projects'));
    }
    
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
        saveToLocalStorage();
    }

    function removeTask(id) {
        projects.forEach(project => project.tasks.forEach((task, taskIndex) => {
            if (task.id === id) {
                let removedTaskTitle = task.title;
                project.tasks = project.tasks.filter((_, index) => index !== taskIndex);
                console.log(`"${removedTaskTitle}" has been removed from "${project.title}"`);
            }
        }));
        saveToLocalStorage();
    }

    function removeProject(id) {
        projects.forEach((project, projectIndex) => {
            if (project.id === id) {
                let removedProjectTitle = project.title;
                projects.splice(projectIndex, 1);
                console.log(`"${removedProjectTitle}" has been removed`);
            }
        });
        saveToLocalStorage();
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
                saveToLocalStorage();
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
            saveToLocalStorage();
        } else {
            console.error('Project not found');
        }
    }
    

    function moveTask(taskID, projectID) {
        const task = getTaskByID(taskID);

        removeTask(taskID);
        getProjectByID(projectID).tasks.push(task);
        console.log(`"${task.title}" has been moved to "${getProjectByID(projectID).title}"`);
        saveToLocalStorage();
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
        id = Number(id);
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
        saveToLocalStorage();

        return newProject;
    }

    function getCurrentProject() {
        console.log('Current project in getCurrentProject:', currentProject);
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
        saveToLocalStorage,
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
        printProjects,
        logLocalStorage
    };
})();   