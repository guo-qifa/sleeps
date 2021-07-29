<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules">

            <el-card class="box-card">

                <el-row :gutter="20" class="row_box">
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">性别</el-col>
                        <el-col :span="20">
                            <el-form-item prop="sexWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.sexWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="sexWeight">
                                        <p>
                                            <span>男:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.sexMan" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="sexWeight">
                                        <p>
                                            <span>女:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.sexWomen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>

                            </el-row>

                        </el-col>

                    </el-row>
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">体型</el-col>
                        <el-col :span="20">
                            <el-form-item prop="shapeWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.shapeWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="shapeApple">
                                        <p>
                                            <span>苹果型:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.shapeApple" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="shapeBanana">
                                        <p>
                                            <span>香蕉型:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.shapeBanana" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="shapeHourglass">
                                        <p>
                                            <span>沙漏型:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.shapeHourglass" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="" prop="shapePear">
                                        <p>
                                            <span>梨型:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.shapePear" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>

                            </el-row>

                        </el-col>

                    </el-row>
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">脊椎形态</el-col>
                        <el-col :span="20">
                            <el-form-item prop="shapeWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.vertebralMorphologyWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="vertebralMorphologySone">
                                        <p>
                                            <span>S1:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.vertebralMorphologySone" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="vertebralMorphologyStwo">
                                        <p>
                                            <span>S2:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.vertebralMorphologyStwo" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="vertebralMorphologySthree">
                                        <p>
                                            <span>S3:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.vertebralMorphologySthree" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>

                            </el-row>

                        </el-col>

                    </el-row>
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">年龄</el-col>
                        <el-col :span="20">
                            <el-form-item prop="ageWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.ageWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="ageTwentyThirty">
                                        <p>
                                            <span>20-30:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.ageTwentyThirty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="ageThirtyForty">
                                        <p>
                                            <span>31-40:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.ageThirtyForty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="ageFortyFifty">
                                        <p>
                                            <span>41-50:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.ageFortyFifty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="ageFiftySixty">
                                        <p>
                                            <span>51-60:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.ageFiftySixty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="ageAboveSixty">
                                        <p>
                                            <span>60以上:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.ageAboveSixty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>

                            </el-row>

                        </el-col>

                    </el-row>
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">睡姿</el-col>
                        <el-col :span="20">
                            <el-form-item prop="sleepPostureWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.sleepPostureWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="sleepPostureDown">
                                        <p>
                                            <span>仰睡:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.sleepPostureDown" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="sleepPostureSide">
                                        <p>
                                            <span>侧睡:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.sleepPostureSide" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="sleepPostureLie">
                                        <p>
                                            <span>趴睡:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.sleepPostureLie" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>


                            </el-row>

                        </el-col>

                    </el-row>
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">软硬偏好</el-col>
                        <el-col :span="20">
                            <el-form-item prop="sleepPostureWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.softHardPreferWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="softHardPreferSoft">
                                        <p>
                                            <span>偏软:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.softHardPreferSoft" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="softHardPreferModerate">
                                        <p>
                                            <span>适中:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.softHardPreferModerate" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="softHardPreferHard">
                                        <p>
                                            <span>偏硬:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.softHardPreferHard" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>


                            </el-row>

                        </el-col>

                    </el-row>
                    <el-row :gutter="20" class="border_bottom">
                        <el-col :span="2" class="title">BMI</el-col>
                        <el-col :span="20">
                            <el-form-item prop="bmiWeight">
                                <p>
                                    <span>权重比例</span>

                                </p>
                                <el-input v-model="form.bmiWeight" :disabled="cahngeState">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item prop="bmiLessFifteen">
                                        <p>
                                            <span>15以下区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiLessFifteen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="bmiFifteen">
                                        <p>
                                            <span>15区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiFifteen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiSixteen">
                                        <p>
                                            <span>16区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiSixteen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiSeventeen">
                                        <p>
                                            <span>17区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiSeventeen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiEighteen">
                                        <p>
                                            <span>18区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiEighteen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiNineteen">
                                        <p>
                                            <span>19区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiNineteen" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwenty">
                                        <p>
                                            <span>20区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwenty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyOne">
                                        <p>
                                            <span>21区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyOne" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyTwo">
                                        <p>
                                            <span>22区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyTwo" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyTwo">
                                        <p>
                                            <span>23区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyThree" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyFour">
                                        <p>
                                            <span>24区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyFour" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyFive">
                                        <p>
                                            <span>25区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyFive" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentySix">
                                        <p>
                                            <span>26区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentySix" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentySeven">
                                        <p>
                                            <span>27区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentySeven" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyEight">
                                        <p>
                                            <span>28区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyEight" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiTwentyNine">
                                        <p>
                                            <span>29区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiTwentyNine" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  prop="bmiAboveThirty">
                                        <p>
                                            <span>30及30以上区间:</span>
                                            <span>适合软硬度</span>
                                        </p>
                                        <el-input v-model="form.bmiAboveThirty" :disabled="cahngeState">
                                        </el-input>
                                    </el-form-item>

                                </el-col>


                            </el-row>

                        </el-col>

                    </el-row>


                </el-row>
                <el-form-item style="text-align: center;margin-bottom: 30px;margin-top: 30px">
                    <el-button v-if="jurisdiction('01102')" @click="resetForm('form')">修改</el-button>
                    <el-button v-if="jurisdiction('01102')" type="primary" @click="submitForm('form')">保存</el-button>

                </el-form-item>

            </el-card>
        </el-form>
    </div>
