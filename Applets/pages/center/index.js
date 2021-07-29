//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        imgUrl: app.globalData.imgUrl
    },

    jumForm: function () {
        wx.navigateTo({
            url: '../change/index'
        })
    },
    jumTable: function () {
        console.log('111')
        wx.navigateTo({
            url: '../list/list'
        })
    },
    onLoad: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
        })
        wx.setNavigationBarTitle({
            title: '个人中心'
        })
    },



})
