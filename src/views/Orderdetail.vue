<template>
    <div class="page-wrapper">
        <div class="tit">
            <h1>订单详情</h1>
            <div class="go-back">
                 <router-link :to="`/order/index`" >
                    返回
                </router-link> 
            </div>
        </div>
        <div class="pro-detail">
          <el-form :model="orderDetail" disabled ref="ruleForm" label-width="80px" :inline=true class="demo-ruleForm detailpage">
            <div class="form-group">
                <el-form-item label="订单号:">
                     <p>{{orderDetail.orderNo}}</p>
                </el-form-item>
            </div>
            <div class="form-group">
                <el-form-item label="创建时间:">
                     <p>{{orderDetail.createTime}}</p>
                </el-form-item>
            </div>

            <div class="form-group">
                 <el-form-item label="收件人:">
                    <p>{{orderDetail.receiverName || '--'}}</p>
                </el-form-item>
            </div>

            <div class="form-group">
                 <el-form-item label="订单状态:">
                    <!-- <p>{{orderDetail.statusDesc}}</p> -->
                    <template>
                            <el-tag :type="orderDetail.status === 10 ? 'danger' :'success' " disable-transitions>{{orderDetail.statusDesc}}</el-tag>
                    </template>
                 </el-form-item>
            </div>

            <div class="form-group">
                 <el-form-item label="支付方式:">
                    <p>{{orderDetail.paymentTypeDesc}}</p>
                 </el-form-item>
            </div>

            <div class="form-group">
                 <el-form-item label="订单金额:">
                    <p>{{orderDetail.payment}}</p>
                 </el-form-item>
            </div>

             <el-table border stripe :data="orderDetail.orderItemVoList"  class="categorylist" style="width: 100%">

                    <el-table-column label="商品图片" align="center"> 
                        <template slot-scope="scope" >
                            <img v-if="scope.row.productImage" class="p-img" :src=orderDetail.imageHost+scope.row.productImage alt="">
                            <p v-else>暂无商品图片</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center"> 
                        <template slot-scope="scope" >
                            <p>{{scope.row.productName}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column label="单价" align="center"> 
                        <template slot-scope="scope">
                            <p>￥{{scope.row.currentUnitPrice}}元</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center"> 
                        <template slot-scope="scope" >
                            <p>{{scope.row.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="合计" align="center"> 
                        <template slot-scope="scope" >
                            <p>￥{{scope.row.totalPrice}}元</p>
                        </template>
                    </el-table-column>
             </el-table>

          </el-form>
        </div>
    </div>
</template>

<script>
import Util from "util/mm.js"
import Order      from 'api/order-server.js';

const _mm           = new Util();
const _order      = new Order(); 


export default {
    name:'orderdetail',
    data(){
        return {
            orderNumber:this.$route.params.id,
            orderDetail:{
                createTime:'',
                receiverName:'',
                status:'',
                statusDesc:'',
                payment:0,
                paymentType:'',
                paymentTypeDesc:'',
                orderItemVoList:[]
            }

        }

    },
    created(){
        let oid = this.$route.params.id;
        _order.getOrderDetail(oid).then(res=>{
          
            this.orderDetail = Object.assign({},res);

        },errMsg=>{
            this.$message({
                    message: res,
                    type: 'error'
            });
        })
    },

    methods:{
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex !== 0) {
        return 'color:#333;font-weight:500;text-align:center;height:30px;line-height:30px;'
      }
    },
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
    color: #409EFF;
}
.pro-detail{
    width:96%;
    margin:0 auto;
}

.pro-detail .form-group{
    text-align: left;
    overflow: hidden;
    width:100%;
    margin-left:0px;
}
.pro-detail .form-group label{
    float:left;
}

img.p-img{
    display: block;
    width: 80px;
    height: 80px;
    margin:0 auto;
}
</style>


