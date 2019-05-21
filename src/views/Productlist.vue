<template>
    <div>
        <!-- <h1>商品管理页面</h1> -->
        <div class="col-lg-12">
            <h1 class="page-header">商品管理</h1>
            <div class="page-header-right">
                <el-button type="primary" icon="delete" size="small" class="handle-del mr10">添加商品</el-button>
            </div>
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
            prop="price"
            label="价格">
            </el-table-column>
            <el-table-column
             label="状态">
             <template slot-scope="scope">
                <el-tag
                :type="scope.row.status === 1 ? 'primary' : 'success'"
                disable-transitions>{{scope.row.status===1?'上架':'下架'}}</el-tag>
            </template>

            </el-table-column>
            <el-table-column
            label="操作">
            <template>
                <a href="">查看</a>
                <a href="">编辑</a>
            </template>
            </el-table-column>
        </el-table>
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
            searchKeyword:'',
            list:[],
            listParam:{
                pageNum:1,
                listType:'list'
            }
        }
    },

    created(){
        this.loadProductList();
    },

    methods:{

        loadProductList(){
            _product.getProductList(this.listParam).then((res)=>{
                console.log(res);
                this.list = res.list;
            })
        },
        // 修改table tr行的背景色
        tableRowStyle({ row, rowIndex }) {
        return 'text-align:center;'
        },
        // 修改table header的背景色
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color:lightblue;color:#fff;font-weight:500;text-align:center;'
            }
        }
    }
    
}
</script>
<style scoped>
/* .page-header {
    padding-bottom: 9px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eee;
    margin: 20px 0;
    font-size: 28px;
    color: #666;
    float:left;
}
.page-header-right {
    float: right;
    margin-top: -63px
}
.btn-add{
	position: absolute;
	right: 15px;
	top: 12px;
}
.productStatus span{
	margin-right: 5px;
} */

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
</style>


