import { LightningElement, wire } from 'lwc';

import {
    publish,
    MessageContext
} from 'lightning/messageService';

import TASK_CHANNEL
from '@salesforce/messageChannel/TaskChannel__c';

export default class PublisherComponent
extends LightningElement {

    @wire(MessageContext)
    messageContext;

    publishHandler(){

        publish(
            this.messageContext,
            TASK_CHANNEL,
            {
                task: "Learn LMS"
            }
        );
    }
}