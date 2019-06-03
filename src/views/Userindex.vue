<template>
  <div>
    <div class="col-lg-12">
      <h1 class="page-header">用户管理</h1>
    </div>
    <el-table :data="list" border stripe v-loading="loading" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor" class="prolist" style="width: 100%">
      <el-table-column type="index" width="55" :index="indexMethod"></el-table-column>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>

      <el-table-column label="用户名">
        <template slot-scope="scope">
          <div class="info" >
            <p>{{scope.row.username}}</p>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{scope.row.email || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="手机号码">
        <template slot-scope="scope">
            {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="会员等级">
        <template slot-scope="scope">
            <el-tag :type="scope.row.role ==0 ? 'warning' :'success' " disable-transitions>{{scope.row.role==0?'普通会员':'超级会员'}}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column label="创建时间" prop="createTime" :formatter="dateFormat">
      </el-table-column> -->

      <el-table-column label="创建时间" >
         <template slot-scope="scope">
            <p>{{datetimeFormat(scope.row.createTime)}}</p>
         </template>
      </el-table-column>
    </el-table>

    <div class="pagination" style="backgound:#fff;">
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="cur_page" :page-sizes="[10, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
// let moment = require("moment");
import Util from "util/mm.js";
import User from 'api/user-server.js';
const _mm = new Util();
const _user = new User();
export default {
  name: 'productlist',
  data() {
    return {
      loading:true,
      cur_page: 1,
      totalCount: 0,
      list: [],
      listParam: {
        pageNum: 1,
        pageSize: 10,

      }
    }
  },

  created() {
    this.loadUserList();
  },

  methods: {

    indexMethod(index){
        return index+1+((this.cur_page-1)*this.listParam.pageSize);
    },

    loadUserList() {
      _user.getUserList(this.listParam).then((res) => {
        this.list = res.list;
        this.loading = false;
        this.totalCount = res.total;
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

    handleClick(row) {
      console.log(row);
    },

    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.listParam.pageNum = val;
      this.loadUserList();
    },
    handleSizeChange(val) {
      this.listParam.pageSize = val;
      this.cur_page = 1;
      this.listParam.pageNum = 1;
      this.loadUserList();
    },
    toDetail(id) {
      this.$router.push({ path: '/product/detail/' + id });
      // this.$router.push({ name: "Goods_Upload_List" });
    },
    dateFormat(row, column) {
      console.log(row, column)
      const date = row[column.property]
      console.log(date);
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    datetimeFormat(date) {
      // if (date === undefined) {
      //   return ''
      // }
     return date === undefined?'':moment(date).format('YYYY-MM-DD HH:mm:ss')
      //return moment(date).format('YYYY-MM-DD HH:mm:ss')
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


