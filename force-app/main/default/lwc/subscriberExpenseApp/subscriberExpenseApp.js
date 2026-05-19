import { LightningElement,wire } from 'lwc';
import recordSelected from '@salesforce/messageChannel/ExpenseChannel__c';


// Import message service features required for subscribing and the message channel
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext,
} from "lightning/messageService";

export default class SubscriberExpenseApp extends LightningElement {

    subscription = null;
    expensive=[];

    @wire(MessageContext)
        messageContext;

  // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        recordSelected,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE },
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  handleMessage(message) {
    this.expensive = message.expensive;
  }



    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

}