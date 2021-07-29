<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>公式</span>
                <el-button type="primary" size="mini" @click="addRow" style="margin-left: 20px" >新增参数</el-button>
                <span style="padding-left: 50px;font-size: 12px;font-weight: bold">实际计算公式:</span>
                <span style="padding-left: 20px;font-size: 14px;font-weight: bold;color: #66b1ff">{{formula}}</span>

            </div>
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="120px" size="medium">

            <el-row
                    v-for="(item,index) in ruleForm.formList"
                    :key="index"
                    style="border-bottom: 1px solid #f0f0f0;padding: 10px;" >

                <el-form-item
                        label="参数名"
                        :prop="'formList.' + index + '.parameter'"
                        :rules="[{ required: true, message: '参数不能为空',trigger: 'change'}]"
                >
                    <el-select clearable v-model="item.parameter" placeholder="请选择参数" >
                        <el-option
                                v-for="(item,index) in keyOption"
                                :label="item.description"
                                :value="item.dictName"
                                :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                        label="是否关联权重"
                        :prop="'formList.' + index + '.related'"
                        :rules="[{ required: true, message: '是否关联权重',trigger: 'change'}]"
                >

                    <el-select clearable v-model="item.related" placeholder="请选择参数">

                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                        label="运算符"
                        :prop="'formList.' + index + '.symbol'" >

                    <el-select clearable v-model="item.symbol" placeholder="请选择参数">
                        <el-option label="+" value="1"></el-option>
                        <el-option label="-" value="2"></el-option>
                        <el-option label="*" value="3"></el-option>
                        <el-option label="/" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-button
                        type="danger"
                        v-if="ruleForm.formList.length > 1"
                        size="medium"
                        @click="removeRow(index)"
                >删除</el-button>
            </el-row>
            <el-row style="text-align: center;margin-top: 10px">
                <el-button type="primary" size="medium" @click="submit('ruleForm')">提交</el-button>
            </el-row>
        </el-form>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>床垫软硬度</span>
                <el-button type="primary" size="mini"  style="margin-left: 20px" @click="add">新增</el-button>
                <el-table
                        border
                        :data="tableData"
                        style="width: 100%;font-size: 14px">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="计算等级区间" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.openInterval}}</span>
                            <span style="margin: 0px 5px">-</span>
                            <span>{{scope.row.closeInterval}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="hardnessGrade" label="实际等级" align="center">

                    </el-table-column>
                    <el-table-column prop="skeletalDistance" label="肩颧距（cm）" align="center">

                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog :title="alertTitle" :visible.sync="editVisible" width="30%"  @close="handleClose">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                <el-form-item label="计算等级开始"  prop="openInterval" >
                    <el-input v-model="form.openInterval"></el-input>
                </el-form-item>
                <el-form-item label="计算等级结束"  prop="closeInterval" >
                    <el-input v-model="form.closeInterval" ></el-input>
                </el-form-item>
                <el-form-item label="实际等级"  prop="hardnessGrade">
                    <el-input v-model.number="form.hardnessGrade"></el-input>
                </el-form-item>
                <el-form-item label="肩颧距"  prop="skeletalDistance">
                    <el-input-number precision="2" :step="0.1" v-model="form.skeletalDistance"></el-input-number>
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
    import {fitList,fitAdd,fitDel,fitEdit,dictionariesT,formulaAdd,formulList} from "../../utils/api"

    export default {
        data() {
            var isPriceVlidator= (rule, value, callback) => {
                var pattern = /^\d+.?\d{0,2}$/;
                if(!pattern.test(value)){
                    return callback(new Error('最多保留两位小数!'))
                }else {
                    callback();
                }

            }

            return {
                alertTitle:'新增',
                form:{
                    openInterval:'',
                    closeInterval:'',
                    hardnessGrade:''
                },
                editVisible:false,
                tableData:[],

                rules:{
                    openInterval:[
                        { required: true, message: '请输入起始值', trigger: 'blur' },
                        { validator: isPriceVlidator, trigger: 'blur' }
                    ],
                    closeInterval:[
                        { required: true, message: '请输入结束值', trigger: 'blur' },
                        { validator: isPriceVlidator, trigger: 'blur' }
                    ],
                    hardnessGrade:[
                        { required: true, message: '请输入实际等级', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                    skeletalDistance:[
                        { required: true, message: '请输入实际等级', trigger: 'blur' },
                        { type: 'number', message: '必须为数字值'}
                    ],
                },



                ruleForm: {
                    formList: [
                        {

                        }
                    ]
                },
                keyOption:[],
                formula:''


            };
        },
        methods: {
            submitForm(formName) {
                if(this.alertTitle =='新增'){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            fitAdd && fitAdd(this.form).then(res =>{
                                if(res.code==200){
                                    this.$message.success(res.message);
                                    this.editVisible = false
                                    this.getInfo()
                                }else {
                                    this.$message.error(res.message);
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }else {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            fitEdit && fitEdit(this.form).then(res =>{
                                if(res.code==200){
                                    this.$message.success(res.message);
                                    this.editVisible = false
                                    this.getInfo()
                                }else {
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
            add(){
                this.alertTitle = '新增'
                this.editVisible = true
            },
            handleEdit(index, row) {
                this.alertTitle = '编辑'
                this.editVisible = true
                this.form = Object.assign({}, row);

                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(()=>{
                    fitDel && fitDel(row.gradeId).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.message);
                            this.tableData.splice(index, 1);
                        }else {
                            this.$message.error(res.message);
                        }
                    })

                })
                console.log(index, row);
            },
            addRow() {
                // this.ruleForm.formList
                this.ruleForm.formList.push({ });


            },
            // 删除属性列
            removeRow(index) {
                this.ruleForm.formList.splice(index, 1);
            },
            // 提交
            submit(formName) {
                this.$refs[formName].validate(valid => {
                    this.ruleForm.formList.forEach(function(item,index) {
                        item.sortNo =index;

                    })
                    let  l = this.ruleForm.formList.length-1
                    delete  this.ruleForm.formList[l].symbol
                    if (valid){
                        formulaAdd && formulaAdd(this.ruleForm.formList).then(res =>{
                            if(res.code==200){
                                this.$message.success(res.message);
                                this.formul()

                            }else {
                                this.$message.error(res.message);
                            }
                        })
                    }

                    if (valid) {
                    } else {
                        return false;
                    }
                });
            },
            handleClose(n){
               this.form ={}

            },
            getInfo(){
                let _this = this
                fitList()
                    .then(res => {
                        if(res.code ===200){
                            _this.tableData = res.result
                        }else {
                            this.$message.error(res.message);
                        }

                    })
                    .catch(error => {
                    });
            },
            getView() {
                let _this = this
                dictionariesT()
                    .then(res => {
                        for(let i=0;i<res.result.length;i++){
                            _this.keyOption.push(res.result[i].dict)
                        }


                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            formul() {
                let _this = this
                formulList()
                    .then(res => {
                        _this.formula = res.result.formula
                        let d = res.result.list
                        for(let item in d ){
                                d[item].related = d[item].related.toString()
                                 d[item].symbol = d[item].symbol ? d[item].symbol.toString():''
                        }

                        _this.ruleForm.formList = Object.assign([],d);



                    })
                    .catch(error => {
                    });
            }
        },
        created(){
            this.getInfo()
            this.getView()
            this.formul()

        }
    };
</script>
<style>

</style>
