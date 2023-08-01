<template>
    <div id="app">
        <el-container class="layout-container-demo" style="height: 500px">
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu router :default-openeds="['0','1']">
                        <template v-for="(item,index) in $router.options.routes">
                            <el-sub-menu v-if="item.show" :index="index+''">
                                <template #title>
                                    <el-icon><setting /></el-icon>{{item.name}}
                                </template>
                                <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                                 :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
                            </el-sub-menu>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <div class="toolbar">
                        <el-dropdown>
                            <el-icon style="margin-right: 8px; margin-top: 1px"
                            ><setting
                            /></el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>View</el-dropdown-item>
                                    <el-dropdown-item>Add</el-dropdown-item>
                                    <el-dropdown-item>Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <span>Tom</span>
                    </div>
                </el-header>

                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

    const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
    const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
    .layout-container-demo .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
    }
    .layout-container-demo .el-aside {
        color: var(--el-text-color-primary);
        background: var(--el-color-primary-light-8);
    }
    .layout-container-demo .el-menu {
        border-right: none;
    }
    .layout-container-demo .el-main {
        padding: 0;
    }
    .layout-container-demo .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
    }
</style>