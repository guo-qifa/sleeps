<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 门店管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="query"  ref="query" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="门店名称" prop="storeName" class="mr10">
                        <el-input v-model="query.storeName"></el-input>
                    </el-form-item>
                    <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button  icon="el-icon-refresh" @click="resetForm">重置</el-button>
                    <div class="f-r">
                        <el-button
                                v-if="jurisdiction('00501')"
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
                    @expand-change="zydescription"
            >
                <el-table-column type="expand">
                    <el-table
                            :data="props.row.child || []"
                            border
                            slot-scope="props"
                            class="table" >



                        <el-table-column prop="username" label="用户名"  align="center"></el-table-column>
                        <el-table-column prop="realName" label="姓名"  align="center"></el-table-column>
                        <el-table-column prop="mobile" label="手机号"  align="center"></el-table-column>
                        <el-table-column label="操作" width="300" align="center">
                            <template slot-scope="scope">
                                <el-button
                                        v-if="jurisdiction('00509')"
                                        type="text"
                                        icon="el-icon-edit"
                                        @click="editUser(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                        v-if="jurisdiction('00507')"
                                        type="text"
                                        icon="el-icon-refresh"
                                        @click="editpass(scope.$index, scope.row)"
                                >重置密码</el-button>
                                <el-button
                                        v-if="jurisdiction('00508')"
                                        type="text"
                                        icon="el-icon-delete"
                                        class="red"
                                        @click="handleDelete(scope.$index, scope.row,'staffDel')"
                                >删除账号</el-button>

                            </template>
                        </el-table-column>

                    </el-table>

                </el-table-column>

                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="storeName" label="门店名称"  align="center"></el-table-column>
                <el-table-column prop="storeAdress" label="门店地址"></el-table-column>
                <el-table-column prop="storeMobile" label="门店电话"></el-table-column>

                <el-table-column label="门店图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.storeImage"
                                :preview-src-list="[scope.row.storeImage]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>

                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button

                                type="text"
                                icon="el-icon-user"
                                class="yellow"
                                @click="lookshopping(scope.$index, scope.row)"
                        >查看导购</el-button>
                        <el-button
                                v-if="jurisdiction('00503')"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                v-if="jurisdiction('00502')"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row,'storeDel')"
                        >删除</el-button>
                        <el-button
                                v-if="jurisdiction('00505')"
                                type="text"
                                icon="el-icon-plus"
                                @click="addUser(scope.$index, scope.row)">
                        添加账号</el-button>
                    </template>
                </el-table-column>
            </el-table>
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

        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="35%"  @close="handleClose">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="门店名称" prop="storeName" >
                    <el-input v-model="form.storeName"></el-input>
                </el-form-item>
                <el-form-item label="门店地址" prop="storeAdress">
                    <el-input v-model="form.storeAdress"></el-input>
                </el-form-item>
                <el-form-item label="门店电话" prop="storeMobile">
                    <el-input v-model="form.storeMobile" ></el-input>
                </el-form-item>

                <el-form-item label="门店图片" prop="name">
                    <el-upload
                            :fileList="fileList"
                            :limit='1'
                            :action="actionUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleAvatarSuccess"
                            :beforeUpload="beforeAvatarUpload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['storeAdd','storeEdit'])">确定</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <!--添加账号-->
        <el-dialog :title="cTxet" :visible.sync="addUserVisible" width="35%"  @close="handleClose('addUserform')">
            <el-form ref="addUserform" :model="addUserform" label-width="100px" :rules="addrole" >
                <el-form-item label="用户名" prop="username" v-if="cTxet=='新增'">
                    <el-input v-model="addUserform.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="addUserform.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model.number="addUserform.mobile"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-if="cTxet=='新增'">
                    <el-input show-password  v-model="addUserform.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwords" v-if="cTxet=='新增'" >
                    <el-input show-password  v-model="addUserform.passwords"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('addUserform',['staffAdd','staffEdit'])">确定</el-button>
                    <el-button @click="addUserVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <!--修改密码-->
        <el-dialog title="重置密码" :visible.sync="editUserVisible" width="35%"  @close="handleClose('editUserform')">
            <el-form ref="editUserform" :model="editUserform" label-width="100px" :rules="addpass">
                <el-form-item show-password  label="新密码"  >
                    <el-input show-password v-model="editUserform.newPassword"></el-input>
                </el-form-item>
                <el-form-item show-password  label="确认密码" >
                    <el-input show-password v-model="editUserform.newPasswords"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('editUserform',[undefined,'staffPass'])">确定</el-button>
                    <el-button @click="editUserVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
    import  interactive   from "../../utils/interactive"
    import {staffList} from "../../utils/api"


    export default {
        name: 'store',
        extends: interactive,
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addUserform.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editUserform.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                actionUrl:`https://${window.location.host}/backstage/file/upd`,
                fileList: [],
                cTxet:'新增',
                dialogImageUrl: '',
                dialogVisible: false,
                addUserVisible:false,
                editUserVisible:false,
                form:{},
                editUserform:{

                },
                addUserform:{

                },
                tableChild:[],
                rules:{
                    storeName:[
                        { required: true, message: '请输入门店名称', trigger: 'blur' },
                    ],
                    storeAdress:[
                        { required: true, message: '请输入门店地址', trigger: 'blur' },
                    ],
                    storeMobile:[
                        { required: true, message: '请输入门店电话', trigger: 'blur' },
                    ],

                },
                addrole:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    realName:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    mobile:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    passwords:[
                        { required: true, message: '请输再次输入密码', trigger: 'blur' },

                        { validator: validatePass, trigger: 'blur' }
                    ],


                },
                addpass:{
                    newPassword:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    newPasswords:[
                        { required: true, message: '请输再次输入密码', trigger: 'blur' },

                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                addId:''


            };
        },
        created() {
            this.getData("storeList", ()=>{
                for(let i = 0;i < this.tableData.length;i++){
                    this.$set(this.tableData[i], 'child' ,[]);
                }
            });
        },

        methods:{
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 20
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过20MB!',
                        type: 'warning'
                    });
                    return false
                }
            },
            zydescription(row, expandedRows){
                if(this.jurisdiction('00506') == undefined){
                    this.$message.error('您没有相关操作权限!')
                    return false
                }
                this.addUserform.addId  = row.storeId
                if (expandedRows.length > 0) {
                    staffList(row)
                        .then(res => {
                            row.child = res.result
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }


            },

            addUser(index,v){
                this.cTxet = "新增"
                this.addUserVisible = true
                this.addUserform ={
                    realName:'',
                    mobile:'',
                    storeId:v.storeId

                }
            },
            editUser(index, row){
                this.cTxet = "编辑"
                this.addUserVisible  = true
                this.addUserform = Object.assign({}, row);

            },
                handlePictureCardPreview(){

            },
            editpass(index,row){
                this.editUserVisible= true
                this.editUserform.storeUserId = row.storeUserId

            },


            onSubmitUser(){},
            onSubmitEdit(){},
            handleAvatarSuccess(res, file) {
                this.form.storeImage = res.result;
            },
            handleRemove(file, fileList) {
                this.form.storeImage =''
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleClose() {
                this.$refs.form.resetFields();
                this.form ={}
                this.fileList =[]

            },
            handleEdit(index, row) {
                this.alertTitle = '编辑';
                this.editVisible = true;
                if(row.storeImage){
                    this.fileList.push({
                        url:row.storeImage
                    })
                }else {
                    this.fileList = []
                }

                this.form = Object.assign({}, row);

            },
            lookshopping(index,row){
                this.$router.push({path:'/shopping',query: {id:row.storeId}})

            }
        }
    };
</script>

