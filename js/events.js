import UI from "./ui.js";
import TaskList from "./TaskList.js";
import { loadFromStorage } from "./storage.js";

export default class Events {
  constructor() {
    this.ui = new UI();
    this.taskList = new TaskList();
  }

  initialize() {
    // Loading tasks from Storage
    let data = loadFromStorage();

    // Adding tasks from storage to the Tasklist
    this.taskList.addTasksFromStorage(data);

    // Getting the list of tasks
    let tasks = this.taskList.list;

    // Displaying tasks in UI
    this.ui.displayTasks(tasks);
  }
}
