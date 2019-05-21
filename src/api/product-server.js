import Util from "util/mm.js"
const _mm    = new Util();

class Product{

    //获取商品列表数据
    getProductList(listParam) {
        let url = '',
        data = {};

        if(listParam.listType === 'list') {

            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;

        } else if(listParam.listType==='search'){
            url = '/manage/product/search.do'
            data.pageNum = listParam.pageNum;
            data.pageSize = listParam.pageSize;
            data.listType = listParam.listType;
            data[listParam.searchType]  = listParam.keyword;

            
        }

        return _mm.request({
            type:'GET',
            url:url,
            data
        })
    }




}
export default Product