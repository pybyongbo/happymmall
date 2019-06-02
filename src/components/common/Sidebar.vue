<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus'
export default {
    name:"sidebar",
    data(){
        return {
            collapse:false,
            items:[
                    {
                        icon: 'el-icon-setting',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '/goods',
                        title: '商品相关',
                        subs: [
                            {
                                index: '/product/index',
                                title: '商品管理'
                            },
                            {
                                index: '/category/index',
                                title: '品类管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'orders',
                        title: '订单相关',
                        subs: [
                            {
                                index: '/order/index',
                                title: '订单管理'
                            },
                          
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'users',
                        title: '用户相关',
                        subs: [
                            {
                                index: '/user/index',
                                title: '用户列表'
                            },
                          
                        ]
                    },
            ]
        }
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    },
    created(){
        bus.$on('collapse',msg=>{
            this.collapse = msg;
        })
    }
}
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 208px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>


