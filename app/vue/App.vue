<template>

    <div id="page-main">
        <!-- <h1>{{message}}</h1>-->
        <header_model></header_model>
        <Hello></Hello>
        <footer_model></footer_model>
    </div>
    
</template>


<script>

    import header_model from './Header.vue';
    import Hello from './Hello.vue';
    import footer_model from './Footer.vue';

    export default{
        name:'page-main',
        data(){
            // console.log(header);
            return {
                // message:'Vue With Webpack4'
            }
        },
        components:{header_model,Hello,footer_model}
    }
</script>

<style>
    #page-main{
        text-align: center;
    }
</style>