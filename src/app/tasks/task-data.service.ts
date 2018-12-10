import {Injectable} from '@angular/core';
import {Task} from './task';

@Injectable()
export class TaskDataService {

    // Placeholder for last id so we can simulate
    // automatic incrementing of id's
    lastId = 0;

    // Placeholder for task's
    tasks: Task[] = [];

    constructor() {
    }

    // Simulate POST /tasks
    addTask(task: Task): TaskDataService {
        if (!task.id) {
            task.id = ++this.lastId;
        }
        this.tasks.push(task);
        return this;
    }

    // Simulate DELETE /tasks/:id
    deleteTaskById(id: number): TaskDataService {
        this.tasks = this.tasks
            .filter(task => task.id !== id);
        return this;
    }

    // Simulate PUT /tasks/:id
    updateTaskById(id: number, values: Object = {}): Task | any {
        const task = this.getTaskById(id);
        if (!task) {
            return this;
        }
        Object.assign(task, values);
        return task;
    }

    // Simulate GET /tasks
    getAllTasks(): Task[] {
        return this.tasks;
    }

    // Simulate GET /tasks/:id
    getTaskById(id: number): Task | any {
        return this.tasks
            .filter(task => task.id === id)
            .pop();
    }

    // Toggle task complete
    changeState(task: Task) {
        return this.updateTaskById(task.id, {
            completed: !task.completed
        });
    }

    getTaskByState(completed: boolean): Task[] {
        return this.tasks
            .filter(task => task.completed === completed);
    }
}
