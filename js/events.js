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

    // Getting the list of all tasks
    let tasks = this.taskList.getAllTasks();

    // Displaying tasks in UI
    this.ui.displayTasks(tasks);

    // Updating the num of items left
    let leftItems = this.taskList.initializeCount();

    // Displaying the new count
    this.ui.updateLeftItems(leftItems);

    // Marking overdue tasks
    this.markOverdue();

    // Adding event listener to add task input field
    this.ui.addTaskInputEventListener(this.addTaskWithoutDetails.bind(this));

    // Adding event listener to add details button
    this.ui.addDetailsEventListener(this.openDetails.bind(this));

    // Adding event listener to each task
    this.ui.taskEventListener(this.editTask.bind(this));
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

      // Updating the number of items left (increasing)
      let leftItems = this.taskList.updateCount("add");

      // Displaying the new count
      this.ui.updateLeftItems(leftItems);
    }
  }

  openDetails(e) {
    // Displaying task details pop up
    this.ui.displayTaskDetails(e, null);

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

    // Updating the number of items left (increasing)
    let leftItems = this.taskList.updateCount("add");

    // Displaying the new count
    this.ui.updateLeftItems(leftItems);
  }

  editTask(e) {
    // Checking that event is from clicking on a task
    if (e.target.className == "task") {
      // Getting task data
      let task = this.taskList.getTaskById(Number(e.target.id));

      // Displaying task details pop up
      this.ui.displayTaskDetails(e, task);

      // Adding event listener to the cancel button
      this.ui.cancelEventListener(this.ui.closeDetails.bind(this.ui));

      // Adding event listener to the update task button
      this.ui.updateEventListener(this.updateTask.bind(this, e));

      // Adding event listener to delete task button
      this.ui.deleteEventListener(this.deleteTask.bind(this, e));
    } else if (e.target.id == "done") {
      // If event is from clicking on a mark as complete button
      this.markTaskAsComplete(e);
    }
  }

  updateTask(e) {
    // Getting Task details
    let data = this.ui.getDetails();

    // Editing task in list
    let editedTask = this.taskList.editTask(
      Number(e.target.id),
      data.title,
      data.description,
      data.dueDate
    );

    // Applying the change to UI
    this.ui.editTaskUi(e.target.id, editedTask);

    // Closing the details
    this.ui.closeDetails();
  }

  markTaskAsComplete(e) {
    // Getting task id
    let id = Number(e.target.parentNode.id);

    // Marking task as complete in list
    if (!this.taskList.getTaskById(id).isCompleted) {
      this.taskList.markTaskAsComplete(id);
    } else {
      // Task already has been marked as completed, no action
      return;
    }

    // Marking task as complete in UI
    this.ui.markTask(id);

    // Moving the completed task to the end of the list in UI
    this.ui.moveTask(id);

    // Updating the number of items left (decreasing)
    let leftItems = this.taskList.updateCount("remove");

    // Displaying the new count
    this.ui.updateLeftItems(leftItems);
  }

  deleteTask(e) {
    // Getting task id
    let id = Number(e.target.id);

    // Deleting task from the task list
    this.taskList.deleteTask(id);

    // Deleting the task from UI
    this.ui.removeTask(id);

    // Closing the details
    this.ui.closeDetails();

    // Updating the number of items left (decreasing)
    let leftItems = this.taskList.updateCount("remove");

    // Displaying the new count
    this.ui.updateLeftItems(leftItems);
  }

  markOverdue() {
    // Getting list containing ids of the overdue Tasks
    let list = this.taskList.getOverdue();

    // Marking overdue tasks in the UI
    this.ui.markOverDueTasks(list);
  }
}
