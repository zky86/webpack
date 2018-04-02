<template>
    <div id="page">
        <div>页面主体部分</div>
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
    name:'page',
    data(){
        return {
            logoUrl
        }
    }
}
</script>

<style> 
    #page{

    }
    img{
        width:100px;
    }
</style>