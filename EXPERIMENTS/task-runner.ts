export {};
enum TaskStatus {
  pending, inProgress, completed
}

interface Task {
  id: number;
  title: string;
  priority: number;
  status: TaskStatus;
}

class TaskManager {
  private array: Task[];
  public addTask(task: Task) {
    this.array.push(task);
  }
  public getNextTask() {
    if (this.array.length === 0) return null;
    let highestPriorityIndex: number = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].status === TaskStatus.pending) {
        if (this.array[i].priority === 5) {
          return this.array[i];
        } else if (
          this.array[i].priority > this.array[highestPriorityIndex].priority
        ) {
          highestPriorityIndex = i;
        }
      }
    }
    return this.array[highestPriorityIndex];
  }
  public updateStatus(id: number, status: TaskStatus) {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].id === id) {
        this.array[i].status = status;
      }
    }
  }
  public constructor() {
    this.array = [];
  }
}

const demo = () => {
  const tm: TaskManager = new TaskManager();

  const task1: Task = {
    id: 1,
    title: "Make coffee",
    priority: 2,
    status: TaskStatus.pending

  }
  const task2: Task = {
    id: 2,
    title: "Study",
    priority: 5,
    status: TaskStatus.pending

  }

  tm.addTask(task1);
  tm.addTask(task2);
  let nextTask: Task | null = tm.getNextTask();
  if (!nextTask) return;
  console.log(nextTask);
  tm.updateStatus(nextTask.id, TaskStatus.completed);
  console.log(tm.getNextTask());
  
}

demo();