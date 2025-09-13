export function saveToStorage(list, lastId) {
  // Saving the tasks to storage
  localStorage.setItem("tasksList", JSON.stringify(list));

  // Saving the last ID generated
  localStorage.setItem("lastId", lastId);
}

export function loadFromStorage() {
  // Getting the last ID generated from storage
  let lastIdString = localStorage.getItem("lastId");

  // Getting the string of the list from storage
  let tasksString = localStorage.getItem("tasksList");

  // Data object
  let data = {};

  // Checking if there is no data in storage
  if (lastIdString == null || tasksString == null) {
    data.list = [];
    data.lastId = 0;
  } else {
    data.list = tasksString;
    data.lastId = lastIdString;
  }

  // Returning the object
  return data;
}
