<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> Banan配置 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="f-r" style="margin-bottom: 20px">
                    <el-button v-if="jurisdiction('00101')" type="primary" icon="el-icon-lx-add" class="handle-del mr10" @click="addAlert"
                        >新增
                    </el-button>
                </div>
            </div>
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="标题名称"></el-table-column>
                <el-table-column prop="type" label="类型">
                    <template slot-scope="scope">
                        <span v-text="scope.row.type == '1' ? '图片' : '视频'"></span>
                    </template>
                </el-table-column>
                <el-table-column label="内容" align="center">
                    <template slot-scope="scope">
                        <video
                            style="height: 65px"
                            v-if="scope.row.type == '2'"
                            :src="scope.row.content"
                            class="avatar video-avatar"
                            controls="controls"
                        ></video>
                        <el-image
                            v-if="scope.row.type == '1'"
                            class="table-td-thumb"
                            :src="scope.row.content"
                            :preview-src-list="[scope.row.content]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>
                <el-table-column prop="type" label="来源">
                    <template slot-scope="scope">
                        <span v-text="scope.row.source == '1' ? '设备端' : '小程序'"></span>
                    </template>
                </el-table-column>

                <el-table-column prop="state" label="启用状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status == '1' ? true : false"
                            active-color="#13ce66"
                            inactive-color="rgb(220, 223, 230)"
                            @change="changeSwitch(scope.$index, scope.row, 'bananStatus', '00104')"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="jurisdiction('00103')" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
                            >编辑
                        </el-button>
                        <el-button
                            v-if="jurisdiction('00102')"
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row, 'banaDel')"
                            >删除
                        </el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="35%" @close="handleClose">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="标题名称" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择图片类型" style="width: 100%">
                        <el-option label="图片" value="1"></el-option>
                        <el-option label="视频" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="展示" prop="source">
                    <el-radio v-model="form.source" label="1">设备端</el-radio>
                    <el-radio v-model="form.source" label="2">小程序</el-radio>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model.number="form.sort" :min="1"></el-input-number>
                </el-form-item>

                <el-form-item label="文件上传" prop="content">
                    <div v-if="form.type == '1'">
                        <el-upload
                            :fileList="fileList"
                            :limit="1"
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
                            <img width="100%" :src="dialogImageUrl" alt="" />
                        </el-dialog>
                    </div>
                    <div v-if="form.type != '1'">
                        <el-button class="video-btn" size="mini" @click="delVide" type="danger">
                            <i class="el-icon-circle-close"></i>
                        </el-button>
                        <el-upload
                            class="avatar-uploader el-upload--text"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleVideoSuccess"
                            :before-upload="beforeUploadVideo"
                            :on-remove="handleRemove"
                            :on-progress="uploadVideoProcess"
                        >
                            <video
                                v-if="form.content != '' && !videoFlag"
                                :src="form.content"
                                class="avatar video-avatar"
                                controls="controls"
                            >
                                您的浏览器不支持视频播放
                            </video>

                            <i v-else-if="form.content == '' && !videoFlag" class="el-icon-plus avatar-uploader-icon"></i>
                            <el-progress
                                v-if="videoFlag == true"
                                type="circle"
                                :percentage="videoUploadPercent"
                                style="margin-top: 30px"
                            ></el-progress>
                        </el-upload>
                    </div>
                </el-form-item>

                <el-form-item label="启用状态" prop="status">
                    <el-radio v-model="form.status" label="1">启用</el-radio>
                    <el-radio v-model="form.status" label="2">停止</el-radio>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form', ['bananAdd', 'bananEdit'])">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import interactive from '../../utils/interactive';

