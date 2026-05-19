import { LightningElement } from 'lwc';

export default class TaskForm extends LightningElement {

    task = "";
    changeHandler(event){
        this.task = event.target.value;
    }

    addTask(){
        if(!this.task.trim())
        {
            return;
        }

        const taskData = {
            id: Date.now(),
            task: this.task
        };

            this.dispatchEvent(
                new CustomEvent(
                    "addtask",
                    {
                        detail: taskData
                    }
                )
            );

        this.task = "";
    }

}