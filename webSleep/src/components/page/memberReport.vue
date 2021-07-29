<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i>会员报告 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="query" ref="query" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="会员编号" prop="memberCode" class="mr10">
                        <el-input v-model="query.memberCode"></el-input>
                    </el-form-item>

                    <el-form-item label="适合床垫等级" prop="hardnessGrade" class="mr10">
                        <el-input v-model="query.hardnessGrade"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" class="mr10">
                        <el-select v-model="query.sex">
                            <el-option
                                v-for="item in getSelect('sex')"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="体型" prop="shape" class="mr10">
                        <el-select v-model="query.shape">
                            <el-option
                                v-for="item in getSelect('shape')"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="脊椎形态" prop="vertebralMorphology" class="mr10">
                        <el-select v-model="query.vertebralMorphology">
                            <el-option
                                v-for="item in getSelect('vertebral_morphology')"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="门店" prop="storeId" class="mr10">
                        <el-select v-model="query.storeId">
                            <el-option
                                v-for="item in storeVeiw"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="软硬度偏好" prop="softHardPreference" class="mr10">
                        <el-select v-model="query.softHardPreference">
                            <el-option
                                v-for="item in getSelect('soft_hard_preference')"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="睡眠姿势" prop="sleepPosture" class="mr10">
                        <el-select v-model="query.sleepPosture">
                            <el-option
                                v-for="item in getSelect('sleep_posture')"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="睡眠不适部位" prop="sleepDiscomfort" class="mr10">
                        <el-select v-model="query.sleepDiscomfort">
                            <el-option
                                v-for="item in getSelect('sleep_discomfort')"
                                :label="item.itemValue"
                                :value="item.itemCode"
                                :key="item.itemCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间" prop="createTime" class="mr10">
                        <el-date-picker v-model="query.createTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="打印时间" prop="printerTime" class="mr10">
                        <el-date-picker v-model="query.printerTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
                    <el-button icon="el-icon-vertical-align-top" @click="dialogVisible = true">导出</el-button>
                </el-form>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="memberCode" label="会员编号"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="sex" label="性别"> </el-table-column>
                <el-table-column prop="equipmentCode" label="设备号"></el-table-column>
                <el-table-column prop="guideName" label="导购员姓名"></el-table-column>
                <el-table-column prop="height" label="身高(cm)"></el-table-column>
                <el-table-column prop="weight" label="体重(kg)"></el-table-column>
                <el-table-column prop="bmi" label="BMI"></el-table-column>
                <el-table-column prop="shoulderWidth" label="肩宽(cm)"></el-table-column>
                <el-table-column prop="shape" label="体型"> </el-table-column>
                <el-table-column prop="skeletalDistance" label="肩颧距(cm)"></el-table-column>
                <el-table-column prop="hardnessGrade" label="适合床垫等级"></el-table-column>
                <el-table-column prop="vertebralMorphology" label="脊椎形态"> </el-table-column>
                <el-table-column prop="storeName" label="门店"></el-table-column>
                <el-table-column prop="softHardPreference" label="软硬度偏好"> </el-table-column>
                <el-table-column prop="sleepPosture" label="睡眠姿势"> </el-table-column>
                <el-table-column prop="spineArc" label="颈椎弧"> </el-table-column>
                <el-table-column prop="sleepDiscomfort" label="睡眠不适部位"></el-table-column>

                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="printerTime" label="打印时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
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

        <el-dialog title="会员报告详情" :visible.sync="dialogTableVisible" width="50%" class="dialog_box">
            <div class="flexBox">
                <div class="_title">会员编号</div>
                <div class="_value">{{ dataInfo.memberCode }}</div>
                <div class="_title">昵称</div>
                <div class="_value">{{ dataInfo.nickname }}</div>
            </div>
            <div class="flexBox">
                <div class="_title">导购员姓名</div>
                <div class="_value">{{ dataInfo.guideName }}</div>
                <div class="_title">设备号</div>
                <div class="_value">{{ dataInfo.equipmentCode }}</div>
            </div>
            <div class="flexBox">
                <div class="_title">性别</div>
                <div class="_value">{{ dataInfo.sex }}</div>
                <div class="_title">身高</div>
                <div class="_value">{{ dataInfo.height }}</div>
            </div>
            <div class="flexBox">
                <div class="_title">体重</div>
                <div class="_value">{{ dataInfo.weight }}</div>
                <div class="_title">BMI</div>
                <div class="_value">{{ dataInfo.bmi }}</div>
            </div>

            <div class="flexBox">
                <div class="_title">肩宽</div>
                <div class="_value">{{ dataInfo.shoulderWidth }}</div>
                <div class="_title">体型</div>
                <div class="_value">{{ dataInfo.shape }}</div>
            </div>
            <div class="flexBox">
                <div class="_title">肩颧距</div>
                <div class="_value">{{ dataInfo.skeletalDistance }}</div>
                <div class="_title">适合床垫等级</div>
                <div class="_value">{{ dataInfo.hardnessGrade }}</div>
            </div>
            <div class="flexBox">
                <div class="_title">脊椎形态</div>
                <div class="_value">{{ dataInfo.vertebralMorphology }}</div>
                <div class="_title">门店</div>
                <div class="_value">{{ dataInfo.storeName }}</div>
            </div>

            <div class="flexBox">
                <div class="_title">软硬度偏好</div>
                <div class="_value">{{ dataInfo.softHardPreference }}</div>
                <div class="_title">睡眠姿势</div>
                <div class="_value">{{ dataInfo.sleepPosture }}</div>
            </div>

            <div class="flexBox">
                <div class="_title">颈椎弧</div>
                <div class="_value">{{ dataInfo.spineArc }}</div>
                <div class="_title">睡眠不适部位</div>
                <div class="_value">{{ dataInfo.sleepDiscomfort }}</div>
            </div>

            <div class="flexBox">
                <div class="_title">胸围</div>
                <div class="_value">{{ dataInfo.bust || '--' }}cm</div>
                <div class="_title">腰围</div>
                <div class="_value">{{ dataInfo.waistline || '--'}}cm</div>
            </div>

            <div class="flexBox">
                <div class="_title">臀围</div>
                <div class="_value">{{ dataInfo.hips || '--' }}cm</div>
                <div class="_title">颈部支撑高度</div>
                <div class="_value">{{ dataInfo.neckSupportHeight || '--'}}cm</div>
            </div>

            <div class="flexBox">
                <div class="_title">适合枕头</div>
                <div class="_value">{{ dataInfo.pillowName }}cm</div>
                <div class="_title">枕头规格</div>
                <div class="_value">{{ dataInfo.pillowSpecification }}cm</div>
            </div>

            <div class="flexBox">
                <div class="_title">用户实际等级</div>
                <div class="_value">{{ dataInfo.actualGrade || '--' }}</div>
                <div class="_title">用户选择等级</div>
                <div class="_value">{{ dataInfo.optionalGrade || '--' }}</div>
            </div>

            <div class="flexBox">
                <div class="_title">创建时间</div>
                <div class="_value">{{ dataInfo.createTime || '--' }}</div>
                <div class="_title">打印时间</div>
                <div class="_value">{{ dataInfo.printerTime || '--' }}</div>
            </div>

            <el-row :gutter="20" class="row_box" style="text-align: center">
                <el-col class="tip">
                    <router-link target="_blank" :to="{ path: '/print', query: { id: JSON.stringify(dataInfo) } }"
                        ><el-button type="primary">去打印&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-right"></i></el-button
                    ></router-link>
                </el-col>
            </el-row>
        </el-dialog>

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
                    name="会员报告.xls"
                >
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </download-excel>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import interactive from '../../utils/interactive';

