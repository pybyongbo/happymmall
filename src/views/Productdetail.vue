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

            <div class="form-group">
                <label for="name">商品名称:</label>
                <div class="con">
                    <p>{{productDetail.name}}</p>
                </div>
            </div>
            <div class="form-group">
                <label for="name">商品描述:</label>
                <div class="con">
                    <p>{{productDetail.subtitle}}</p>
                </div>
            </div>

            <div class="form-group">
                <label for="name">当前状态:</label>
                <div class="con">
                <el-tag
                :type="productDetail.status === 1 ? 'success' : 'danger'"
                disable-transitions>{{productDetail.status===1?'在售':'已下架'}}</el-tag>

                </div>
            </div>

            <div class="form-group">
                <categoryselect :productDetail="productDetail" :isEdit=true></categoryselect>
            </div>

            <div class="form-group">
                <label for="name">商品价格:</label>
                <div class="con">
                     <el-input placeholder="请输入内容" v-model="productDetail.price" disabled>
                        <template slot="prepend">¥ </template>
                        <template slot="append">元</template>
                    </el-input>
                </div>
            </div>

            <div class="form-group">
                <label for="name">商品库存:</label>
                <div class="con">
                    <el-input v-model="productDetail.stock" disabled>
                        <template slot="append">件</template>
                    </el-input>
                </div>
            </div>

            <div class="form-group">
                <label for="name">商品图片:</label>
                <div class="con">
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
                </div>
            </div>

             <div class="form-group">
                <label for="name">商品详情:</label>
                <div class="con">
                    <p v-html="productDetail.detail || '--'"></p>
                </div>
            </div>

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
    /* color:#000; */
        color: #409EFF;
}
.pro-detail{
    width:96%;
    margin:0 auto;
}

.pro-detail .form-group{
    text-align: left;
    overflow: hidden;
    margin-bottom:20px;
    line-height: 40px;
}

.pro-detail .form-group label{
    float:left;
}
.pro-detail .form-group .con{
    width:60%;
    margin-left:20px;
    float:left;
}
.pro-detail .form-group .con ul li{
    list-style-type:none;
}
.pro-detail .form-group .con ul li.thumbpic{
    float:left;
    margin-right:10px;
    height:80px;
    padding:5px;
    border:2px solid #f00;
}
.pro-detail .form-group .con ul li.thumbpic img{
    max-width:100px;
    max-height:80px;
}
</style>


