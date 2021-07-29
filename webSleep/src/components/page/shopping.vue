<template>
    <div>

        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>导购列表</span>
                <el-button type="primary" size="mini" style="margin-left: 20px" @click="add">新增</el-button>
                <el-table
                        border
                        :data="tableData"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="guideName" label="导购姓名" align="center"></el-table-column>
                    <el-table-column prop="guideAge" label="导购年龄" align="center"></el-table-column>
                    <el-table-column prop="guideInfo" label="导购简介" align="center"></el-table-column>
                    <el-table-column label="个人照片" align="center">
                        <template slot-scope="scope">
                            <el-image

                                    class="table-td-thumb"
                                    :src="scope.row.guidePicture"
                                    :preview-src-list="[scope.row.guidePicture]"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="二维码" align="center">
                        <template slot-scope="scope">
                            <el-image

                                    class="table-td-thumb"
                                    :src="scope.row.guideCode"
                                    :preview-src-list="[scope.row.guideCode]"
                            ></el-image>
                        </template>
                    </el-table-column>


                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="40%" @close="handleCloses">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="姓名" prop="guideName">
                    <el-input v-model="form.guideName"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="guideAge">
                    <el-input v-model="form.guideAge"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="guideInfo">
                    <el-input type="textarea" v-model="form.guideInfo"></el-input>
                </el-form-item>
                <el-form-item label="个人照片" prop='guidePicture'>
                    <el-upload
                            :fileList="infoList"
                            :limit='1'
                            :action="actionUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleInfo"
                            :on-success="handlInfoSuccess"
                            :beforeUpload="beforeInfo"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="二维码上传" prop='guideCode'>
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
                    <el-dialog :visible.sync="dialogVisible" width="40%">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form')">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>

</template>

<script>
    import {shoppingList, shoppadd, shoppdel, shoppEdit} from "../../utils/api"

    export default {
        data() {


            return {
                dialogVisible: false,
                dialogImageUrl: '',
                alertTitle: '新增',
                actionUrl:`https://${window.location.host}/backstage/file/upd`,
                form: {},
                editVisible: false,
                tableData: [],

                rules: {
                    guideName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    guideAge: [
                        {required: true, message: '请输入年龄', trigger: 'blur'},
                    ],
                    guideCode: [
                        {required: true, message: '请先上传二维码'},
                    ],
                    guideInfo: [
                        {required: true, message: '请输入个人简介', trigger: 'blur'},
                    ],
                    guidePicture: [
                        {required: true, message: '请先上传个人照片'},
                    ],


                },


                fileList: [],
                infoList: [],
                keyOption: []


            };
        },
        methods: {
            handleCloses() {
                this.form = {}
                this.fileList = []
                this.infoList = []
                this.$refs.form.resetFields();
            },
            // imageSiz(w, h,file) {
            //     let _this = this;
            //     let imgWidth = "";
            //     let imgHight = "";
            //     const isSize = new Promise(function (resolve, reject) {
            //         let width = w;
            //         let height = h;
            //         let _URL = window.URL || window.webkitURL;
            //         let img = new Image();
            //         img.onload = function () {
            //             imgWidth = img.width;
            //             imgHight = img.height;
            //             let valid = img.width == width && img.height == height;
            //             valid ? resolve() : reject();
            //         }
            //         img.src = _URL.createObjectURL(file);
            //     }).then(() => {
            //         return file;
            //     }, () => {
            //         _this.$message.warning({
            //             message: '上传文件的图片大小不合符标准,宽需要为'+w+'px，宽需要为'+h+'px。',
            //             btn: false
            //         })
            //         return Promise.reject();
            //     });
            //     console.log(isSize);
            //     return isSize;
            // },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 20
                if (!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过20MB!',
                        type: 'warning'
                    });
                    return false
                }
                let _this = this;
                let imgWidth="";
                let imgHight="";
                const isSize = new Promise(function (resolve, reject) {
                    let width = 240;
                    let height = 240;
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function () {
                        imgWidth = img.width;
                        imgHight = img.height;
                        let valid = img.width == width && img.height == height;
                        valid ? resolve() : reject();
                    }
                    img.src = _URL.createObjectURL(file);
                }).then(() => {
                    return file;
                }, () => {
                    _this.$message.warning({message: '上传文件的图片大小不合符标准,宽需要为240px，高需要为240px。当前上传图片的宽高分别为：'+imgWidth+'px和'+imgHight+'px', btn: false})
                    return Promise.reject();
                });
                return isSize;
            },
            beforeInfo(file) {
                const isLt2M = file.size / 1024 / 1024 < 20
                if (!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过20MB!',
                        type: 'warning'
                    });
                    return false
                }
                let _this = this;
                let imgWidth="";
                let imgHight="";
                const isSize = new Promise(function (resolve, reject) {
                    let width = 240;
                    let height = 300;
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function () {
                        imgWidth = img.width;
                        imgHight = img.height;
                        let valid = img.width == width && img.height == height;
                        valid ? resolve() : reject();
                    }
                    img.src = _URL.createObjectURL(file);
                }).then(() => {
                    return file;
                }, () => {
                    _this.$message.warning({message: '上传文件的图片大小不合符标准,宽需要为240px，高需要为300px。当前上传图片的宽高分别为：'+imgWidth+'px和'+imgHight+'px', btn: false})
                    return Promise.reject();
                });
                return isSize;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                this.form.guideCode = ''
            },
            handleInfo(file, fileList) {
                this.form.guidePicture = ''
            },
            handleAvatarSuccess(res, file) {
                this.form.guideCode = res.result;
            },
            handlInfoSuccess(res, file) {
                this.form.guidePicture = res.result;
            },
            submitForm(formName) {
                let _this = this
                if (this.alertTitle == '新增') {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            shoppadd && shoppadd(this.form).then(res => {
                                if (res.code == 200) {
                                    this.$message.success(res.message);
                                    this.editVisible = false
                                    _this.getInfo(_this.$route.query.id)
                                } else {
                                    this.$message.error(res.message);
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            shoppEdit && shoppEdit(this.form).then(res => {
                                if (res.code == 200) {
                                    this.$message.success(res.message);
                                    this.editVisible = false
                                    _this.getInfo(_this.$route.query.id)

                                } else {
                                    this.$message.error(res.message);
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }


            },
            add() {
                this.alertTitle = '新增'
                this.editVisible = true


            },
            handleEdit(index, row) {
                this.editVisible = true
                this.alertTitle = '编辑'
                if (row.guideCode) {
                    this.fileList.push({
                        url: row.guideCode
                    })
                } else {
                    this.fileList = []
                }
                if (row.guidePicture) {
                    this.infoList.push({
                        url: row.guidePicture
                    })
                } else {
                    this.infoList = []
                }
                this.form = Object.assign({}, row);

            },
            handleDelete(index, row) {
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    shoppdel && shoppdel(row.guideId).then(res => {
                        if (res.code == 200) {
                            this.$message.success(res.message);
                            this.tableData.splice(index, 1);
                        } else {
                            this.$message.error(res.message);
                        }
                    })

                })
                console.log(index, row);
            },

            // 删除属性列
            removeRow(index) {
                this.ruleForm.formList.splice(index, 1);
            },
            // 提交


            getInfo(id) {
                let _this = this
                shoppingList(id)
                    .then(res => {
                        if (res.code === 200) {
                            _this.tableData = res.result
                        } else {
                            this.$message.error(res.message);
                        }

                    })
                    .catch(error => {
                    });
            },

        },
        created() {
            this.getInfo(this.$route.query.id)
            this.form.storeId = this.$route.query.id

        }
    };
</script>
<style>

</style>
