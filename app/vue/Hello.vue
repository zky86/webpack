<template>
    <div id="page-2">
        <div class="title" >变量引用</div>
        <div>
            <img :src="logoUrl" alt="logo">
        </div>

        <div >src引用</div>
        <div><img src="./logo.png" alt="logo"></div>
        <p>vue2.5.x and webpack4.x  模块测试</p>
    </div>
</template>


<script>
import logoUrl from './logo.png';
export default {
    name:'page-2',
    data(){
        return {
            logoUrl
        }
    }
}
</script>

<style> 
    #page-2{
        color:#aaa;
    }
    img{
        width:100px;
    }
</style>