import { dictionaries } from '../../utils/api';
import { viewList, exportExt } from '../../utils/api';

export default {
    name: 'memberReport',
    extends: interactive,

    data() {
        return {
            dialogTableVisible: false,
            dialogVisible: false,
            checkboxAllValue: false,
            query: {
                memberCode: '',
                sex: '',
                shape: '',
                hardnessGrade: '',
                vertebralMorphology: '',
                softHardPreference: '',
                sleepPosture: '',
                sleepDiscomfort: '',
                createTime: '',
                printerTime: ''
            },
            viewData: [],
            sex: {},
            shape: {},
            hardnessGrade: {},
            vertebralMorphology: {},
            storeName: {},
            softHardPreference: {},
            sleepPosture: {},
            sleepDiscomfort: {},
            viewList: {},
            dictionariesList: [],
            storeVeiw: {},
            dataInfo: {},
            table_fields: [
                { label: '会员编号', value: 'memberCode', bol: false },
                { label: '昵称', value: 'nickname', bol: false },
                { label: '性别', value: 'sex', bol: false },
                { label: '设备号', value: 'equipmentCode', bol: false },
                { label: '导购员姓名', value: 'guideName', bol: false },
                { label: '身高(cm)', value: 'height', bol: false },
                { label: '体重(kg)', value: 'weight', bol: false },
                { label: '体重指数', value: 'bmi', bol: false },
                { label: '肩宽(cm)', value: 'shoulderWidth', bol: false },
                { label: '体型', value: 'shape', bol: false },
                { label: '肩颧距(cm)', value: 'skeletalDistance', bol: false },
                { label: '适合床垫等级', value: 'optionalGrade', bol: false },
                { label: '脊椎形态', value: 'vertebralMorphology', bol: false },
                { label: '门店', value: 'storeName', bol: false },
                { label: '软硬度偏好', value: 'softHardPreference', bol: false },
                { label: '睡眠姿势', value: 'sleepPosture', bol: false },
                { label: '颈椎弧', value: 'spineArc', bol: false },
                { label: '睡眠不适部位', value: 'sleepDiscomfort', bol: false },
                { label: '创建时间', value: 'createTime', bol: false },
                { label: '打印时间', value: 'printerTime', bol: false }
            ],
            json_fields: {
                // '会员编号': 'memberCode',
                // '昵称': 'nickname',
                // '性别': 'sex',
                // '设备号': 'equipmentCode',
                // '导购员姓名': 'guideName',
                // '身高(cm)': 'height',
                // '体重(kg)': 'weight',
                // '体重指数': 'bmi',
                // '肩宽(cm)': 'shoulderWidth',
                // '体型': 'shape',
                // '肩颧距(cm)': 'skeletalDistance',
                // '适合床垫等级': 'optionalGrade',
                // '脊椎形态': 'vertebralMorphology',
                // '门店': 'storeName',
                // '软硬度偏好': 'softHardPreference',
                // '睡眠姿势': 'sleepPosture',
                // '颈椎弧': 'spineArc',
                // '睡眠不适部位': 'sleepDiscomfort',
                // '创建时间': 'createTime',
                // '打印时间': 'printerTime',
            },
            exportData: [
                {
                    // memberCode: '10208',
                    // name: 'aa',
                    // nickname: 'bb',
                    // sex: '女',
                    // equipmentCode: '11',
                    // guideName: 'cc',
                    // province: '浙江省',
                    // city: '嘉兴',
                    // createTime: '2021-05-11 10:54:06',
                    // storeName: '门店',
                    // realNameFlag: 0,
                    // mobile: '12334434',
                    // openid: 'Nedscdfjkhkork'
                }
            ]
        };
    },
    created() {
        this.getData('reportList');
        this.getStore();

        this.getView();
        this.exportExt();
    },

    methods: {
        getSelect(v) {
            let d = this.dictionariesList;
            for (let i = 0; i < d.length; i++) {
                if (v == d[i].dict.dictCode) {
                    return d[i].dictItems;
                }
            }
        },
        handleClick(v) {
            this.dialogTableVisible = true;
            this.dataInfo = v;
            console.log(v);
        },
        getStore() {
            let _this = this;
            viewList()
                .then((res) => {
                    _this.storeVeiw = res[0].storeVeiw;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getView() {
            let _this = this;
            dictionaries()
                .then((res) => {
                    console.log(res);
                    _this.dictionariesList = res.result;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        exportExt() {
            exportExt()
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
    }
};
</script>

<style scoped>
.dialog_box {
    padding-bottom: 50px;
}
.row_box {
    margin-bottom: 20px;
    padding-left: 100px;
}
.row_box .tip {
    font-weight: bold;
    text-align: right;
    display: table-cell;
    vertical-align: top;
}
.flexBox {
    margin: 150px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    width: 65%;

    margin: 10px auto;
}
.flexBox ._title {
    display: flex;
    flex: 1.5;
    justify-content: flex-end;
    font-weight: 700;
    padding-right: 30px;
}
.flexBox ._value {
   
    display: flex;
    flex: 3;
}
</style>
