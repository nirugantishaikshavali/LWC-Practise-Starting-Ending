import { LightningElement } from 'lwc';

export default class ToDoApplication extends LightningElement {

    selectedData = {
        task: "",
        date: ""
    };

    incompleteTask = [];
    completeTask = [];

    changeHandler(event) {
        const { name, value } = event.target;
        this.selectedData = {
            ...this.selectedData,
            [name]: value
        };
    }

    addTaskHandler() {
        console.log(
            "Selected Items --->",
            JSON.stringify(this.selectedData)
        );

        // Execute validation
        if (this.validation()) {

            // Store task
            this.incompleteTask = [
                ...this.incompleteTask,
                { ...this.selectedData }
            ];

            // Sort by date
            this.incompleteTask =
                this.sortHandler(this.incompleteTask);

            console.log(
                "Incomplete Tasks --->",
                JSON.stringify(this.incompleteTask)
            );

            // Reset form
            this.resetHandler();
        }
    }

    sortHandler(incompleteTask) {
        return incompleteTask.sort(
            (a, b) =>
                new Date(a.date) - new Date(b.date)
        );
    }

    resetHandler() {
        this.selectedData = {
            task: "",
            date: ""
        };
    }

    validation() {

        let isValid = true;

        // Get input
        let inputTask =
            this.template.querySelector(".input-task");

        // Clear old errors
        inputTask.setCustomValidity("");

        // Empty task validation
        if (!this.selectedData.task.trim()) {

            inputTask.setCustomValidity(
                "Task is required"
            );

            isValid = false;
        }

        // If date empty -> set today's date
        if (!this.selectedData.date) {

            this.selectedData = {
                ...this.selectedData,
                date: new Date()
                    .toISOString()
                    .split('T')[0]
            };
        }

        // Duplicate validation
        let taskExist = this.incompleteTask.find(
            (currItem) =>
                currItem.task.toLowerCase().trim()===this.selectedData.task.toLowerCase().trim() 
        );

        if (taskExist) {

            inputTask.setCustomValidity(
                "Task already exists"
            );

            isValid = false;
        }

        // Show errors
        inputTask.reportValidity();

        return isValid;
    }



    completeTaskHandler(event){

        const selectedTask=event.target.dataset.task;

        const taskRecord=this.incompleteTask.find(currItem=>currItem.task===selectedTask);// it will return single object

        // Remove from incompleteTask
        this.incompleteTask = this.incompleteTask.filter(currItem => currItem.task !== selectedTask);

        //Add into completeTask
        this.completeTask=[...this.completeTask,taskRecord];

          console.log(
        "Incomplete --->",
        JSON.stringify(this.incompleteTask)
    );

    console.log(
        "Complete --->",
        JSON.stringify(this.completeTask)
    );

    }


    deleteTaskHandler(event){
        const selectedTask=event.target.dataset.task; 
        
        this.incompleteTask=this.incompleteTask.filter(currItem=>currItem.task!==selectedTask);
        


    }
}