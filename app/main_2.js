console.log("这个是mian_2.js");
import C from './common';
// var $ = require("./jquery3.1");
// 
import Vue from 'vue'
import App from './vue/App.vue';

var app = new Vue({
    el: "#app",
    template: '<App/>',
    data: function()
    {
        // return {
        //     "txt": "hello word!"
        // }
    },

    methods:
    {

    },

    mounted: function()
    {
        var self = this;
        // console.log(self.txt);
    },
    methods:
    {
        fn: function()
        {
            // console.log("点击");
        }
    },
    render: h => h(App)



});