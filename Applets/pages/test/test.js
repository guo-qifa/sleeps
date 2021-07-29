const app = getApp()
// pages/test.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        wich:'',
        showPhoto: true,
        confirm:false,
        device: false,
        currentSwiper: 0,
        currentPage:1,
        currentPage8Index: {},
        currentPage7Index: -1,
        currentPage6Index: -1,
        bedTypeIndex: 1,
        sexList: ['男', '女'],
        // 年龄
        ageList: [],
        age: 26,
        defaultAge: '',
        //体重
        defaultTz: '',
        tzList: [],
        tz: '',
        //身高
        defaultSg: '',
        sgList: [],
        sg: '',
        sex: 1,
        bmi: "22.9",
        file: ['',''],
        isFace: true,
        isSide: false,
        input: {
            yqgd: "",
            sg: "160",
            tz: "52"
        },
        photoSrc:'',
        camreaVisible: false,
        imgUrl: app.globalData.imgUrl,
        testImgUrl: app.globalData.testImgUrl,
        page7TextImageUrl: app.globalData.imgUrl + '/8-text.png',
        touchS : [0,0],
        touchE : [0,0],
        page8Height: null
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
                  key: 'key' + _this.data.wich,
                  data: this.data.photoSrc,
                  success: function (res) {
                    console.log('异步保存成功')
                  }
                })
                  //获取缓存
                //   wx.getStorage({
                //     key: 'key1',
                //     success: function (res) {
                //       console.log(res.data)
                //     }
                //   })
      
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
            title: '加载中...',
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
            isSide:  true,
            isFace:  false,
            wich:1,
            camreaVisible: true,
            showPhoto:true,
        }) 
    },
    confirm1() {
        let tempFile = ['', ''];
        tempFile[0] = wx.getStorageSync('key1');
        tempFile[1] = this.data.file[1];
        this.setData({
            wich: '3',
            showPhoto: true,
            isSide:  false,
            isFace:  true,
            file: tempFile
        })
    },
    confirm2() {
        let tempFile = ['', ''];
        tempFile[0] = this.data.file[0];
        tempFile[1] = wx.getStorageSync('key3');
        this.setData({
            camreaVisible: false,
            currentPage: 4,
            file: tempFile
        })
    },
    reset1() {
        this.setData({
            showPhoto: true,
            isSide:  true,
            isFace:  false,
        })
    },
    reset2() {
        this.setData({
            showPhoto: true,
            isSide:  false,
            isFace:  true,
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
            if (this.data["bedTypeIndex"] < 0) {
                wx.showToast({
                    title: '选择床垫的软硬度',
                    icon: 'error',
                    duration: 1500
                })
                return false;
            } 
        }
        // if (idx == 8) {
        //     for (const tmp in this.data.currentPage8Index) {
        //         if (this.data.currentPage8Index[tmp]) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }
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
        // if (idx == 9) {
        //     if (!this.data.input.yqgd || isNaN(this.data.input.yqgd)) {
        //         wx.showToast({
        //             title: '请填写一拳高度',
        //             icon: 'error',
        //             duration: 1500
        //         })
        //         return false;
        //     }
        // }
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
                    // wx.showToast({
                    //     title: '上传成功',
                    //     icon: 'success',
                    //     duration: 1000
                    // })
                    this.setData({
                        file: result.result
                    }, () => { 
                        //  this.jumpNext(); 
                    });
                } else {
                    // setTimeout(() => {
                    //     wx.showToast({
                    //         title: '上传失败',
                    //         icon: 'error',
                    //         duration: 2000
                    //     })
                    // }, 500);
                }
            },
            fail: (res) => {
                // setTimeout(() => {
                //     wx.showToast({
                //         title: '上传失败',
                //         icon: 'error',
                //         duration: 2000
                //     })
                // }, 500);
            },
            complete: () => {
                wx.hideLoading();
            }
        })
    },
    chooseImage(e) {
        let _this = this;
        const type =1;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: type == 1 ? ['album'] : ['camera'],
            success: (result) => { 
                console.log(result)
                // this.uploadFile(result.tempFilePaths[0]);
                let tempFile = ['', ''];
                if(e.currentTarget.dataset.index == '1') {
                    tempFile[0] = result.tempFilePaths[0];
                    tempFile[1] = this.data.file[1];
                    wx.showToast({
                        title: '正面照片已选择',
                        icon: 'success',
                        duration: 1000
                    })
                } else {
                    tempFile[0] = this.data.file[0];
                    tempFile[1] = result.tempFilePaths[0];
                    wx.showToast({
                        title: '侧面照片已选择',
                        icon: 'success',
                        duration: 1000
                    })
                }
                _this.setData({
                    file: tempFile
                })
                if(tempFile[0] && tempFile[1]) {
                    setTimeout(() => {
                        _this.setData({
                            currentPage: 4,
                            camreaVisible: false,
                        })
                    }, 1500);
                }
            },
            fail: (res) => { },
            complete: (res) => { },
        })
    },
    bindAgeChange(e) {
        this.setData({
            age: this.data.ageList[e.detail.value[0]],
            defaultAge: e.detail.value
        })
    },
    clickAge(e) {
        if(e.currentTarget.dataset.type == 'up') {
            //点击年龄 + 
            this.setData({
                age: parseInt(this.data.age) + 1
            })
        } else {
            //点击年龄 -
            if(this.data.age > 0) {
                this.setData({
                    age: parseInt(this.data.age) - 1
                })
            }
        }
    },
    bindSexChange(e) {
        this.setData({
            sex: e.currentTarget.dataset.value,
            age: e.currentTarget.dataset.value == '0' ? 35 : 26,
            defaultAge: e.currentTarget.dataset.value == '0' ? [34] : [25],
            defaultSg: e.currentTarget.dataset.value == '0' ? [174] : [159],
            defaultTz: e.currentTarget.dataset.value == '0' ? [69] : [51],
            input: {
                sg: e.currentTarget.dataset.value == '0' ? 175 : 160,
                tz: e.currentTarget.dataset.value == '0' ? 70 : 52,
                yqgd: this.data.input.yqgd
            }
        })
        this.initBMI();
        console.log(this.data.bmi)
    },
    setPage6Current(e) {
        this.setData({
            currentPage6Index: e.currentTarget.dataset.index
        })
    },
    setBedType(e) {
        this.setData({
            // bedTypeIndex: e.currentTarget.dataset.index
            bedTypeIndex: e.detail.value
        })
    },
    
    touchStart: function(e){
        // console.log(e.touches[0].pageX)
        let sx = e.touches[0].pageX
        let sy = e.touches[0].pageY
        this.data.touchS = [sx,sy]
      },
      touchMove: function(e){
        let sx = e.touches[0].pageX;
        let sy = e.touches[0].pageY;
        this.data.touchE = [sx, sy]
      },
      touchEnd: function(e){
        let start = this.data.touchS
        let end = this.data.touchE
        console.log(start)
        console.log(end)
        if(start[0] < end[0] - 10){
          console.log('右滑')
        }else if(start[0] > end[0] + 10){
          console.log('左滑')
        }else{
          console.log('静止')
        }
      },
    setPage7Current(e) {
        this.setData({
            currentPage7Index: e.currentTarget.dataset.index,
            page7TextImageUrl: `${this.data.testImgUrl}/8-text${e.currentTarget.dataset.index}.png`
        })
    },
    setPage8Current(e) {
        var rs = this.data.currentPage8Index;
        rs[e.currentTarget.dataset.index] = rs[e.currentTarget.dataset.index] ? false : true;
        if(e.currentTarget.dataset.index == 7) {
            Object.keys(rs).forEach(v => {
                if(v != 7) {
                    rs[v] = false
                }
            });
        } else {
            rs[7] = false;
        }
        this.setData({
            currentPage8Index: rs
        })

        this.setListHeight()
    },
    bindKeyInput(e) {
        var rs = this.data.input;
        rs[e.currentTarget.dataset.key] = e.detail.value
        this.setData({
            input: rs
        });
        this.initBMI();
    },
    bindSgTzChange(e) {
        // age: this.data.ageList[e.detail.value[0]],
        //     defaultAge: e.detail.value
        var rs = this.data.input;
        var defaultSg = this.data.defaultSg;
        var defaultTz = this.data.defaultTz;
        // rs[e.currentTarget.dataset.key] = this.data.ageList[e.detail.value[0]]
        if(e.currentTarget.dataset.key == 'sg') {
            rs['sg'] = this.data.sgList[e.detail.value[0]];
            defaultSg = e.detail.value
        } else {
            rs['tz'] = this.data.tzList[e.detail.value[0]];
            defaultTz = e.detail.value
        }
        this.setData({
            input: rs,
            defaultSg,
            defaultTz
        });
        this.initBMI();
    },
    initBMI() {
        var data = this.data.input;
        if (data.sg && !isNaN(data.sg) && data.tz && !isNaN(data.tz)) {
            var bmi = (data.tz / Math.pow((data.sg / 100).toFixed(2), 2)).toFixed(1);
            if (bmi.indexOf(".0")) {
                bmi = bmi.replace(".0", "");
            }
            this.setData({
                bmi
            })
        }
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
                repPicture: this.data.file.toString(),
                sex: parseFloat(this.data.sex) + 1,
                shape: this.data.currentPage7Index,
                sleepPosture: this.data.currentPage6Index,
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
    setListHeight: function() {
		let _this = this;
        let query = wx.createSelectorQuery();
        query.select('.page8').boundingClientRect(rect=>{
            let height = rect.height;
            console.log(height);
            _this.setData({
                page8Height: height,
            });
        }).exec();
	},
    setListHeightFirst: function() {
		let _this = this;
        wx.getSystemInfo({
			success: function(res) {
				_this.setData({
					page8Height: res.windowHeight - 25,
				});
			}
        });
	},
    onLoad() {
        var list1 = [];
        var list2 = [];
        var list3 = [];
        for (let i = 1; i < 80; i++) {
            list1.push(i);
        }
        for (let i = 1; i < 250; i++) {
            list2.push(i);
        }
        for (let i = 1; i < 150; i++) {
            list3.push(i);
        }
        this.setData({
            ageList: list1,
            sgList: list2,
            tzList: list3
        });
        this.setData({
            defaultAge: [25],
            defaultSg: [159],
            defaultTz: [51],
        })

        this.setListHeightFirst();
    }
})