<template>
    <div class="page-wrapper">
        <div class="tit">
            <h1>商品详情页面</h1>
            <div class="go-back">
                 <router-link :to="`/product/index`" >
                    返回
                </router-link> 
            </div>
        </div>

        <div class="pro-detail">
          <el-form :model="productDetail" disabled ref="ruleForm" :inline=true class="demo-ruleForm detailpage">
            <div class="form-group">
                <el-form-item label="商品名称:">
                     <p>{{productDetail.name}}</p>
                </el-form-item>
            </div>
            <div class="form-group">
                <el-form-item label="商品名称:">
                     <p>{{productDetail.subtitle}}</p>
                </el-form-item>
            </div>

            <div class="form-group">
                <el-form-item label="当前状态:">
                <el-tag
                :type="productDetail.status === 1 ? 'success' : 'danger'"
                disable-transitions>{{productDetail.status===1?'在售':'已下架'}}</el-tag>
                </el-form-item>
            </div>

            <div class="form-group">
                <!-- <el-form-item label="所属分类:"> -->
                <categoryselect :productDetail="productDetail" :isEdit=true></categoryselect>
                <!-- </el-form-item> -->
            </div>

            <div class="form-group">
                <!-- <label for="name">商品价格:</label>
                <div class="con">
                     <el-input placeholder="请输入内容" v-model="productDetail.price" disabled>
                        <template slot="prepend">¥ </template>
                        <template slot="append">元</template>
                    </el-input>
                </div> -->
                 <el-form-item label="商品价格:">
                      <el-input placeholder="请输入内容" v-model="productDetail.price" style="width:390px;">
                        <template slot="prepend">¥ </template>
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </div>

            <div class="form-group">
                 <el-form-item label="商品库存:">
                       <el-input v-model="productDetail.stock" style="width:390px;">
                        <template slot="append">件</template>
                    </el-input>
                 </el-form-item>
            </div>

            <div class="form-group">
                <el-form-item label="商品图片:">
                      <template>
                         <ul v-if="productDetail.subImages.length>0">
                            <li v-for="(pic,index) in productDetail.subImages" :key="index" class="thumbpic">
                                <div>
                                    <img class="img" :src=productDetail.imageHost+pic />
                                </div>
                            </li>
                        </ul>
                        <div v-else class="pull-right">
                        <span style="color:red;font-weight:bold">暂未上传商品图片</span>
                        </div>
                    </template>
                 </el-form-item>
            </div>

             <div class="form-group">
                <el-form-item label="商品详情:">
                    <div class="con">
                    <p v-html="productDetail.detail || '--'"></p>
                </div>
                </el-form-item>
            </div>
          </el-form>
        </div>
    </div>
</template>

<script>
import Util from "util/mm.js"
import Product      from 'api/product-server.js';

import categoryselect from "../../src/components/goods/product-category"

const _mm           = new Util();
const _product      = new Product(); 


export default {
    name:'productdetail',
    components: {
        categoryselect
    },
    data(){
        return {

            productDetail:{
                categoryId:0,
                parentCategoryId:0,
                id:this.$route.params.id,
                name:'',
                subtitle:'',
                subImages:[],
                price:'',
                stock:'',
                detail:'',
                status:1 //商品状态1为在售
            }

        }

    },
    created(){
        let pid = this.$route.params.id;
        _product.getdetail(pid).then(res=>{
            if(res.subImages) {
                res.subImages = this.getsubImage(res);
            } else {
                res.subImages = ''
            }
            this.productDetail = Object.assign({},res);

        },errMsg=>{
            this.$message({
                    message: res,
                    type: 'error'
            });
        })
    },

    methods:{
        getsubImage(res) {
            return res.subImages.split(',')
        }
    }
    
    
}
</script>

<style scoped>
.page-wrapper .tit{
    overflow: hidden;
    border-bottom:1px solid #dedede;
    padding-bottom:10px;
    margin-bottom:10px;
}

.page-wrapper h1{
    padding-bottom: 9px;
    font-size: 18px;
    color: #666;
    float: left;
}

.page-wrapper .tit .go-back{
    float: right;
    background:url('../assets/back.png') no-repeat left center;
    padding-left:40px;


}

.page-wrapper .tit .go-back a{
    color: #409EFF;
}
.pro-detail{
    width:96%;
    margin:0 auto;
}

.pro-detail .form-group{
    text-align: left;
    overflow: hidden;
    line-height: 40px;
}

.pro-detail .form-group label{
    float:left!important;
}
.pro-detail .form-group{
    width:100%;
    margin-left:0px;
    overflow: hidden;
}

.pro-detail .form-group label{
    float:left;
}

.pro-detail .form-group ul li{
    list-style-type:none;
}
.pro-detail .form-group ul li.thumbpic{
    float:left;
    margin-right:10px;
    height:80px;
    padding:5px;
    border:2px solid #f00;
}
.pro-detail .form-group ul li.thumbpic img{
    width:100px;
    height:80px;
}
</style>


