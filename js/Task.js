export default class Task {
  constructor(id, title, description, dueDate, isCompleted) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._isCompleted = isCompleted;
  }

  // Getters
  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get dueDate() {
    return this._dueDate;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get id() {
    return this._id;
  }

  // Setters
  set title(title) {
    this._title = title;
  }

  set description(description) {
    if (description == null) {
      description = "";
    }

    this._description = description;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  set isCompleted(isCompleted) {
    this._isCompleted = isCompleted;
  }

  set id(id) {
    this._id = id;
  }
}
