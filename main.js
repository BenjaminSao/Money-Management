


Vue.component('transaction', {
    template: `#transactions-template`,
    props:
    {
        finalTransaction: Array,
        editTransactionId: Number,
        
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
    watch: {
        editTransactionId: function (_editTransactionId)
        {
            if (_editTransactionId)
            {
                const transaction = this.finalTransaction.find(t => t.id === _editTransactionId);
                this.name = transaction.name;
                this.description = transaction.description;
                this.type = transaction.type;
                this.amount = transaction.amount;
            }
        }
    },
    methods: {
    
        onSubmit() {

            if (this.editTransactionId) {
                transaction = this.finalTransaction.find(t => t.id === this.editTransactionId);
                transaction.name = this.name;
                transaction.description = this.description;
                transaction.type = this.type;
                transaction.amount = this.amount;
                this.$emit("transaction-edited");
                this.$emit('update-income');
                this.$emit('update-expense');
                this.$emit("update-currency");
                this.name = null;
                this.description = null;
                this.type = null;
                this.amount = null;
            }
            else {
                let transaction = {
                    id: Date.now(),
                    name: this.name,
                    description: this.description,
                    type: this.type,
                    amount: this.amount
                }
                this.$emit('transaction-submitted', transaction);
                this.$emit('update-income');
                this.$emit('update-expense');
                this.$emit('update-currency');
                this.name = null;
                this.description = null;
                this.type = null;
                this.amount = null;
            }
        },
        
    },
})



    


var app = new Vue
    ({
        el: "#app",
        data: {
            title: "Expense Tracker",
            expenseTotal:0,
            incomeTotal: 0,
            tempExpenseTotal: 0,
            tempIncomeTotal:0,        
            finalTransaction: [],
            editTransactionId: null,
            currencyType: 'CAD',
            
        },
        methods: {
            
            addTransaction(transaction) {

                this.finalTransaction.push(transaction);
            },

            calculateIncome() {
                
                let temp = 0;
                    for (let item in this.finalTransaction) {
                        if ((this.finalTransaction[item].type) === 'Credit')
                            temp += this.finalTransaction[item].amount;
                    }
                
                this.tempIncomeTotal = temp;

            },
            calculateExpense() {
                
                let temp = 0;
                    for (let item in this.finalTransaction) {
                        if ((this.finalTransaction[item].type) === 'Debit')
                            temp += this.finalTransaction[item].amount;
                    }
                this.tempExpenseTotal = temp;
            },
            changeCurrency()
            {
                if (this.currencyType === 'CAD')
                {
                    this.expenseTotal = this.tempExpenseTotal;
                    this.incomeTotal = this.tempIncomeTotal;
                }
                if (this.currencyType === 'THB')
                {
                    this.expenseTotal = this.tempExpenseTotal * 25;
                    this.incomeTotal = this.tempIncomeTotal * 25;
                }
                if (this.currencyType === 'INR')
                {
                    this.expenseTotal = this.tempExpenseTotal * 50;
                    this.incomeTotal = this.tempIncomeTotal * 50;
                }
                    
            },
            deleteTransaction(id)
            {
                for (let i = 0; i < this.finalTransaction.length; i++)
                {
                    if (this.finalTransaction[i].id === id) {
                        this.finalTransaction.splice(i, 1);   
                    }
                    }
                this.editTransactionId = null;
            },
            editTransaction(transaction)
            {
                this.editTransactionId = transaction.id;
            },
            
            UpdateID()
            {
                this.editTransactionId = null;
            },
        },
        computed :{
            netInHand() {
                return (this.incomeTotal - this.expenseTotal);
            },
            currency() {
                if (this.currencyType === 'CAD')
                    return "$"
                if (this.currencyType === 'INR')
                    return "₹"
                if (this.currencyType === 'THB')
                    return "฿"
                
            }
        },
           
        
    });