</template>

<script>
    import  interactive   from "../../utils/interactive"

    import {weight,weightEdit} from "../../utils/api"
    export default {
        name: "weight",
        extends: interactive,
        data() {
            return {
                cahngeState: true,
                form: {

                },
                rules: {
                    sexWeight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sexMan: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sexWomen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    shapeWeight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    shapeApple: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    shapeBanana: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    shapeHourglass: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    shapePear: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    vertebralMorphologyWeight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    vertebralMorphologySone: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    vertebralMorphologyStwo: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    vertebralMorphologySthree: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    ageWeight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    ageTwentyThirty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    ageThirtyForty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    ageFortyFifty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    ageFiftySixty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    ageAboveSixty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sleepPostureWeight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sleepPostureDown: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sleepPostureSide: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    sleepPostureLie: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    softHardPreferWeight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    softHardPreferSoft: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    softHardPreferModerate: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    softHardPreferHard: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    // --
                    bmiLessFifteen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiFifteen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiSixteen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiSeventeen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiEighteen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiNineteen: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwenty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyOne: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyTwo: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyThree: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyFour: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyFive: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentySix: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentySeven: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyEight: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiTwentyNine: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    bmiAboveThirty: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],


                }
            }
        },
        methods: {
            resetForm() {
                this.cahngeState = false
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        weightEdit&& weightEdit(this.form).then(res =>{
                            if(res.code==200){
                                this.$message.success(res.message);
                                this.cahngeState = true
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getInfo(){
                let _this = this
                weight()
                    .then(res => {
                        _this.form = Object.assign({}, res.result);

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created(){
           this.getInfo()
        }
    }
</script>

<style>
    .row_box {
        padding-left: 50px;
        padding-right: 50px;

    }

    .border_bottom {
        border-bottom: 1px solid #3333;
        padding-top: 15px;
    }

    .title {
        font-size: 15px;
        font-weight: bold;
    }

    .row_box p {
        float: left;
        width: 165px;
        text-align: right;
    }

    .row_box p span:first-child {
        margin-right: 10px;
    }

    .row_box .el-form-item__content {
        margin-left: 0px !important;
    }

    .row_box .el-input {
        margin-left: 20px;
        margin-right: 20px;
        width: 30%;
    }

    .row_box .el-form-item__error {
        left: 187px;
    }
</style>