export const toDoManager = (function() {
    const toDoProjects = [];

    const defaultProject = createProject('Default');
    toDoProjects.push(defaultProject);

    function createToDo
        (title = 'New ',
        description = '',
        project = 'default',
        priority = 'none',
        dueDate,
        notes = '',
        completed = false)
        {
        
        const toDo = {
            title,
            description,
            priority,
            dueDate,
            notes,
            completed,
            project
        };

        return toDo;
    }

    function createProject(title = 'New Project', description = '') {
        const toDos = [];
        const newProject = {
            title,
            description,
            toDos
        }

        toDoProjects.push(newProject);

        return newProject;
    }

    function addToDo(title, description, projectTitle = 'default') {
        const newToDo = createToDo(title, description, projectTitle);
        const userProject = toDoProjects.find(project => project.title.toLowerCase() === projectTitle.toLowerCase());

        if (newToDo.project === 'default') {
            defaultProject.toDos.push(newToDo);
            return;
        }
        if (userProject) {
            userProject.toDos.push(newToDo);
        } else {
            console.log(`Project ${projectTitle} doesn't exist.`);
        }
    }

    return {
        createToDo,
        createProject,
        addToDo
    };
})();