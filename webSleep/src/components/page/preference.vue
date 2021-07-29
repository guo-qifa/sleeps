<template>
    <div>

        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>偏好可选范围</span>
                <el-button type="primary" size="mini" style="margin-left: 20px" @click="add" v-if="tableData.length<1">新增</el-button>
                <el-table
                        border
                        :data="tableData"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="openInterval" label="偏好最小范围" align="center">


                    </el-table-column>
                    <el-table-column prop="closeInterval" label="偏好最大范围" align="center">


                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>床垫软硬选择文案配置</span>
                <el-button type="primary" size="mini" style="margin-left: 20px" @click="adds">新增</el-button>
                <el-table
                        border
                        :data="tableData2"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="preValue" label="相差值" align="center">


                    </el-table-column>
                    <el-table-column prop="content" label="文案提示" align="center">


                    </el-table-column>



                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit2(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row,'regulateDel')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageNum"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>用户偏好二维码配置</span>
                <el-button type="primary" size="mini" style="margin-left: 20px" @click="add3">新增</el-button>
                <el-table
                        border
                        :data="tableData3"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="preValue" label="偏好等级" align="center">


                    </el-table-column>
                    <el-table-column label="二维码图片" align="center">
                        <template slot-scope="scope">

                            <el-image
                                    class="table-td-thumb"
                                    :src="scope.row.preFile"
                                    :preview-src-list="[scope.row.preFile]"
                            ></el-image>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit3(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row,'orCodeDel')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="30%" @close="handleClose">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                <el-form-item label="偏好最小范围" prop="openInterval">
                    <el-input-number v-model="form.openInterval"></el-input-number>
                </el-form-item>
                <el-form-item label="偏好最大范围" prop="closeInterval">
                    <el-input-number v-model="form.closeInterval"></el-input-number>
                </el-form-item>


                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['preferenceAdd','preferenceEdit'])">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <el-dialog :title="alertTitle2" :visible.sync="editVisible2" width="30%" @close="handleClose2">
            <el-form ref="form2" :model="form2" label-width="120px" :rules="rules2">

                <el-form-item label="相差值" prop="preValue">
                    <el-input-number v-model="form2.preValue"></el-input-number>
                </el-form-item>
                <el-form-item label="文案提示" prop="content">
                    <el-input type="textarea" v-model="form2.content"></el-input>
                </el-form-item>


                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm2()">确认</el-button>
                    <el-button @click="editVisible2 = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <el-dialog :title="alertTitle3" :visible.sync="editVisible3" width="30%" @close="handleClose3">
            <el-form ref="form3" :model="form3" label-width="120px" :rules="rules3">
                <el-form-item label="偏好等级" prop="preValue">
                    <el-input-number v-model="form3.preValue"></el-input-number>
                </el-form-item>
                <el-form-item label="二维码图片">
                <el-upload
                        :fileList="fileList"
                        :limit='1'
                        :action="actionUrl"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </el-form-item>



                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm3()">确认</el-button>
                    <el-button @click="editVisible3 = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>


    </div>

</template>

