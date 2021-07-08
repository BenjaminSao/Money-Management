Vue.component('Transactions', {
    template: `
    
    <form action="" @submit.prevent="onSubmit" class ="field has-addons">
     <input type="text" class="input is-primary" v-model= "name" placeholder = " Enter Name of transaction">
     <input type="text" class="input is-primary" id="description" v-model= "description"placeholder = " Enter Details">
     <div class ="select is-normal is-primary">
    <select  v-model= "type" >
        <option selected >Credit</option>
        <option>Debit</option>
    </select>
    </div>
     <input type="number" class="input is-primary" v-model.number="amount" placeholder = " Enter Amount">
     
    <input type="submit" class="button is-primary" value="Add">  
     
</form>
    `,
    data() {
        return {
            name: null,
            description: null,
            type: null,
            amount: null,


        }
    },
    methods: {
        onSubmit() {
            let transactionList = {
                name: this.name,
                description: this.description,
                type: this.type,
                amount: this.amount
            }
            console.log(transactionList.name)
            this.$emit('transaction-submitted', transactionList)
            this.name = null
            this.description = null
            this.type = null
            this.amount = null
        },

    }
})





var app = new Vue
    ({
        el: "#app",
        data: {
            title: "Expense Tracker",
            netWorth: "Income",
            Expense: "Expense",
            finalTransaction: []
        },
        methods: {
            addTransaction(transactionList) {

                this.finalTransaction.push(transactionList)
                console.log(this.finalTransaction)
            }
        }


    });