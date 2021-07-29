<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>菜单管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="f-r" style="margin-bottom: 20px">
                    <el-button
                            type="primary"
                            icon="el-icon-lx-add"
                            class="handle-del mr10"
                            @click="addAlert"
                    >新增
                    </el-button>
                </div>
            </div>

            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="菜单名称" ></el-table-column>
                <el-table-column prop="level" label="菜单等级">
                    <template slot-scope="scope">
                        <p  v-html="getRowText(scope.row.level)"></p>
                    </template>
                </el-table-column>
                <el-table-column prop="sortNo" label="排序"></el-table-column>
                <el-table-column prop="frontCode" label="前端授权码"></el-table-column>
                <el-table-column prop="backUrl" label="后台路由"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row,'menDel')"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="35%" @close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="菜单名称" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="前端授权码" prop="frontCode">
                    <el-input v-model="form.frontCode"></el-input>
                </el-form-item>
                <el-form-item label="后台路由" prop="backUrl">
                    <el-input v-model="form.backUrl"></el-input>
                </el-form-item>
                <el-form-item label="菜单等级" prop="level">
                    <el-select v-model="form.level" placeholder="请选择" style="width: 100%">

                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>



                    </el-select>

                </el-form-item>

                <el-form-item label="上级菜单" prop="parentId" v-if="form.level !=1">
                    <el-select v-model="form.parentId" placeholder="请选择" style="width: 100%">
                        <el-option
                                v-for="item in tableData"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sortNo">
                    <el-input-number v-model.number="form.sortNo" :min="1"></el-input-number>
                </el-form-item>


                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['menAdd','menEdit'])">确定</el-button>

                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import  interactive   from "../../utils/interactive"

    export default {
        name: 'menus',
        extends: interactive,
        data() {
            return {
                options: [{
                    value: '1',
                    label: '一级菜单'
                }, {
                    value: '2',
                    label: '子菜单'
                }, {
                    value: '3',
                    label: '按钮'
                }],

                form: {
                    title:'',
                    level: "",
                    frontCode:'',
                    backUrl:'',
                    parentId:'',


                },
                rules:{
                    title:[
                        { required: true, message: '请输入菜单标题', trigger: 'blur' },
                    ],
                    frontCode:[
                        { required: true, message: '请输入前端授权码', trigger: 'blur' },
                    ],
                    backUrl:[
                        { required: true, message: '请输入后端路由', trigger: 'blur' },
                    ],
                    level:[
                        { required: true, message: '请选择菜单等级', trigger: 'change' },
                    ],
                    parentId:[
                        { required: true, message: '请选择上级菜单', trigger: 'change' },
                    ],
                    sort:[
                        { required: true, message: '请选择排序', trigger: 'blur' },
                    ]
                }
            };
        },
       methods:{
           getRowText(v){
               let  t ;
              if(v =='1'){
                  t ='一级菜单'
              } else if(v =='2'){
                  t ='子菜单'
              }else {
                  t = '按钮'
              }
              return t
           }

       },
        created() {
            this.getData("powerList");
        },


    };
</script>

<style scoped>

</style>
