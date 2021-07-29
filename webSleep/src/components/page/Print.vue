<template>
    <div style="position: relative">
        <el-button type="primary" class="imgbtn" @click="toImg">确认打印</el-button>
        <!-- <router-link target="_blank" :to="{path:'/printbg'}"><el-button class="imgbtn fm" >去打印封面</el-button></router-link> -->
        
        <div class="box-content">
            <div id="printMe">
                <div class="wrap" ref="printContent" :style="{width:width+'px',height: height+'px'}">
                    <div class="font-style" :style="{ top: height * 0.169 + 'px', left: width * 0.30 + 'px' }">{{ data.nickname }}</div>
                    <div class="font-style" :style="{ top: height * 0.169 + 'px', left: width * 0.70 + 'px' }">{{ data.sex }}</div>
                    <div class="font-style" :style="{ top: height * 0.200 + 'px', left: width * 0.30 + 'px' }">{{ data.age }}</div>
                    <div class="font-style" :style="{ top: height * 0.200 + 'px', left: width * 0.70 + 'px' }">{{ data.storeName }}</div>

                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.284 + 'px',
                            left: width * 0.116 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.height }}
                    </div>
                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.284 + 'px',
                            left: width * 0.333 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.weight }}
                    </div>
                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.284 + 'px',
                            left: width * 0.55 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.shape }}
                    </div>
                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.284 + 'px',
                            left: width * 0.766 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.bmi }}
                    </div>

                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.394 + 'px',
                            left: width * 0.224 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.skeletalDistance }}
                    </div>
                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.394 + 'px',
                            left: width * 0.440 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.neckSupportHeight }}
                    </div>
                    <div
                        class="font-style rect-style"
                        :style="{
                            top: height * 0.394 + 'px',
                            left: width * 0.658 + 'px',
                            width: width * 0.13 + 'px',
                            height: width * 0.13 + 'px',
                            'line-height': width * 0.13 + 'px'
                        }"
                    >
                        {{ data.hardnessGrade }}
                    </div>

                    <div class="sleep-img" :style="{position: 'absolute',top: height * 0.60 + 'px', left: width * 0.274 + 'px', height: width * 0.12 + 'px', width: width * 0.28 + 'px'}">
                        <span class="hardnessGrade" :style="{'line-height': height * 0.070 + 'px'}">{{data.hardnessGrade}}</span>
                        <span :style="{display: 'block',position: 'absolute',top: height * 0.06 + 'px', left: width * 0.08+'px'}">级</span>
                        <img :style="{position: 'absolute',top: height * 0.008 + 'px', left: width * 0.14+ 'px', height: width * 0.1 + 'px', width: width * 0.1 + 'px'}" :src='"../../assets/img/hardnessGrade/grade"+data.hardnessGrade+".png"' alt="" />
                    </div>
                    <div class="sleep-img" :style="{position: 'absolute',top: height * 0.61 + 'px', left: width * 0.63 + 'px', height: width * 0.082 + 'px', width: width * 0.10 + 'px'}">
                        <!-- <img src="../../assets/img/2.png" alt="" /> -->
                        <span class="hardnessGrade" :style="{'line-height': height * 0.060 + 'px'}">{{data.pillowName?data.pillowName.slice(0,2):''}}</span>
                    </div>

                    <div class="title" :style="{'text-align': 'center',position: 'absolute',top: height * 0.78 + 'px', left: width * 0.124 + 'px', height: width * 0.175 + 'px', width: width * 0.15 + 'px'}">
                        <span>M7专属智能床垫</span>
                        <img src="../../assets/img/chuang.png" :style="{height: width * 0.07 + 'px', width: width * 0.15 + 'px'}" alt="" />
                        <img src="../../assets/img/hardnessGrade/M7.png" :style="{height: width * 0.08 + 'px', width: width * 0.08 + 'px'}"  alt="" />

                    </div>
                    <div class="title" :style="{position: 'absolute',top: height * 0.78 + 'px', left: width * 0.324 + 'px', height: width * 0.175 + 'px', width: width * 0.15 + 'px'}">
                        <span>M2专属智能床垫</span>
                        <img src="../../assets/img/chuang.png" :style="{height: width * 0.07 + 'px', width: width * 0.15 + 'px'}" alt="" />
                        <img src="../../assets/img/hardnessGrade/M2.png" :style="{height: width * 0.08 + 'px', width: width * 0.08 + 'px'}" alt="" />
                    </div>
                    <div class="title" :style="{position: 'absolute',top: height * 0.78 + 'px', left: width * 0.53 + 'px', height: width * 0.175 + 'px', width: width * 0.15 + 'px'}">
                        <span >{{data.pillowName}}</span>
                        <!-- <img v-show="data.pillowName" src="../../assets/img/c.png" alt="" /> -->
                        <img v-show="data.pillowName" src="../../assets/img/pillow/shen.png" :style="{height: width * 0.07 + 'px', width: width * 0.15 + 'px'}" alt="" />

                        <img v-if="srcc" :src='"../../assets/img/pillow/"+srcc+".png"' :style="{height: width * 0.08 + 'px', width: width * 0.08 + 'px'}" alt="" />
                    </div>
                    <div class="title" :style="{position: 'absolute',top: height * 0.78 + 'px', left: width * 0.73 + 'px', height: width * 0.175 + 'px', width: width * 0.15 + 'px'}">
                        <!-- <img src="../../assets/img/d.png" alt="" /> -->
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
            data: {},
            height: 0,
            width: 0,
            srcc: ''
        };
    },
    created() {
        // window.screen.width = 1440;
        // window.screen.height = 900;
        console.log(this.js_getDPI())
        let dpi=this.js_getDPI();
        this.width=parseInt(210 / 25.4 * dpi[0]);
        this.height=parseInt(285 / 25.4 * dpi[0]);
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
        },
        js_getDPI() {
            var arrDPI = new Array();
            if (window.screen.deviceXDPI != undefined) {
                arrDPI[0] = window.screen.deviceXDPI;
                arrDPI[1] = window.screen.deviceYDPI;
            } else {
                var tmpNode = document.createElement('DIV');
                tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
                document.body.appendChild(tmpNode);
                arrDPI[0] = parseInt(tmpNode.offsetWidth);
                arrDPI[1] = parseInt(tmpNode.offsetHeight);
                tmpNode.parentNode.removeChild(tmpNode);
            }
            return arrDPI;
        }
    },
    watch: {
        $route: {
            handler: function (to, from) {
                console.log(to, from);
                this.data = JSON.parse(to.query.id);
                this.srcc = this.data.pillowName?this.data.pillowName.slice(0,1):""
                console.log(this.data,this.srcc)

            },
            immediate: true
        }
    }
};
</script>

<style scoped>
* {
    color: #000000!important;
    -webkit-tap-highlight-color: #000000!important;
  }
.sleep-img img {
    width: 100%;
    height: 100%;
}
.hardnessGrade {
    position: absolute;
    font-size: 90px;
    font-weight: 700;
    font-family:'Microsoft Yahei';
    /* top:-16px; */
}
.title{
    text-align: center;
    font-size: 12px;
}
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
    font-size: 12px;
    position: absolute;
}
.rect-style {
    text-align: center;
}
@media print {

}
.wrap {
    position: relative;
    /* width: 1411px;
    height: 1914px; */
    /* width: 1454px;
    height: 2010px; */
    /* width: 1500px;
    height: 2050px; */
    /* height: 1077px;
    width: 793px; */
    /* background: url(../../assets/img/4.jpg) no-repeat; */
    background-size: cover;
    background-position: top center;
    margin: 0 auto;
}
/*去除页眉页脚*/
@page {
    size: 210mm 285mm; /* auto是初始值*/
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
/* 11.69 */
/* 8.26 */
/* 1440*900 */
/* 1122 793 */
</style>
