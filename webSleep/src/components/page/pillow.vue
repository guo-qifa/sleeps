<template>
    <div>

        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>枕头基本信息</span>
                <el-button type="primary" size="mini" style="margin-left: 20px" @click="add">新增</el-button>
                <el-table
                        border
                        :data="tableData"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="pillowName" label="枕头名称" align="center">


                    </el-table-column>
                    <el-table-column label="规格（长*宽*高）cm" align="center">
                        <template slot-scope="scope">
                            {{scope.row.pillowLength}}*{{scope.row.pillowWidth}}*{{scope.row.pillowHeight}}
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
                                    @click="handleDelete(scope.$index, scope.row,'pillowDel')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>枕头配置</span>
                <el-button type="primary" size="mini" style="margin-left: 20px" @click="adds">新增</el-button>
                <el-table
                        border
                        :data="tableData2"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="sleepPosture" label="睡姿" align="center">


                    </el-table-column>

                    <el-table-column prop="ynFixSkeletalDistance" label="是否修正肩颧距" align="center">
                        <template slot-scope="scope">
                            {{scope.row.ynFixSkeletalDistance =='1'?'是':'否'}}
                        </template>

                    </el-table-column>
                    <el-table-column prop="distanceStartValue" label="肩颧距最小值" align="center">

                    </el-table-column>
                    <el-table-column prop="distanceEndValue" label="肩颧距最大值" align="center">

                    </el-table-column>
                    <el-table-column prop="spineArc" label="关联颈椎弧" align="center">

                    </el-table-column>

                    <el-table-column prop="pillowName" label="适合枕头" align="center">

                    </el-table-column>
                    <el-table-column prop="pillowSpecification" label="适合规格" align="center">

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
                                    @click="handleDelete(scope.$index, scope.row,'pillowConfDel')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="30%" @close="handleClose">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                <el-form-item label="枕头名称" prop="pillowName">
                    <el-input v-model="form.pillowName"></el-input>
                </el-form-item>
                <el-form-item label="是否有规格" prop="tisSpecification">
                    <el-radio v-model="form.tisSpecification" label="1" @change="changeState">有</el-radio>
                    <el-radio v-model="form.tisSpecification" label="2" @change="changeState">无</el-radio>
                </el-form-item>

                <el-form-item label="长（cm）" prop="pillowLength" v-if="form.tisSpecification=='1'">
                    <el-input v-model.number="form.pillowLength"></el-input>
                </el-form-item>
                <el-form-item label="宽（cm）" prop="pillowWidth" v-if="form.tisSpecification=='1'">
                    <el-input v-model.number="form.pillowWidth"></el-input>
                </el-form-item>
                <el-form-item label="高（cm）" prop="pillowHeight" v-if="form.tisSpecification=='1'">
                    <el-input v-model="form.pillowHeight"></el-input>
                </el-form-item>


                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('form',['pillowAdd','pillowEdit'])">确认</el-button>
                    <el-button @click="editVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

        <el-dialog :title="alertTitle2" :visible.sync="editVisible2" width="30%" @close="handleClose2">
            <el-form ref="form2" :model="form2" label-width="120px" :rules="rules2">
                <el-form-item label="睡姿" >
                    <el-select v-model="form2.sleepPosture">
                        <el-option v-for="item in getSelect('sleep_posture')" :label="item.itemValue"
                                   :value="item.itemCode" :key="item.itemCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否修正肩颧距">
                    <el-select clearable v-model="form2.ynFixSkeletalDistance" placeholder="请选择参数">

                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="肩颧距最小值">
                    <el-input-number :precision="2" :step="0.1" v-model="form2.distanceStartValue"></el-input-number>
                </el-form-item>
                <el-form-item label="肩颧距最大值">
                    <el-input-number :precision="2" :step="0.1" v-model="form2.distanceEndValue"></el-input-number>
                </el-form-item>
                <el-form-item label="关联颈椎弧">
                    <el-select v-model="form2.spineArc" clearable>
                        <el-option v-for="item in getSelect('spine_arc')" :label="item.itemValue"
                                   :value="item.itemCode" :key="item.itemCode"></el-option>
                    </el-select>

                </el-form-item>
                <!--pillowName-->
                <el-form-item label="适合枕头">
                    <el-select v-model="form2.pillowName" @change="changePillowId(false,$event)">
                        <el-option v-for="item in getSelect('pillowName')" :label="item.pillowName"
                                   :value="item.pillowId"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="规格" prop="pillowId" v-if="form2.pillowName" >
                    <el-select v-model="form2.pillowId" @change="changePill">
                        <el-option v-for="item in newTable" :label="item.title"
                                   :value="item.id" :key="item.id"></el-option>
                    </el-select>

                </el-form-item>

                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm2()">确认</el-button>
                    <el-button @click="editVisible2 = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>

</template>

