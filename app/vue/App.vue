<template>
<div id="page-main">
    <!-- <h1>{{message}}</h1> -->

    <Hello></Hello> 
    
</div>
</template> 

<script>
    import Hello from './Hello.vue';
    export default{
        name:'page-main',
        data(){
            return {
                // message:'Vue With Webpack4'
            }
        },
        components:{Hello}
    }
</script>

<style>
    #page-main{
        text-align: center;
    }
</style>