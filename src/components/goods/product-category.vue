<template>
    <div class="form-group">
        <!-- 
        <label for="name">所属分类:</label>
        <div class="con">
                <el-select class="mo-select" v-model="productDetail.parentCategoryId" :disabled="isEdit" @change="changepcid(productDetail.parentCategoryId)">
                    <el-option  v-for="item in firstCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>

                <el-select class="mo-select" v-if="productDetail.parentCategoryId" v-model="productDetail.categoryId" @change="changecid(productDetail.categoryId)" :disabled="isEdit">
                    <el-option  v-for="item in secondCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
        </div>
         -->
        <!-- <el-form :model="productDetail"> -->
        <el-form-item label="所属分类:" prop="">
            <el-select class="mo-select" v-model="productDetail.parentCategoryId" :disabled="isEdit" @change="changepcid(productDetail.parentCategoryId)">
                    <el-option  v-for="item in firstCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>

                <el-select class="mo-select" v-if="productDetail.parentCategoryId" v-model="productDetail.categoryId" @change="changecid(productDetail.categoryId)" :disabled="isEdit">
                    <el-option  v-for="item in secondCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
        </el-form-item>
         <!-- </el-form> -->
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
        },
        isEdit:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            pcategoryId:0,
            categoryId:0,
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
                this.loadSecondCategory(this.productDetail.parentCategoryId);
               

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
        },
        changepcid(val) {
            console.log(val);
            this.secondCategoryList = [];
            this.pcategoryId = val;
            this.loadSecondCategory(val);
            //新增商品的时候传值
            this.$emit('getpcategoryId',this.pcategoryId);
        },

        changecid(val){
            this.categoryId = val;
            //新增商品的时候传值
            this.$emit('getcategoryId',this.categoryId);

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


