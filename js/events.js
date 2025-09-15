import UI from "./ui.js";
import TaskList from "./TaskList.js";

export default class Events {
  constructor() {
    this.ui = new UI();
    this.taskList = new TaskList();
  }

  initialize() {
    // Loading tasks from Storage
    this.taskList.loadTasks();

    // Getting the list of tasks
    let tasks = this.taskList.list;

    // Displaying tasks in UI
    this.ui.displayTasks(tasks);
  }
}
