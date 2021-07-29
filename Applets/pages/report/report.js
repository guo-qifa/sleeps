const app = getApp()
// pages/report/report.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        current: 0,
        imgUrl: app.globalData.imgUrl,
        testImgUrl: app.globalData.testImgUrl,
        background: [
          { 
            children:[
              {
                type:'床垫推荐1', 
                goodBg:'10-chuangdian',
                name:'M2',
                des:'级软硬度专属智能床垫'
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
                name:'M7',
                des:'级软硬度专属智能床垫'
              },
              {
                type:'枕头推荐2', 
                goodBg:'10-zhentou',
                name:'Y2',
                des:'专属睡眠枕'
              }
            ]
          }
        ],
        // background: ['demo-text-1', 'demo-text-2'],
        indicatorDots: false,
        vertical: false,
        autoplay: false,
        circular: true,
        // interval: 2000,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0,
        hardnessGradeImage: [
          '',
          '1_1607347387521',
          '2_1607347395754',
          '3_1607347403348',
          '4_1607347410010',
          '5_1607347417415',
          '6_1607347424418',
          '7_1607347431133',
          '8_1607347437914',
          '9_1607347444377'
        ]
    },
    jumpShop(e) {   
        wx.navigateTo({
            url: '../outUrl/outUrl' 
        })
    },
    toMian(){
        wx.navigateTo({
          url: '../../pages/index/index'　　// 页面 A
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {  
        if (options.info) {
            var info = JSON.parse(options.info);
            info.pillowName = info.pillowName.substring(0, 2);
      
            this.setData({
                info: info
            });
        } else {
            wx.showLoading({
                title: '数据加载中...',
            })
            wx.request({
                url: `${app.globalData.URL}/wx/memberext/report/information?memberExtId=${options.id}`,
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
                                name:'M2',
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
                                name:'M7',
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
        }
    },

    //上一页
  prev:function(){ 
    let count = this.data.current
    count = count>0?count-1:this.data.background.length-1
    this.setData({
      current:count
    })
  },
  //下一页
  next:function(){
    let count = this.data.current
    count = count == this.data.background.length-1? 0 : count+1
    this.setData({
      current:count
    }) 
  },
  //当前页current改变时触发的change事件
  demo:function(e){
    console.log(e.detail.source)
    if(e.detail.source=='autoplay'){
      this.setData({
        autoplay:false
      })
    }
     this.setData({
      current: e.detail.current//记录下当前的滑块位置
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
  previewImage(e){
		var cur=e.target.dataset.src;//获取本地一张图片链接
		wx.previewImage({
			current: cur, //字符串，默认显示urls的第一张
  			urls: [cur] // 数组，需要预览的图片链接列表
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