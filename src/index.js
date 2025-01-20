import "/styles/styles.css";
import "/styles/main-content.css";
import "/styles/sidebar.css"
import "/styles/reset.css";
import "/styles/new-todo-modal.css";
import "/styles/font-family-combo.css";
import { toDoManager } from "./toDoManager.js";
import { toDoUI } from "./toDoUI.js";

// Console usage in Chrome DevTool
window.toDoManager = toDoManager;
window.toDoUI = toDoUI;

toDoManager.createProject('test');
toDoManager.createProject('tes2t');
toDoManager.createProject('test3');

toDoManager.addToDo();
toDoManager.addToDo();
toDoManager.addToDo();
toDoManager.addToDo();

toDoUI.renderContent();