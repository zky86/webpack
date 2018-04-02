<template>

    <div id="header">
        <div class="title">{{title}}</div>
    </div>

</template>

<script>
export default {
    name:'header',
    data(){
        return {
            "title" : "头部-组件"
        }
    }
}
</script>

<style> 
    #header{
        color:#aaa;
        background: #fff;
    }
</style>