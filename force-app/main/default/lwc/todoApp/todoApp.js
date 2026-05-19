import { LightningElement } from 'lwc';

export default class TodoApp extends LightningElement {

    incompleteTask = [];

    // Child -> Parent
    addTaskHandler(event){
        const taskData = event.detail;
        this.incompleteTask = [
            ...this.incompleteTask,
            taskData
        ];

        console.log(
            "Tasks --->",
            JSON.stringify(this.incompleteTask)
        );
    }

    deleteTaskHandler(event){

        const selectedId =
            Number(event.detail);

        this.incompleteTask =
            this.incompleteTask.filter(
                item => item.id !== selectedId
            );
    }
}