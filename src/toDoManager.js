import { idGenerator } from "./idGenerator.js";

export const toDoManager = (function() {
    let toDoProjects = [];
    const defaultProject = createProject('Default');
    let currentProject = defaultProject;

    function getProjects() {
        return toDoProjects;
    }

    function setCurrentProject(project) {
        currentProject = project;
    }

    function getCurrentProject() {
        return currentProject;
    }

    function createToDo
        (title = 'New Task',
        description = '',
        project = 'default',
        priority = 'none',
        dueDate,
        notes = '',
        completed = false)
        {

        const id = idGenerator.generateUniqueId();
        
        const toDo = {
            title,
            description,
            priority,
            dueDate,
            notes,
            completed,
            project,
            id
        };

        return toDo;
    }

    function createProject(title = 'New Project', description = '') {
        const toDos = [];
        const id = idGenerator.generateUniqueId();

        const newProject = {
            title,
            description,
            toDos,
            id
        }

        toDoProjects.push(newProject);

        return newProject;
    }

    function addToDo
        (title, 
        description, 
        projectTitle = 'default',
        priority = 'none',
        dueDate,
        notes = '',
        completed = false)
        {
        const newToDo = createToDo(title, description, projectTitle, priority, dueDate, notes, completed);
        const userProject = toDoProjects.find(project => project.title.toLowerCase() === projectTitle.toLowerCase());

        if (newToDo.project === 'default') {
            defaultProject.toDos.push(newToDo);
            console.log(`Task with ID:${newToDo.id} has been added to the project "${projectTitle}".`);
            return;
        }
        if (userProject) {
            userProject.toDos.push(newToDo);
            console.log(`Task with ID:${newToDo.id} has been added to the project "${projectTitle}".`);
        } else {
            console.error(`Project ${projectTitle} doesn't exist.`);
        }
    }

    function removeTodo(id) {
        let isRemoved = false;

        toDoProjects.forEach(project => {
            const index = project.toDos.findIndex(toDo => toDo.id === id);

            if (index !== -1) {
                project.toDos.splice(index, 1);
                console.log(`Task with ID:${id} has been removed from the project "${project.title}".`);
                isRemoved = true;
            }
        });

        if (!isRemoved) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }
    
    function setPriority(id, level = 0) {
        let isChanged = false;

        switch(level) {
            case 0:
                level = 'none';
                break;
            case 1:
                level = 'low';
                break;
            case 2:
                level = 'medium';
                break;
            case 3:
                level = 'high';
                break;
            default:
                console.error('Unknown level of priority.');
        }

        toDoProjects.forEach(project => {
            const index = project.toDos.findIndex(toDo => toDo.id === id);
            if (index !== -1) {
                project.toDos[index].priority = level;
                console.log(`Task's priority with ID:${id} has been changed to "${level}".`);
                isChanged = true;
            }
        });

        if (!isChanged) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }

    function setNoteText(id, text = '') {
        let isChanged = false;

        toDoProjects.forEach(project => {
            const index = project.toDos.findIndex(toDo => toDo.id === id);
            if (index !== -1) {
                project.toDos[index].notes = text;
                console.log(`Task's notes with ID:${id} has been changed.`);
                isChanged = true;
            }
        });

        if (!isChanged) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }

    function toggleComplete(id) {
        let isChanged = false;

        toDoProjects.forEach(project => {
            const index = project.toDos.findIndex(toDo => toDo.id === id);
            if (index !== -1) {
                project.toDos[index].completed = !project.toDos[index].completed;
                console.log(`Task with ID:${id} status has been changed.`);
                isChanged = true;
            }
        });

        if (!isChanged) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }

    function setTitle(id, newTitle = '', type = 'toDo') {
        let isChanged = false;

        if (type === 'toDo') {
            toDoProjects.forEach(project => {
                const index = project.toDos.findIndex(toDo => toDo.id === id);
                if (index !== -1) {
                    project.toDos[index].title = newTitle;
                    console.log(`Task's title with ID:${id} has been changed to "${newTitle}".`);
                    isChanged = true;
                }
            });
        } else if (type === 'project') {
            const index = toDoProjects.findIndex(project => project.id === id);
            if (index !== -1) {
                toDoProjects[index].title = newTitle;
                console.log(`Project's title with ID:${id} has been changed to "${newTitle}".`);
                isChanged = true;
            }
        }

        if (!isChanged) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }

    function setDescription(id, newDescription, type = 'toDo') {
        let isChanged = false;
    
        if (type === 'toDo') {
            toDoProjects.forEach(project => {
                const index = project.toDos.findIndex(toDo => toDo.id === id);
                if (index !== -1) {
                    project.toDos[index].description = newDescription;
                    console.log(`Task's description with ID:${id} has been changed to "${newDescription}".`);
                    isChanged = true;
                }
            });
        } else if (type === 'project') {
            const index = toDoProjects.findIndex(project => project.id === id);
            if (index !== -1) {
                toDoProjects[index].description = newDescription;
                console.log(`Project's description with ID:${id} has been changed to "${newDescription}".`);
                isChanged = true;
            }
        }
    
        if (!isChanged) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }

    function moveToDo(id, projectTitle) {
        let isMoved = false;

        toDoProjects.forEach(project => {
            const index = project.toDos.findIndex(toDo => toDo.id === id);
    
            if (index !== -1) {
                addToDo(project.toDos[index].title, 
                    project.toDos[index].description, 
                    projectTitle, 
                    project.toDos[index].priority, 
                    project.toDos[index].dueDate, 
                    project.toDos[index].notes, 
                    project.toDos[index].completed);
                removeTodo(id);
                console.log(`Task with ID:${id} has been moved to "${projectTitle}".`);
                isMoved = true;
            }
        });

        if (!isMoved) {
            console.error(`Task with ID:${id} was not found.`);
        }
    }

    function cleanProject(id) {
        let isCleaned = false;
    
        const project = toDoProjects.find(project => project.id === id);
        const index = toDoProjects.findIndex(project => project.id === id);
    
        if (project && index !== -1) {
            project.toDos = [];
            console.log(`All tasks have been removed from project: "${project.title}".`);
            isCleaned = true;
        }
    
        if (!isCleaned) {
            console.error(`Project with ID:${id} was not found.`);
        }
    }

    function printToDos() {
        toDoProjects.forEach(project => {
            if (project.toDos.length > 0) {
                console.log(project.toDos);
            }
        });
    }

    function printProjects() {
        toDoProjects.forEach(project => console.log(project));
    }

    return {
        createProject,
        addToDo,
        removeTodo,
        setTitle,
        setDescription,
        setPriority,
        setNoteText,
        moveToDo,
        toggleComplete,
        getProjects,
        cleanProject,
        setCurrentProject,
        getCurrentProject,
        printProjects,
        printToDos
    };
})();