<script>
    import {pillowList, pillowConfigList, dictionaries,pillowConfigAdd,pillowConfigEdit} from "../../utils/api"
    import interactive from "../../utils/interactive"

    export default {
        extends: interactive,

        data() {
            return {
                alertTitle: '新增',
                alertTitle2: '新增',
                form: {
                    pillowName: '',
                    pillowLength: '',
                    pillowWidth: '',
                    pillowHeight: '',
                    tisSpecification: '1',
                    dictionariesList: [],

                },
                form2: {

                },
                newPillowId:'',
                editVisible: false,
                editVisible2: false,
                tableData: [],
                tableData2: [],
                newTable: [],
                pillowIdOption:[],
                rules: {
                    pillowName: [
                        {required: true, message: '请输入枕头名称', trigger: 'blur'},
                    ],
                    tisSpecification: [
                        {required: true, message: '请选择规格', trigger: 'change'},
                    ],
                    pillowLength: [
                        {required: true, message: '请输入长', trigger: 'blur'},
                    ],
                    pillowWidth: [
                        {required: true, message: '请输入宽', trigger: 'blur'},
                    ],
                    pillowHeight: [
                        {required: true, message: '请输入高', trigger: 'blur'},
                    ],
                },
                rules2: {
                    sleepPosture: [
                        {required: true, message: '请选择睡姿', trigger: 'change'},
                    ],
                    ynFixSkeletalDistance: [
                        {required: true, message: '请选择是否修正肩颧距', trigger: 'change'},
                    ],
                    distanceStartValue: [
                        {required: true, message: '请选择肩颧距最小值', trigger: 'change'},
                    ],
                    distanceEndValue: [
                        {required: true, message: '请选择肩颧距最大值', trigger: 'change'},
                    ],
                    spineArc: [
                        {required: true, message: '请选择关联颈椎弧', trigger: 'change'},
                    ],
                    pillowName: [
                        {required: true, message: '请选择适合枕头', trigger: 'change'},
                    ],


                },

            };
        },
        methods: {
            changePill(){
                this.$forceUpdate()
            },
            submitForm2(){
                let _this = this
                this.form2.pillowId = this.form2.pillowId ? this.form2.pillowId:this.form2.pillowName
                this.$refs.form2.validate((valid) => {
                    if (valid) {
                        if (_this.alertTitle2 == "新增") {
                            pillowConfigAdd(this.form2).then(res=>{
                                if (res.code === 200){
                                    this.$message.success(res.message);
                                    this.editVisible2 = false;
                                    this.getInfo()
                                }else {
                                    this.$message.error(res.message);
                                }

                            })
                        }else {
                            if(_this.form2.pillowId == _this.form2.pillowSpecification){
                                _this.form2.pillowId = _this.newPillowId
                            }
                            // this.form2.pillowId = this.newPillowId
                            pillowConfigEdit(this.form2)
                                .then(res => {
                                    if (res.code === 200) {
                                        _this.editVisible2 = false;
                                        this.getInfo()
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

            changePillowId(v,vId,n) {
                let obj = {};
                obj = this.getSelect('pillowName').find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.pillowId === vId;//筛选出匹配数据
                });
                let f = obj ? obj.pillowName:n
                // console.log(f)
                if(!v){
                    this.form2.pillowId =''
                }
                // let c = this.form2.pillowName
                let d = this.tableData
                let e = []

                for (let i = 0; i < d.length; i++) {
                    if(f== d[i].pillowName && d[i].pillowLength){
                        e.push({
                            title:`${d[i].pillowLength}*${d[i].pillowWidth}*${d[i].pillowHeight}`,
                            id:d[i].pillowId

                        })
                    }
                }
                this.newTable = e
            },
            changeState() {

                if (this.form.tisSpecification == 2) {
                    delete  this.form.pillowLength
                    delete  this.form.pillowWidth
                    delete  this.form.pillowHeight
                }
            },
            add() {
                this.alertTitle = '新增'
                this.editVisible = true
            },
            adds() {
                this.alertTitle2 = '新增'
                this.editVisible2 = true
                this.$nextTick(()=>{
                    this.$refs.form2.resetFields();
                    this.form2 ={};
                })

            },
            handleClose2(n) {

                if (n) {
                    this.$refs[n].resetFields();
                } else {
                    this.$refs.form2.resetFields();

                }

            },
            getInfo() {
                let _this = this
                pillowConfigList()
                    .then(res => {
                        if (res.code === 200) {
                            _this.tableData2 = res.result.records

                        } else {
                            _this.$message.error(res.message);
                        }

                    })

            },
            getView() {
                let _this = this
                dictionaries()
                    .then(res => {

                        _this.dictionariesList = res.result

                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getSelect(v) {
                let _this = this
                if (this.dictionariesList && v != 'pillowName') {
                    let d = this.dictionariesList
                    for (let i = 0; i < d.length; i++) {
                        if (v == d[i].dict.dictCode) {
                            return d[i].dictItems

                        }
                    }

                } else if (v == 'pillowName') {
                    let obj = {};

                    let peon = _this.tableData.reduce((cur, next) => {
                        obj[next.pillowName] ? "" : obj[next.pillowName] = true && cur.push(next);
                        return cur;
                    }, [])
                    return peon

                }
                else {
                    return false
                }

            },
            handleEdit2(index, row){
                let  _this = this
                this.alertTitle2 = '编辑';

                this.newPillowId = row.pillowId
                 row.ynFixSkeletalDistance =  row.ynFixSkeletalDistance? row.ynFixSkeletalDistance.toLocaleString():''
                _this.$nextTick(() => {
                    _this.form2 = Object.assign({}, row);
                    _this.form2.pillowId =  row.pillowSpecification
                    _this.changePillowId(true,undefined,row.pillowName)
                    this.editVisible2 = true;


                })
            }


        },
        created() {
            this.getView()
            this.getData('pillowList')
            this.getInfo()


        }
    };
</script>
<style>
    .el-select,.el-input-number--small {
        width: 100%;
    }
</style>
