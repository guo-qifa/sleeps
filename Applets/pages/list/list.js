const app = getApp()
// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: 0,
        lists: [],
        imgUrl: app.globalData.imgUrl
    },
    jumInfo: function (e) {
        console.log(e)
        let obj = JSON.stringify(e.currentTarget.dataset.item);

        wx.navigateTo({
            url: '../report/report?info=' + obj
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        //显示 加载中的提示
        wx.showLoading({
            title: '数据加载中...',
        })
        //获取上次加载的数据
        var oldlists = this.data.lists;
        //获取数据
        wx.request({
            url: `${app.globalData.URL}/wx/memberext/list`,
            method: "post",
            data: {
                data: {
                    filter: {
                        memberId: wx.getStorageSync('memberId')
                    },
                    orders: []
                },
                pageNum: 1,
                pageSize: 1000
            },
            success: function (res) {
                console.log(res.data.result.records) //查看数据结构
                var newlists = oldlists.concat(res.data.result.records) //合并数据 res.data 你的数组数据
                newlists.forEach(v => {
                    v.pillowName = v.pillowName ? v.pillowName.substring(0, 2) : '';
                })
                that.setData({
                    lists: newlists,
                    lastpage: res.data.result.total //你的总页数
                });
                //隐藏 加载中的提示
                wx.hideLoading();
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})