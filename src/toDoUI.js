import { toDoManager } from "./toDoManager";
import editIconSvg from "/images/edit.svg";
import deleteIconSvg from "/images/delete.svg";
import homeIconSvg from "/images/home.svg";
import toDayTasksIconSvg from "/images/today.svg";
import scheduledIconSvg from "/images/scheduled.svg";
import projectsIconSvg from "/images/projects.svg";
import homepageImagePng from "/images/homepage-icon.png";

export const toDoUI = (function() {

    let renderTimeout;
    let currentTaskID;
    let currentProjectID;
    let modalSubmitListenerAdded = false;

    function renderUI() {
        renderSidebarButtons();
        setupSidebarButtons();
        renderTasks();
        setupModal();
    }

    function createDomElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    function renderTaskModal() {
        modalSubmitListenerAdded = false;
        const main = document.getElementById('modal-content');
        main.innerHTML = '';

        const form = createDomElement('form', { method: 'dialog', id: 'task-form' });
        form.dataset.type = 'task';
        main.appendChild(form);

        const titleContainer = createDomElement('div', { class: 'form-container' });
        const titleLabel = createDomElement('label', { for: 'modal-task-title' });
        titleLabel.textContent = 'Title';
        const titleInput = createDomElement('input', {
            type: 'text',
            name: 'modal-task-title',
            id: 'modal-task-title',
            placeholder: 'New Task',
            required: 'true'
        });
        titleContainer.appendChild(titleLabel);
        titleContainer.appendChild(titleInput);
        form.appendChild(titleContainer);

        const descriptionContainer = createDomElement('div', { class: 'form-container' });
        const descriptionLabel = createDomElement('label', { for: 'modal-task-description' });
        descriptionLabel.textContent = 'Description';
        const descriptionTextarea = createDomElement('textarea', {
            name: 'modal-task-description',
            id: 'modal-task-description',
            placeholder: 'Write some description...'
        });
        descriptionContainer.appendChild(descriptionLabel);
        descriptionContainer.appendChild(descriptionTextarea);
        form.appendChild(descriptionContainer);

        const dateContainer = createDomElement('div', { class: 'form-container' });
        const dateLabel = createDomElement('label', { for: 'modal-task-duedate' });
        dateLabel.textContent = 'Due date';
        const dateInput = createDomElement('input', {
            type: 'date',
            name: 'modal-task-duedate',
            id: 'modal-task-duedate'
        });
        dateContainer.appendChild(dateLabel);
        dateContainer.appendChild(dateInput);
        form.appendChild(dateContainer);

        const priorityContainer = createDomElement('div', { id: 'modal-task-buttons' });

        const priorities = [
            { id: 'low-priority', value: 'low', labelId: 'low', text: 'Low' },
            { id: 'medium-priority', value: 'medium', labelId: 'medium', text: 'Medium' },
            { id: 'high-priority', value: 'high', labelId: 'high', text: 'High' }
        ];

        priorities.forEach(priority => {
            const input = createDomElement('input', {
                type: 'radio',
                name: 'priority',
                id: priority.id,
                value: priority.value
            });
            const label = createDomElement('label', { for: priority.id, id: priority.labelId });
            label.textContent = priority.text;
            priorityContainer.appendChild(input);
            priorityContainer.appendChild(label);
        });

        form.appendChild(priorityContainer);

        const buttonsContainer = createDomElement('div', { id: 'modal-buttons' });

        const submitButton = createDomElement('button', { type: 'submit', id: 'modal-submit-button' });
        submitButton.textContent = 'Save';

        const cancelButton = createDomElement('button', { type: 'button', id: 'modal-cancel-button' });
        cancelButton.textContent = 'Cancel';

        buttonsContainer.appendChild(submitButton);
        buttonsContainer.appendChild(cancelButton);
        form.appendChild(buttonsContainer);

        main.appendChild(form);
    }

    function renderProjectModal() {
        modalSubmitListenerAdded = false;
        const main = document.getElementById('modal-content');
        main.innerHTML = '';
    
        const form = createDomElement('form', { method: 'dialog', id: 'task-form' });
        form.dataset.type = 'project';
        main.appendChild(form);
    
        const titleContainer = createDomElement('div', { class: 'form-container' });
        const titleLabel = createDomElement('label', { for: 'modal-task-title' });
        titleLabel.textContent = 'Title';
        const titleInput = createDomElement('input', {
            type: 'text',
            name: 'modal-task-title',
            id: 'modal-task-title',
            placeholder: 'New Project',
            required: 'true'
        });
        titleContainer.appendChild(titleLabel);
        titleContainer.appendChild(titleInput);
        form.appendChild(titleContainer);
    
        const descriptionContainer = createDomElement('div', { class: 'form-container' });
        const descriptionLabel = createDomElement('label', { for: 'modal-task-description' });
        descriptionLabel.textContent = 'Description';
        const descriptionTextarea = createDomElement('textarea', {
            name: 'modal-task-description',
            id: 'modal-task-description',
            placeholder: 'Write some description...'
        });
        descriptionContainer.appendChild(descriptionLabel);
        descriptionContainer.appendChild(descriptionTextarea);
        form.appendChild(descriptionContainer);
    
        const buttonsContainer = createDomElement('div', { id: 'modal-buttons' });
    
        const submitButton = createDomElement('button', { type: 'submit', id: 'modal-submit-button' });
        submitButton.textContent = 'Save';
    
        const cancelButton = createDomElement('button', { type: 'button', id: 'modal-cancel-button' });
        cancelButton.textContent = 'Cancel';
    
        buttonsContainer.appendChild(submitButton);
        buttonsContainer.appendChild(cancelButton);
        form.appendChild(buttonsContainer);
    
        main.appendChild(form);
    }

    function setupModal() {
        setupModalButtons();
        setupModalSidebarButtons();
    }

    function setupModalSidebarButtons() {
        const projectButton = document.querySelector('.modal-project-button');
        const taskButton = document.querySelector('.modal-task-button');

        if ( !taskButton.dataset.listenerAdded ) {
            taskButton.addEventListener('click', () => {
                if (!taskButton.classList.contains('button-on')) {
                    taskButton.classList.toggle('button-on', true);
                    projectButton.classList.toggle('button-on', false);
                    renderTaskModal();
                    setupModalButtons();
                }
            });
            taskButton.dataset.listenerAdded = "true";
        }

        if ( !projectButton.dataset.listenerAdded ) {
            projectButton.addEventListener('click', () => {
                if (!projectButton.classList.contains('button-on')) {
                    projectButton.classList.toggle('button-on', true);
                    taskButton.classList.toggle('button-on', false);
                    renderProjectModal();
                    setupModalButtons();
                }
            });
            projectButton.dataset.listenerAdded = "true";
        }
    }

    function setupModalButtons() {
        const openModalNew = document.getElementById('new-modal-button');
        const modal = document.getElementById('modal');

        if (!openModalNew.dataset.listenerAdded) {
            openModalNew.addEventListener('click', () => {
                const modalForm = document.getElementById('task-form');
                const taskButton = document.querySelector('.modal-task-button');
                const projectButton = document.querySelector('.modal-project-button');
                if (modalForm.dataset.type === 'task') {
                    taskButton.classList.toggle('button-on', true);
                    projectButton.classList.toggle('button-on', false);
                }
                if (modalForm.dataset.type === 'project') {
                    projectButton.classList.toggle('button-on', true);
                    taskButton.classList.toggle('button-on', false);
                }
                modal.showModal();
            });
            openModalNew.dataset.listenerAdded = "true";
        }

        if (!modal.dataset.listenerAdded) {
            modal.addEventListener('keydown', (event) => {
                const modalForm = document.getElementById('task-form');
                const taskButton = document.querySelector('.modal-task-button');
                const projectButton = document.querySelector('.modal-project-button');
                if (event.key === 'Escape') {
                    event.preventDefault();
                    taskButton.classList.toggle('button-on', false);
                    projectButton.classList.toggle('button-on', false);
                    modal.close();
                    if (modalForm.dataset.type === 'taskEdit') {
                        modalForm.reset();
                        modalForm.dataset.type === 'task'
                    }
                    if (modalForm.dataset.type === 'projectEdit') {
                        modalForm.reset();
                        modalForm.dataset.type === 'project'
                    }
                }
            });
            modal.dataset.listenerAdded = "true";
        }

        const openModalEdit = document.querySelectorAll('.edit-modal-button');
        openModalEdit.forEach(button => {
            button.addEventListener('click', () => {
                renderTaskModal();
                setupModalButtons();

                const modalForm = document.getElementById('task-form');
                modalForm.dataset.type = 'taskEdit';

                let currentTask = toDoManager.getTaskByID(currentTaskID);

                const editTaskTitle = document.getElementById('modal-task-title');
                editTaskTitle.value = currentTask.title;

                const editTaskDescription = document.getElementById('modal-task-description');
                editTaskDescription.value = currentTask.description;

                const editTaskDueDate = document.getElementById('modal-task-duedate');
                editTaskDueDate.value = currentTask.dueDate;

                const priorityInputs = document.querySelectorAll('input[name="priority"]');
                priorityInputs.forEach(input => {
                    if (input.value === currentTask.priority) {
                        input.checked = true;
                    }
                });

                const taskButton = document.querySelector('.modal-task-button');
                const projectButton = document.querySelector('.modal-project-button');
                taskButton.classList.toggle('button-on', true);
                projectButton.classList.toggle('button-on', false);

                const modal = document.getElementById('modal');
                modal.showModal();
            });
        });

        const modalForm = document.getElementById('task-form');
        const closeModal = document.getElementById('modal-cancel-button');
        closeModal.addEventListener('click', () => {
            const taskButton = document.querySelector('.modal-task-button');
            const projectButton = document.querySelector('.modal-project-button');
            if (modalForm.dataset.type === 'task') {
                taskButton.classList.toggle('button-on', false);
                projectButton.classList.toggle('button-on', false);
                modal.close();
            }
            if (modalForm.dataset.type === 'taskEdit') {
                taskButton.classList.toggle('button-on', false);
                projectButton.classList.toggle('button-on', false);
                modalForm.reset();
                modal.close();
                modalForm.dataset.type = 'task';
            }
            if (modalForm.dataset.type === 'project') {
                taskButton.classList.toggle('button-on', false);
                projectButton.classList.toggle('button-on', false);
                modal.close();
            }
            if (modalForm.dataset.type === 'projectEdit') {
                taskButton.classList.toggle('button-on', false);
                projectButton.classList.toggle('button-on', false);
                modalForm.reset();
                modal.close();
                modalForm.dataset.type = 'project';
            }
        });

        if (!modalSubmitListenerAdded) {
            modalForm.addEventListener('submit', (event) => {
                if (modalForm.dataset.type === 'task') {
                    event.preventDefault();
    
                    const formData = new FormData(modalForm);
                    const formTaskTitle = formData.get('modal-task-title');
                    const formTaskDescription = formData.get('modal-task-description');
                    const formTaskDueDate = formData.get('modal-task-duedate');
                    const formTaskPriority = formData.get('priority');
        
                    toDoManager.addTask(formTaskTitle, formTaskDescription, formTaskDueDate, formTaskPriority);
        
                    const taskButton = document.querySelector('.modal-task-button');
                    taskButton.classList.toggle('button-on', false);
                    modal.close();
                    modalForm.reset();
                    renderUI();
                }
                if (modalForm.dataset.type === 'taskEdit') {
                    event.preventDefault();
    
                    const formData = new FormData(modalForm);
                    const formTaskTitle = formData.get('modal-task-title');
                    const formTaskDescription = formData.get('modal-task-description');
                    const formTaskDueDate = formData.get('modal-task-duedate');
                    const formTaskPriority = formData.get('priority');
    
                    toDoManager.editTask('title', formTaskTitle, currentTaskID);
                    toDoManager.editTask('description', formTaskDescription, currentTaskID);
                    toDoManager.editTask('duedate', formTaskDueDate, currentTaskID);
                    toDoManager.editTask('priority', formTaskPriority, currentTaskID);
    
                    const taskButton = document.querySelector('.modal-task-button');
                    taskButton.classList.toggle('button-on', false);
                    modal.close();
                    modalForm.reset();
                    renderUI();
                    modalForm.dataset.type = 'task';
                }
                if (modalForm.dataset.type === 'project') {
                    event.preventDefault();
    
                    const formData = new FormData(modalForm);
                    const formProjectTitle = formData.get('modal-task-title');
                    const formProjectDescription = formData.get('modal-task-description');
    
                    const newProject = toDoManager.createProject(formProjectTitle, formProjectDescription);
                    toDoManager.setCurrentProject(newProject);
    
                    const projectButton = document.querySelector('.modal-project-button');
                    projectButton.classList.toggle('button-on', false);
                    modal.close();
                    modalForm.reset();
                    renderUI();
                }
                if (modalForm.dataset.type === 'projectEdit') {
                    event.preventDefault();
    
                    const formData = new FormData(modalForm);
                    const formProjectTitle = formData.get('modal-task-title');
                    const formProjectDescription = formData.get('modal-task-description');
    
                    toDoManager.editProject('title', formProjectTitle, currentProjectID);
                    toDoManager.editProject('description', formProjectDescription, currentProjectID);
    
                    const projectButton = document.querySelector('.modal-project-button');
                    projectButton.classList.toggle('button-on', false);
                    modal.close();
                    modalForm.reset();
                    renderProjects();
                    setupProjectEditButtons();
                }
            });
            modalSubmitListenerAdded = true;
        }
    }

    function renderSidebarButtons() {
        const sidebar = document.getElementById('sidebar');
        sidebar.innerHTML = '';
    
        const sidebarButtonsContainer = createDomElement('div', { id: 'sidebar-buttons' });
    
        const homeButton = createDomElement('button', { id: 'home-button' });
        const homeImg = createDomElement('img', {
            class: 'sidebar-icon',
            src: homeIconSvg,
            alt: 'home-icon'
        });
        homeButton.appendChild(homeImg);
        homeButton.appendChild(document.createTextNode('Home'));
    
        const todayButton = createDomElement('button', { id: 'today-button' });
        const todayImg = createDomElement('img', {
            class: 'sidebar-icon',
            src: toDayTasksIconSvg,
            alt: 'today-tasks-icon'
        });
        todayButton.appendChild(todayImg);
        todayButton.appendChild(document.createTextNode('Today'));
    
        const scheduledButton = createDomElement('button', { id: 'scheduled-button' });
        const scheduledImg = createDomElement('img', {
            class: 'sidebar-icon',
            src: scheduledIconSvg,
            alt: 'scheduled-icon'
        });
        scheduledButton.appendChild(scheduledImg);
        scheduledButton.appendChild(document.createTextNode('Scheduled'));
    
        const projectsButton = createDomElement('button', { id: 'projects-button' });
        const projectsImg = createDomElement('img', {
            class: 'sidebar-icon',
            src: projectsIconSvg,
            alt: 'projects-icon'
        });
        projectsButton.appendChild(projectsImg);
        projectsButton.appendChild(document.createTextNode('Projects'));
    
        sidebarButtonsContainer.appendChild(homeButton);
        sidebarButtonsContainer.appendChild(todayButton);
        sidebarButtonsContainer.appendChild(scheduledButton);
        sidebarButtonsContainer.appendChild(projectsButton);
    
        const homepageImage = createDomElement('img', {
            id: 'homepage-image',
            src: homepageImagePng,
            alt: 'homepage-image'
        });
    
        sidebar.appendChild(sidebarButtonsContainer);
        sidebar.appendChild(homepageImage);
    }

    function setupSidebarButtons() {
        const homeBtn = document.getElementById('home-button');
        const todayBtn = document.getElementById('today-button');
        const scheduledBtn = document.getElementById('scheduled-button');
        const projectsBtn = document.getElementById('projects-button');
        
        homeBtn.addEventListener('click', () => {
            renderAllTasks();
        });

        todayBtn.addEventListener('click', () => {
            renderToDayTasks();
        });

        scheduledBtn.addEventListener('click', () => {
            renderScheduledTasks();
        });

        projectsBtn.addEventListener('click', () => {
            renderProjects();
            setupProjectEditButtons();
        });
    }

    function renderScheduledTasks() {
        const scheduledTasks = toDoManager.getAllTasks().filter(task => {
            const taskDate = new Date(task.dueDate);
            const today = new Date();
            return taskDate > today;
        });
        renderTaskList(scheduledTasks, 'Scheduled');
    }

    function renderToDayTasks() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = toDoManager.getAllTasks().filter(task => task.dueDate === today);
        renderTaskList(todayTasks, 'Today');
    }

    function setupProjectEditButtons() {
        const editButtons = document.querySelectorAll('.edit-modal-button[data-type="projectEdit"]');
    
        editButtons.forEach(button => { 
            button.addEventListener('click', () => {
                const projectId = button.closest('.card-container').dataset.projectId;
                currentProjectID = projectId;
    
                renderProjectModal();
                setupModal();
    
                const modalForm = document.getElementById('task-form');
                modalForm.dataset.type = 'projectEdit';
    
                const currentProject = toDoManager.getProjectByID(currentProjectID);
    
                const editProjectTitle = document.getElementById('modal-task-title');
                editProjectTitle.value = currentProject.title;
    
                const editProjectDescription = document.getElementById('modal-task-description');
                editProjectDescription.value = currentProject.description;

                const taskButton = document.querySelector('.modal-task-button');
                const projectButton = document.querySelector('.modal-project-button');
                taskButton.classList.toggle('button-on', false);
                projectButton.classList.toggle('button-on', true);
    
                const modal = document.getElementById('modal');
                modal.showModal();
            });
        });
    }

    function renderProjects() {
        const cardsContainer = document.getElementById('cards');
        const title = document.getElementById('title');
    
        title.textContent = 'Projects';
        cardsContainer.innerHTML = '';

        toDoManager.getProjects().forEach(project => {
            const cardContainer = createDomElement('div', { class: 'card-container' });
            cardContainer.dataset.projectId = project.id;
    
            const taskTitleContainer = createDomElement('div', { class: 'task-title-container' });
    
            const leftDiv = createDomElement('div', { class: 'left' });

            const tasksCounterDiv = createDomElement('div', {class: 'task-counter-container'});
            const taskCounter = createDomElement('p', {class: 'task-counter'});
            taskCounter.textContent = project.tasks.length;

            tasksCounterDiv.appendChild(taskCounter);

            const headingButton = createDomElement('button', { class: 'card-heading-button' });
            const heading = createDomElement('h3');
            heading.textContent = project.title;
            headingButton.appendChild(heading);

            headingButton.addEventListener('click', () => {
                toDoManager.setCurrentProject(project);
                renderUI();
            });
            
            leftDiv.appendChild(tasksCounterDiv);
            leftDiv.appendChild(headingButton);
            
            const rightDiv = createDomElement('div', { class: 'right' });
            
            
            const editButton = createDomElement('button');
            editButton.classList.add('edit-modal-button');
            editButton.dataset.type = "projectEdit";
            const editIcon = createDomElement('img', { src: editIconSvg, alt: 'edit-icon' });
            editButton.appendChild(editIcon);

            editButton.addEventListener('click', () => {
                currentProjectID = project.id;
            });
            
            const deleteButton = createDomElement('button');
            const deleteIcon = createDomElement('img', { src: deleteIconSvg, alt: 'delete-icon' });
            deleteButton.appendChild(deleteIcon);

            deleteButton.addEventListener('click', () => {

                cardContainer.classList.toggle('fade-out');

                cardContainer.addEventListener('animationend', () => {
                    toDoManager.removeProject(project.id);
                    }, { once: true });
            
                clearTimeout(renderTimeout);
            
                renderTimeout = setTimeout(() => {
                    renderProjects();
                }, 1250);
            });
            
            rightDiv.appendChild(editButton);
            rightDiv.appendChild(deleteButton);
            
            taskTitleContainer.appendChild(leftDiv);
            taskTitleContainer.appendChild(rightDiv);
    
            cardContainer.appendChild(taskTitleContainer);
    
            if (!!project.description) {
                const taskDescriptionContainer = createDomElement('div', { class: 'task-description-container' });
                
                const descriptionHeading = createDomElement('h4', { class: 'task-description-heading' });
                descriptionHeading.textContent = 'Description';
    
                const taskDescriptionText = createDomElement('p', { class: 'task-description-text' });
                taskDescriptionText.textContent = project.description;
    
                taskDescriptionContainer.appendChild(descriptionHeading);
                taskDescriptionContainer.appendChild(taskDescriptionText);
    
                cardContainer.appendChild(taskDescriptionContainer);
            }
    
            cardsContainer.appendChild(cardContainer);
        });
    }

    function renderTaskList(tasks, titleText) {
        const cardsContainer = document.getElementById('cards');
        const title = document.getElementById('title');
    
        title.textContent = titleText;
        cardsContainer.innerHTML = '';
    
        tasks.forEach(task => {
            const cardContainer = createDomElement('div', { class: 'card-container' });
            cardContainer.dataset.taskId = task.id;
            cardContainer.dataset.completed = task.completed;

            if (task.completed) {
                cardContainer.classList.toggle('checked');
            }
    
            const taskTitleContainer = createDomElement('div', { class: 'task-title-container' });
    
            const leftDiv = createDomElement('div', { class: 'left' });
            
            const checkboxWrapper = createDomElement('div', { class: 'checkbox-wrapper' });
            const label = createDomElement('label');
            const input = createDomElement('input', { type: 'checkbox' });
            input.checked = task.completed;
            const customCheckbox = createDomElement('span', { class: 'custom-checkbox' });

            input.addEventListener('change', () => {
                cardContainer.classList.toggle('checked');
                task.completed = !task.completed;
            });
            
            label.appendChild(input);
            label.appendChild(customCheckbox);
            checkboxWrapper.appendChild(label);
            
            const heading = createDomElement('h3');
            heading.textContent = task.title;
            
            const priority = createDomElement('p', { class: 'priority-level' });

            const priorityLevels = {
                low: [
                    { class: 'low-priority-level', text: '!', color: '#BFC6B3' }
                ],
                medium: [
                    { class: 'medium-priority-level', text: '!', color: '#C9A798' },
                    { class: 'medium-priority-level', text: '!', color: '#E6B8A2' }
                ],
                high: [
                    { class: 'high-priority-level', text: '!', color: '#C9A798' },
                    { class: 'high-priority-level', text: '!', color: '#E6B8A2' },
                    { class: 'high-priority-level', text: '!', color: '#FF6B6B' }
                ]
            };
            
            const priorityElements = priorityLevels[task.priority] || [];
            
            priorityElements.forEach(element => {
                const priorityElement = createDomElement('span', { class: element.class });
                priorityElement.textContent = element.text;
                priorityElement.style.color = element.color;
                priority.appendChild(priorityElement);
            });
            
            
            leftDiv.appendChild(checkboxWrapper);
            leftDiv.appendChild(heading);
            leftDiv.appendChild(priority);
            
            const rightDiv = createDomElement('div', { class: 'right' });
            
            const dueDate = createDomElement('p', { class: 'task-duedate' });
            dueDate.textContent = task.dueDate;
            
            const editButton = createDomElement('button');
            editButton.classList.add('edit-modal-button');
            const editIcon = createDomElement('img', { src: editIconSvg, alt: 'edit-icon' });
            editButton.appendChild(editIcon);

            editButton.addEventListener('click', () => {
                currentTaskID = task.id;
            });
            
            const deleteButton = createDomElement('button');
            const deleteIcon = createDomElement('img', { src: deleteIconSvg, alt: 'delete-icon' });
            deleteButton.appendChild(deleteIcon);

            deleteButton.addEventListener('click', () => {

                cardContainer.classList.toggle('fade-out');

                cardContainer.addEventListener('animationend', () => {
                    toDoManager.removeTask(task.id);
                    }, { once: true });
            
                clearTimeout(renderTimeout);
            
                renderTimeout = setTimeout(() => {
                    renderUI();
                }, 1250);
            });
            
            rightDiv.appendChild(dueDate);
            rightDiv.appendChild(editButton);
            rightDiv.appendChild(deleteButton);
            
            taskTitleContainer.appendChild(leftDiv);
            taskTitleContainer.appendChild(rightDiv);
    
            cardContainer.appendChild(taskTitleContainer);
    
            if (!!task.description) {
                const taskDescriptionContainer = createDomElement('div', { class: 'task-description-container' });
                
                const descriptionHeading = createDomElement('h4', { class: 'task-description-heading' });
                descriptionHeading.textContent = 'Description';
    
                const taskDescriptionText = createDomElement('p', { class: 'task-description-text' });
                taskDescriptionText.textContent = task.description;
    
                taskDescriptionContainer.appendChild(descriptionHeading);
                taskDescriptionContainer.appendChild(taskDescriptionText);
    
                cardContainer.appendChild(taskDescriptionContainer);
            }
    
            cardsContainer.appendChild(cardContainer);
        });
    }

    function renderTasks() {
        const currentProject = toDoManager.getCurrentProject();
        renderTaskList(currentProject.tasks, currentProject.title);
    }
    
    function renderAllTasks() {
        const allTasks = toDoManager.getAllTasks();
        renderTaskList(allTasks, 'Home');
    }

    return {
        renderTasks,
        renderAllTasks,
        renderSidebarButtons,
        renderUI
    };
})();
