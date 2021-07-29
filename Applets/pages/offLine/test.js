const app = getApp()
// pages/test.js
var myPlugin = requirePlugin('WechatSI');  // 引入插件
 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        slider10Type:'10-shihe',
        sliderMin10:45,
        sliderMax10:74,
        memberExtId:null,
        slider11Value:50,
        slider10Value:60,
        leftNum:'60%',
        testImgUrl: 'http://risk.rfyfb.com/file/offLine/online', 
        currentPage8Index: -1,
        bedTypeIndex: 1,
        saomiaoResult: true,
        saomiao:true,
        percent:0,
        times:20,
        readyFlag: true,
        _num:'3',
        gotWeight:'',
        gotHeight:'',
        wich:'',
        showPhoto: true,
        confirm:false,
        device: false,
        page3Tip:'请准备...',
        current:0,
        currentSwiper: 0,
        currentPage: 1,
        hasResult: true,
        indicatorDots: true,
        currentPage8Index: -1,
        currentPage9Index:{},
        currentPage7Index: -1,
      
      
        ageList: [],
        sexList: ['男', '女'],
        age: 26,
        ageValue: 37,
        sex: 0,
        bmi: "",
        file: "",
        isFace: true,
        isSide: false,
        input: {
            yqgd: "",
            sg: "",
            tz: ""
        },
       userList: [
            {    
                name:"周莎",
                post:'店长',
                des:'深睡密码-浙江嘉兴-红星美凯龙店',
                jichusuzhi:5,
                zhuanyedu:5,
                manyidu:5, 
                congyejingyan:'五年', 
                pingjia:['服务热情','讲解到位',"口吃清晰"],
                rongyu:'深睡密码第二期全国销售精英奖排名 第二名',
                paiming:'2021深睡密码华南地区技能竞赛一等奖' 
            },
            {   
                name:"王磊",
                post:'店员',
                des:'深睡密码-南京-红星美凯龙店',
                jichusuzhi:3,
                zhuanyedu:4,
                manyidu:1, 
                congyejingyan:'两年', 
                pingjia:['服务热情',"口吃清晰"],
                rongyu:'深睡密码第二期全国销售精英奖排名 第10名',
                paiming:'2021深睡密码华南地区技能竞赛三等奖' 
            }
       ],
        photoSrc:'',
        camreaVisible: false,
        imgUrl: app.globalData.imgUrl
    },
       //上一页
  prev:function(){ 
    let count = this.data.current
    count = count>0?count-1:this.data.userList.length-1
    this.setData({
      current:count
    })
  },
  //下一页
  next:function(){
    let count = this.data.current
    count = count == this.data.userList.length-1? 0 : count+1
    this.setData({
      current:count
    }) 
  },
    jump(e) {
        if(e.currentTarget.dataset.index){ 
            if(e.currentTarget.dataset.index == 9){
                if(this.data.currentPage8Index<0){
                    wx.showToast({
                        title: '请选择睡眠姿势',
                        icon: 'error',
                        duration: 1500
                    })
                    return false;
                } else {
                    this.setData({
                        currentPage: e.currentTarget.dataset.index
                    })
                }
              
            } else if(e.currentTarget.dataset.index == 10){
                
                if(JSON.stringify(this.data.currentPage9Index) == '{}'){
                    wx.showToast({
                        title: '请选择身体不适部位',
                        icon: 'error',
                        duration: 1500
                    })
                    return false;
                } else if(this.data.bedTypeIndex<0){
                    wx.showToast({
                        title: '请选择床垫的软硬舒适度',
                        icon: 'error',
                        duration: 1500
                    })
                    return false;
                } else if(this.data.age == ''){
                    wx.showToast({
                        title: '请选择您的年龄',
                        icon: 'error',
                        duration: 1500
                    })
                    return false;
                } else {
                    this.setData({
                        currentPage: e.currentTarget.dataset.index
                    })
                }
            } else {
                this.setData({
                    currentPage: e.currentTarget.dataset.index
                })
            }
           
        }
    },
    jumpEnd(e) {
        
        var that = this
        wx.request({
            url: `${app.globalData.URL}/wx/memberext/commit/report`,
            method: "post", 
            data: {
                softHardPreference:this.data.bedTypeIndex,
                memberId: wx.getStorageSync('memberId'),
                age: this.data.age,
                bmi: this.data.bmi,
                height: this.data.gotHeight,
                weight: this.data.gotWeight,
                repPicture: '',
                sex: parseFloat(this.data.sex) + 1,
                shape: '1',
                sleepPosture: this.data.currentPage8Index,
                sleepDiscomfort: '7'
            },
            success: function (res) {
                wx.hideLoading();
                let obj = JSON.stringify(res.data.result);
                if (res.data.code == 200) {
                    if (res.data.result && !Object.getOwnPropertyNames(res.data.result).length) {
                        wx.showToast({
                            title: '暂无报告',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        that.setData({
                            currentPage: 11,
                            memberExtId: res.data.result.memberExtId
                        })
                        that.getInfo()
                        // wx.redirectTo({
                        //     url: '../report/report?id=' + res.data.result.memberExtId
                        // })
                    }
                } else {
                    wx.showToast({
                        title: '提交失败',
                        icon: 'error',
                        duration: 2000
                    })
                }
            }
        })
    },
    getInfo(){ 
        wx.showLoading({
            title: '数据加载中...',
        })
        wx.request({
            url: `${app.globalData.URL}/wx/memberext/report/information?memberExtId=${this.data.memberExtId}`,
            method: "get",
            data: {
                memberId: wx.getStorageSync('memberId')
            },
            success: (res) => {
                
                wx.hideLoading();
                var info = res.data.result;
                info.pillowName = info.pillowName ? info.pillowName.substring(0, 2) : '';   
                if(info.pillowName.indexOf('儿童')>-1 || info.pillowName.indexOf('婴儿')>-1){
                  this.setData({
                    background: [
                      { 
                        children:[
                            {
                                type:'床垫推荐1', 
                                goodBg:'10-chuangdian',
                                name:'M7',
                                des: info.hardnessGrade + '级软硬度专属智能床垫'
                              },
                              {
                                type: '枕头推荐1', 
                                goodBg: '10-zhentou',
                                name: '儿童枕',
                                des: '专属睡眠枕'
                              },
                       
                         
                        ]
                      },
                      { 
                        children:[ 
                          {
                            type:'床垫推荐2', 
                            goodBg:'10-chuangdian',
                            name:'M2',
                            des: info.hardnessGrade + '级软硬度专属智能床垫'
                          },
                          {
                            type:'枕头推荐2', 
                            goodBg:'10-zhentou',
                            name:'婴儿枕',
                            des:'专属睡眠枕'
                          }
                        ]
                      }
                    ]
                }); 
                } 
                if(info.pillowName.indexOf('C1')>-1 || info.pillowName.indexOf('C2')>-1){ 
                  this.setData({
                      background: [
                        { 
                          children:[
                            {
                                type:'床垫推荐1', 
                                goodBg:'10-chuangdian',
                                name:'M7',
                                des: info.hardnessGrade + '级软硬度专属智能床垫'
                              },
                            {
                              type: '枕头推荐1', 
                              goodBg: '10-zhentou',
                              name: 'C1',
                              des: '专属睡眠枕'
                            },
                          
                          ]
                        },
                        { 
                          children:[
                         
                            {
                              type:'床垫推荐2', 
                              goodBg:'10-chuangdian',
                              name:'M2',
                              des: info.hardnessGrade + '级软硬度专属智能床垫'
                            },
                            {
                                type:'枕头推荐2', 
                                goodBg:'10-zhentou',
                                name:'C2',
                                des:'专属睡眠枕'
                              }
                          ]
                        }
                      ]
                  });
                } 
                if(info.pillowName.indexOf('Y1')>-1 || info.pillowName.indexOf('Y2')>-1){
                  this.setData({
                    background: [
                      { 
                        children:[
                            {
                                type:'床垫推荐1', 
                                goodBg:'10-chuangdian',
                                name:'M7',
                                des: info.hardnessGrade + '级软硬度专属智能床垫'
                              },
                          {
                            type: '枕头推荐1', 
                            goodBg: '10-zhentou',
                            name: 'Y1',
                            des: '专属睡眠枕'
                          },
                         
                        ]
                      },
                      { 
                        children:[
                         
                          {
                            type:'床垫推荐2', 
                            goodBg:'10-chuangdian',
                            name:'M2',
                            des: info.hardnessGrade + '级软硬度专属智能床垫'
                          },
                          {
                            type:'枕头推荐2', 
                            goodBg:'10-zhentou',
                            name:'Y2',
                            des:'专属睡眠枕'
                          }
                        ]
                      }
                    ]
                }); 
                }
                if(info.pillowName.indexOf('P1')>-1){
                  this.setData({
                    background: [
                      { 
                        children:[
                            {
                                type:'床垫推荐1', 
                                goodBg:'10-chuangdian',
                                name:'M7',
                                des: info.hardnessGrade + '级软硬度专属智能床垫'
                              },
                          {
                            type: '枕头推荐1', 
                            goodBg: '10-zhentou',
                            name: 'P1',
                            des: '专属睡眠枕'
                          },
                          
                       
                        ]
                      },
                      { 
                        children:[
                          {
                            type:'床垫推荐2', 
                            goodBg:'10-chuangdian',
                            name:'M2',
                            des: info.hardnessGrade + '级软硬度专属智能床垫'
                          },
                          {
                            type:'枕头推荐2', 
                            goodBg:'',
                            name:'',
                            des:''
                          }
                        ]
                      }
                    ]
                }); 
                }
                this.setData({
                    info, 
                });
            }
        })
    },
    jumpBack(e){   
        if(e.currentTarget.dataset.index){
            this.setData({
                currentPage: e.currentTarget.dataset.index
            })
        } 
    },
   jumpNext(e) { 
        if (e && !this.checkInput(e.currentTarget.dataset.index)) {
            return;
        }
        this.setData({
            currentPage: this.data.currentPage + 1
        })
    },
    jumpPrev(e) {
        this.setData({
            currentPage: this.data.currentPage - 1
        })
    },
    setBedType(e) {
        this.setData({
            bedTypeIndex: e.currentTarget.dataset.index
        })
    },
    devicePosition() {
    
        this.setData({
            device:  !this.data.device,
        }) 
      },
    
 
    takePhoto() { 
        var _this = this
        this.setData({ 
            showPhoto: true,
            photoSrc:''
        }) 
        const ctx = wx.createCameraContext();
        console.log(_this.data.wich)
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {  
                console.log("拍照");
                _this.setData({
                    photoSrc: res.tempImagePath,
                    isFace: true,
                    isSide: true, 
                    showPhoto: false,
                    // wich: _this.data.wich
                }) 
                /**
              * 预览图片
              */
                // wx.previewImage({ 
                //   urls: [this.data.photoSrc],
                // })
                /**
                 * 设置缓存
                 */
                console.log('开始保存')
                wx.setStorage({
                  key: 'key1',
                  data: this.data.photoSrc,
                  success: function (res) {
                    console.log('异步保存成功')
                  }
                }),
                  //获取缓存
                  wx.getStorage({
                    key: 'key1',
                    success: function (res) {
                      console.log(res.data)
                    }
                  })
      
                // this.uploadFile(res.tempImagePath);
                // this.setData({
                //     camreaVisible: false
                // })
            }, 
            fail: (res) => { 
               
            }, 
            fail: (res) => { 
                
            }, 
        })
    },
    uploadFileFu(){
         //获取缓存
         var _this = this
         wx.showLoading({
            title: '文件上传中...',
        });
         wx.getStorage({
            key: 'key1',
            success: function (res) { 
                _this.setData({  
                    camreaVisible: false,
                    showPhoto: true, 
                }) 
                _this.uploadFile(res.data); 
            }
          }) 
    },
    showCamrea(e) { 
        this.setData({
            currentPage: 4
        }) 
        this.setData({ 
            wich: ''
        })
        if(e.currentTarget.dataset.index == 1){ 
            this.setData({
                isSide:  true,
                isFace:  false,
                showPhoto:true, 
                wich: 1
            }) 
        }
        if(e.currentTarget.dataset.index == 2){
            this.setData({
                isSide:  true,
                isFace:  true,
                showPhoto:true,
                wich:2
            }) 
        }
        if(e.currentTarget.dataset.index == 3){
            this.setData({
                isFace:  true,
                isSide:  false,
                showPhoto:true,
                wich:3
            }) 
        }
        this.setData({
            camreaVisible: true,
            showPhoto:true,
        }) 
    },
    hideCamrea() { 
        this.setData({
            camreaVisible: false
        })
    },
    checkInput(idx) {
        if (idx == 7 || idx == 6) { 
            if (this.data["currentPage" + idx + "Index"] < 0) {
                wx.showToast({
                    title: '至少选择一项',
                    icon: 'error',
                    duration: 1500
                })
                return false;
            }
            // if (this.data["bedTypeIndex"] < 0) {
            //     wx.showToast({
            //         title: '选择床垫的软硬度',
            //         icon: 'error',
            //         duration: 1500
            //     })
            //     return false;
            // } 
        }
    
        if (idx == 2) {
            if (!this.data.age) {
                wx.showToast({
                    title: '请填写年龄',
                    icon: 'error',
                    duration: 1500
                })
                return false;
            }
        }
        if (idx == 5) {
            if (!this.data.input.sg || isNaN(this.data.input.sg)) {
                wx.showToast({
                    title: '请正确填写身高',
                    icon: 'error',
                    duration: 1500
                })
                return false;
            }
            if (!this.data.input.tz || isNaN(this.data.input.tz)) {
                wx.showToast({
                    title: '请正确填写体重',
                    icon: 'error',
                    duration: 1500
                })
                return false;
            }
        }

        return true;
    },
    swiperChange(e) {
        this.setData({
            currentSwiper: e.detail.current
        })
    },
    uploadFile(url) { 
        wx.uploadFile({
            filePath: url,
            name: 'file',
            url: `${app.globalData.URL}/wx/file/upd`,
            success: (resp) => {
                var result = JSON.parse(resp.data);
               
                if (result.code == 200) {
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 1000
                    })
                    this.setData({
                        file: result.result
                    }, () => { 
                        //  this.jumpNext(); 
                    });
                } else {
                    setTimeout(() => {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'error',
                            duration: 2000
                        })
                    }, 500);
                }
            },
            fail: (res) => {
                setTimeout(() => {
                    wx.showToast({
                        title: '上传失败',
                        icon: 'error',
                        duration: 2000
                    })
                }, 500);
            },
            complete: () => {
                wx.hideLoading();
            }
        })
    },
    chooseImage(e) {
        const type =1;
        wx.chooseImage({

            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: type == 1 ? ['album'] : ['camera'],
            success: (result) => { 
                this.uploadFile(result.tempFilePaths[0]);
            },
            fail: (res) => { },
            complete: (res) => { },
        })
    },
    bindAgeChange(v) {
        this.setData({
            age: v.detail.value
        })
    },
    bindSexChange(e) {
        this.setData({
            sex: e.currentTarget.dataset.value
        })
    },
    setPage8Current(e) {
        this.setData({
            currentPage8Index: e.currentTarget.dataset.index
        })
    },
    setBedType(e) {
     
        this.setData({
            bedTypeIndex: e.currentTarget.dataset.index
        })
    },
    setPage7Current(e) {
        this.setData({
            currentPage7Index: e.currentTarget.dataset.index
        })
    },
    slider2change(e){ 
        var num = e.detail.value
        if(num < 50){
             this.setData({ 
                slider10Type: '10-pianruan' 
            }) 
        } 
        if(num >= 50 && num < 70 ){
            this.setData({ 
               slider10Type: '10-shihe' 
           }) 
       } 
       if(num >= 70 ){
            this.setData({ 
                slider10Type: '10-pianyin' 
            }) 
         } 
        // if(num<=this.data.sliderMin10){
        //     num = this.data.sliderMin10
        // }
        // if(num>=this.data.sliderMax10){
        //     num = this.data.sliderMax10
        // }
        
        this.setData({ 
            leftNum: num * 1 + '%', 
        }) 
        setTimeout(function(){
            this.setData({
                slider10Value:num, 
            }) 
        },1000)
    },
    slider9change(e){
        var num = e.detail.value 
        //14.2587
        if(num < 14){
            this.setData({
                age : parseInt(num * 0.97) 
            })
            console.log(this.data.age)
             
        }
        if(num >= 14 && num <28){
             
            this.setData({
                age :  parseInt( (num-14) * 0.42 + 14)
            })
            console.log(this.data.age)
             
        }
        if(num >= 28 && num < 85){
            this.setData({
                age :  parseInt( (num-28) * 0.7 + 20)  
            })
            console.log(this.data.age)
             
        }
        if(num >= 85){
            this.setData({
                age : parseInt((num - 84) * 2.7 + 60) 
            })
            console.log(this.data.age)
            
        }
       
    },
    setPage9Current(e) {  
        var rs = this.data.currentPage9Index;
        rs[e.currentTarget.dataset.index] = rs[e.currentTarget.dataset.index] ? false : true; 
        if(e.currentTarget.dataset.index == 7){
            this.setData({
                currentPage9Index: {7:true}
            })
        } else {
            if(this.data.currentPage9Index[7]){
                this.data.currentPage9Index[7] = false
            }
            this.setData({
                currentPage9Index: rs
            })
        }
     
    }, 
    bindKeyInput(e) {
        var rs = this.data.input;
        rs[e.currentTarget.dataset.key] = e.detail.value
        this.setData({
            input: rs
        });
        this.initBMI();
    },
 
    finish() {
        // if (!this.checkInput(8)) {
        //     return;
        // } 
        wx.showLoading({
            title: '数据提交中...',
        }) 
        var sleepDiscomfort = [];
        for (const tmp in this.data.currentPage8Index) {
            if (this.data.currentPage8Index[tmp]) {
                sleepDiscomfort.push(tmp);
            }
        }

        wx.request({
            url: `${app.globalData.URL}/wx/memberext/commit/report`,
            method: "post",
            data: {
                softHardPreference:this.data.bedTypeIndex,
                memberId: wx.getStorageSync('memberId'),
                age: this.data.age,
                bmi: this.data.bmi,
                height: this.data.input.sg,
                weight: this.data.input.tz,
                repPicture: '',
                sex: parseFloat(this.data.sex) + 1,
                shape: this.data.currentPage7Index,
                sleepPosture: this.data.currentPage8Index,
                sleepDiscomfort: sleepDiscomfort.length ? sleepDiscomfort.join(",") : '7'
            },
            success: function (res) {
                wx.hideLoading();
                let obj = JSON.stringify(res.data.result);
                if (res.data.code == 200) {
                    if (res.data.result && !Object.getOwnPropertyNames(res.data.result).length) {
                        wx.showToast({
                            title: '暂无报告',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.redirectTo({
                            url: '../report/report?id=' + res.data.result.memberExtId
                        })
                    }
                } else {
                    wx.showToast({
                        title: '提交失败',
                        icon: 'error',
                        duration: 2000
                    })
                }
            }
        })
    },
    onReady(e) {
        //创建内部 audio 上下文 InnerAudioContext 对象。
        this.innerAudioContext = wx.createInnerAudioContext();
        this.innerAudioContext.onError(function (res) {
          console.log(res);
          wx.showToast({
            title: '语音播放失败',
            icon: 'none',
          })
        }) 
        app.globalData.playAudio =  this.innerAudioContext 
    },
    onLoad() {
        this.innerAudioContext = wx.createInnerAudioContext();
        var that = this
         var contentText =  '睡眠定制顾问将根据您的身体数据和睡眠习惯，推荐真正合适您的睡眠产品' 
         myPlugin.textToSpeech({   
            lang: 'zh_CN',
            content:contentText,
            success: function (res) { 
                that.playAudio(res.filename);
            },
        }) 
        var list = [];
        for (let i = 1; i < 80; i++) {
            list.push(i);
        }
        this.setData({
            ageList: list
        });
        this.initWatch(this)
    },
    onShow() {
       
    }, 
    onHide() {
        console.log('onHide监听页面隐藏'); 
      },
    watch: {//需要监听的字段
        'currentPage': function (a,b) { 
            var that = this  
            if(this.innerAudioContext){
                this.innerAudioContext.stop()
            } 
            for(var i=1;i<12;i++){
                if(i==7 || i==9){
                    if(app.globalData.timer[i]){ 
                        clearInterval(app.globalData.timer[i])
                        app.globalData.timer[i] = null
                    } 
                } else { 
                    if(app.globalData.timer[i]){ 
                        clearTimeout(app.globalData.timer[i])
                        app.globalData.timer[i] = null
                    } 
                }
            } 
            if(b==1){ 
                var contentText =  '睡眠定制顾问将根据您的身体数据和睡眠习惯，推荐真正合适您的睡眠产品' 
            }
            if(b==2){ 
                var contentText =  '为了让您获得更好的睡眠测试体验，您可以按照以下方式进行' 
            }
            if(b==3){   
                console.log(app.globalData,'window') 
                this.setData({
                    page3Tip: '请 准 备...',
                    gotWeight:'',
                    gotHeight:''
                })
                 var contentText =  '请在体态指标检测区上保持直立精致状态' 
                 app.globalData.timer['1'] = setTimeout(()=>{
                    var contentText =  '开始测量'   
                    that.setData({
                        page3Tip: '开 始 测 量...',
                    })
                    myPlugin.textToSpeech({   
                        lang: 'zh_CN',
                        content:contentText,
                        success: function (res) { 
                            that.playAudio(res.filename);
                        },
                    }) 
                    app.globalData.timer['2'] =  setTimeout(()=>{
                        var contentText =  '数据错误，请重新测量'  
                        that.setData({
                            page3Tip: '数 据 错 误...',
                        })
                        myPlugin.textToSpeech({   
                            lang: 'zh_CN',
                            content:contentText,
                            success: function (res) { 
                                that.playAudio(res.filename); 
                            },
                        }) 
                        app.globalData.timer["3"] =  setTimeout(()=>{
                            var contentText = '测量成功'  
                            that.setData({
                                page3Tip: '获 取 数 据 ',
                                gotWeight:'66',
                                gotHeight:'178'
                            })
                            that.initBMI()
                            myPlugin.textToSpeech({   
                                lang: 'zh_CN',
                                content:contentText,
                                success: function (res) { 
                                    that.playAudio(res.filename); 
                                },
                            }) 
                            app.globalData.timer["4"] = setTimeout(()=>{  
                                clearTimeout(app.globalData.timer[1]) 
                                clearTimeout(app.globalData.timer[2]) 
                                clearTimeout(app.globalData.timer[3]) 
                                clearTimeout(app.globalData.timer[4]) 
                                app.globalData.timer[1] = null
                                app.globalData.timer[2] = null
                                app.globalData.timer[3] = null
                                app.globalData.timer[4] = null
                                that.setData({
                                     currentPage: '4', 
                                }) 
                             },3500)
                         },6000)
                     },7000)
                 },6000)
            }
            if(b==4){  
                var contentText =  '请移步至后方3D数字建模区，站在指定位置，保持直立，目视前方' 
                app.globalData.timer[5] = setTimeout(()=>{
                    clearTimeout(app.globalData.timer[5]) 
                    app.globalData.timer[5] = null
                    that.setData({
                        currentPage: '5', 
                    }) 
                },11000)
            }
            if(b==5){   
                that.setData({
                    readyFlag: true,
                    _num:3
                }) 
                var contentText = '接下来，我们将进行3Ds数字建模。建立模型时，请目视前方，保持图示动作，匀速缓慢的旋转一周。旋转时，需保持上身直立姿态，小碎步旋转。准备好了，请张开双臂，开始建模' 
        
                app.globalData.timer[6] = setTimeout(()=>{ 
                    app.globalData.timer[7] = setInterval(() => { 
                        var num = that.data._num - 1
                        that.setData({
                            _num:  num, 
                        }) 
                        if(num ==0){
                            clearTimeout(app.globalData.timer[6]) 
                            clearInterval(app.globalData.timer[7]) 
                            app.globalData.timer[6] = null
                            app.globalData.timer[7] = null
                            that.setData({
                                readyFlag: false,
                            }) 
                            setTimeout(()=>{
                                that.setData({
                                     currentPage: '6', 
                                }) 
                            },1000)
                        } 
                    },1000)
                },23000)
            }
            if(b==6){  
                that.setData({
                    saomiao: true,  
                    times: 20, 
                    percent: parseInt(0) ,
                    saomiaoResult:true
                })
                var contentText =  '正在扫描' 
                app.globalData.timer[8] = setTimeout(()=>{
                    app.globalData.timer[9] = setInterval(()=>{ 
                        var times = that.data.times-1
                        var precent =  times/20 * 100
                        var values = parseInt(100 - precent)
                       
                        if(times == 0){
                            clearTimeout(app.globalData.timer[8]) 
                            clearInterval(app.globalData.timer[9]) 
                            app.globalData.timer[8] = null
                            app.globalData.timer[9] = null
                            that.setData({
                                saomiao: false,  
                            })  
                            app.globalData.timer[10]  =  setTimeout(()=>{
                                var contentText =  '数据计算中' 
                                myPlugin.textToSpeech({   
                                    lang: 'zh_CN',
                                    content:contentText,
                                    success: function (res) { 
                                        that.playAudio(res.filename); 
                                    },
                                })  
                                that.setData({ 
                                     saomiaoResult:false, 
                                })  
                                app.globalData.timer[11] = setTimeout(()=>{
                                    clearTimeout(app.globalData.timer[10]) 
                                    clearInterval(app.globalData.timer[11]) 
                                    app.globalData.timer[10] = null
                                    app.globalData.timer[11] = null
                                    that.setData({ 
                                         currentPage: '7',  
                                   })   
                                },3000)
                            },4000)
                        }
                        that.setData({
                            times: times, 
                            percent: parseInt(values) 
                        })  
                    },1000)
                },2000)
                // percent:99,
                // times:20,
            }
            if(b==7){  
                var contentText =  '数据计算完成' 
            }
            if(b==8){  
                var contentText =  '请选择您平时的睡觉姿势' 
            }
            if(b==9){  
                var contentText =  '请选择您平时睡醒后那些部位不适以及您对床垫的软硬度要求， 并选择你的年龄段。' 
            }
            if(b==10){  
                var contentText =  '检测结果你适合睡6级软硬舒适度的床垫' 
            }
            if(b==11){  
                var contentText =  '睡眠检测报告' 
            } 
            myPlugin.textToSpeech({   
                lang: 'zh_CN',
                content:contentText,
                success: function (res) { 
                    that.playAudio(res.filename);
                },
            }) 

        },
    },
    initBMI() { 
        if (this.data.gotHeight && !isNaN(this.data.gotHeight) && this.data.gotWeight && !isNaN(this.data.gotWeight)) {
            var bmi = (this.data.gotWeight / Math.pow((this.data.gotHeight / 100).toFixed(2), 2)).toFixed(1);
            if (bmi.indexOf(".0")) {
                bmi = bmi.replace(".0", "");
            }
            this.setData({
                bmi
            })
        }
    },
    playAudio(e){ 
        this.innerAudioContext.src = e
        this.innerAudioContext.play();
     },
        // 监听页面数据变化
    initWatch(_page) {
        if (!_page) {
        console.error('未检测到Page对象,请将当前page传入该函数');
        return false;
        }
        if (!_page.watch) { //判断是否有需要监听的字段
        console.error('未检测到Page.watch字段(如果不需要监听，请移除initWatch的调用片段)');
        return false;
        }
        let _dataKey = Object.keys(_page.data);
        Object.keys(_page.watch).map((_key) => { //遍历需要监听的字段
        _page.data['__' + _key] = _page.data[_key]; //存储监听的数据
        if (_dataKey.includes(_key)) { //如果该字段存在于Page.data中，说明合法
            Object.defineProperties(_page.data, {
            [_key]: { //被监听的字段
                enumerable: true,
                configurable: true,
                set: function(value) {
                let oldVal = this['__' + _key];
                if (value !== oldVal) { //如果新设置的值与原值不等，则触发监听函数
                    setTimeout(function() { //为了同步,否则如果回调函数中有获取该字段值数据时将不同步,获取到的是旧值
                    _page.watch[_key].call(_page, oldVal, value); //设置监听函数的上下文对象为当前的Page对象并执行
                    }.bind(this), 0)
                }
                this['__' + _key] = value;
                },
                get: function() {
                return this['__' + _key]
                }
            }
            })
        } else {
            console.error('监听的属性[' + _key + ']在Page.data中未找到，请检查~')
        }
        })
    },
    productDetail:function(e){ 
        var  toUrl = ''
        if(e.target.dataset.name == '儿童枕'){ 
          toUrl = 'packages/goods/detail/index?alias=3f35fexzs18w3&shopAutoEnter=1'
        }
        if(e.target.dataset.name == '婴儿枕'){
          toUrl = 'packages/goods/detail/index?alias=2oue98tre18mb&shopAutoEnter=1'
        }
        if(e.target.dataset.name == 'M7'){
          toUrl = 'packages/goods/detail/index?alias=2fwvd3u81x8pv&shopAutoEnter=1'
        }
        if(e.target.dataset.name == 'M2'){
          toUrl = 'packages/goods/detail/index?alias=3nfpf626t0to3&shopAutoEnter=1'
        }
        if(e.target.dataset.name == 'P1'){
          toUrl = 'packages/goods/detail/index?alias=26zdiqxx5u1fn&shopAutoEnter=1'
        }
        if(e.target.dataset.name == 'Y1'){
          toUrl = 'packages/goods/detail/index?alias=1yhvg39ugwezn&shopAutoEnter=1'
        } 
        if(e.target.dataset.name == 'Y2'){
          toUrl = 'packages/goods/detail/index?alias=3nn3u1lubnhgz&shopAutoEnter=1'
        } 
        if(e.target.dataset.name == 'C1'){
          toUrl = 'packages/goods/detail/index?alias=26ugb9mobk703&shopAutoEnter=1'
        } 
        if(e.target.dataset.name == 'C2'){
          toUrl = 'packages/goods/detail/index?alias=1ybpq83gidx4z&shopAutoEnter=1'
        } 
        wx.navigateToMiniProgram({ 
          appId: 'wxc3136cbda90bd738',  
          path: toUrl,  
          extraData: {  //参数 
            // alias:"3nfpf626t0to3",
            // shopAutoEnter:"1", 
          },
          envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
          success(res) {
            console.log('成功')  
          }
        })
      },
      toMian(){
        wx.navigateTo({
          url: '../../pages/index/index',　　  
        })
    },
    toReport(){
        wx.showToast({
            title: '暂不支持打印',
            icon: 'error',
            duration: 1500
        })
     
    }
})