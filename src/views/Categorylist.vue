<template>
    <div>
        <div class="col-lg-12">
            <h1 class="page-header">品类管理</h1>
            <div class="page-header-right">
                <router-link :to="`/product/save/`">
                <el-button type="primary" icon="delete" size="small" class="handle-del mr10">添加品类</el-button>
                </router-link>
            </div>
        </div>
        <el-table :data="list" border v-loading="loading" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor" class="categorylist" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
     
      <el-table-column label="品类ID" width="185" prop="id"> 
       
      </el-table-column>
      <el-table-column label="品类名称" prop="name">
       
      </el-table-column>
     
      <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button @click="modifyCategery(scope.row)" type="text" size="small">修改名称</el-button>
            <router-link :to="`/product/save/${scope.row.id}`">
                <el-button type="text" size="small">查看其子品类</el-button>
            </router-link>
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
  name: 'productcategorylist',
  data() {
    return {
      parentCategoryId:this.$router.CategoryId || 0,
      loading:true,
      cur_page: 1,
      totalCount: 0,
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
  },

  methods: {

    loadCategoryList(start,end) {
      _product.getCategoryList(this.parentCategoryId).then((res) => {
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

</style>

<style>
.el-dialog__body{
    margin-top:20px;
    padding:10px 20px;
}
</style>



