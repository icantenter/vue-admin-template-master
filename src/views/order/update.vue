<template>
  <div class="app-container">
        <el-descriptions title="订单信息">
        <el-descriptions-item label="订单号">{{orderInfo.id}}</el-descriptions-item>
        <el-descriptions-item label="所属人">{{orderInfo.owner}}</el-descriptions-item>
        <el-descriptions-item label="预约医院">{{orderInfo.hospital}}</el-descriptions-item>
        <el-descriptions-item label="预约科室">{{orderInfo.department}}</el-descriptions-item>
        <el-descriptions-item label="预约医生">{{orderInfo.doctor}}</el-descriptions-item>
        <el-descriptions-item label="预约时间">{{orderInfo.expiration}}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{orderInfo.status==1?'已过期':'等待'}}</el-descriptions-item>
        </el-descriptions>
  </div>
</template>
<script>
import orderApi from '@/api/order'
export default {
    data(){
        return{
            id: '',
            orderInfo: ''
        }
    },

    created(){
        this.id = this.$route.params.id
        this.getInfo()
    },

    methods:{
        getInfo(){
            orderApi.getInfo(this.id)
            .then(response=>{
                this.orderInfo = response.data.orderInfo
            })
        }
    }
}
</script>