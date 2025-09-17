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

    // Adding event listener to add task input field
    this.ui.addTaskInputEventListener(this.addTask.bind(this));
  }

  addTask(e) {
    if (e.key == "Enter") {
      // Getting title value from the input field
      let title = e.target.value;

      // Adding task to the list (default task with title only with no information)
      let task = this.taskList.addTask(title);

      // Adding task to UI
      this.ui.addTaskToUi(task);

      // Clearing the input
      this.ui.clearInput(e);
    }
  }
}
