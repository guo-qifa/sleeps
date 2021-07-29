<template>
	<view class="container">
		<view class="top">
			

		</view>
		<view class="line"></view>
		<view class="containerBox">
			<view class="list">
				<view class="listKey">
					会员ID
				</view>
				<view class="listValue">
					{{dataInfo.memberCode}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					昵称
				</view>
				<view class="listValue">
					{{dataInfo.nickname}}
				</view>
			</view>
		<!-- 	<view class="list">
				<view class="listKey">
					姓名
				</view>
				<view class="listValue">
					{{dataInfo.name}}
				</view>
			</view> -->
			<view class="list">
				<view class="listKey">
					手机号
				</view>
				<view class="listValue">
					{{dataInfo.mobile}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					城市
				</view>
				<view class="listValue">
						{{dataInfo.province}}{{dataInfo.city}}
					
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					来源
				</view>
				<view class="listValue">
					{{dataInfo.storeName}}
					
				</view>
			</view>
		<!-- 	<view class="list">
				<view class="listKey">
					openID
				</view>
				<view class="listValue">
					{{dataInfo.openId}}
					
				</view>
			</view> -->
			
		</view>
		

	</view>
</template>

<script>
	export default {
		data(){
			return{
				dataInfo:{}
			}
		},
		methods: {
		
			
		},
		onLoad(v){
			this.dataInfo = JSON.parse(v.list)
			
		}
	}
</script>

<style>
	.top {
		width: 750rpx;
		height: 300rpx;
		background-image: url('~@/static/userBg.png');
		background-size: 100% 100%;
	}

	.line {
		height: 10rpx;
		background-color: #f5f8fa;
	}

	.userBox {
		text-align: center;
		padding-top: 100rpx;
	}

	.userBox image {
		width: 200rpx;
		height: 200rpx;
	}

	.userBox .nameText {
		font-size: 32rpx;
	}

	.containerBox {
		margin-top: 20rpx;
		padding-left: 5rpx;
		padding-right: 5rpx;
	}

	.list {
		padding-left: 50rpx;
		padding-right: 50rpx;
		overflow: hidden;
		height: 70rpx;
		line-height: 80rpx;
		background-color: #ffffff;
		border-bottom: 1rpx solid #eee;
		padding-top: 16rpx;

		font-size: 28rpx;


	}

	.list .listKey {
		float: left;
		color: #1a1a1a;

	}

	.list .listValue {
		float: right;
		color: #008aff;

	}
	.list .change image{
		height: 30rpx;
		width: 30rpx;
		margin-top: 15rpx;
	}
	.nav-btn{
		margin-top: 100rpx;
		width: 600rpx;
		background-image: linear-gradient(180deg, 
				#64bbf3 0%, 
				#4e78e8 100%), 
			linear-gradient(
				#26cdda, 
				#26cdda);
			background-blend-mode: normal, 
				normal;
			border-radius: 38rpx;
	}
</style>
