<template>
    <div id="app">
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
                status-icon
                style="max-width: 460px"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password v-model="ruleForm.password" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex" />
            </el-form-item>
            <el-form-item label="电话" prop="tel">
                <el-input v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="地址" prop="addr">
                <el-input type="textarea" v-model="ruleForm.addr" />
            </el-form-item>
            <el-form-item label="身份证号" prop="card">
                <el-input v-model="ruleForm.card" />
            </el-form-item>
            <el-form-item label="婚姻状态" prop="married">
                <el-input v-model="ruleForm.married" />
            </el-form-item>
            <el-form-item label="薪水" prop="salary">
                <el-input v-model="ruleForm.salary" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    创建
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { ElMessage } from 'element-plus'
    import axios from "axios";
    import { useRouter } from 'vue-router'
    const router = useRouter();

    interface RuleForm {
        username: string
        password: string
        email:string
        age:number
        sex:string
        tel:string
        addr:string
        card:string
        married:boolean
        salary:number
    }

    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive<RuleForm>({
        username: '',
        password: '',
        email:'',
        age:18,
        sex:'man',
        tel:'',
        addr:'beijing',
        card:'',
        married:false,
        salary:0
    })

    const rules = reactive<FormRules<RuleForm>>({
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度3到5个字符', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度3到5个字符', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
            { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        tel: [
            { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        card: [
            { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        married: [
            { required: true, message: '请输入婚姻状态', trigger: 'blur' }
        ],
        salary: [
            { required: true, message: '请输入薪水', trigger: 'blur' }
        ]
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                axios.post('/tgothd/user/save',ruleForm).then(function (resp) {
                    let data = resp.data
                    if (data > 0) {
                        ElMessage.success('创建成功')
                        router.push("/user");
                    } else {
                        ElMessage.error('创建失败')
                    }
                })
            } else {
                console.log('error submit!', fields)
            }
        })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
</script>
