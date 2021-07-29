//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        openid:'',
        hidePhoneBoxFlag:false,
        sessionKey:'',
        showPhoneDiv: false,
        // motto: 'Hello World',
        signature:'',
        hasPhone: true,
        userInfo: {},
        hasUserInfo: false,
        equipmentCode: "",
        guideId: "",
        banner: [app.globalData.imgUrl + "/banner1.png"],
        canIUse: wx.canIUse('button.open-type.getUserInfo'), 
        flag: true,
        imgUrl: app.globalData.imgUrl,
        testImgUrl: app.globalData.testImgUrl
    },
    hidePhoneBox(){
        this.setData({
            showPhoneDiv: false,
            hidePhoneBoxFlag: true 
        }) 
    },
    jumCenter: function () {
        wx.navigateTo({
            url: '../center/index'
        })
    },
    jumpTest: function () {
        wx.navigateTo({
            url: '../test/test'
        })
    },
    jumInfo: function () {
        wx.navigateTo({
            url: '../list/list'
        })
        // wx.showLoading({
        //     title: '数据加载中...',
        // })
        // wx.request({
        //     url: `${app.globalData.URL}/wx/memberext/report/info`,
        //     method: "get",
        //     data: {
        //         memberId: wx.getStorageSync('memberId')
        //     },
        //     success: function (res) {
        //         wx.hideLoading();
        //         let obj = JSON.stringify(res.data.result);
        //         if (!Object.getOwnPropertyNames(res.data.result).length) {
        //             wx.showToast({
        //                 title: '暂无报告',
        //                 icon: 'none',
        //                 duration: 2000
        //             })
        //         } else {
        //             wx.navigateTo({
        //                 url: '../report/report?info=' + obj
        //             })
        //         }
        //     }
        // })
    },
    getBanner: function () {
        var _this = this;
        wx.request({
            url: `${app.globalData.URL}/wx/e_banner/list/info`,
            method: "get",
            success: function (res) {
                try {
                    // _this.setData({
                    //     banner: res.data.result ? res.data.result : []
                    // })
                } catch (e) {

                }
            }
        })
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    scanCallback(url) {
        var that = this;
        // console.log(res) //输出回调信息
        var isIos = url.indexOf("%26") >= 0;
        if (isIos) {
            var path = url.split("=").pop();
            var tmp = path.split("%26");
        } else {
            var path = url.split("?").pop();
            var tmp = path.split("&");
        }
        that.setData({
            equipmentCode: tmp[0].split(isIos ? "%3D" : "=").pop(),
            guideId: tmp[1].split(isIos ? "%3D" : "=").pop()
        })
        if (!wx.getStorageSync('memberId')) {
            return;
        }
        wx.showLoading({
            title: '数据加载中...',
        })
        wx.request({
            url: `${app.globalData.URL}/wx/user/scan`,
            method: "get",
            data: {
                equipmentCode: that.data.equipmentCode,
                guideId: that.data.guideId,
                memberId: wx.getStorageSync('memberId')
            },
            success: function (res) {
                if (res.data.code != 200) {
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.message,
                        icon: "none",
                        duration: 2000
                    })
                    that.setData({
                        flag: true,
                    })
                    return false
                } else {
                    wx.hideLoading();
                    that.setData({
                        flag: false,
                    })
                }
            }
        })
        // wx.showToast({
        //     title: '成功',
        //     duration: 1000
        // })
    },
    scan: function () {  
        wx.navigateTo({
            url: './../offLine/test'
        })
        // wx.scanCode({ //扫描API
        //     success: (res) => { //扫描成功
        //         // this.scanCallback(res.path);
        //         wx.navigateTo({
        //             url: './../offLine/test'
        //         })
        //     }
        // }) 
        // wx.navigateTo({
        //     url: '../offLine/test'
        // }) 
        // //调用扫码功能
        // wx.scanCode({
        //     success: (res) => {
        //         wx.navigateTo({
        //             url: res.result
        //         }) 
        //         // wx.showToast({
        //         //     title: res.result,
        //         //     icon: "none",
        //         //     duration: 2000
        //         // })
        //     },
        //     fail: (res) => {
        //     wx.showToast({
        //         title: '扫码失败',
        //         icon: 'success',
        //         duration: 2000
        //     })
        //     },
        // }) 
    },

    onLoad: function (options) { 
        //this.getUserInfo()  
        if (options.scene) {
            this.scanCallback(options.scene)
        }
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
          
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
            if(this.data.hidePhoneBoxFlag){
                this.setData({ 
                    showPhoneDiv: true
                })
            } 
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => { 
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.getBanner();
    }, 
    onShow() {
        if(app.globalData.playAudio){
            app.globalData.playAudio.stop()
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
    },  
    othLogin: function (v) {
        var that = this;
        wx.showLoading({
            title: '数据加载中...',
        })
        var _this = this;
        wx.request({
            url: `${app.globalData.URL}/wx/user/scan_login`,
            method: "get",
            data: {
                equipmentCode: _this.data.equipmentCode,
                memberId: wx.getStorageSync('memberId'),
                operate: 1
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        flag: true,
                        equipmentCode: ""
                    })
                    wx.hideLoading();

                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: "none",
                        duration: 2000
                    })
                }

            }
        })
    },

    othLoginCancel: function (v) {
        var that = this;
        wx.showLoading({
            title: '数据加载中...',
        })
        var _this = this;
        wx.request({
            url: `${app.globalData.URL}/wx/user/scan_login`,
            method: "get",
            data: {
                equipmentCode: that.data.equipmentCode,
                memberId: wx.getStorageSync('memberId'),
                operate: 2
            },
            success: function (res) {
                if (res.data.code == 200) {
                    that.setData({
                        flag: true,
                        equipmentCode: ""
                    })
                    wx.hideLoading();

                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: "none",
                        duration: 2000
                    })
                }
            }
        })
    },
 // 微信授权获取手机号弹窗
 getPhoneNumber: function (e) { 
   var that = this;
   if (e.detail.errMsg == "getPhoneNumber:ok") {   
    const accountInfo = wx.getAccountInfoSync(); 
    // console.log(accountInfo.miniProgram.appId, '小程序 appId') // 小程序 appId
    var appID = accountInfo.miniProgram.appId
    wx.request({
        url: `${app.globalData.URL}/wx/user/phone`,
        method: "get",
        header: {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv, 
            sessionKey:  that.data.sessionKey,  
            // openId: that.data.openid,
            // signature: that.data.signature,
        },
        data: {
            appid: appID,
            memberId: wx.getStorageSync('memberId'),
        },
        success: function (res) {
            console.log("info接口", res)
            if (res.data.code != 200) {
                wx.hideLoading(); 
                setTimeout(() => {
                    wx.showToast({
                        title: res.data.message,
                        icon: "none",
                        duration: 2000
                    })
                }, 500)
                return;
            }
            that.setData({ 
                showPhoneDiv: false
            })
           
          
        },
        fail: function (err) {
            err
        }
    })
    
   }
},
    getUserInfo: function (e) {
        // this.scan();
        // return
        let that = this;
        // 获取用户信息
        // 登录
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    console.log("已授权=====")
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    var m = wx.getStorageSync('memberId');
                    if (!app.globalData.userInfo || !wx.getStorageSync('memberId')) {
                        wx.showLoading({
                            title: '数据加载中...',
                        })
                        wx.login({
                            success: res => {
                                app.globalData.code = res.code
                                let url = app.globalData.URL + '/wx/user/login';
                                let data = {
                                    code: app.globalData.code
                                };
                                app.wxRequest('GET', url, data, (res) => {
                                    if(res.code == 200){
                                        that.setData({
                                            sessionKey: res.result.sessionKey,
                                            openid: res.result.openid,
                                            unionid: res.result.unionid,
                                        })
                                    }
                                    wx.getUserInfo({
                                        success(resg) {
                                            console.log("获取用户信息成功", res) 
                                            app.globalData.userInfo = resg.userInfo 
                                            that.setData({
                                                userInfo: resg.userInfo,
                                                hasUserInfo: true,
                                                signature:resg.signature,
                                            })

                                            if (res.code != 200) {
                                                wx.hideLoading(); 
                                                setTimeout(() => {
                                                    wx.showToast({
                                                        title: res.message,
                                                        icon: "none",
                                                        duration: 2000
                                                    })
                                                }, 500)
                                                return;
                                            }
                                          
                                            that.setData({
                                                showPhoneDiv: true,  
                                            })  
                                            wx.request({
                                                url: `${app.globalData.URL}/wx/user/info`,
                                                method: "get",
                                                header: {
                                                    encryptedData: resg.encryptedData,
                                                    iv: resg.iv,
                                                    rawData: "",
                                                    signature: resg.signature,
                                                    sessionKey: res.result.sessionKey
                                                },
                                                data: {
                                                    equipmentCode: that.data.equipmentCode,
                                                    guideId: that.data.guideId
                                                },
                                                success: function (res) {
                                                    console.log("info接口", res)
                                                    if (res.data.code != 200) {
                                                        wx.hideLoading();

                                                        setTimeout(() => {
                                                            wx.showToast({
                                                                title: res.data.message,
                                                                icon: "none",
                                                                duration: 2000
                                                            })
                                                        }, 500)
                                                        return;
                                                    }
                                                    wx.setStorageSync('memberId', res.data.result.memberId);
                                                    if(e){
                                                        that[e.currentTarget.dataset.call](res.data.result);
                                                    }
                                                    wx.hideLoading();
                                                },
                                                fail: function (err) {
                                                    err
                                                }
                                            })
                                        },
                                        fail(res) {
                                            console.log("获取用户信息失败", res)
                                        }
                                    })
                                }, (err) => {
                                    console.log(err.errMsg)
                                })
                            }
                        })

                    } else {
                        that[e.currentTarget.dataset.call]();
                    }
                } else {
                    console.log("未授权=====")
                }
            }
        })
    },

})