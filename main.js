var app = new Vue({
    el: "#app",
    data: {
        nums: []
    },
    methods: {
        addNum() {
            this.nums.push(Math.round(Math.random() * 10));
        }
    },
});