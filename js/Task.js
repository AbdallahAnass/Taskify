export default class Task {
  constructor(id, title, description, dueDate, isCompleted) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
  }
}
