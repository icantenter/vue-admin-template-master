<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="用户名称">
        <el-input v-model="user.name"/>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select v-model="user.sex" clearable placeholder="请选择">
          <el-option :value="1" label="女"/>
          <el-option :value="0" label="男"/>
        </el-select>
      </el-form-item>
      <el-form-item label="用户是否被冻结">
         <el-switch v-model="user.isDisabled"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '@/api/user'
  export default {
    data() {
      return {
        user: {
          name: '',
          sex: '',
          isDisabled: ''
        },
      }
    },

    created(){
        const id = this.$route.params.id
        this.getUserInfo(id)
    },
    methods: {
      onSubmit(user) {
        userApi.updateUser(this.user)
        .then(response => {
            return this.$message({
            type: 'success',
            message: '修改成功!'
            })
        })
        this.$router.push({ path: '/user/table' })
      },

      getUserInfo(id){
          console.log(id)
          userApi.getUserInfo(id)
          .then(response => {
              this.user = response.data.userInfo
          })
      }
    }
  }
</script>