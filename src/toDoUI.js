import { toDoManager } from "./toDoManager";
import editIconSvg from "/images/edit.svg";
import deleteIconSvg from "/images/delete.svg";
import homeIconSvg from "/images/home.svg";
import toDayTasksIconSvg from "/images/today.svg";
import scheduledIconSvg from "/images/scheduled.svg";
import projectsIconSvg from "/images/projects.svg";
import homepageImagePng from "/images/homepage-icon.png";

export const toDoUI = (function() {

    function createDomElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    function renderUI() {
        renderSidebarButtons();
        renderTasks();
    }

    function renderSidebarButtons() {
        const sidebar = document.getElementById('sidebar');

        const sidebarButtons = createDomElement('div', { id: 'sidebar-buttons' });
        
        const buttonsData = [
            { src: homeIconSvg, alt: 'home-icon', text: 'Home' },
            { src: toDayTasksIconSvg, alt: 'today-tasks-icon', text: 'Today' },
            { src: scheduledIconSvg, alt: 'scheduled-icon', text: 'Scheduled' },
            { src: projectsIconSvg, alt: 'projects-icon', text: 'Projects' },
        ];
        
        buttonsData.forEach(data => {
            const button = createDomElement('button');
            const img = createDomElement('img', { class: 'sidebar-icon', src: data.src, alt: data.alt });
            button.appendChild(img);
            button.appendChild(document.createTextNode(data.text));
            sidebarButtons.appendChild(button);
        });
        
        const homepageImage = createDomElement('img', {
            id: 'homepage-image',
            src: homepageImagePng,
            alt: 'homepage-image'
        });

        sidebar.appendChild(sidebarButtons);
        sidebar.appendChild(homepageImage);
    }

    function renderAllTasks() {
        const cardsContainer = document.getElementById('cards');

        const title = document.getElementById('title');
        title.textContent = 'Home';

        cardsContainer.innerHTML = '';

        toDoManager.getProjects().forEach(project => project.tasks.forEach(task => {
            const cardContainer = createDomElement('div', { class: 'card-container' });
            cardContainer.dataset.taskId = task.id;

            const leftDiv = createDomElement('div', { class: 'left' });
            
            const checkboxWrapper = createDomElement('div', { class: 'checkbox-wrapper' });
            const label = createDomElement('label');
            const input = createDomElement('input', { type: 'checkbox' });
            const customCheckbox = createDomElement('span', { class: 'custom-checkbox' });
            
            label.appendChild(input);
            label.appendChild(customCheckbox);
            checkboxWrapper.appendChild(label);
            
            const heading = createDomElement('h3');
            heading.textContent = task.title;
            
            const priority = createDomElement('p', { class: 'low-priority-style' });
            priority.textContent = task.priority;
            
            leftDiv.appendChild(checkboxWrapper);
            leftDiv.appendChild(heading);
            leftDiv.appendChild(priority);
            
            const rightDiv = createDomElement('div', { class: 'right' });
            
            const dueDate = createDomElement('p', { class: 'task-duedate' });
            dueDate.textContent = task.dueDate;
            
            const editButton = createDomElement('button');
            const editIcon = createDomElement('img', { src: editIconSvg, alt: 'edit-icon' });
            editButton.appendChild(editIcon);
            
            const deleteButton = createDomElement('button');
            const deleteIcon = createDomElement('img', { src: deleteIconSvg, alt: 'delete-icon' });
            deleteButton.appendChild(deleteIcon);
            
            rightDiv.appendChild(dueDate);
            rightDiv.appendChild(editButton);
            rightDiv.appendChild(deleteButton);
            
            cardContainer.appendChild(leftDiv);
            cardContainer.appendChild(rightDiv);
            
            cardsContainer.appendChild(cardContainer);
        }));
    }

    function renderTasks() {
        const cardsContainer = document.getElementById('cards');

        const title = document.getElementById('title');
        title.textContent = toDoManager.getCurrentProject().title;

        cardsContainer.innerHTML = '';

        toDoManager.getCurrentProject().tasks.forEach(task => {
            const cardContainer = createDomElement('div', { class: 'card-container' });
            cardContainer.dataset.taskId = task.id;

            const taskTitleContainer = createDomElement('div', { class: 'task-title-container' });

            const leftDiv = createDomElement('div', { class: 'left' });
            
            const checkboxWrapper = createDomElement('div', { class: 'checkbox-wrapper' });
            const label = createDomElement('label');
            const input = createDomElement('input', { type: 'checkbox' });
            const customCheckbox = createDomElement('span', { class: 'custom-checkbox' });
            
            label.appendChild(input);
            label.appendChild(customCheckbox);
            checkboxWrapper.appendChild(label);
            
            const heading = createDomElement('h3');
            heading.textContent = task.title;
            
            const priority = createDomElement('p', { class: 'priority-level' });

            const priorityLevels = {
                low: {
                    elements: [
                        { class: 'low-priority-level', text: '!', color: '#BFC6B3' }
                    ]
                },
                medium: {
                    elements: [
                        { class: 'medium-priority-level', text: '!', color: '#C9A798' },
                        { class: 'medium-priority-level', text: '!', color: '#E6B8A2' }
                    ]
                },
                high: {
                    elements: [
                        { class: 'high-priority-level', text: '!', color: '#C9A798' },
                        { class: 'high-priority-level', text: '!', color: '#E6B8A2' },
                        { class: 'high-priority-level', text: '!', color: '#FF6B6B' }
                    ]
                }
            };
            
            const currentPriority = priorityLevels[task.priority] || {};
            
            currentPriority.elements.forEach(element => {
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
            const editIcon = createDomElement('img', { src: editIconSvg, alt: 'edit-icon' });
            editButton.appendChild(editIcon);
            
            const deleteButton = createDomElement('button');
            const deleteIcon = createDomElement('img', { src: deleteIconSvg, alt: 'delete-icon' });
            deleteButton.appendChild(deleteIcon);
            
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

    return {
        renderTasks,
        renderAllTasks,
        renderSidebarButtons,
        renderUI
    };
})();