export default {
    name: 'banan',
    extends: interactive,

    data() {
        return {
            // uploadUrl: "https://www.topsleep.net/backstage/file/upd",
            // uploadUrl: 'http://106.14.34.18:1001/backstage/file/upd',
            uploadUrl: window.globalVar.baseUrl + '/backstage/file/upd',
            videoFlag: false,
            videoUploadPercent: '',

            // actionUrl: `https://www.topsleep.net/backstage/file/upd`,
            // actionUrl: `http://106.14.34.18:1001/backstage/file/upd`,
            actionUrl: window.globalVar.baseUrl + `/backstage/file/upd`,
            dialogImageUrl: '',
            dialogVisible: false,

            fileList: [],

            videoFlag: false,
            form: {
                type: '1',
                source: '1',
                status: '1',
                content: ''
            },
            rules: {
                title: [{ required: true, message: '请输入标题名称', trigger: 'blur' }],

                type: [{ required: true, message: '请选择类型', trigger: 'change' }],
                source: [{ required: true, message: '请至少选择一个展示类型', trigger: 'change' }],
                content: [{ required: true, message: '请先上传文件' }],
                sort: [{ required: true, message: '请选择排序', trigger: 'change' }],
                status: [{ required: true, message: '请选择启用状态', trigger: 'change' }]
            }
        };
    },
    created() {
        this.getData('bananList');
    },

    methods: {
        delVide() {
            this.form.content = '';
        },
        beforeUploadVideo(file) {
            const isLt20M = file.size / 1024 / 1024 < 100;
            if (['video/mp4'].indexOf(file.type) == -1) {
                //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                this.$message.error('请上传正确的视频格式');
                return false;
            }
            if (!isLt20M) {
                this.$message.error('上传视频大小不能超过100MB哦!');
                return false;
            }
        },
        //进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },

        //上传成功回调
        handleVideoSuccess(res, file) {
            var _this = this;
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            if (res.code == '200') {
                _this.form.content = res.result;
                // this.videoForm.showVideoPath = res.data.uploadUrl;
            } else {
                this.$message.error('视频上传失败，请重新上传！');
            }
        },

        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 50;
            if (!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过50MB!',
                    type: 'warning'
                });
                return false;
            }
            if (this.form.content == 0 && this.form.source == '2') {
                let _this = this;
                let imgWidth = '';
                let imgHight = '';
                const isSize = new Promise(function (resolve, reject) {
                    let width = 750;
                    let height = 750;
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = function () {
                        imgWidth = img.width;
                        imgHight = img.height;
                        let valid = img.width == width && img.height == height;
                        valid ? resolve() : reject();
                    };
                    img.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        _this.$message.warning({
                            message:
                                '上传文件的图片大小不合符标准,宽需要为750px，高需要为750px。当前上传图片的宽高分别为：' +
                                imgWidth +
                                'px和' +
                                imgHight +
                                'px',
                            btn: false
                        });
                        return Promise.reject();
                    }
                );
                console.log(isSize);
                return isSize;
            }
        },
        handleAvatarSuccess(res, file) {
            this.form.content = res.result;
            this.videoFlag = true;
        },
        handleRemove(file, fileList) {
            this.form.content = '';
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleClose() {
            this.$refs.form.resetFields();
            this.form = {};
            this.fileList = [];
            this.videoFlag = false;
            this.form.content = '';
            this.form = {
                type: '1',
                source: '1',
                status: '1',
                content: ''
            };
        },
        handleEdit(index, row) {
            this.alertTitle = '编辑';
            this.editVisible = true;
            let num = ['level', 'source', 'status', 'flag', 'sex', 'type'];
            for (var i = 0; i < num.length; i++) {
                for (var item in row) {
                    if (num[i] == item) {
                        row[item] = row[item].toString();
                    }
                }
            }
            if (row.content) {
                this.fileList.push({
                    url: row.content
                });
            } else {
                this.fileList = [];
            }

            this.form = Object.assign({}, row);
        }
    }
};
</script>
<style>
.video-btn {
    float: right;
    margin-right: 30px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.video-avatar {
    width: 100%;
}
</style>

