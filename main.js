Vue.component('Transactions', {
    template: `#transactions-template`,
    // props: {
    //      index: {
        
    //     required:true
    // }
    // },
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
            this.$emit('transaction-submitted', transactionList)
            this.$emit('update-income')
            this.$emit('update-expense')
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
            expenseTotal:0,
            incomeTotal:0,
            finalTransaction: []
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
            
        }


    });