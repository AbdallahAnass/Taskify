import Task from "./Task.js";

export default class TaskList {
  constructor() {
    this.list = [];
    this.lastID = 0;
  }

  addTask(title, description, dueDate) {
    // Validating title
    if (!this.validateTitle(title)) {
      throw new Error("Invalid title");
    }

    // Validating the dueDate
    if (!this.validateDate(dueDate)) {
      throw new Error("Invalid due date");
    }

    // Generating a new ID for task
    let id = this.generateID();

    // Creating a new task
    let task = new Task(id, title, description, dueDate, false);

    // Adding the task
    this.list.push(task);

    return true;
  }

  generateID() {
    this.lastID += 1;

    return this.lastID;
  }

  validateTitle(title) {
    // Checking for empty title
    if (title == "" || title == null) {
      return false;
    }

    // Checking for a duplicated task
    if (!this.isDuplicated(title)) {
      return false;
    }

    return true;
  }

  isDuplicated(title) {
    // Iterating over every task
    for (let task of this.list) {
      // Checking for a match
      if (task.title === title) {
        return false;
      }
    }

    // If no match found
    return true;
  }

  validateDate(dueDate) {
    // No due date yet
    if (dueDate === "notSet") return true;

    // Checking for dates in the past
    let currentDate = new Date();

    if (
      dueDate.getFullYear() < currentDate.getFullYear() ||
      dueDate.getMonth() < currentDate.getMonth() ||
      dueDate.getDate() < currentDate.getDate()
    ) {
      return false;
    }

    return true;
  }

  setDueDate(taskID, dueDate) {
    // Getting the task
    let task = this.getTaskById(taskID);

    // Validating the due date
    if (!this.validateDate(dueDate)) {
      throw new Error("Invalid Date");
    }

    // Setting the date
    task.dueDate = dueDate;
  }

  getTaskById(id) {
    // Iterating through the list of tasks
    for (let task of this.list) {
      if (task.id === id) {
        return task;
      }
    }

    // Task not found
    throw new Error("Invalid task id");
  }

  editTask(id, newTitle, newDescription, newDueDate) {
    // Getting the task
    let task = this.getTaskById(id);

    // Adding the new edits after validation
    if (!this.validateTitle(newTitle)) {
      throw new Error("Invalid title");
    }
    if (!this.validateDate(newDueDate)) {
      throw new Error("Invalid Date");
    }

    task.title = newTitle;
    task.description = newDescription;
    task.dueDate = newDueDate;
  }

  deleteTask(taskId) {
    // Searching for the task
    let task = this.getTaskById(taskId);

    // Deleting the task
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id == task.id) {
        this.list.splice(i, 1);
      }
    }
  }
}
