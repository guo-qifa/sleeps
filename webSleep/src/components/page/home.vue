<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 首页
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" style="height: 500px">
            <div class="empty" >
                <el-alert title="欢迎使用深睡密码后台管理系统" type="success" center show-icon   :closable="false">
                </el-alert>
            </div>
        </div>


    </div>
</template>

<script>

    export default {
        name: 'home',

        created() {


        },


    };
</script>
<style scoped>
    .empty {
        position: absolute;
        text-align: center;
        background: #ececec;
        border-radius: 5px;
        line-height: 100px;
        top: 25%;
        left: 45%;
        width: 500px;
        height: 100px;
        margin-top: -75px;
        margin-left: -200px;
    }
</style>

