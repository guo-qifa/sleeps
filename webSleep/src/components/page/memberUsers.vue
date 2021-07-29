<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i>会员用户 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="query" ref="query" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="会员编号" prop="memberCode" class="mr10">
                        <el-input v-model="query.memberCode"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname" class="mr10">
                        <el-input v-model="query.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="来源" prop="storeId" class="mr10">
                        <el-select v-model="query.storeId" placeholder="门店">
                            <el-option
                                v-for="item in storeVeiw"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>

                    <el-button icon="el-icon-vertical-align-top" @click="dialogVisible = true">导出</el-button>
                    <!-- </download-excel> -->
                </el-form>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="memberCode" label="会员编号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="sex" label="性别"> </el-table-column>
                <el-table-column prop="equipmentCode" label="设备号"></el-table-column>
                <el-table-column prop="guideName" label="导购员姓名"></el-table-column>
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>

                <el-table-column prop="storeName" label="来源"></el-table-column>
                <el-table-column prop="realNameFlag" label="是否实名">
                    <template slot-scope="scope">
                        <span v-text="scope.row.realNameFlag == 0 ? '否' : '是'"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="openid" label="openid"></el-table-column>
                <el-table-column label="操作" width="110">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.status == 1"
                            >取消拉黑</el-button
                        >
                        <el-button size="mini" type="danger" @click="handleBlock(scope.$index, scope.row)" v-if="scope.row.status == 0"
                            >拉黑
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

            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-checkbox v-model="checkboxAllValue" @change="checkboxAll">全选</el-checkbox>
                        <el-checkbox
                            v-model="item.bol"
                            v-for="(item, idx) in table_fields"
                            :key="idx"
                            :label="item.value"
                            @change="checkboxHandler"
                            >{{ item.label }}</el-checkbox
                        >
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <download-excel
                        style="display: inline-block; margin-left: 10px"
                        :data="exportData"
                        :fields="json_fields"
                        name="会员用户.xls"
                    >
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </download-excel>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import interactive from '../../utils/interactive';
import { viewList, expList, blockUser } from '../../utils/api';

export default {
    name: 'memberUsers',
    extends: interactive,
    data() {
        return {
            dialogVisible: false,
            checkboxAllValue: false,
            ruleForm: {},
            storeVeiw: {},
            query: {
                memberCode: '',
                nickname: '',
                storeId: ''
            },
            table_fields: [
                { label: '会员编号', value: 'memberCode', bol: false },
                { label: '姓名', value: 'name', bol: false },
                { label: '昵称', value: 'nickname', bol: false },
                { label: '性别', value: 'sex', bol: false },
                { label: '设备号', value: 'equipmentCode', bol: false },
                { label: '导购员姓名', value: 'guideName', bol: false },
                { label: '省份', value: 'province', bol: false },
                { label: '城市', value: 'city', bol: false },
                { label: '创建时间', value: 'createTime', bol: false },
                { label: '来源', value: 'storeName', bol: false },
                { label: '是否实名', value: 'realNameFlag', bol: false },
                { label: '手机号', value: 'mobile', bol: false },
                { label: 'openid', value: 'openid', bol: false }
            ],
            json_fields: {
                // 会员编号: 'memberCode',
                // 姓名: 'name',
                // 昵称: 'nickname',
                // 性别: 'sex',
                // 设备号: 'equipmentCode',
                // 导购员姓名: 'guideName',
                // 省份: 'province',
                // 城市: 'city',
                // 创建时间: 'createTime',
                // 来源: 'storeName',
                // 是否实名: {
                //     field: "realNameFlag",
                //     callback: (value) => {
                //         return value == 0 ? '否' : '是';
                //     }
                // },
                // 手机号: 'mobile',
                // openid: 'openid'
            },
            exportData: [
                // {
                //     'memberCode': '10208',
                //     'name': 'aa',
                //     'nickname': 'bb',
                //     'sex': '女',
                //     'equipmentCode': '11',
                //     'guideName': 'cc',
                //     'province': '浙江省',
                //     'city': '嘉兴',
                //     'createTime': '2021-05-11 10:54:06',
                //     'storeName': '门店',
                //     'realNameFlag': 0,
                //     'mobile': '12334434',
                //     'openid': 'Nedscdfjkhkork'
                // }
            ]
        };
    },
    methods: {
        handleEdit(index, row) {
          
            var paramObj = {
                openId: row.openid,
                status: 0
            };
            blockUser(paramObj)
                .then((res) => {
                    this.handleSearch()
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handleBlock(index, row) {
            var paramObj = {
                openId: row.openid,
                status: 1
            };
            blockUser(paramObj)
                .then((res) => {
                     this.handleSearch()
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getView() {
            viewList()
                .then((res) => {
                    this.storeVeiw = res[0].storeVeiw;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getExpList() {
            expList()
                .then((res) => {
                    this.exportData = res.result.records;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        checkboxHandler() {
            let arr = this.table_fields.filter(function (item) {
                return item.bol == true;
            });
            if (arr.length == 0) {
                this.json_fields = {};
                return;
            }
            let str = '{';
            for (let i = 0; i < arr.length; i++) {
                str += '"' + arr[i]['label'] + '": "' + arr[i]['value'] + '",';
            }
            str = str.substring(0, str.length - 1);
            str += '}';
            this.json_fields = JSON.parse(str);
            if (this.json_fields['是否实名']) {
                this.json_fields['是否实名'] = {
                    field: 'realNameFlag',
                    callback: (value) => {
                        return value == 0 ? '否' : '是';
                    }
                };
            }
        },
        checkboxAll() {
            if (this.checkboxAllValue) {
                this.table_fields.forEach((item) => {
                    item.bol = true;
                });
            } else {
                this.table_fields.forEach((item) => {
                    item.bol = false;
                });
            }
            this.checkboxHandler();
        }
    },
    created() {
        this.getData('mberList');
        this.getView();
        this.getExpList();
    }
};
</script>

<style scoped>
</style>
