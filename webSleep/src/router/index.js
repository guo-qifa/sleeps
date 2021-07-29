import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let list = [

    {
        path: '/home',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/home.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/banan',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/banan.vue'),
        meta: { title: 'Banan配置' }
    },
    {
        path: '/welcome',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/welcome.vue'),
        meta: { title: '欢迎页面配置' }
    },
    {
        path: '/memberUsers',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/memberUsers.vue'),
        meta: { title: '会员用户' }
    },
    {
        path: '/memberReport',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/memberReport.vue'),
        meta: { title: '会员报告' }
    },
    {
        path: '/role',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/role.vue'),
        meta: { title: '角色管理' }
    },
    {
        path: '/store',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/store.vue'),
        meta: { title: '门店管理' }
    },
    {
        path: '/account',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/account.vue'),
        meta: { title: '后台账号管理' }
    },
    {
        path: '/equipment',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/equipment.vue'),
        meta: { title: '设备管理' }
    },
    {
        path: '/menu',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/menu.vue'),
        meta: { title: '菜单管理' }
    },
    {
        path: '/fit',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/fit.vue'),
        meta: { title: '适合床垫软硬度' }
    },
    {
        path: '/weight',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/weight.vue'),
        meta: { title: '权重配置' }
    },
    {
        path: '/shopping',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/shopping.vue'),
        meta: { title: '导购列表' }
    },
    {
        path: '/pillow',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/pillow.vue'),
        meta: { title: '枕头配置' }
    },
    {
        path: '/preference',
        component: () => import(/* webpackChunkName: "table" */ '../components/page/preference.vue'),
        meta: { title: '用户偏好设置' }
    }





];


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '首页' },
            children: list
        },
        {
            path: '/login',
            name:'login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/print',
            name:'print',
            component: () => import(/* webpackChunkName: "print" */ '../components/page/Print.vue'),
            meta: { title: '打印' },
        },
        {
            path: '/printbg',
            name:'printbg',
            component: () => import(/* webpackChunkName: "print" */ '../components/page/PrintBg.vue'),
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});


