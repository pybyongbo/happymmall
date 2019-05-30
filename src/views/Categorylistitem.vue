<template>
    <div>
        <div class="col-lg-12">
            <h1 class="page-header">品类管理--子分类 [当前商品分类ID：<span class="red">{{CategoryId}}</span>] --[父级分类名称:<span class="red">{{pcatename}}</span>]</h1>
             <div class="go-back">
                 <router-link :to="`/category/index`" >
                    返回
                </router-link> 
            </div>
            <div class="go-add">
                <router-link :to="`/category/add/`">
                    <el-button type="primary" size="small">添加品类</el-button>
                </router-link>
            </div>
        </div>
        <!-- <div class="tab-hd">
          <p>[当前商品分类ID：{{CategoryId}}]</p>
        </div> -->
        <el-table :data="list" border stripe v-loading="loading" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor" class="categorylist" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
     
      <el-table-column label="品类ID" width="185" prop="id"> 
       
      </el-table-column>
      <el-table-column label="品类名称" prop="name">
          <template slot-scope="scope" >  
              <p style="text-align:left;padding-left:50px;">{{scope.row.name}}</p>
          </template>
      </el-table-column>
     
      <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button @click="modifyCategery(scope.row)" type="text" size="small">修改名称</el-button>
            </template>
      </el-table-column>
    </el-table>
    <div class="pagination" style="backgound:#fff;">
      <el-pagination background @current-change="handleCurrentChange" :current-page="cur_page" :page-size="10" layout="total,  prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>

    <el-dialog width="560px"  title="修改品类名称" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="ruleForm">
                <el-form-item label="请输入新的品类名称" :label-width="formLabelWidth" prop="catename">
                    <el-input ref="catenametxt" v-model="form.catename" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onUpdateName">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Util from "util/mm.js"
import Product from 'api/product-server.js';
const _mm = new Util();
const _product = new Product();
export default {
  name: 'productcategorylistitem',
  data() {
    return {
      CategoryId:this.$route.params.id,
      loading:true,
      cur_page: 1,
      totalCount: 0,
      pcatename:'',
      parentCateArr:[],
      dataArr:[],
      list: [],
      listParam: {
        pageNum: 1},
        dialogFormVisible: false,
        form: {
            catename: '',
            cateid:0
        },
        formLabelWidth: '150px',
        ruleForm:{
          catename: [
            { required: true, message: '请输入商品名称', trigger: 'change' }
          ]
        }
    }
  },

  created() {
    this.loadCategoryList(0,10);
    this.loadCategoryPList();
    console.log(this.$route.params.id);
  },

  methods: {


    loadCategoryPList(){
      let _this = this;
       _product.getCategoryList(0).then((res)=>{
         console.log(res);
         this.parentCateArr=res;
         this.$nextTick(()=>{ //显示当前子分类的父级分类名称
              this.parentCateArr.forEach(item => {
                if(item.id==Number(this.$route.params.id)) {
                    console.log(item);
                    this.pcatename = item.name;
                } else{
                  console.log('test');
                }
            })
         })
         
         
       })
    },

    loadCategoryList(start,end) {
      _product.getCategoryList(this.CategoryId).then((res) => {
        this.dataArr = res;
        this.loading = false;
        this.list = this.dataArr.slice(start,end);
        this.totalCount = res.length;
      })
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'text-align:center;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:lightblue;color:#fff;font-weight:500;text-align:center;height:30px;line-height:30px;'
      }
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.listParam.pageNum = val;
      console.log(val);
      this.$nextTick(() => {
        this.loadCategoryList((val-1)*10,val*10);
      })
    },
    modifyCategery(row) {
        this.dialogFormVisible = true;
        this.form.catename = row.name;
        this.form.cateid = row.id;
        this.$nextTick(() => {
            this.$refs.catenametxt.select();
        })

    },
    //更新品类名称
    onUpdateName(categoryId, categoryName){

        let newName = this.form.catename;
        if(newName){
            _product.updateCategoryName({
                categoryId: this.form.cateid,
                categoryName : newName
            }).then(res => {
                 this.$message({
                    message: res,
                    type: 'success'
                });
                this.loadCategoryList((this.cur_page-1)*10,this.cur_page*10);
                this.$nextTick(() => {
                    this.dialogFormVisible = false;
                })
                
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }

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
.col-lg-12 .go-add{float:right;margin-right:15px;}
.col-lg-12 .go-back{
    float: right;
    background:url('../assets/back.png') no-repeat left center;
    padding-left:40px;
    margin-right:20px;
    margin-top:5px;
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
.tab-hd{
  overflow: hidden;
  margin:10px auto;
}
.tab-hd p{float:left;line-height: 32px;padding-left:24px;}
.tab-hd a{float:right;margin-right:10px;}
.handle-box {
  margin-bottom: 10px;
  float: left;
}

.categorylist{
    min-height: 450px;
}

.handle-select {
  width: 160px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center
}
.red{
  color:red;
  /* 
  font-size:14px;
  font-weight: normal
  */
}
</style>

<style>
.el-dialog__body{
    margin-top:20px;
    padding:10px 20px;
}
</style>



