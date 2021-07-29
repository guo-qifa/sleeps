<template>
    <div style="position: relative">
        <el-button type="primary" class="imgbtn" @click="toImg">确认打印</el-button>
        <!-- <router-link target="_blank" :to="{path:'/printbg'}"><el-button class="imgbtn fm" >去打印封面</el-button></router-link> -->
        
        <div class="box-content">
            <div id="printMe" ref="printContent">
                <div class="wrap">
                    <div class="font-style" style="top: 346px; left: 384px">{{ data.nickname }}</div>
                    <div class="font-style" style="top: 346px; left: 1002px">{{ data.sex }}</div>
                    <div class="font-style" style="top: 412px; left: 384px">{{ data.ageRange }}</div>
                    <div class="font-style" style="top: 412px; left: 1002px">{{ data.storeName }}</div>

                    <div class="font-style rect-style" style="top: 583px; left: 171px">{{ data.height }}</div>
                    <div class="font-style rect-style" style="top: 583px; left: 498px">{{ data.weight }}kg</div>
                    <div class="font-style rect-style" style="top: 583px; left: 825px">{{ data.shape }}</div>
                    <div class="font-style rect-style" style="top: 583px; left: 1152px">{{ data.bmi }}</div>

                    <div class="font-style rect-style" style="top: 807px; left: 334px">{{ data.shoulderWidth }}</div>
                    <div class="font-style rect-style" style="top: 807px; left: 662px">{{ data.neckSupportHeight }}</div>
                    <div class="font-style rect-style" style="top: 807px; left: 989px">{{ data.hardnessGrade }}</div>

                    <div style="position: absolute; top: 1241px; left: 419px; height: 162px; width: 360px">
                        <img src="../../assets/img/1.png" alt="" />
                    </div>
                    <div style="position: absolute; top: 1241px; left: 947px; height: 135px; width: 190px">
                        <img src="../../assets/img/2.png" alt="" />
                    </div>

                    <div style="position: absolute; top: 1600px; left: 182px; height: 255px; width: 231px">
                        <img src="../../assets/img/a.png" alt="" />
                    </div>
                    <div style="position: absolute; top: 1600px; left: 485px; height: 254px; width: 233px">
                        <img src="../../assets/img/b.png" alt="" />
                    </div>
                    <div style="position: absolute; top: 1600px; left: 807px; height: 253px; width: 201px">
                        <img src="../../assets/img/c.png" alt="" />
                    </div>
                    <div style="position: absolute; top: 1600px; left: 1102px; height: 250px; width: 218px">
                        <img src="../../assets/img/d.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'; // 转图片打印需要先安装html2Canvas和print-js
import printJS from 'print-js';
export default {
    data: function () {
        return {
            data: {
            }
        };
    },
    mounted() {},
    methods: {
        toImg() {
            // 转图片打印
            html2canvas(this.$refs.printContent, {
                backgroundColor: null,
                useCORS: true,
                windowHeight: document.body.scrollHeight
            }).then((canvas) => {
                // let url = canvas.toDataURL('image/jpeg', 1.0)
                const url = canvas.toDataURL();
                this.img = url;
                printJS({
                    printable: url,
                    type: 'image',
                    documentTitle: '打印图片',
                    style: '@page{size:210mm 285mm;margin: 0cm 1cm 0cm 1cm;}'
                });
                console.log(url);
            });          
        }

    },
    watch: {
        $route: {
            handler: function (to, from) {
                console.log(to, from);
                this.data = JSON.parse(to.query.id);

            },
            immediate: true
        }
    }
};
</script>

<style scoped>
.box-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
}
.imgbtn {
    position: absolute;
    top: 20px;
    z-index: 9;
    left: 20px;
}
.fm {
    top: 20px;
    left: 140px;
}
.font-style {
    color: #666;
    font-size: 24px;
    position: absolute;
}
.rect-style {
    width: 194px;
    height: 194px;
    text-align: center;
    line-height: 194px;
}
@media print {
    .sleepprint {
        width: 100%;
        height: 980px;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    body .hh {
        font-size: 78px !important;
        color: blue !important;
    }
    .p {
        font-size: 16px;
        color: red;
    }
}
.wrap {
    position: relative;
    /* width: 1411px;
    height: 1914px; */
        /* width: 1454px;
    height: 2010px; */
    width: 1500px;
    height: 2050px;
    background: url(../../assets/img/4.jpg) no-repeat;
    background-size: cover;
    background-position: top center;
    margin: 0 auto;
}
/*去除页眉页脚*/
@page {
    size: 210mm 330mm; /* auto是初始值*/
    margin: 0mm; /* 这会影响打印机设置中的边距 */
    padding: 0mm;
}

html {
    background-color: #ffffff;
    margin: 0; /* this affects the margin on the html before sending to printer */
}

body {
    height: auto;
    border: solid 1px blue;
    /* margin: 10mm 15mm 10mm 15mm; margin you want for the content */
    margin: 0mm 0mm 0mm 0mm;
}
/*去除页眉页脚*/
#chart1 {
    width: 300px;
    height: 300px;
}
</style>