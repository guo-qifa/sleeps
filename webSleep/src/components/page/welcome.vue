<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>欢迎页面配置
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
                            v-if="jurisdiction('00901')"
                    >新增</el-button>
                </div>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    >

                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="标题名称"  align="center"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="state" label="启用状态">
                    <template slot-scope="scope">

                        <el-switch
                                v-model="scope.row.status =='1'? true:false"
                                active-color="#13ce66"
                                inactive-color="rgb(220, 223, 230)"
                                @change="changeSwitch(scope.$index, scope.row,'weStatus','00904')"
                        >
                        </el-switch>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="jurisdiction('00903')"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                v-if="jurisdiction('00902')"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row,'weDel')"
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
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="50%"  @close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="标题名称" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" prop="status">
                    <el-radio v-model="form.status" label="1">启用</el-radio>
                    <el-radio v-model="form.status" label="2">禁用</el-radio>
                </el-form-item>

                <el-form-item label="内容" prop="content">

                    <el-input v-model="form.content" type="textarea"></el-input>


                </el-form-item>

                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['weAdd','weEdit'])">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import  interactive   from "../../utils/interactive"
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import quillConfig from '../../utils/quill-config'
    export default {
        name: 'welcome',
        components:{quillEditor},
        extends: interactive,

        data() {
            return {
                form:{

                    content: '',
                },

                editorOption:quillConfig,
                rules:{
                    title:[
                        { required: true, message: '请输入标题', trigger: 'blur' },
                    ],


                    status:[
                        { required: true, message: '请选择启用状态', trigger: 'change' },
                    ],
                    content:[
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ]


                },


            };
        },
        created() {
            this.getData('weList');
        },

        methods: {




        }
    };
</script>

<style scoped>

</style>
