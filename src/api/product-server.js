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

    //改变商品销售状态
    setProductStatus(productId,status){
        return _mm.request({
            url:'/manage/product/set_sale_status.do',
            data:{
                productId:productId,
                status:status
            }
        })
    }

    //获取商品详情
    getdetail(productId){
        return _mm.request({
            url     : '/manage/product/detail.do',
            data    : {
                productId : productId
            }
        });
    }

    //获取商品品类列表
    getCategoryList(productId){
        return _mm.request({
            url     : '/manage/category/get_category.do',
            data    : {
                productId : productId
            }
        });
    }
    /**
     * 品类相关
     * 根据父品类id获取品类列表数据
    */
    getCategoryList(parentCategoryId){
            return _mm.request({
                type    : 'get',
                url     : '/manage/category/get_category.do',
                data    : {
                    categoryId : parentCategoryId || 0
                }
            });
        }

    //保存商品信息
    saveProduct(product){
        return _mm.request({
            type:'post',
            url:'/manage/product/save.do',
            data:product
        })
    }

    //修改品类名称
    updateCategoryName(category) {
        return _mm.request({
            type:'GET',
            url:'/manage/category/set_category_name.do',
            data:category
        })

    }



}
export default Product