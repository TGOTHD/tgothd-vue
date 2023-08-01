<template>
    <div id="app">
        <el-table ref="table" :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="id" label="编号"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="age" label="年龄"/>
            <el-table-column prop="sex" label="性别"/>
            <el-table-column prop="tel" label="电话"/>
            <el-table-column prop="addr" label="地址"/>
            <el-table-column prop="card" label="身份证号"/>
            <el-table-column prop="married" label="婚姻状态"/>
            <el-table-column prop="salary" label="薪水"/>
            <el-table-column prop="onLineState" label="在线状态"/>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="updateTime" label="更新时间"/>
            <el-table-column prop="isDeleted" label="逻辑删除"/>
            <el-table-column fixed="right" label="选项" width="120">
                <template v-slot="scope" #default>
                    <el-button link type="primary" size="small" @click="edit(scope.row)">修改</el-button>
                    <el-button link type="primary" size="small" @click="deleteData(scope.currentPage,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background small layout="prev, pager, next" ref="pagination" :current-page="currentPage" :page-sizes="pageSize" :page-count="pageCount" :page-total="pageTotal" @current-change="updateTableData"/>
    </div>
</template>

<script>
    import { ElMessage } from 'element-plus'

    export default {
        name: "PageOne",
        data(){
            return {
                pageSize: null,
                pageCount: null,
                pageTotal: null,
                tableData: null,
                currentPage: 1
            }
        },
        methods: {
            edit(row){
                this.$router.push({
                    path: "/updateUser",
                    query: {
                        id: row.id
                    }
                });
            },
            deleteData(currentPage,row){
                const _this = this
                const _id = row.id
                this.axios.delete('/tgothd/user/deleteById?id='+_id).then(function (resp) {
                    let data = resp.data
                    if (data > 0) {
                        ElMessage.success('删除成功')
                        _this.updateTableData(_this.$refs.pagination.currentPage)
                    } else {
                        ElMessage.error('删除失败')
                    }
                })
            },
            updateTableData(currentPage){
                const _this = this
                this.axios.get('/tgothd/user/pageInfo?pageNow='+currentPage+'&pageSize=10').then(function (resp) {
                    let _data = resp.data
                    _this.currentPage = _data.pageNum
                    _this.pageSize = _data.pageSize
                    _this.pageCount = _data.pages
                    _this.pageTotal = _data.total
                    _this.tableData = _data.list
                    _this.$refs.table.clearSelection()
                    _this.$refs.table.clearSort()
                    _this.$refs.pagination.$forceUpdate()
                })
            }
        },
        created(){
            this.updateTableData('1')
        }
    }
</script>
