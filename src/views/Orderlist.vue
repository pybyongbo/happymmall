<template>
  <div>
    <div class="col-lg-12">
      <h1 class="page-header">订单管理</h1>
    </div>

    <div class="handle-box">
      <el-select v-model="listParam.searchType" placeholder="筛选条件" class="handle-select mr10">
        <el-option key="1" label="按订单号查询" value="orderNo"></el-option>
      </el-select>
      <el-input v-model="listParam.orderNo" placeholder="订单号" class="handle-input mr10" clearable></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>

    <el-table :data="list" border stripe v-loading="loading" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor" class="prolist" style="width: 100%">
      <el-table-column type="index" width="55" :index="indexMethod"></el-table-column>

      <el-table-column label="订单号">
        <template slot-scope="scope">
          <div class="info" >
            <p>{{scope.row.orderNo}}</p>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="收件人">
        <template slot-scope="scope">
          {{scope.row.receiverName || '--'}}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
             <el-tag :type="scope.row.status === 10 ? 'danger' :'success' " disable-transitions>{{scope.row.status===10?'未付款':'已付款'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单总价">
        <template slot-scope="scope">
            <p>¥ <span style="color:red;font-weight:bold;font-size:16px;margin:0 8px;">{{scope.row.payment}}</span>元</p>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">
            <p>{{scope.row.createTime}}</p>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
            <router-link :to="`/order/detail/${scope.row.orderNo}`">
            <el-button type="text" size="small">查看详情</el-button>
          </router-link> 
          <!-- <el-button @click="toDetail(scope.row.id)" type="text" size="small">查看详情</el-button> -->
          <!--
            //两种写法方式都可以的
            <router-link :to="`/product/detail/${scope.row.id}`" >
                查看
            </router-link>
            -->
          <!-- <router-link :to="`/product/save/${scope.row.id}`">
            <el-button type="text" size="small">编辑</el-button>
          </router-link> -->
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
import Util from "util/mm.js"
import Order from 'api/order-server.js';
const _mm = new Util();
const _order = new Order();
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
        orderNo:'',
        listType: 'list',
        searchType: 'orderNo',
      }
    }
  },

  created() {
    this.loadOrderList();
  },

  methods: {

    indexMethod(index){
        return index+1+((this.cur_page-1)*this.listParam.pageSize);
    },

    loadOrderList() {
      _order.getOrderList(this.listParam).then((res) => {
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
    search() {
        if(this.listParam.orderNo) {
            this.listParam.listType = 'search';
            this.listParam.pageNum = 1;
            this.listParam = Object.assign({}, this.listParam, {
                orderNo: this.listParam.orderNo
            });
            console.log(this.listParam);
            this.loadOrderList();
        } else {

             this.$message({
                message: '请输入订单编号进行查询',
                type: 'warning'
             });
        }
      
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.listParam.pageNum = val;
      this.loadOrderList();
    },
    handleSizeChange(val) {
      this.listParam.pageSize = val;
      this.cur_page = 1;
      this.listParam.pageNum = 1;
      this.loadOrderList();
    },
    toDetail(id) {
      this.$router.push({ path: '/product/detail/' + id });
      // this.$router.push({ name: "Goods_Upload_List" });
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


