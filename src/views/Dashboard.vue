<template>
    <div>
        <h1 class="tit">系统首页</h1>
        <el-col>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count.userCount}}</div>
                                    <div>用户总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count.productCount}}</div>
                                    <div>商品总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count.orderCount}}</div>
                                    <div>订单总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-row>
                     <el-card shadow="hover" class="mgb20">
                            <div slot="header" class="clearfix">
                                <span>系统说明</span>
                            </div>
                            <div class="card-bd">
                              <p>本后台系统属于练手项目,学习视频教程制作.视频教程是慕课网上面的React基础教程,这里我用Vue改写的.
                                实现了教程中页面基本功能.
                                基础框架采用的是Element UI+Vue开发的.采用前后端分离.更加的熟悉了Vue相关的语法和基础知识</p>

                               <p>通过本套课程的学习,自己也有一定的收获.实现了教程中所有的页面和相关的功能.可能有些地方还不太完善.
                                  但是大部分的功能都已经实现了.界面也还OK.</p>

                                <p>以后希望自己能够独立的搭建项目,优化页面代码.后面抽空可以部署到线上,欢迎大家一起交流,互相学习,共同进步~</p>
                            </div>
                            
                      </el-card>

                      <el-card shadow="hover" :body-style="{ height: '284px'}" style="text-align:left;">
                            <div slot="header" class="clearfix">
                                <span>相关技术栈</span>
                            </div>

                            <div v-for="(o,index) in skillItem" :key="index" class="text item">
                              {{ o.name }}
                            </div>
                            
                      </el-card>

                </el-row>
        </el-col>
    </div>
</template>
<script>
import Util from "util/mm.js"
import Statistic from 'api/statistic-server.js';
const _mm = new Util();
const _statistic = new Statistic();
export default {
    name:'dashboard',
    data(){
      return {
          count:{
            userCount:'-',
            productCount:'-',
            orderCount:'-'
          },
          skillItem:[
            {
              name:'Vue+Element UI',
              value:'Vue'
            },{
              name:'Ajax技术',
              value:'ajax'
            },{
              name:'JSX语法',
              value:'jsx'
            },
            {
              name:'ES6语法知识',
              value:'es6'
            },
            {
              name:'Vue组件通讯+路由',
              value:'router'
            },
            {
              name:'Vue与React写法的对比',
              value:'different'
            },
            {
              name:'其他相关知识点,未完待续~',
              value:'other'
            }
          ]
      }
    },
    created(){
      this.loadCount();
    },
   methods:{
        loadCount(){

          _statistic.getHomeCount().then(res=>{
            // console.log(res);
            this.count = Object.assign({},res);

          },errMsg=>{

               this.$message({
                    message: errMsg,
                    type: 'error'
                });
          })

        }
    }
}
</script>


<style scoped>
h1.tit{
    margin-bottom:30px;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.mgb20{
  width:50%;
  float:left;
  margin-right:15px;
  margin-bottom:20px;
}
.card-bd p{
  text-align: left;
  line-height: 40px;
  color:#999;
  text-indent: 2em;
}
.text {
    font-size: 14px;
    color:#999;
  }

  .item {
    margin-bottom: 18px;
  }
</style>
<style>
.mgb20 .el-card__header{
  text-align: left;
}
</style>
