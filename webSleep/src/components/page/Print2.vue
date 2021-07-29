<template>
    <div style="position: relative;width: 100%;height: 100%" id="pdfDom">
        <el-button type="primary" class="imgbtn" @click="getPdf()">导出PDF</el-button>
        <!-- <router-link target="_blank" :to="{path:'/printbg'}"><el-button class="imgbtn fm" >去打印封面</el-button></router-link> -->
        
        <!-- <div class="box-content">
            <div id="pdfDom" ref="printContent">
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
        </div> -->
        <img src="../../assets/img/4.jpg" :style="{width: width,height: height}" alt="" />
    </div>
</template>

<script>
import html2canvas from 'html2canvas'; // 转图片打印需要先安装html2Canvas和print-js
import printJS from 'print-js';
export default {
    data: function () {
        return {
            data: {
                htmlTitle: '打印',
                width: 0,
                htmlTitle: 0
            }
        };
    },
    created() {
        this.width=window.screen.width;
        this.height=window.screen.height;
    },
    mounted() {},
    methods: {
        js_getDPI() {
      var arrDPI = new Array();
      if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
      } else {
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText =
          "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
      }
      return arrDPI;
    },
    // 2. 转换单位
	js_convertMm() {
      const dpiArray = this.js_getDPI();
      let templateArray = [];
      //转换的原理可以百度一下， 260和360是设置的div宽高
      let px = (260 * dpiArray[0]) / 25.4;
      let py = (360 * dpiArray[1]) / 25.4;
      templateArray[0] = px;
      templateArray[1] = py;
      return templateArray;
    },
    // 3. 计算缩放比
	populateIframeScale() {
      const winWidth = window.innerWidth - 50;
      const winHeight = window.innerHeight - 50;
      let templateSize = this.js_convertMm();
      const widthScale = Number((winWidth / templateSize[0]).toFixed(2));
      const heightScale = Number((winHeight / templateSize[1]).toFixed(2));
      if (
        (widthScale <= 0.85 || heightScale <= 0.85) &&
        widthScale <= heightScale
      ) {
        return widthScale;
      } else if (
        (widthScale <= 0.85 || heightScale <= 0.85) &&
        widthScale > heightScale
      ) {
        return heightScale;
       //如果计算得到的比例大于0.85，则按0.85的缩放比显示，因为预览的下面还有关闭按钮，需要预留一定的空间
      } else if (widthScale > 0.85 && heightScale > 0.85) {
        return 0.85;
      }
      return 1;
    },
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
/* #pdfDom {
    width: 100%;
    height: 100%;

} */
.wrap {
    position: relative; 
    display: flex;
    /* width: 1411px;
    height: 1914px; */
        /* width: 1454px;
    height: 2010px; */
    /* min-width: 1500px;
    min-height: 2050px; */
    /* width: 100%;
    height: 100%; */
    /* width: 210mm;
    height: 285mm; */
    /* width: 794px;
    height: 1123px; */
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
</style>