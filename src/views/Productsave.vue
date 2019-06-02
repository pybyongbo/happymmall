<template>
  <div class="page-wrapper">
    <div class="tit">
      <h1>商品管理--{{this.$route.params.id?'编辑':'新增'}}商品</h1>
      <div class="go-back">
        <router-link :to="`/product/index`">
          返回
        </router-link>
      </div>
    </div>

    <div class="pro-detail">
      <el-form :model="productInfo" :rules="rules" ref="productForm" label-width="100px" class="demo-ruleForm">
      <div class="form-group">
        <!-- <label for="name">商品名称:</label>
        <div class="con">
          <el-input v-model="productInfo.name"></el-input>
        </div> -->
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="productInfo.name"></el-input>
          </el-form-item>
      </div>
      <div class="form-group">
        <el-form-item label="商品描述:" prop="subtitle">
            <el-input v-model="productInfo.subtitle"></el-input>
        </el-form-item>
      </div>

      <div class="form-group" >
        <!-- <el-form-item label="所属分类:" prop="productDetail"> -->
        <categoryselect :isEdit=false :productDetail="productInfo" @getpcategoryId="getpcategoryId" @getcategoryId="getcategoryId"></categoryselect>
        <!-- </el-form-item> -->
      </div>

      <div class="form-group">
        <el-form-item label="商品价格:" prop="price">
            <el-input v-model="productInfo.price">
              <template slot="prepend">¥ </template>
              <template slot="append">元</template>
            </el-input>
        </el-form-item>
      </div>

      <div class="form-group">
        <el-form-item label="商品库存:" prop="stock">
              <el-input v-model="productInfo.stock">
                  <template slot="append">件</template>
              </el-input>
        </el-form-item>
      </div>

      <div class="form-group batchUpload">
        <!-- <label>商品图片:</label>
        <div class="con">
      
          <el-upload 
          class="upload-demo" 
          action="/manage/product/upload.do" 
          :on-preview="handlePreview" 
          :on-remove="handleRemove" 
          :on-success="uploadSUccess" 
          :file-list="uploadArr" name="upload_file" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div> -->

        <el-form-item label="商品图片:">
          <el-upload 
          class="upload-demo" 
          action="/manage/product/upload.do" 
          :on-preview="handlePreview" 
          :on-remove="handleRemove" 
          :on-success="uploadSUccess" 
          :file-list="uploadArr" name="upload_file" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
             
        </el-form-item>
      </div>

      <div class="form-group">
        <!-- <label for="name">商品详情:</label>
        <div class="con">
          <Simditor ref="soncom" id="txt-content" :options="options" @change="change">
          </Simditor>
        </div> -->
        <el-form-item label="商品详情:">
             <Simditor ref="soncom" id="txt-content" :options="options" @change="change">
             </Simditor>
        </el-form-item>
      </div>

      <div class="btn">

        <el-button type="primary" size="small" class="handle-del mr10" @click="onSubmit()">提交</el-button>

      </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Util from "util/mm.js"
import Product from 'api/product-server.js';

import categoryselect from "../../src/components/goods/product-category"
import Simditor from "../../src/components/goods/simditor"


