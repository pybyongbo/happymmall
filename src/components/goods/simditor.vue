<template>
  <div class="simditor">
    <textarea :id="id"></textarea>
  </div>
</template>
<script>
  import Simditor from 'simditor'
  import 'simditor/styles/simditor.css'
  export default {
    name: 'edit',
    data() {
      return {
        editor: ''
      }
    },
    props: {
      id:'',  //这里传入动态id，一个页面能使用多个编辑器
      options: {  //配置参数
        type: Object,
        default() {
          return {}
        }
      }
    },
    mounted() {
      let vm = this
      this.editor = new Simditor(Object.assign({}, {
        textarea: $(`#${vm.id}`)
      }, this.options))
      // console.log($(`#${vm.id}`));
      this.editor.on('valuechanged', (e, src) => {
        this.valueChange(e, src);
        // console.log(e);
      })

      // this.editor.on('setDefaulval', (e, src) => {
      //   this.setDefaulval(e, src)
      //   console.log(e,src);
      // })
      this.setDefaulval();
    },
    methods: {
      valueChange(e, val) {
        this.$emit('change', this.editor.getValue())
      },

      setDefaulval(){
        this.$emit('setvalue', this.editor.setValue())
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
