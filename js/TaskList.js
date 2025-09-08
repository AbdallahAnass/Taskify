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
}
