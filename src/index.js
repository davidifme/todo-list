import { toDoManager } from "./toDoManager";
import { toDoUI } from "./toDoUI";

import "/styles/font-family-combo.css";
import "/styles/reset.css"
import "/styles/main.css";
import "/styles/sidebar.css";
import "/styles/modal.css";
import "/styles/content.css";
import "/styles/checkbox.css";
import "/styles/projects.css";

window.toDoManager = toDoManager;
window.toDoUI = toDoUI;

if (localStorage.getItem('projects')) {
    toDoManager.setProjects(JSON.parse(localStorage.getItem('projects')));
    toDoManager.setCurrentProject(toDoManager.getProjects()[0]);
} else {
    localStorage.setItem('projects', JSON.stringify(toDoManager.getProjects()));
}

toDoUI.renderUI();