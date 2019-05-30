import Util from "util/mm.js"
const _mm    = new Util();

class Order{

     //获取订单列表
    getOrderList(listParam) {
        let url = '',
        data = {};
        if(listParam.listType === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
        } else if(listParam.listType==='search'){
            url = '/manage/order/search.do'
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
            data.listType = listParam.listType;
            data.orderNo  = listParam.orderNo;
            // data[listParam.searchType]  = listParam.orderNo;
        }

        return _mm.request({
            // type:'post',
            url:url,
            data
        })
    }

    // 获取订单详情
    getOrderDetail(orderNumber){
        return _mm.request({
            type    : 'post',
            url     : '/manage/order/detail.do',
            data    : {
                orderNo : orderNumber
            }
        });
    }
    sendGoods(orderNumber){
        return _mm.request({
            type    : 'post',
            url     : '/manage/order/send_goods.do',
            data    : {
                orderNo : orderNumber
            }
        });
    }
}

export default Order
   


