import { LightningElement, api } from 'lwc';

export default class TaskList extends LightningElement {

    // Parent -> Child
    @api tasks;

    deleteHandler(event){

        const selectedId =
            event.target.dataset.id;

        // Child -> Parent
        this.dispatchEvent(

            new CustomEvent(
                "delete",
                {
                    detail:selectedId
                }
            )
        );
    }
}