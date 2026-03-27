"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["pending"] = 0] = "pending";
    TaskStatus[TaskStatus["inProgress"] = 1] = "inProgress";
    TaskStatus[TaskStatus["completed"] = 2] = "completed";
})(TaskStatus || (TaskStatus = {}));
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.array = [];
    }
    TaskManager.prototype.addTask = function (task) {
        this.array.push(task);
    };
    TaskManager.prototype.getNextTask = function () {
        if (this.array.length === 0)
            return null;
        var highestPriorityIndex = 0;
        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i].status === TaskStatus.pending) {
                if (this.array[i].priority === 5) {
                    return this.array[i];
                }
                else if (this.array[i].priority > this.array[highestPriorityIndex].priority) {
                    highestPriorityIndex = i;
                }
            }
        }
        return this.array[highestPriorityIndex];
    };
    TaskManager.prototype.updateStatus = function (id, status) {
        for (var i = 0; i < this.array.length; i++) {
            if (this.array[i].id === id) {
                this.array[i].status = status;
            }
        }
    };
    return TaskManager;
}());
var demo = function () {
    var tm = new TaskManager();
    var task1 = {
        id: 1,
        title: "Make coffee",
        priority: 2,
        status: TaskStatus.pending
    };
    var task2 = {
        id: 2,
        title: "Study",
        priority: 5,
        status: TaskStatus.pending
    };
    tm.addTask(task1);
    tm.addTask(task2);
    var nextTask = tm.getNextTask();
    console.log(nextTask);
    tm.updateStatus(nextTask.id, TaskStatus.completed);
    console.log(tm.getNextTask());
};
demo();
