


Vue.component('transaction', {
    template: `#transactions-template`,
    props:
    {
        transactions: Array,
        editTransactionId: Number,  
    },
    data() {
        return {
            id: null,
            name: null,
            description: null,
            type: null,
            money:null,
            amount: null,
        }
    },
    watch: {
        editTransactionId: function (_editTransactionId)
        {
            if (_editTransactionId)
            {
                const transaction = this.transactions.find(t => t.id === _editTransactionId);
                this.name = transaction.name;
                this.description = transaction.description;
                this.type = transaction.type;
                this.money = transaction.money;
                this.amount = transaction.amount;    
            }
        }
    },
    methods: {
    
        onSubmit() {

            if (this.editTransactionId) {
                transaction = this.transactions.find(t => t.id === this.editTransactionId);
                transaction.name = this.name;
                transaction.description = this.description;
                transaction.type = this.type;
                transaction.money = this.money;
                transaction.amount = this.amount;
                this.$emit("transaction-edited");
                this.$emit('update-income');
                this.$emit('update-expense');
                this.$emit("update-currency");
                this.name = null;
                this.description = null;
                this.type = null;
                this.money=null,
                this.amount = null;
            }
            else {
                let transaction = {
                    id: Date.now(),
                    name:this.name,
                    description: this.description,
                    type:this.type,
                    money: this.money,
                    amount:this.amount
                }
                this.$emit('transaction-submitted', transaction);
                this.$emit('update-income');
                this.$emit('update-expense');
                this.$emit('update-currency');
                this.name = null;
                this.description = null;
                this.type = null;
                this.money = null;
                this.amount = null;
            }
        },   
    },
    computed:
    {
        submission() {
            if (this.editTransactionId)
                return "Update"
            else
                return "  Add  "
        }
    }
    
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
            transactions: [],
            editTransactionId: null,
            currencyType: 'CAD',
            
        },
        methods: {
            
            addTransaction(transaction) {

                this.transactions.push(transaction);
            },

            calculateIncome() {
                let temp = 0;
                if(this.transactions){
                    for (let item in this.transactions) {
                        if ((this.transactions[item].type) === 'Credit')
                        {
                            if (this.transactions[item].money === "CAD")
                                temp = temp + this.transactions[item].amount;
                            if (this.transactions[item].money === "INR")
                                temp = temp + (this.transactions[item].amount) / 50;
                            if (this.transactions[item].money === "THB")
                                temp += (this.transactions[item].amount) / 25;
                        }
                    }
                    this.tempIncomeTotal = temp;
                }
            },
            calculateExpense() {
                
                let temp = 0;
                    for (let item in this.transactions) {
                        if ((this.transactions[item].type) === 'Debit')
                        {
                            if (this.transactions[item].money === "CAD")
                                temp = temp + this.transactions[item].amount;
                            if (this.transactions[item].money === "INR")
                                temp = temp + (this.transactions[item].amount)/50;
                            if (this.transactions[item].money === "THB")
                                temp += (this.transactions[item].amount)/25;
                        }    
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
                if (confirm("Press ok to confirm delete")) {
                    for (let i = 0; i < this.transactions.length; i++) {
                        if (this.transactions[i].id === id) {
                            this.transactions.splice(i, 1);
                        }
                    }
                }
                this.editTransactionId = null;
            },
            editTransaction(transaction)
            {
                this.editTransactionId = transaction.id;
                calculateIncome();      
                calculateExpense();
                changeCurrency();
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
            },
            
                
        },
           
        
    });