<template>
  <div class="app-container">
    <el-form
      :model="hospital"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="医院名称" prop="name">
        <el-input v-model="hospital.name"></el-input>
      </el-form-item>

      <el-form-item label="医院地址" prop="address">
        <el-input v-model="hospital.address"></el-input>
      </el-form-item>

      <el-form-item label="联系人电话" prop="mobile">
        <el-input v-model="hospital.mobile"></el-input>
      </el-form-item>

      <el-form-item label="医院描述" prop="intro">
        <el-input v-model="hospital.intro"></el-input>
      </el-form-item>
      <!-- 医院头像 -->
      <el-form-item label="医院头像">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="hospital.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/oss/fileoss'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospitalApi from '@/api/hospital'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
  export default {
    components: { ImageCropper, PanThumb },
    data() {
      return {
        hospital: {
          name: '',
          avatar: '',
          address: '',
          mobile: '',
          intro: '',
          avatar: ''
        },
        imagecropperShow:false,
        imagecropperKey:0,
        BASE_API:process.env.BASE_API
      }
    },

    created(){
      const id = this.$route.params.id
      console.log(id)
      // 若路由id不为空则表示为修改操作
      if(!id == ''){
        this.getInfo(id)
      }
    },
    methods: {
      // 上传成功后的回调函数
      cropSuccess(data) {
        this.imagecropperShow = false
        this.hospital.avatar = data.url
        // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
        this.imagecropperKey = this.imagecropperKey + 1
      },

      // 关闭上传组件
      close() {
        this.imagecropperShow = false
        // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
        this.imagecropperKey = this.imagecropperKey + 1
      },

      // 重置表单数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // 判断为保存或添加
      saveOrUpdate(){
        console.log(this.$route.params.id)
        if(this.$route.params.id === undefined){
          this.insert()   
        }else{
          this.update()
        }
      },

      insert(){
        hospitalApi.insert(this.hospital)
        .then(response =>{
            return this.$message({
              type: 'success',
              message: '添加成功!'
            })
        })
        this.$router.push({path:'/hospital/table'})
      },

      update(){
        hospitalApi.update(this.hospital)
        .then(response => {
              return this.$message({
              type: 'success',
              message: '修改成功!'
            })
        })
        this.$router.push({path:'/hospital/table'})
      },

      // 当为修改操作时，先查询出信息进行回显
      getInfo(id){
        hospitalApi.getInfo(id)
        .then(response => {
          this.hospital = response.data.info
        })
      }
    }
  }
</script>