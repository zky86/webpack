<template>

    <div id="footer_model">
        <div class="title">{{title}}</div>
    </div>

</template>

<script>
export default {
    name:'footer_model',
    data(){
        return {
            "title" : "底部-组件"
        }
    }
}
</script>

<style> 
    #footer_model{
        color:#aaa;
        background: #fff;
    }
</style>