
const app = getApp()
var page = 1  //初始化页数
Page({
    data: {
        lists: [],
        lastpage:0,
        imgUrl: app.globalData.imgUrl
    },
    // 生命周期函数--监听页面加载
    onLoad:function(){
        let that = this;
        //数据 初始化调用
        that.loadData(1);
    },
    jumInfo:function (e) {
        console.log(e)
        let obj=JSON.stringify(e.currentTarget.dataset.item);

        wx.navigateTo({
            url: '../info/index?info='+obj
        })
    },

    //数据加载
    loadData:function(page){
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
                        memberId:'9c3589d18d6a4asd4ebce988f4c4e021'
                    },
                    orders: [ ]


                },
                pageNum: page,
                pageSize: 10
            },
            success: function (res) {
                console.log(res.data.result.records) //查看数据结构
                var newlists = oldlists.concat(res.data.result.records) //合并数据 res.data 你的数组数据
                setTimeout(() => {
                    that.setData({
                        lists: newlists,
                        lastpage: res.data.result.total //你的总页数
                    });
                    //隐藏 加载中的提示
                    wx.hideLoading();
                }, 1500)
            },
        })
    },
    //加载更多
    onReachBottom: function () {
        page++
        if(this.data.lastpage > page){
            this.loadData(page);
        }else{
            wx.showModal({
                title: '到底了',
                content: '请休息一会再看呗！',
            })
        }
    },
})