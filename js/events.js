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
    this.ui.addTaskInputEventListener(this.addTaskWithoutDetails.bind(this));

    // Adding event lister to add details button
    this.ui.addDetailsEventListener(this.openDetails.bind(this));
  }

  addTaskWithoutDetails(e) {
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

  openDetails(e) {
    // Displaying task details pop up
    this.ui.displayTaskDetails(e);

    // Adding event listener to the cancel button
    this.ui.cancelEventListener(this.ui.closeDetails.bind(this.ui));

    // Adding event listener to the Add task button
    this.ui.addTaskBtnEventListener(this.addTask.bind(this));
  }

  addTask() {
    // Getting task data
    let data = this.ui.getDetails();

    // Adding task to the list
    let task = this.taskList.addTask(
      data.title,
      data.description,
      data.dueDate
    );

    // Adding task to UI
    this.ui.addTaskToUi(task);

    // Closing task details
    this.ui.closeDetails();
  }
}
