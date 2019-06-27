<template>
    <div>
         <div class="col-lg-12">
            <h1 class="page-header">品类管理-新增品类</h1>
            <div class="go-back">
                <router-link :to="`/category/index`">
                返回
                </router-link>
            </div>
        </div>

        <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="86px" class="demo-ruleForm">

                <el-form-item label="所属品类">
                    <el-select v-model="categoryForm.parentId" placeholder="请选择所属分类">
                    <el-option label="/所有" :value=0></el-option>
                    <el-option 
                    v-for="item in categoryList" 
                    :key="item.id" 
                    :label="`/所有/`+item.name" 
                    :value="Number(item.id)"
                    >
                    </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="品类名称" prop="name">
                        <el-input v-model="categoryForm.name" placeholder="请输入品类名称"></el-input>
                </el-form-item>
        </el-form>

        <div class="btn">

        <el-button type="primary" size="small" class="handle-del mr10" @click="onSubmit()">提交</el-button>

      </div>

    </div>
</template>

<script>
import Util from "util/mm.js"
import Product from 'api/product-server.js';
const _mm = new Util();
const _product = new Product();
export default {
    name:"addcategory",
    data(){
        return {
            categoryList:[],
            categoryForm:{
                parentId:'',
                name:''
            },
            rules:{
                 name: [
                    { required: true, message: '请输入品类名称', trigger: 'change' }
                ]   
            }
        }
    },
    created() {
        this.loadCategoryList();
    },
    methods:{

        // 加载品类列表,显示父品类列表
        loadCategoryList(){
            _product.getCategoryList().then(res => {
                
                    this.categoryList= res

            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        },

        onSubmit(){

            this.$refs['categoryForm'].validate((valid) => {

                if(valid) {
                    _product.saveCategory({
                         "parentId" : this.categoryForm.parentId,
                         "categoryName": this.categoryForm.name
                    }).then((res)=>{

                         this.$message({
                            message: res,
                            type: 'success'
                        });
                        this.$router.push('/category/index');

                    })

                } else {

                console.log('error submit!!');
                return false;

                }

            })


        }

    }
    
}
</script>
<style scoped>

.col-lg-12 {
  overflow: hidden;
  border-bottom: 1px solid #fff;
  margin-bottom: 10px;
}

.col-lg-12 .page-header {
  padding-bottom: 9px;
  font-size: 18px;
  color: #666;
  float: left;
  line-height:40px;
}

.col-lg-12 .page-header-right {
  float: right;
}

.col-lg-12 .go-back{
    float: right;
    background:url('../assets/back.png') no-repeat left center;
    padding-left:40px;
}

.demo-ruleForm{
    width:90%;
    margin:50px auto 0;
}

.demo-ruleForm .el-input{
    width:320px;
}
.btn {
  margin-left: 180px;
  float: left;
  margin-top:50px;
  padding-bottom: 30px;
}

.btn .handle-del {
  width: 120px;
}

</style>

<style>
.demo-ruleForm .el-form-item__label{
    float:left!important;
}
.demo-ruleForm .el-form-item__content{
    margin-left:10px!important;
    float:left;
}
</style>

