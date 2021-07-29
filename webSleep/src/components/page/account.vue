<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 账号管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="query"  ref="query" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username" class="mr10">
                        <el-input v-model="query.username"></el-input>
                    </el-form-item>
                    <el-form-item label="所属角色" prop="roleId" class="mr10">
                        <el-select v-model="query.roleId" placeholder="所属角色" style="width: 100%">
                            <el-option v-for="item in roleVeiw" :label="item.itemValue" :value="item.itemCode" :key="item.itemCode"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button  icon="el-icon-refresh" @click="resetForm">重置</el-button>
                    <div class="f-r">
                        <el-button
                                v-if="jurisdiction('00601')"
                                type="primary"
                                icon="el-icon-lx-add"
                                class="handle-del mr10"
                                @click="addAlert"
                        >新增</el-button>
                    </div>
                </el-form>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                   >


                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="realName" label="姓名"></el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="state" width="100" label="启用状态">
                    <template slot-scope="scope">

                        <el-switch
                                v-model="scope.row.status =='1'? true:false"
                                active-color="#13ce66"
                                inactive-color="rgb(220, 223, 230)"
                                @change="changeSwitch(scope.$index, scope.row,'accountStatus','00606')"
                        >
                        </el-switch>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="jurisdiction('00605')"
                                type="text"
                                icon="el-icon-refresh"
                                @click="editUser(scope.$index, scope.row)"
                        >重置密码</el-button>
                        <el-button
                                v-if="jurisdiction('00603')"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                v-if="jurisdiction('00602')"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row,'accountDel')"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <div class="pagination">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :current-page="query.pageNum"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="35%"  @close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="alertTitle =='新增'">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model.number="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="所属角色" prop="roleId" class="mr10">
                    <el-select v-model="form.roleId" placeholder="所属角色" style="width: 100%">
                        <el-option v-for="item in roleVeiw" :label="item.itemValue" :value="item.itemCode" :key="item.itemCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="启用状态" prop="status">
                    <el-radio v-model="form.status" label="1">启用</el-radio>
                    <el-radio v-model="form.status" label="2">禁用</el-radio>
                </el-form-item>

                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['accountAdd','accountEdit'])">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <!--密码重置-->
        <el-dialog title="重置密码" :visible.sync="editUserVisible" width="35%"  @close="handleClose('editUserform')">
            <el-form ref="editUserform" :model="editUserform" label-width="100px" :rules="editForm">
                <el-form-item label="新密码" prop="newPassword">
                    <el-input show-password v-model="editUserform.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="oldPassword">
                    <el-input show-password v-model="editUserform.oldPassword"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('editUserform',['resetPass'])">确认</el-button>
                    <el-button @click="editUserVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import  interactive   from "../../utils/interactive"
    import {viewList} from "../../utils/api"

    export default {
        name: 'account',
        extends: interactive,

        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editUserform.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                query:{},
                form:{

                },
                editUserVisible:false,
                editUserform:{

                },
                roleVeiw:{},
                rules:{
                    realName:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    mobile:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    roleId:[
                        { required: true, message: '请选择角色', trigger: 'change' },
                    ],
                    status:[
                        { required: true, message: '请选择启用状态', trigger: 'change' },
                    ]


                },
                editForm:{
                    newPassword:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    oldPassword:[
                        { required: true, message: '请输再次输入密码', trigger: 'blur' },

                        { validator: validatePass, trigger: 'blur' }
                    ],
                },


            }
        },
        methods:{
            editUser(index,row){
                this.editUserform.id = row.id
                delete  this.editUserform.oldPassword
                this.editUserVisible = true
            },
            onSubmitEdit(){

            },
            getView() {
                viewList()
                    .then(res => {
                        this.roleVeiw = res[0].roleVeiw

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            this.getData('accountList');
            this.getView()
        },


    };
</script>

