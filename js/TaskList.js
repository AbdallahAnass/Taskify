import Task from "./Task.js";

export default class TaskList {
  constructor() {
    this._list = [];
    this._completedTasks = [];
    this._lastID = 0;
    this._numOfActiveTasks = 0;
  }

  // Getters
  get list() {
    return this._list;
  }

  get lastID() {
    return this._lastID;
  }

  get list() {
    return this._list;
  }

  get numOfActiveTasks() {
    return this._numOfActiveTasks;
  }

  get completedTasks() {
    return this._completedTasks;
  }

  // Setters
  set list(list) {
    this._list = list;
  }

  set lastID(lastID) {
    this._lastID = lastID;
  }

  set list(list) {
    this._list = list;
  }

  set numOfActiveTasks(numOfActiveTasks) {
    this._numOfActiveTasks = numOfActiveTasks;
  }

  set completedTasks(completedTask) {
    this.completedTasks = completedTasks;
  }

  addTask(title, description, dueDate) {
    // No description entered
    if (description == undefined) {
      description = "";
    }
    // No due date entered
    if (dueDate == undefined) {
      dueDate = "notSet";
    }
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

    // Returning the task
    return task;
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
    currentDate.setHours(0, 0, 0, 0);

    if (dueDate < currentDate) {
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
    if (!this.validateEditedTitle(newTitle, id)) {
      throw new Error("Invalid title");
    }
    if (!this.validateDate(newDueDate)) {
      throw new Error("Invalid Date");
    }

    task.title = newTitle;
    task.description = newDescription;
    task.dueDate = newDueDate;

    // Returning task
    return task;
  }

  validateEditedTitle(title, id) {
    // Checking for empty title
    if (title == "" || title == null) {
      return false;
    }

    // Checking for a duplicated task other than the original task
    for (let task of this.list) {
      if (task.title == title && task.id != id) {
        return false;
      }
    }

    return true;
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

  searchTasks(word) {
    let listOfWords = [];

    // Iterating over the list
    for (let task of this.list) {
      // Adding matching titles
      if (task.title.startsWith(word)) {
        listOfWords.push(task);
      }
    }

    // Returning the filtered list
    return listOfWords;
  }

  addTasksFromStorage(data) {
    // Checking for empty list
    if (data.list.length == 0) {
      // Setting the lastId
      this.lastID = 0;

      // Setting the list to be empty
      this.list = [];
    } else {
      // Converting ID to a number and setting it in the TaskList object
      this.lastID = Number(data.lastId);

      // Converting the list string to a list of objects
      let tempList = JSON.parse(data.list);

      // Creating a Task object from each object and adding it to list
      for (let item of tempList) {
        let task = new Task();
        task.id = item._id;
        task.title = item._title;
        task.description = item._description;
        task.dueDate = item._dueDate;
        task.isCompleted = item._isCompleted;

        // Adding the task to the list
        this.list.push(task);
      }
    }
  }

  markTaskAsComplete(id) {
    // Searching the list for the task
    let task = this.getTaskById(id);

    // Marking task as complete
    task.isCompleted = true;

    // Adding the task to completed tasks list
    this.completedTasks.push(task);

    // Removing the task from the active tasks list

    // Getting the index of the task
    let index = this.list.indexOf(task);

    // Removing it from the list
    this.list.splice(index, 1);
  }

  getOverdue() {
    // Array to store the ids of the over due tasks
    let tempList = [];

    // Getting the current date
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Iterating over the array and adding over due tasks
    for (let task of this.list) {
      if (task.dueDate < currentDate && !task.isCompleted) {
        tempList.push(task.id);
      }
    }

    // Returning the final list
    return tempList;
  }

  initializeCount() {
    // Setting number of active tasks to length of the list
    this.numOfActiveTasks = this.list.length;

    // Returning the count
    return this.numOfActiveTasks;
  }

  updateCount(type) {
    if (type === "add") {
      // Increasing number on add
      this.numOfActiveTasks++;
    } else if (type === "remove") {
      // Decreasing number on remove
      this.numOfActiveTasks--;
    }

    // Returning the counts
    return this.numOfActiveTasks;
  }

  getAllTasks() {
    // Creating a combination of uncompleted and completed task (All tasks)
    let tempList = [];

    tempList.push(...this.list);
    tempList.push(...this.completedTasks);

    // Returning the combined list
    return tempList;
  }
}
