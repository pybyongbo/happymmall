<template>
    <div class="form-group">
        <label for="name">所属分类:{{productDetail.parentCategoryId}}</label>
        <div class="con">
             <el-col :span="6">
                <el-select class="mo-select" v-model="productDetail.parentCategoryId" placeholder="请选择">
                    <el-option  v-for="item in firstCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-col>
        </div>
    </div>
</template>

<script>

import Util         from '../../util/mm.js';
import Product      from '../../api/product-server.js';

const _mm           = new Util();
const _product      = new Product();  

export default {
    name:'productcategory',
    props:{
        productDetail:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    data(){
        return {
            firstCategoryId:0,
            firstCategoryList:[],
            secondCategoryId:0,
            secondCategoryList:[]
        }
    },

    created(){

        this.loadFirstCategory()
        // .then(res=>{
            // console.log(res);
            // let cateId = res.parentCategoryId
            // this.loadSecondCategory(cateId);
        // });
        // this.productDetail.parentCategoryId && this.loadSecondCategory();
        // this.productDetail && console.log(this.productDetail.parentCategoryId)

    },
    methods:{

        //加载一级分类
       loadFirstCategory(){
           _product.getCategoryList(this.firstCategoryId).then(res=>{
                this.firstCategoryList = Object.assign({},res);
            },errMsg=>{
                this.$message({
                    message: res,
                    type: 'error'
                });
            })
        },

        //加载二级分类
        loadSecondCategory(cid) {
          _product.getCategoryList(cid).then(res=>{
                this.secondCategoryList=Object.assign({},res)
            },errMsg=>{
                this.$message({
                    message: res,
                    type: 'error'
                });
            })
        }

    }
    
}
</script>

<style scoped>
.form-group label{
    float:left;
}
.form-group .con{
    margin-left:20px;
    float:left;
}

.form-group .con .mo-select{
    width:220px
}
</style>


