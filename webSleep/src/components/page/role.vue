<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="query" ref="query" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="name" class="mr10">
                        <el-input v-model="query.name"></el-input>
                    </el-form-item>

                    <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
                    <div class="f-r">
                        <el-button
                                v-if="jurisdiction('00401')"
                                type="primary"
                                icon="el-icon-lx-add"
                                class="handle-del mr10"
                                @click="addAlert"
                        >新增
                        </el-button>
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
                <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="menus" label="权限">
                    <template slot-scope="scope">
                        <el-tree
                                :data="scope.row.menus"
                                node-key="id"
                                ref="tree"
                                :props="defaultProps2">
                        </el-tree>
                    </template>
                </el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="jurisdiction('00404')"
                                class="yellow"
                                type="text"
                                icon="el-icon-s-tools"
                                @click="jurisdictionEdit(scope.$index, scope.row)"
                        >权限
                        </el-button>
                        <el-button
                                v-if="jurisdiction('00403')"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                v-if="jurisdiction('00402')"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row,'rolDel')"
                        >删除
                        </el-button>
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
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="35%" @close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="角色名称" prop="name" v-if="alertFlag">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="权限" prop="listMenuIds" v-if="alertTitle =='新增' ||  alertFlag ==false">
                    <el-tree
                            :data="treeData"
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            :props="defaultProps">
                    </el-tree>
                </el-form-item>


                <el-form-item style="text-align: center">
                    <el-button v-if="fadd" type="primary"  @click="submitForm('form',['rolAdd'])">确定</el-button>
                    <el-button v-if="cName" type="primary" @click="submitForm('form',[undefined,'rolEdit'])">确定</el-button>
                    <el-button v-if="qx" type="primary" @click="submitForm('form',[undefined,'powerEdit'])">确定</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import interactive from "../../utils/interactive"
    import {powerList} from "../../utils/api"

    export default {
        name: 'role',
        extends: interactive,

        data() {
            return {
                fadd:false,
                qx:false,
                cName:false,
                alertFlag: true,
                form: {
                    name:'',
                    roleId:''
                },
                showTreeData:[],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                defaultProps2: {
                    children: 'children',
                    label: 'memuName'
                },
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                    ],
                }
            };
        },
        methods: {

            addAlert(){
                this.$set(this.form,'name','')
                this.cName = false
                this.fadd = true
                this.qx = false
                this.editVisible = true;
                this.alertTitle = "新增"
                this.alertFlag  = true
            },
            getRowText(v) {
                let q = v.menus
                let o = []
                for (let i = 0; i < q.length; i++) {
                    if (q[i].parentId == 0) {
                        o.push(q[i].memuName)
                    }

                }
                return o.join("，")
            },
            getpowerList() {
                powerList()
                    .then(res => {
                        this.treeData = res.result

                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            jurisdictionEdit(index, row) {
                this.cName = false
                this.fadd = false
                this.qx = true
                this.alertTitle = "编辑"
                this.editVisible = true;
                this.alertFlag  = false

                let arrId = []
                let n = row.menus
                for(let i =0;i<n.length;i++){

                        if(n[i].children.length>0){
                            arrId.push(n[i].parentId)
                           for(let k=0;k<n[i].children.length;k++){
                               arrId.push(n[i].children[k].menuId)
                           }
                        }else {
                            arrId.push(n[i].menuId)
                        }
                }
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(arrId);
                    this.form = Object.assign({}, row);
                });

            },
            handleEdit(index, row) {
                let  _this = this
                this.cName = true
                this.fadd = false
                this.qx = false
                this.alertTitle = '编辑';
                this.editVisible = true;
                this.alertFlag  = true
                this.$set(this.form,'name','')
                _this.form.name  = row.roleName
                _this.form.roleId  = row.roleId


            },

        },
        created() {
            this.getData("rolList");
            this.getpowerList()
        },


    };
</script>

