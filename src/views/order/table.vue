<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.id" placeholder="订单号" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.owner" placeholder="所属人" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getDataList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
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

      <el-table-column prop="id" label="订单号" width="200" />

      <el-table-column prop="userId" label="所属人" width="200" />

      <el-table-column prop="expiration" label="预约时间" width="200"/>


      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status===1?'已过期':'等待' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="创建时间" width="200"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/order/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">详情</el-button>
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
import orderApi from '@/api/order'
export default {
    data(){
        return{
            listLoading: true, // 是否显示loading信息
            list: null, // 数据列表
            total: 0, // 总记录数
            page: 1, // 页码
            limit: 5, // 每页记录数
            searchObj: {
                id:'',
                owner:'',
                address:''
      }// 查询条件
        }
    },

    created(){
        this.getDataList()
    },

    methods:{
        getDataList(page = 1){
            this.listLoading = false
            this.page = page
            orderApi.getPageList(this.page,this.limit,this.searchObj)
            .then(response => {
                this.list = response.data.list
                this.total = response.data.total
            })
        },

        // 清空条件查询输入框 
        resetData() {
            this.searchObj = {}
            this.getDataList()
        },
    }
}
</script>