const _mm = new Util();
const _product = new Product();
export default {
  name: 'productsave',
  components: {
    categoryselect,
    Simditor
  },
  data() {
    let validatePrice = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入商品价格'));
            } else if(value<=0){
                callback(new Error('商品价格需大于0'));
            }else if (!/^(\d|[1-9]\d+)(\.\d{0,5})?$/.test(value)) {
                callback(new Error('请输入正确金额,小数点后最多五位'));
            } else {
                callback();
            }
      };
    return {
      uploadArr: [],
      productInfo: {
        categoryId: 0,
        parentCategoryId: 0,
        name: '',
        subtitle: '',
        subImages: [],
        price: '',
        stock: '',
        detail: '',
        status: 1 //商品状态1为在售
      },
      options: {

        placeHolder: 'this is placeHolder',
        toolbarFloat: false,
        toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment',
        ],
        pasteImage: true,
        upload: {
          url: `/manage/product/richtext_img_upload.do`, //文件上传的接口地址
          params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
          fileKey: 'upload_file', //服务器端获取文件数据的参数名
          connectionCount: 3,
          leaveConfirm: '正在上传文件'
        }
      },
      rules:{
          name: [
            { required: true, message: '请输入商品名称', trigger: 'change' }
          ],
          subtitle:[ { required: true, message: '请输入商品描述', trigger: 'change' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'change' }
          ],
          price:[
            { required: true, validator: validatePrice, trigger: 'change' }
          ],
          stock:[
             {
                required: true,
                pattern: /^[0-9]+$/,
                message: '商品库存应为正整数',
                trigger: 'change'
            }
          ]
      }
    }
  },
  created() {
    this.loadProduct();
  },
  methods: {
    //加载商品详情(编辑和新增共用一个模板)
    loadProduct() {
      //地址栏有id的时候,表示是编辑功能,需要表单回填
      let pid = this.$route.params.id;
      if (pid) {
        _product.getdetail(pid).then((res) => {
            this.getSubImage(res);
            this.productInfo = Object.assign({}, res);
            if(res.subImages!='' && res.subImages!= null) {
                res.subImages.forEach(item => {
                    this.uploadArr.push({
                      uri: item.uri,
                      url: item.url,
                    });
                    return this.uploadArr
                });
            } 
            this.$refs.soncom.setDefaultVal(this.productInfo.detail);
        }, (errMsg) => {
          this.$message({
            message: res,
            type: 'error'
          });
        })
      }
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
      let index = this.uploadArr.findIndex(item => item.uid === file.uid);
      this.uploadArr.splice(index, 1);

    },
    handlePreview(file) {
      console.log(file);
    },
    uploadSUccess(msg, file) {
      //附件上传成功回调
      if (msg.status === 0) {

        this.productInfo.subImages == null || this.productInfo.subImages == '' ? [] : this.productInfo.subImages;
        console.log(file);
        let fileObj = {
          name: file.name,
          uri: file.response.data.uri,
          url: file.response.data.url
        };
        // this.productInfo.subImages.push(fileObj);
        this.uploadArr.push(fileObj)
      } else {
        this.$message({
          message: msg.msg,
          type: 'warning'
        });
      }
    },
    //将uri数组转变成与uploader返回值一样的{uri,url}形式数组，方便显示图片
    getSubImage(res) {
      let images;
      res.subImages ? images = res.subImages.split(',') : '';
      if (res.subImages != null && res.subImages != '') {
        res.subImages = images.map((imgUri) => {
          return {
            name: "pic",
            uri: imgUri,
            // url:  imgUri,
            url: res.imageHost + imgUri
          }
        });
      } else {
        return [];
      }
    },
    getSubImagesString() {
      return this.uploadArr.map((image) => image.uri).join(',');
    },
    change(val) {
      //以html格式获取simditor的正文内容
      this.productInfo = Object.assign({}, this.productInfo, {
        detail: val
      })
    },
    getpcategoryId(val) {
      this.productInfo = Object.assign({}, this.productInfo, {
        parentCategoryId: val
      })
    },
    getcategoryId(val) {
      this.productInfo = Object.assign({}, this.productInfo, {
        categoryId: val
      })
    },
    onSubmit() {

      let product = {
        name: this.productInfo.name,
        subtitle: this.productInfo.subtitle,
        categoryId: parseInt(this.productInfo.categoryId),
        subImages: this.getSubImagesString(), //图片提交转化成字符串提交
        detail: this.productInfo.detail,
        price: parseFloat(this.productInfo.price),
        stock: parseInt(this.productInfo.stock),
        status: this.productInfo.status
      }

      if (this.$route.params.id) { //编辑商品的情况,要传递id过去
        product.id = parseInt(this.$route.params.id);
      } 

       this.$refs['productForm'].validate((valid) => {

         if(valid) {

            _product.saveProduct(product).then((res) => {
              this.$message({
                message: res,
                type: 'success'
              });
              this.$router.push('/product/index');
            }, (errMsg) => {
              _mm.errorTips(errMsg);
            });

         } else{
            console.log('error submit!!');
            return false;
         }
       })
    }
  }
}
</script>

<style scoped>
.page-wrapper .tit {
  overflow: hidden;
  border-bottom: 1px solid #dedede;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.page-wrapper h1 {
  padding-bottom: 9px;
  font-size: 18px;
  color: #666;
  float: left;
}

.page-wrapper .tit .go-back {
  float: right;
  background: url('../assets/back.png') no-repeat left center;
  padding-left: 40px;
}

.page-wrapper .tit .go-back a {
  /* color:#000; */
  color: #409EFF;
}

.pro-detail {
  width: 96%;
  margin: 40px auto 0;
}
.pro-detail .form-group {
    width:68%;
    text-align: left;
    overflow: hidden;
    line-height: 40px;
}

.pro-detail .form-group label {
  float: left;
}
.pro-detail .form-group .con {
  width: 60%;
  margin-left: 20px;
  float: left;
}

.pro-detail .form-group .con ul li {
  list-style-type: none;
}

.pro-detail .form-group .con ul li.thumbpic {
  float: left;
  margin-right: 10px;
  height: 80px;
  padding: 5px;
  border: 2px solid #f00;
}

.pro-detail .form-group .con ul li.thumbpic img {
  max-width: 100px;
  max-height: 80px;
}


.btn {
  margin-left: 100px;
  float: left;
  padding-bottom: 30px;
}

.btn .handle-del {
  width: 240px;
}
</style>


