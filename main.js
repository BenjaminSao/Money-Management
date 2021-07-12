Vue.component('Transactions', {
    template: `#transactions-template`,
    props:
    {
        finalTransaction: Array,
        editTransactionId: Number
    },
    data() {
        return {
            id: null,
            name: null,
            description: null,
            type: null,
            amount: null, 
        }
    },
    methods: {
        
        onSubmit() {

            if (this.editTransactionId)
            {
                transaction = this.finalTransaction.find(t => t.id === this.editTransactionId);

                transaction.name = this.name;
                transaction.description = this.description;
                transaction.type = this.type;
                transaction.amount = this.amount;

                this.$emit("transaction-edited");
                
                return;
            }

            let transactionList = {
                id: Date.now(),
                name: this.name,
                description: this.description,
                type: this.type,
                amount: this.amount
            }
            this.$emit('transaction-submitted', transactionList)
            this.$emit('update-income')
            this.$emit('update-expense')
            this.name = null
            this.description = null
            this.type = null
            this.amount = null
            console.log(this.finalTransaction);
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
            expenseTotal:0,
            incomeTotal:0,
            finalTransaction: [],
            editTransactionId: null
        },
        methods: {
            
            addTransaction(transactionList) {

                this.finalTransaction.push(transactionList)
            },

            calculateIncome() {
                
                let temp = 0;
                    console.log("called for value update")
                    for (let item in this.finalTransaction) {
                        if((this.finalTransaction[item].type)==='Credit')
                        temp += this.finalTransaction[item].amount
                    }
                    this.incomeTotal = temp    
            },
            calculateExpense() {
                
                let temp = 0;
                    console.log("called for value update")
                    for (let item in this.finalTransaction) {
                        if((this.finalTransaction[item].type)==='Debit')
                        temp += this.finalTransaction[item].amount
                    }
                    this.expenseTotal = temp
                    
                
            },
            deleteTransaction(index)
            {
                this.finalTransaction.splice(index, 1)
                console.log(this.expenseTotal,this.incomeTotal)
            },
            editTransaction(item)
            {
                this.editTransactionId = item.id;

                console.log("editing:", item.name);
            },
            transactionEdited()
            {
                this.editTransactionId = null;
            }
            
        }


    });