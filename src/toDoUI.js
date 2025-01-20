import { toDoManager } from "./toDoManager";
import informationIconSrc from "/images/information-icon.png";
import deleteIconSrc from "/images/delete-icon.png";

export const toDoUI = (function() {
    let renderTimeout;

    let toDoProjects = toDoManager.getProjects();

    function createDomElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    function renderContent() {
        renderProjectsPreview();
        renderToDos();
        renderNewToDoButton();
        renderNewProjectButton();
    }
    
    function renderToDos() {
        const projectTitle = document.querySelector('.project-title');
        projectTitle.textContent = toDoManager.getCurrentProject().title;

        const toDoList = document.getElementById('todo-list');
        toDoList.innerHTML = '';

        toDoManager.getCurrentProject().toDos.forEach(toDo => {
            const todoContainer = createDomElement('div', { class: 'todo-container' });
    
            const checkboxContainer = createDomElement('div', { class: 'todo-checkbox-container' });
            const label = createDomElement('label');
            const checkbox = createDomElement('input', { type: 'checkbox', name: 'task-completed', class: 'todo-checkbox' });
            const checkmark = createDomElement('span', { class: 'checkmark' });
            
            label.appendChild(checkbox);
            label.appendChild(checkmark);
            checkboxContainer.appendChild(label);
        
            const titleContainer = createDomElement('div', { class: 'todo-title-container' });
            const todoTitle = createDomElement('h3', { class: 'todo-title' });
            todoTitle.textContent = toDo.title;
            
            const iconsContainer = createDomElement('div', { class: 'todo-title-icons-container' });
            const infoButton = createDomElement('button', { class: 'info-button' });
            const infoIcon = createDomElement('img', { class: 'info-icon', src: `${informationIconSrc}`, alt: 'info-icon' });
            infoButton.appendChild(infoIcon);
            
            const deleteButton = createDomElement('button', { class: 'delete-button' });
            const deleteIcon = createDomElement('img', { class: 'delete-icon', src: `${deleteIconSrc}`, alt: 'delete-icon' });
            deleteButton.appendChild(deleteIcon);
            
            iconsContainer.appendChild(infoButton);
            iconsContainer.appendChild(deleteButton);
            titleContainer.appendChild(todoTitle);
            titleContainer.appendChild(iconsContainer);
        
            const descriptionContainer = createDomElement('div', { class: 'todo-description-container' });
            const todoDescription = createDomElement('p', { class: 'todo-description' });
            todoDescription.textContent = toDo.description;
            descriptionContainer.appendChild(todoDescription);
        
            todoContainer.appendChild(checkboxContainer);
            todoContainer.appendChild(titleContainer);
            todoContainer.appendChild(descriptionContainer);

            toDoList.appendChild(todoContainer);
            
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    todoContainer.classList.add('fade-out');
            
                    toDo.completed = true;
            
                    todoContainer.addEventListener('animationend', () => {
                        toDoManager.removeTodo(toDo.id);
                    }, { once: true });
                } else {
                    toDo.completed = false;
                }
            
                clearTimeout(renderTimeout);
            
                renderTimeout = setTimeout(() => {
                    renderToDos();
                }, 1250);
            });
        });
    }

    function renderProjectsPreview() {
        const projectsList = document.getElementById('projects-preview');

        toDoProjects.forEach(project => {
            const projectListItem = document.createElement('li');
            projectListItem.classList.add('project-preview-title');

            const projectButton = document.createElement('button');
            projectButton.classList.add('project-preview-button');
            projectButton.textContent = project.title;
            projectButton.addEventListener('click', () => {
                toDoManager.setCurrentProject(project);
                renderToDos()
            });

            projectListItem.appendChild(projectButton);

            projectsList.appendChild(projectListItem);
        });
    }

    function renderNewToDoButton() {
        const openModalBtn = document.getElementById('new-todo-open-modal');
        const closeModalBtn = document.getElementById('new-todo-cancel-modal');
        const modalForm = document.getElementById('new-todo-form');
        const dialogElement = document.getElementById('new-todo-modal');

        openModalBtn.addEventListener('click', () => {
            dialogElement.showModal();
        });

        closeModalBtn.addEventListener('click', () => {
            dialogElement.close();
        });

        modalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = new FormData(modalForm);
            const title = formData.get('todo-title');
            const description = formData.get('todo-description');
            const priority = formData.get('todo-priority');
            const dueDate = formData.get('todo-dueDate');
            const notes = formData.get('todo-notes');

            toDoManager.addToDo(title, description, toDoManager.getCurrentProject().title, priority, dueDate, notes);
            renderToDos();
            dialogElement.close();
            modalForm.reset();
        });

        dialogElement.addEventListener('click', e => {
            const dialogDimensions = dialogElement.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                dialogElement.close()
            }
        });
    }

    function renderNewProjectButton() {
        const openModalBtn = document.getElementById('new-project-open-modal');
        const closeModalBtn = document.getElementById('new-project-cancel-modal');
        const modalForm = document.getElementById('new-project-form');
        const dialogElement = document.getElementById('new-project-modal');
    
        openModalBtn.addEventListener('click', () => {
            dialogElement.showModal();
        });
    
        closeModalBtn.addEventListener('click', () => {
            dialogElement.close();
        });
    
        modalForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = new FormData(modalForm);
            const title = formData.get('project-title');
            const description = formData.get('project-description');
    
            toDoManager.addProject(title, description);
            renderProjectsPreview();
            dialogElement.close();
            modalForm.reset();
        });
    
        dialogElement.addEventListener('click', e => {
            const dialogDimensions = dialogElement.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                dialogElement.close();
            }
        });
    }

    return {
        renderProjectsPreview,
        renderToDos,
        renderContent,
    };
})();