<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';


export default {

    data() {
        return {
            collapse: false,
            items: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods:{
        getMen(){
            let list =[


                {
                    icon: 'el-icon-lx-cascades',
                    index: 'banan',
                    title: 'Banan配置',
                    frontCode:'001',
                },
                {
                    icon: 'el-icon-lx-news',
                    index: 'memberUsers',
                    title: '会员用户',
                    frontCode:'002',
                },
                {
                    icon: 'el-icon-lx-text',
                    index: 'memberReport',
                    title: '会员报告',
                    frontCode:'003',
                },
                {
                    icon: 'el-icon-lx-people',
                    index: 'role',
                    title: '角色管理',
                    frontCode:'004',
                },
                {
                    icon: 'el-icon-lx-shop',
                    index: 'store',
                    title: '门店管理',
                    frontCode:'005',
                },
                {
                    icon: 'el-icon-lx-friend',
                    index: 'account',
                    title: '后台账号管理',
                    frontCode:'006',
                },
                {
                    icon: 'el-icon-lx-rank',
                    index: 'equipment',
                    title: '设备管理',
                    frontCode:'007',
                },
                {
                    icon: 'el-icon-lx-link',
                    index: 'menu',
                    title: '菜单管理',
                    frontCode:'008',
                },

                {
                    icon: 'el-icon-lx-like',
                    index: 'welcome',
                    title: '欢迎页面配置',
                    frontCode:'009',
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'fit',
                    title: '适合床垫软硬度',
                    frontCode:'010',
                },
                {
                    icon: 'el-icon-lx-settings',
                    index: 'weight',
                    title: '权重配置',
                    frontCode:'011',
                },
                {
                    icon: 'el-icon-lx-share',
                    index: 'pillow',
                    title: '枕头配置',
                    frontCode:'012',
                },
                {
                    icon: 'el-icon-lx-sort',
                    index: 'preference',
                    title: '用户偏好设置',
                    frontCode:'013',
                },

            ]
            let menus = JSON.parse(localStorage.loginUserinfo).menus;
            let newList =[
                {
                    icon: 'el-icon-lx-home',
                    index: 'home',
                    title: '首页',
                },
            ]
            for(let i=0;i<list.length;i++){
                for(let  j=0;j<menus.length;j++){
                    if(list[i].frontCode == menus[j].frontCode ){
                        newList.push(list[i])
                    }
                }
            }
            this.items = newList
        }
    },
    created() {
        this.getMen()
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });

    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
