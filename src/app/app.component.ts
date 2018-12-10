import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskDataService} from './tasks/task-data.service';
import {Task} from './tasks/task';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TaskDataService]
})
export class AppComponent {

    public newTask: Task = new Task();

    public currentFilter = 0;

    public filters = {
        0: 'All',
        1: 'Completed',
        2: 'Not completed',
    };

    public form: FormGroup = new FormGroup({
        task: new FormControl()
    });

    constructor(private taskDataService: TaskDataService) {
    }

    get taskList(): Task[] {
        console.log(this.currentFilter);
        switch (this.currentFilter) {
            case 0: {
                return this.taskDataService.getAllTasks();
            }
            case 1: {
                return this.taskDataService.getTaskByState(true);
            }
            case 2: {
                return this.taskDataService.getTaskByState(false);
            }
        }
    }

    addTask() {
        if (this.form.value.task) {
            this.newTask.title = this.form.value.task;
            this.taskDataService.addTask(this.newTask);
            this.newTask = new Task();
            this.form.reset();
            console.log(this.taskDataService.tasks);
        }
    }

    removeTask(task: Task) {
        this.taskDataService.deleteTaskById(task.id);
        console.log(this.taskDataService.tasks);
    }

    changeTaskState(task: Task) {
        this.taskDataService.changeState(task);
        console.log(this.taskDataService.tasks);
    }

    onSelect(filter: number) {
        this.currentFilter = filter;
    }
}


