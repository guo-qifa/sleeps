<template>
    <div style="position: relative">
        <el-button type="primary" class="imgbtn" @click="toImg">打印封面</el-button>

        <div class="box-content">  
            <div id="printMe" ref="printContent">
                <div class="wrap">
                    <img style="width: 1411px;height: 1914px;display: block;" src="../../assets/img/3.jpg" alt="">
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
                    documentTitle: '打印图片'
                });
                console.log(url);
            });          
        }

    }
};
</script>

<style scoped>
.box-content {
    position: fixed;
    top: 0px;
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
    left: 100px;
}
.font-style {
    color: #666;
    font-size: 24px;
    position: absolute;
}
.rect-style {
    width: 180px;
    height: 180px;
    text-align: center;
    line-height: 180px;
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
    width: 1411px;
    height: 1914px;
    background: url(../../assets/img/4.jpg) no-repeat;
    background-size: cover;
    background-position: top center;
    /* margin: 0 auto; */
}
/*去除页眉页脚*/
@page {
    size: auto; /* auto是初始值*/
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