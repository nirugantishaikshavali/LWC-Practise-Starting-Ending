import { LightningElement,api } from 'lwc';

export default class ExpenseList extends LightningElement {
    @api expensive;

    deleteHandler(event){
        const selectedId=event.target.dataset.name;


        let events=new CustomEvent("deleteditem",{
            detail:selectedId
        })

        this.dispatchEvent(events);
    }
}