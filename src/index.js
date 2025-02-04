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

toDoManager.addTask('Task', 'Analyze and compare funding rates across major exchanges. Identify discrepancies, optimize your trading costs, and leverage market opportunities. Perfect for arbitrage and strategic insights.')
toDoManager.addTask('Task', 'Analyze and compare funding rates across major exchanges. Identify discrepancies, optimize your trading costs, and leverage market opportunities. Perfect for arbitrage and strategic insights.')

toDoManager.createProject('Project 2')

toDoUI.renderUI()