import { LightningElement,wire } from 'lwc';
import {
    subscribe,
    MessageContext
}
from 'lightning/messageService';

import TASK_CHANNEL
from '@salesforce/messageChannel/TaskChannel__c';

export default class SubscriberComponent extends LightningElement {

    @wire(MessageContext)
messageContext;

connectedCallback(){

    subscribe(
        this.messageContext,
        TASK_CHANNEL,
        (message)=>{
            console.log("Message--->",message.task);
        }
    );
}


}