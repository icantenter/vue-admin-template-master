<template>
  <div class="app-container">
      <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="用户名称" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.mobile" placeholder="手机号" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getDataList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="150" />

      <el-table-column prop="mobile" label="手机号" />

      <el-table-column prop="gmtCreate" label="添加时间" width="200"/>

      <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex===1?'女':'男' }}
        </template>
      </el-table-column>

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.isDisabled===true?'已冻结':'正常' }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  
  <!-- 分页 -->
  <el-pagination
   :current-page="page"
    :page-size="limit"
    :total="total"
    style="padding: 30px 0; text-align: center"
    layout="total, prev, pager, next, jumper"
    @current-change="getDataList"
  />
  </div>
</template>

<script>
import userApi from '@/api/user'
  export default {
    data() {
      return {
            listLoading: true, // 是否显示loading信息
            list: null, // 数据列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 5, // 每页记录数
            searchObj: {
                name:'',
                mobile:''
            }// 查询条件
      }
    },

    created(){
        this.getDataList()
    },
    methods: {
        getDataList(page = 1){
            this.listLoading = false
            this.page = page
            userApi.getPageList(this.page,this.limit,this.searchObj)
            .then(response =>{
                if(response.success){
                    this.list = response.data.userList
                    this.total = response.data.total
                }
            })
        },

        // 清空条件查询输入框 
        resetData() {
            this.searchObj = {}
            this.getDataList()
        },
         removeDataById(id) {
            this.$confirm("此操作将永久删除用户信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                userApi
                .deleteUserId(id)
                .then((response) => {
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                    })
                    this.getDataList()
                })
            })
        },
    }
  }
</script>