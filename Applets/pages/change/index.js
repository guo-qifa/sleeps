//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        inputValue: '',
        imgUrl: app.globalData.imgUrl

    },

    onLoad: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
        })
        wx.setNavigationBarTitle({
            title: '个人中心'
        })
    },
    formSubmit: function(e) {
        console.log(e.detail.value)
        console.log(e.detail.value.username)
        console.log(e.detail.value.tel)
        var that = this;
        var username = e.detail.value.username;
        var tel = e.detail.value.tel;
        wx.request({
            method: "POST",
            url: "",
            data: {
                'username': username,
                'tel': tel,
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                wx.showToast({
                    title: '保存成功',
                    duration: 2000
                })
            }
        })}





})
