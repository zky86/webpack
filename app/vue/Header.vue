<template>

    <div id="header_model">
        <div class="title"><span>{{title}}</span></div>
    </div>

</template>

<script>
export default {
    name:'header_model',
    data(){
        return {
            "title" : "头部-组件"
        }
    }
}
</script>

<style lang='scss'> 
    #header_model{
        color:#aaa;
        background: #fff;
        span{
            font-weight: bold;
            font-size: 20px;
        }
    }
</style>