<template>

    <div id="page-main">
        <!-- <h1>{{message}}</h1>-->
        <Header></Header>
        <Hello></Hello>
        <Footer></Footer>
    </div>
    
</template>


<script>

    import Header from './Header.vue';
    import Hello from './Hello.vue';
    import Footer from './Footer.vue';

    export default{
        name:'page-main',
        data(){
            // console.log(header);
            return {
                // message:'Vue With Webpack4'
            }
        },
        components:{Header,Hello,Footer}
    }
</script>

<style>
    #page-main{
        text-align: center;
    }
</style>