<template>

    <div id="footer">
        <div class="title">{{title}}</div>
    </div>

</template>

<script>
export default {
    name:'footer',
    data(){
        return {
            "title" : "底部-组件"
        }
    }
}
</script>

<style> 
    #footer{
        color:#aaa;
        background: #fff;
    }
</style>