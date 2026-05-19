import { LightningElement,wire } from 'lwc';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from '@salesforce/messageChannel/ExpenseChannel__c';


export default class ExpenseApp extends LightningElement {
    expensive=[];
    total_expensive=0;

    @wire(MessageContext)
    messageContext;


    addElementHandler(event){
        console.log("Event Handler--->",JSON.stringify(event.detail));
        let add_expensive=event.detail;
        this.expensive=[...this.expensive,{...add_expensive}]
        console.log("this.expensive--->",JSON.stringify(this.expensive));

         // Calculate total
        this.total_expensive =this.expensive.reduce(
            (total,currItem)=>
                total + Number(currItem.amount),
            0
        );
        console.log("total expensive---->",this.total_expensive);

    
        const payload={expensive:this.expensive}
        publish(this.messageContext, recordSelected, payload);


    }

  

    deleteHandler(event){
        console.log("Event Delete Handler--->",JSON.stringify(event.detail));
        let selected_name=event.detail;
        this.expensive=this.expensive.filter((currItem)=>currItem.name!==selected_name);

         // Recalculate total
    this.total_expensive =
        this.expensive.reduce(
            (total,currItem)=>
                total + Number(currItem.amount),
            0
        );

    console.log(
        "Updated Total --->",
        this.total_expensive
    );

    }


}