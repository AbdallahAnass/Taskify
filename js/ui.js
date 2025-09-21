export default class UI {
  constructor() {
    this.mainList = document.getElementById("main-list");
    this.addTaskInputField = document.getElementById("add-task");
    this.lastTaskReference = null;
    this.addDetailsBtn = document.getElementById("add-details");
    this.layer = document.getElementsByClassName("layer")[0];
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

  addDetailsEventListener(callback) {
    this.addDetailsBtn.addEventListener("click", callback);
  }

  displayTaskDetails(e) {
    // Displaying the layer over the page
    this.layer.style.display = "block";

    // Creating main container for the message
    let container = document.createElement("div");
    container.className = "task-details";

    // Creating the task title section
    let title = document.createElement("h2");
    title.innerHTML = "Task Title";

    let titleInput = document.createElement("input");
    titleInput.type = "input";
    titleInput.id = "title";

    // Creating the task description section
    let taskDescription = document.createElement("h2");
    taskDescription.innerHTML = "Task Description";

    let descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.className = "task-details__description";
    descriptionTextarea.id = "description";

    // Creating the task due date section
    let taskDueDate = document.createElement("h2");
    taskDueDate.innerHTML = "Task Due Date";

    let dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.className = "task-details__due-date";
    dueDateInput.id = "date";

    // Creating the buttons section
    let buttonsSection = document.createElement("task-details__buttons");
    buttonsSection.className = "task-details__buttons";

    let cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.id = "cancel";

    let addTaskBtn = document.createElement("button");
    addTaskBtn.innerHTML = "Add Task";
    addTaskBtn.id = "add";

    buttonsSection.append(cancelBtn, addTaskBtn);

    // Filling the content based on the event
    if (e.target.id == "add-details") {
      // If event is trigger from the add-details button
      titleInput.value = this.addTaskInputField.value;

      // Clearing the input
      this.addTaskInputField.value = "";
    }

    // Adding all the element to the main container
    container.append(
      title,
      titleInput,
      taskDescription,
      descriptionTextarea,
      taskDueDate,
      dueDateInput,
      buttonsSection
    );

    // Adding the container to the DOM
    document.body.append(container);
  }

  cancelEventListener(callback) {
    document.getElementById("cancel").addEventListener("click", callback);
  }

  closeDetails() {
    // Hidden the layer
    this.layer.style.display = "none";

    // Removing the details element
    document.getElementsByClassName("task-details")[0].remove();
  }

  addTaskBtnEventListener(callback) {
    document.getElementById("add").addEventListener("click", callback);
  }

  getDetails() {
    // Getting task title value
    let title = document.getElementById("title").value;

    // Getting task description
    let description = document.getElementById("description").value;

    // Getting task due date
    let dueDate = document.getElementById("date").value;

    // No date is entered
    if (dueDate == "") {
      dueDate = "notSet";
    } else {
      // Decreasing month by one (Because Date object is zero based)
      let [year, month, day] = dueDate.split("-");
      month -= 1;

      // Converting dueDate to a data object
      dueDate = new Date(year, month, day);
    }

    // Returning the data of the task
    return {
      title: title,
      description: description,
      dueDate: dueDate,
    };
  }
}
