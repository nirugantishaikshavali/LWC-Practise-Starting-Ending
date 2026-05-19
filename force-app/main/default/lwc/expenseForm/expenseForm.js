import { LightningElement } from 'lwc';

export default class ExpenseForm extends LightningElement {

    expenseData={
        name:"",
        amount:""
    }

    changeHandler(event){
        let {name,value}=event.target;
        this.expenseData={...this.expenseData,[name]:value};
    }

    addHandler(){
        let customData=new CustomEvent("addelement",{
            detail:this.expenseData
        })
        this.dispatchEvent(customData);

        this.expenseData={
            name:"",
            amount:""
        }
    }

}