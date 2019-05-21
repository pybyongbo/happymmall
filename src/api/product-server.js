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

        } else if(listParam.listType==='search'){
            url = '/manage/product/search.do'
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }

        return _mm.request({
            type:'post',
            url:url,
            data:FormData
        })
    }

    


}
export default Product