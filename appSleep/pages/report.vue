<template>
    <view class="container">
        <view class="" style="position: fixed;z-index: 1;">
            <view class="top">
                <view class="userBox">
                    <view class="login-username">
                        <view class="uni-list">
                            <input v-model="nickname" class="uni-input" name="username" placeholder='请输入昵称' />
                        </view>
                        <button class="searchBtn" type="default" @tap='search'>搜索</button>
						<button class="searchBtn" type="default" @tap='Reset'>重置</button>
                    </view>
                </view>
            </view>
            <view style="background-color: #FFFFFF;">
                <swiper class="ct_tab">
                    <!-- :class="{ 'ct_active': index == tabCur }" -->
                    <swiper-item v-for="(item, index) in tabList" :key="index" class="ct_item" @click="clickCtTab(index)">
                        <picker @change="bindPickerChange(item.key, $event, item)" range-key='key' :value="index" :range="item.select">
                            <text v-text="queryText[item.key] || item.title"></text>
                            <image class="downIcon" src="../static/downIcon.png" mode=""></image>
                        </picker>
                    </swiper-item>
                    <swiper-item class="ct_item" @click="clickCtTab(index)">
                        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindPickerChange('createTime', $event)">
                            <text v-text="queryText.createTime || '创建时间'"></text>
                            <image class="downIcon" src="../static/downIcon.png" mode=""></image>
                        </picker>
                    </swiper-item>
                    <swiper-item class="ct_item" @click="clickCtTab(index)">
                        <picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindPickerChange('printerTime', $event)">
                            <text v-text="queryText.printerTime || '打印时间'"></text>
                            <image class="downIcon" src="../static/downIcon.png" mode=""></image>
                        </picker>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <view class="content" style="padding-top: 400rpx;">
            <view class="line"></view>
            <view class="list" v-for="item in ListData">
                <view class="list_left">
                    <text class="title">{{item.nickname}}</text>
                    <view class="listText">
                       <!-- <text class="textPr">{{item.name}}</text>
                        <text class="textPr">|</text> -->
                        <text class="textPr">{{item.sex}}</text>
                        <text class="textPr">|</text>
                        <text class="textPr">{{item.province}}{{item.city}}</text>
                    </view>
                    <view class="">
                        <view class="tip">
                            <text>{{item.shape}}</text>
                        </view>
                        <view class="tip">

                            <text>{{item.vertebralMorphology}}</text>
                        </view>
                        <view class="tip">
                            <text>{{item.hardnessGrade}}</text>级

                        </view>
                    </view>
                </view>
                <view class="list_right">
                    <button class="infoBtn" type="default" @tap='lookBtn(item)'>查看报告</button>
                    <text>创建时间:</text>
                    <text>{{item.createTime}}</text>
                </view>
            </view>
        </view>
        <view v-show="isLoadMore">
            <uni-load-more :status="loadStatus"></uni-load-more>
        </view>
        <Loading :visible="visible"></Loading>
    </view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import datePicker from "./datePicker.vue"
	import Loading from './Loding.vue';
	
	
	export default {
		components: {
			uniLoadMore,
			datePicker,
			Loading
		},

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				visible:true,
				tabList:[],
				date: currentDate,
				date1: currentDate,
				query: {},
				queryText: {},
				nickname:'',
				loadStatus: 'loading',
				isLoadMore: false,
				dictionaries: [],
				storeId: '',
				pageNum: 1,
				ListData: [],
				index: 0,
				Skey:[]
				// tabCur:0,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			Reset(){
				   this.getList(undefined,true)
					let d = this.queryText
					let o
					console.log(d)
					this.Skey= ['性别','体型','硬度等级','脊椎形态','软硬度偏好','睡眠不适位置','创建时间','打印时间']
					for(let i in d){
						if(i == 'sex'){
						  this.$set(d, i,'性别');
							
						}else if(i == 'shape'){
							this.$set(d, i,'体型');
							
						}else if(i == 'vertebral_morphology'){
							this.$set(d, i,'软硬度等级');
							
						}else if(i == 'sleep_discomfort'){
							this.$set(d, i,'睡眠不适位置');
							
						}else if(i == 'soft_hard_preference'){
							this.$set(d, i,'软硬度偏好');
							
						}else if(i == 'createTime'){
							this.$set(d, i,'创建时间');
							
						}else if(i == 'printerTime'){
							this.$set(d, i,'打印时间');
							
						}
					
					}
			// 		this.$set(this.queryText, 'shape','性别');
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			search(){
				if(this.visible){
					return false
				}
				this.pageNum = 1
				this.getList()
				this.ListData = []
				this.visible = true
				
			},
			getRowText(o, n) {
				let d = this.dictionaries

				for (let i = 0; i < d.length; i++) {
					if (n == d[i].dict.dictCode) {
						for (let j = 0; j < d[i].dictItems.length; j++) {
							if (o == d[i].dictItems[j].itemCode) {
								return d[i].dictItems[j].itemValue

							}
						}
					}
				}
			},
			clickCtTab(ctCur) {
				this.tabCur = ctCur
			},
			lookBtn: function(v) {
				let list = JSON.stringify(v)
				uni.navigateTo({
					url: 'reportDetails?list=' + list,

				});
			},
			bindPickerChange: function(key, e, select) {
				if(this.visible){
					return false
				}
				let _this  = this
				 let v = e.target.value+1
                this.visible = true
                let k = key;
				
				// let v = e.target.value+1
				switch(key) {
				     case 'sex':
				        k = 'sex'
				        break;
				     case 'shape':
				         k = 'shape'
				        break;
					case 'vertebral_morphology':
					    k = 'vertebralMorphology'
					   break;
					case 'sleep_discomfort':
					    k = 'sleepDiscomfort'
					   break;
					case 'soft_hard_preference':
					    k = 'softHardPreference'
					   break;	
					case 'ctime':
					    v = e.target.value
					   break;
					case 'ptime':
					    v = e.target.value
					   break;				
				     default:
				} 
				// this.index = v
				
			
				if(key == 'createTime' || key == 'printerTime'){
					this.$set(this.queryText, key, e.target.value);
					v =  e.target.value
				}else{
					this.$set(this.queryText, key, select.select[v-1].key);
					
				}
				this.$set(this.query, k, v);
				this.pageNum = 1
				this.ListData = []
				this.getList()
			},
			getList(clean,reset) {
				let _this = this
				uni.getStorage({
					key: 'businessinfo',
					success: function(res) {
						_this.storeId = JSON.parse(res.data).storeId
						// 获取列表详情
						let postData 
						if(reset){
							_this.nickname = ''
							postData = {
								data: {
									filter: {
										storeId: _this.storeId,
										nickname:_this.nickname,
									},
									orders: []
								},
								"pageNum": _this.pageNum,
								"pageSize": 10
							}
						}else{
							postData = {
								data: {
									filter: {
										storeId: _this.storeId,
										nickname:_this.nickname,
									},
									orders: []
								},
								"pageNum": _this.pageNum,
								"pageSize": 10
							}
							for(var tmp in _this.query){
							    postData.data.filter[tmp] = _this.query[tmp];
							}
						}
						
                        
						_this.$myRequest({
							url: `/m_member/report/list`,
							method: 'post',
							data: postData,
						}).then(res => {

							
							if (res.data.code == 200) {
								if (res.data.result.records) {
									
									_this.ListData = clean ? res.data.result.records : _this.ListData.concat(res.data.result.records);
									if (res.data.result.records.length < 10) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
										_this.isLoadMore = true
										_this.loadStatus = 'nomore'
									} else {
										_this.isLoadMore = false
									}
								} else {
									_this.isLoadMore = true
									_this.loadStatus = 'nomore'
								}
								

							}
							_this.visible = false	
								uni.stopPullDownRefresh();
						})
					}
				})

			},
			getDictionaries() {
				this.$myRequest({
					url: `sysDict/query`,
					method: 'get',

				}).then(res => {
					this.dictionaries = res.data.result
					this.selectfuc()
				})
			},
			selectfuc(){
				// 字典表的值  this.dictionaries
				let  selList = []
				let dic = this.dictionaries
				this.Skey= ['性别','体型','硬度等级','脊椎形态','软硬度偏好','睡眠不适位置','创建时间','打印时间']
				this.tabList = dic.reduce((t, v)=>{
					this.Skey.indexOf(v.dict.dictName) >= 0 && t.push({
						title: v.dict.dictName,
						key: v.dict.dictCode,
						select: v.dictItems.map(v=>{
							return {
								key: v.itemValue,
								value: v.itemCode
							}
						})
					})
					
					return t;
				}, [])
				
			},
		},
		onPullDownRefresh() {
			this.getList(true);
		},
		created() {
			this.getList()
			this.getDictionaries()
			
			
		},
		onReachBottom() {
			if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
				this.isLoadMore = true
				this.pageNum++
				this.getList()
			}


		},


	}