<script>
    import {regulateList,regulateAdd,regulateEdit,orCodeList,orCodeAdd,orCodeEdit} from "../../utils/api"
    import interactive from "../../utils/interactive"

    export default {
        extends: interactive,

        data() {
            return {
                query: {
                    pageNum: 1,
                },
                dialogVisible: false,
                dialogImageUrl:'',
                // actionUrl: `https://www.topsleep.net/backstage/file/upd`,
                actionUrl: window.globalVar.baseUrl + `/backstage/file/upd`,
                alertTitle: '新增',
                alertTitle2: '新增',
                alertTitle3: '新增',
                fileList:[],
                form: {


                },
                form2: {
                    pillowId:''
                },
                form3:{},
                newPillowId:'',
                editVisible: false,
                editVisible2: false,
                editVisible3: false,
                tableData: [],
                tableData2: [],
                tableData3:[],
                newTable: [],
                pillowIdOption:[],
                rules: {
                    closeInterval: [
                        {required: true, message: '请输入最大范围', trigger: 'change'},
                    ],
                    openInterval: [
                        {required: true, message: '请输入最小范围', trigger: 'change'},
                    ],

                },
                rules2: {
                    closeInterval: [
                        {required: true, message: '请输入最大范围', trigger: 'change'},
                    ],
                    openInterval: [
                        {required: true, message: '请输入最小范围', trigger: 'change'},
                    ],
                    content: [
                        {required: true, message: '请输入文案', trigger: 'blur'},
                    ],


                },
                rules3: {

                    preValue: [
                        {required: true, message: '请先选择偏好等级', trigger: 'change'},
                    ],






                },

            };
        },
        methods: {
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleAvatarSuccess(res, file) {
                this.form3.preFile = res.result;
            },
            handleRemove(){
                this.form3.preFile = ''
            },

            submitForm2(){
                let _this = this
                this.$refs.form2.validate((valid) => {
                    if (valid) {
                        if (_this.alertTitle2 == "新增") {
                            regulateAdd(this.form2).then(res=>{
                                if (res.code === 200){
                                    _this.$message.success(res.message);
                                    _this.editVisible2 = false;
                                    _this.getInfo()
                                }else {
                                    this.$message.error(res.message);
                                }

                            })
                        }else {
                            regulateEdit(this.form2)
                                .then(res => {
                                    if (res.code === 200) {
                                        _this.editVisible2 = false;
                                        _this.getInfo()
                                    } else {
                                        _this.$message.error(res.message);
                                    }

                                })
                        }


                    } else {
                        return false;
                    }
                });
            },
            submitForm3(){
                let _this = this
                this.$refs.form3.validate((valid) => {
                    if (valid) {
                        if (_this.alertTitle3 == "新增") {
                            orCodeAdd(this.form3).then(res=>{
                                if (res.code === 200){
                                    this.$message.success(res.message);
                                    this.editVisible3 = false;
                                    this.getInfo2()
                                }else {
                                    this.$message.error(res.message);
                                }

                            })
                        }else {
                            // this.form2.pillowId = this.newPillowId
                            orCodeEdit(this.form3)
                                .then(res => {
                                    if (res.code === 200) {
                                        _this.editVisible3 = false;
                                        _this.getInfo2()
                                        this.$message.success(res.message);

                                    } else {
                                        _this.$message.error(res.message);
                                    }

                                })
                        }


                    } else {
                        return false;
                    }
                });
            },



            add() {
                this.alertTitle = '新增'
                this.editVisible = true
            },
            adds() {
                this.alertTitle2 = '新增'
                this.editVisible2 = true
            },
            add3() {
                this.alertTitle3 = '新增'
                this.editVisible3 = true
            },
            handleClose2(n) {
                if (n) {
                    this.$refs[n].resetFields();
                } else {
                    this.$refs.form2.resetFields();

                }

            },
            handleClose3(n) {
                this.fileList = []
                if (n) {
                    this.$refs[n].resetFields();
                } else {
                    this.$refs.form3.resetFields();

                }

            },
            getInfo() {
                let _this = this
                regulateList(this.query)
                    .then(res => {
                        if (res.code === 200) {
                            _this.tableData2 = res.result.records || {};
                            _this.pageTotal = res.result.total || 0;


                        } else {
                            _this.$message.error(res.message);
                        }

                    })

            },
            getInfo2() {
                let _this = this
                orCodeList()
                    .then(res => {
                        if (res.code === 200) {
                            _this.tableData3 = res.result.records

                        } else {
                            _this.$message.error(res.message);
                        }

                    })

            },

            handleEdit2(index, row){
                let  _this = this
                this.alertTitle2 = '编辑';
                this.editVisible2 = true;
                this.newPillowId = row.pillowId
                _this.$nextTick(() => {
                    _this.form2 = Object.assign({}, row);


                })
            },
            handleEdit3(index, row){
                this.fileList = []
                let  _this = this
                this.alertTitle3 = '编辑';
                this.editVisible3= true;
                if (row.preFile) {
                    this.fileList.push({
                        url: row.preFile
                    })
                } else {
                    this.fileList = []
                }
                _this.$nextTick(() => {
                    _this.form3 = Object.assign({}, row);


                })
            },
            handlePageChange(val) {
                console.log(this.query)
                this.$set(this.query, 'pageNum', val);
                this.getInfo();
            },


        },
        created() {
            this.getData('preferenceList')
            this.getInfo()
            this.getInfo2()


        }
    };
</script>
<style>
    .el-select,.el-input-number--small {
        width: 100%;
    }
</style>
