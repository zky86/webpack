<template>

    <div id="header">
        <div class="title"><span>{{title}}</span></div>
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

<style lang='scss'> 
    #header{
        color:#aaa;
        background: #fff;
        span{
            font-weight: bold;
            font-size: 20px;
        }
    }
</style>