</script>

<style>
.downIcon {
    width: 20rpx;
    height: 20rpx;
    padding-left: 8px;
}
.ct_tab {
    width: 698upx;
    margin: 0 auto;
    padding: 10upx 0;
    font-size: 26upx;
    font-weight: bold;
    color: #333333;
    white-space: nowrap;
    display: flex;
    overflow: hidden;
    height: 80rpx;
    background-color: #ffffff;
}

.ct_item {
    width: 200upx !important;
    padding: 30upx 0;
    display: inline-block;
    margin-left: -160rpx;
}
.ct_item:nth-child(1) {
    width: 120rpx !important;
    margin-left: 0rpx;
}
.ct_item:nth-child(2) {
    width: 120rpx !important;
    margin-left: 0rpx;
}

.ct_item text {
    padding: 30upx 0;
}

.ct_active {
    color: #007aff;
}

.ct_active text {
    border-bottom: 2px solid #007aff;
}

.tip {
    display: inline-block;
    margin-right: 20rpx;
    text-align: center;
    width: 135rpx;
    height: 40rpx;
    background-image: linear-gradient(#f2f2f2, #f2f2f2), linear-gradient(#59658b, #59658b);
    background-blend-mode: normal, normal;
    border-radius: 4rpx;
    color: #666666;
    font-size: 20rpx;
}

swiper {
    width: 100%;
}

.textPr {
    padding-right: 20rpx;
}

.list {
    overflow: hidden;
    border-bottom: 1rpx solid #e5e5e5;
    padding: 20rpx 6rpx 20rpx 30rpx;
}

.list .listText {
    padding-left: 10rpx;
    color: #333333;
    font-size: 25rpx;
    margin-bottom: 10rpx;
}

.list .list_left {
    float: left;
}

.list .list_left .title {
    color: #008aff;
    font-size: 30rpx;
}

.list .list_right {
    float: right;
    text-align: center;
    padding-top: 40rpx;
}

.list .list_right .infoBtn {
    width: 170rpx;
    height: 59rpx;
    background-image: linear-gradient(180deg, #64bbf3 0%, #4e78e8 100%), linear-gradient(#26cdda, #26cdda);
    background-blend-mode: normal, normal;
    border-radius: 28rpx;
    color: #ffffff;
    font-size: 23rpx;
    margin-bottom: 5rpx;
}

.list .list_right text {
    color: #b8b8b8;
    font-size: 20rpx;
}

.top {
    width: 750rpx;
    height: 100rpx;
    background-image: url('~@/static/infoBg.png');
    background-size: 100% 100%;
    padding-top: -105rpx;
    padding-bottom: 260rpx;
    margin-bottom: -30px;
}

.line {
    height: 10rpx;
    background-color: #f5f8fa;
}

.userBox {
    text-align: center;
    padding-top: 200rpx;
}

.login-username {
    padding-left: 30rpx;
}

.login-username input {
    text-align: left;
    padding-left: 10rpx;
    height: 50rpx;
    background-color: #ffffff;
    box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
}

.uni-list {
    width: 60%;
    background-color: #ffffff;
    border-radius: 10rpx;
    overflow: hidden;
    margin-top: 20rpx;
    box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    float: left;
}

.uni-list-cell {
    color: #666666;
}

.searchBtn {
    float: left;
    margin-top: 25rpx;
    margin-left: 20rpx;
    height: 70rpx;
    background-image: linear-gradient(180deg, #64bbf3 0%, #599aee 50%, #4e78e8 100%), linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(0, 0, 0, 0.06);
    border-radius: 10rpx;
    font-size: 28rpx;
    color: #ffffff !important;
    letter-spacing: 5rpx;
}

.uni-list-cell-left {
    border-right: solid 2rpx #dcdcdc;
}
uni-swiper-item {
    width: 100px !important;
}
uni-picker{
	text-align: center;
}
</style>
