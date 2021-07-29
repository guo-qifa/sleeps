<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :model="query"  ref="query" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="门店名称" prop="storeId" class="mr10">
                        <el-select v-model="query.storeId" placeholder="门店名称" style="width: 100%">

                        <el-option v-for="item in storeVeiw" :label="item.itemValue" :value="item.itemCode" :key="item.itemCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号" prop="equipmentCode" class="mr10">
                        <el-input v-model="query.equipmentCode"></el-input>
                    </el-form-item>

                    <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    <el-button  icon="el-icon-refresh" @click="resetForm">重置</el-button>
                    <div class="f-r">
                        <el-button
                                type="primary"
                                icon="el-icon-lx-add"
                                class="handle-del mr10"
                                @click="addAlert"
                                v-if="jurisdiction('00701')"
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
                <el-table-column prop="equipmentName" label="设备名称"  align="center"></el-table-column>

                <el-table-column prop="equipmentCode" label="设备编号"  align="center"></el-table-column>
                <el-table-column prop="storeId" label="所属门店">
                    <template slot-scope="scope">
                        <p  v-html="getRowText(scope.row)"></p>
                    </template>
                </el-table-column>
                <el-table-column prop="equipmentIp" label="设备IP"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="state" width="100" label="启用状态">
                    <template slot-scope="scope">

                        <el-switch
                                v-model="scope.row.flag =='1'? true:false"
                                active-color="#13ce66"
                                inactive-color="rgb(220, 223, 230)"
                                @change="changeSwitch(scope.$index, scope.row,'equipmentStatus','00704')"
                        >
                        </el-switch>

                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="jurisdiction('00703')"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                v-if="jurisdiction('00702')"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row,'equipmentDel')"
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
                <el-form-item label="设备名称" prop="equipmentName">
                    <el-input v-model="form.equipmentName"></el-input>
                </el-form-item>
                <el-form-item label="所属门店" prop="storeId">
                <el-select v-model="form.storeId" placeholder="请选择" class="mr10" style="width: 100%">
                    <el-option v-for="item in storeVeiw" :label="item.itemValue" :value="item.itemCode" :key="item.itemCode"></el-option>

                </el-select>
                </el-form-item>
                <el-form-item label="设备编号" prop="equipmentCode">
                    <el-input v-model="form.equipmentCode"></el-input>
                </el-form-item>
                <el-form-item label="设备IP">
                    <el-input v-model="form.equipmentIp"></el-input>
                </el-form-item>

                <el-form-item label="启用状态" prop="flag">
                    <el-radio v-model="form.flag" label="1">启用</el-radio>
                    <el-radio v-model="form.flag" label="2">禁用</el-radio>
                </el-form-item>

                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['equipmentAdd','equipmentEdit'])">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import {viewList} from "../../utils/api"
    import  interactive   from "../../utils/interactive"

    export default {
        name: 'equipment',
        extends: interactive,
        data() {
            return {
                form:{},
                storeVeiw:{},
                query:{},
                rules:{
                    equipmentName:[
                        { required: true, message: '请输入设备名称', trigger: 'blur' },
                    ],
                    equipmentCode:[
                        { required: true, message: '请输入设备ID', trigger: 'blur' },
                    ],
                    flag:[
                        { required: true, message: '请选择启用状态', trigger: 'change' },
                    ],
                    storeId:[
                        { required: true, message: '请选择设备门店', trigger: 'change' },
                    ],

                }


            };
        },
        methods:{
            getRowText(v){
                let c = this.storeVeiw
                let  d = v.storeId
                for(let item in c){
                    if(d == c[item].itemCode){
                        return c[item].itemValue
                    }
                }


            },
            getView() {
                viewList()
                    .then(res => {
                        this.storeVeiw =res[0].storeVeiw

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created() {
            this.getData("equipmentList");
            this.getView()

        },


    };
</script>

