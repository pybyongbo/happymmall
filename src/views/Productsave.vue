<template>
<div class="page-wrapper">
        <div class="tit">
            <h1>商品管理--新增商品</h1>
            <div class="go-back">
                 <router-link :to="`/product/index`" >
                    返回
                </router-link> 
            </div>
        </div>

        <div class="pro-detail">

            <div class="form-group">
                <label for="name">商品名称:</label>
                <div class="con">
                    <el-input v-model="productInfo.name"></el-input>
                </div>
            </div>
            <div class="form-group">
                <label for="name">商品描述:</label>
                <div class="con">
                    <el-input v-model="productInfo.subtitle"></el-input>
                </div>
            </div>

            <div class="form-group">
                <categoryselect :isEdit=false @getpcategoryId="getpcategoryId" @getcategoryId="getcategoryId"></categoryselect>
            </div>

            <div class="form-group">
                <label for="name">商品价格:</label>
                <div class="con">
                     <el-input placeholder="请输入内容" v-model="productInfo.price">
                        <template slot="prepend">¥ </template>
                        <template slot="append">元</template>
                    </el-input>
                </div>
            </div>

            <div class="form-group">
                <label style="line-height:68px;">商品库存:</label>
                <div class="con">
                    <el-input v-model="productInfo.stock" >
                        <template slot="append">件</template>
                    </el-input>
                </div>
            </div>

            <div class="form-group batchUpload">
                <label>商品图片:</label>
                <div class="con">
                    <el-upload
                        class="upload-demo"
                        action="/manage/product/upload.do"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSUccess"
                        name="upload_file"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
            </div>

             <div class="form-group">
                <label for="name">商品详情:</label>
                <div class="con">
                   <Simditor
                    id="textarea"
                    :options="options"
                    @change="change">
                    </Simditor>
                </div>
            </div>

            <div class="btn">
                <el-button type="primary"  size="small" class="handle-del mr10" @click="onSubmit()">提交</el-button>
            </div>

        </div>
    </div>
    
</template>

<script>
import Util from "util/mm.js"
import Product      from 'api/product-server.js';

import categoryselect from "../../src/components/goods/product-category"
import Simditor from "../../src/components/goods/simditor"


const _mm           = new Util();
const _product      = new Product(); 
export default {
    name:'productsave',
    components: {
        categoryselect,
        Simditor
    },
    data(){
        return {
            productInfo:{
                categoryId          : 0,
                parentCategoryId    : 0,
                // id                  : '',
                name                : '',
                subtitle            : '',
                subImages           : [],
                price               : '',
                stock               : '',
                detail              : '',
                status              : 1 //商品状态1为在售  
            },
            options: {
            placeHolder: 'this is placeHolder',
            toolbarFloat: false,
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code',  '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment',
            ],
            pasteImage:true,
            upload:{
                    url : `/manage/product/richtext_img_upload.do`, //文件上传的接口地址
                    params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
                    fileKey: 'upload_file', //服务器端获取文件数据的参数名
                    connectionCount: 3,
                    leaveConfirm: '正在上传文件'
                }
            }
        }
    },
    methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            uploadSUccess(msg, file) {
                //附件上传成功回调
                console.log(msg);

                console.log(file);
                if (msg.status === 0) {
                    
                    let subImages = this.productInfo.subImages;
                    subImages.push(file.response.data.uri);
                } else {
                    this.$message({
                        message: msg.msg,
                        type: 'warning'
                    });
                }
            },
             //将uri数组转变成与uploader返回值一样的{uri,url}形式数组，方便显示图片
            getSubImage(res){
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
            },
            getSubImagesString(){
                return this.productInfo.subImages.map((image) => image.uri).join(',');
            },
            change(val){
                console.log(val)  //以html格式获取simditor的正文内容
                this.productInfo = Object.assign({},this.productInfo,{
                    detail:val
                })
            },
            getpcategoryId(val){
                this.productInfo = Object.assign({},this.productInfo,{
                    parentCategoryId:val
                })
            },
            getcategoryId(val){
                this.productInfo = Object.assign({},this.productInfo,{
                    categoryId:val
                })
            },
            onSubmit(){

                
                this.productInfo = Object.assign({},this.productInfo,{
                    subImages:this.productInfo.subImages.join(',')
                });
                console.log(this.productInfo);
                // return;
                _product.saveProduct(this.productInfo).then((res) => {
                    // _mm.successTips(res);
                    this.$message({
                        message: res,
                        type: 'success'
                    });
                    this.$router.push('/product/index');
                }, (errMsg) => {
                    _mm.errorTips(errMsg);
                });

            }
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
    /* color:#000; */
        color: #409EFF;
}
.pro-detail{
    width:96%;
    margin:40px auto 0;
}

.pro-detail .form-group{
    text-align: left;
    overflow: hidden;
    margin-bottom:20px;
    line-height: 40px;
}

.pro-detail .form-group label{
    float:left;
}
.pro-detail .form-group .con{
    width:60%;
    margin-left:20px;
    float:left;
}
.pro-detail .form-group .con ul li{
    list-style-type:none;
}
.pro-detail .form-group .con ul li.thumbpic{
    float:left;
    margin-right:10px;
    height:80px;
    padding:5px;
    border:2px solid #f00;
}
.pro-detail .form-group .con ul li.thumbpic img{
    max-width:100px;
    max-height:80px;
}


.btn{
    margin-left:90px;
    float:left;
    padding-bottom:30px;
}
.btn .handle-del{
    width:240px;
}
</style>


