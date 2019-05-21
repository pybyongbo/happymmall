<template>
    <div>
        <!-- <h1>商品管理页面</h1> -->
        <div class="col-lg-12">
            <h1 class="page-header">商品管理</h1>
            <div class="page-header-right">
                <el-button type="primary" icon="delete" size="small" class="handle-del mr10">添加商品</el-button>
            </div>
        </div>

         <div class="handle-box">

                <el-select v-model="listParam.searchType" placeholder="筛选条件" class="handle-select mr10">
                    <el-option key="1" label="按商品ID查询" value="productId"></el-option>
                    <el-option key="2" label="按商品名称查询" value="productName"></el-option>
                </el-select>
                <el-input v-model="listParam.keyword" placeholder="筛选关键词" class="handle-input mr10" clearable></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>

        <el-table
            :data="list"
            border
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            class="prolist"
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
            prop="id"
            label="ID"
            width="80"
            >
            </el-table-column>
            
            <el-table-column
            label="信息"
            width="620">
                <template slot-scope="scope">
                    <div class="info">
                        <p>{{scope.row.name}}</p>
                        {{scope.row.subtitle}}
                    </div>
                </template>

            </el-table-column>
            <el-table-column
            label="价格(¥)">
                <template slot-scope="scope">
                    ¥{{scope.row.price}}元
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                :filters="[{ text: '已下架', value: '1' }, { text: '在售', value: '2' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
             >
             <template slot-scope="scope">
                <el-tag
                :type="scope.row.status === 1 ? 'danger' : 'success'"
                disable-transitions>{{scope.row.status===1?'已下架':'在售'}}</el-tag>

                <el-button @click="handleClick(scope.row)"  size="small">{{scope.row.status===1?'上架':'下架'}}</el-button>

            </template>

            </el-table-column>
            <el-table-column
            label="操作">

            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
            </template>

            </el-table-column>
        </el-table>

        <div class="pagination" style="backgound:#fff;">
                <el-pagination 
                background 
                @current-change="handleCurrentChange" 
                @size-change="handleSizeChange"
                :current-page="cur_page"
                :page-sizes="[10, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
                </el-pagination>
        </div>
    </div>
</template>

<script>
import Util from "util/mm.js"
import Product      from 'api/product-server.js';
const _mm           = new Util();
const _product      = new Product();  
export default {
    name:'productlist',
    data(){
        return {
            cur_page: 1,
            totalCount: 0,
            list:[],
            listParam:{
                pageNum:1,
                pageSize:10,
                listType:'list',
                keyword:'',
                searchType:'productId',
            }
        }
    },

    created(){
        this.loadProductList();
    },

    methods:{

        loadProductList(){
            _product.getProductList(this.listParam).then((res)=>{
                this.list = res.list;
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
        filterTag(value, row) {
            return row.status === value;
        },
        search(){
            this.listParam.listType = 'search';
            this.listParam.pageNum = 1;
            this.listParam = Object.assign({},this.listParam,{
                keywords:this.searchKeyword
            });
            this.loadProductList();
        },
         // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
            this.listParam.pageNum=val;
            this.loadProductList();
        },
        handleSizeChange(val) {
            this.listParam.pageSize = val;
            this.cur_page = 1;
            this.listParam.pageNum=1;
            this.loadProductList();
        },
    }
    
}
</script>
<style scoped>
    .col-lg-12{
        overflow: hidden;
        border-bottom: 1px solid #fff;
        margin-bottom:10px;
    }
    .col-lg-12 .page-header {
        padding-bottom: 9px;
        font-size: 18px;
        color: #666;
        float:left;
    }
    .col-lg-12 .page-header-right{
        float:right;
    }
    .handle-box {
        margin-bottom: 10px;
        float:left;
    }

    .handle-select {
        width: 160px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>


