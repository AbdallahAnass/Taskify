export default class UI {
  constructor() {
    this.mainList = document.getElementById("main-list");
    this.addTaskInputField = document.getElementById("add-task");
    this.lastTaskReference = null;
  }

  displayTasks(list) {
    // If no task (list is empty)
    if (list.length === 0) {
      // Displaying message to the user
      this.displayNoTasksMessage();
    } else {
      // Clearing the screen
      this.mainList.innerHTML = "";

      // Iterating over each element of the list reversed
      for (let i = list.length - 1; i >= 0; i--) {
        // Creating a task element
        let element = this.createTaskElement(list[i]);

        // Adding element to the DOM
        this.mainList.append(element);

        // Updating the last task reference
        if (i == list.length - 1) {
          this.updateLastTaskReference(list[i].id);
        }
      }
    }
  }

  createTaskElement(data) {
    // Creating main task element
    let element = document.createElement("div");
    element.className = "task";

    // Setting id of the task
    element.id = data.id;

    // Creating task button
    let btn = document.createElement("button");
    btn.className = "task__button";

    // Creating the content div
    let content = document.createElement("div");

    // Creating title div
    let title = document.createElement("div");
    title.className = "task__title";
    title.innerHTML = data.title;

    // Creating the date div
    let date = document.createElement("div");
    date.className = "task__date";

    // If a due date is available
    if (data.dueDate !== "notSet") {
      // Creating date object
      let dateObj = new Date(data.dueDate);

      // Converting date to the right form
      date.innerHTML = dateObj.toDateString();
    } else {
      // if due date is unavailable
      date.innerHTML = "";
    }

    // Adding title and date to content
    content.append(title);
    content.append(date);

    // Adding button and content to the main task element
    element.append(btn);
    element.append(content);

    // Returning the final element
    return element;
  }

  displayNoTasksMessage() {
    // Creating div to hold the message
    let message = document.createElement("div");

    // Filling the message
    message.innerHTML = "No tasks has been added yet!";

    // Adding the appropriate class
    message.className = "noTasks";

    // Adding the message to the DOM
    this.mainList.append(message);
  }

  addTaskInputEventListener(callback) {
    // Adding an event listener to add task input field
    this.addTaskInputField.addEventListener("keyup", callback);
  }

  clearInput(e) {
    e.target.value = "";
  }

  addTaskToUi(data) {
    // Creating task node element
    let element = this.createTaskElement(data);

    // Adding the element to tasks list in the DOM
    this.mainList.insertBefore(element, this.lastTaskReference);

    // Updating the last task reference
    this.updateLastTaskReference(data.id);
  }

  updateLastTaskReference(taskId) {
    // Updating the last Task property
    this.lastTaskReference = document.getElementById(taskId);
  }
}
