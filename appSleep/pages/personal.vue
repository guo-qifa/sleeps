<template>
	<view class="container">
		<view class="top">
			<view class="userBox">
				<image src="../static/tx.png" mode=""></image>
				<view class="nameText">
					{{dataInfo.realName}}
				</view>
			</view>

		</view>
		<view class="line"></view>
		<view class="containerBox">
			<view class="list">
				<view class="listKey">
					手机号
				</view>
				<view class="listValue">
					{{dataInfo.mobile || '暂无'}}

				</view>
			</view>
			<view class="list">
				<view class="listKey">
					所属门店
				</view>
				<view class="listValue">
					{{dataInfo.storeName || '暂无'}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					门店设备号
				</view>
				<view class="listValue">
					{{dataInfo.equipmentCode || '暂无'}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					门店地址
				</view>
				<view class="listValue">
					{{dataInfo.storeAdress ||'暂无'}}

				</view>
			</view>
			<view class="list" @tap="change">
				<view class="listKey">
					修改密码
				</view>
				<view class="listValue change">
					<image src="../static/rightIcon.png"></image>

				</view>
			</view>
		</view>
		<view>
			<button class="nav-btn" type="primary" @tap="out">退出登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo: {}
			}
		},
		methods: {
			change: function() {
				uni.navigateTo({
					url: 'changPas',

				});
			},
			out: function() {
				uni.showModal({
					title: '提示',
					content: '确认退出当前用户?',
					success(res) {
						if (res.confirm) {
							plus.runtime.quit();
							

						}
					}


				});
			},
			
		},
		onLoad() {
			let _this = this
			uni.getStorage({
				key: 'businessinfo',
				success:function(res){
					_this.dataInfo = JSON.parse(res.data)
				}
			})
			
		}
	}
</script>

<style>
	.top {
		width: 750rpx;
		height: 560rpx;
		background-image: url('~@/static/userBg.png');
		background-size: 100% 100%;
	}

	.line {
		height: 10rpx;
		background-color: #f5f8fa;
	}

	.userBox {
		text-align: center;
		padding-top: 200rpx;
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

	.list .change image {
		height: 30rpx;
		width: 30rpx;
		margin-top: 15rpx;
	}

	.nav-btn {
		margin-top: 100rpx;
		width: 600rpx;
		background-image: linear-gradient(180deg,
			#64bbf3 0%,
			#4e78e8 100%),
			linear-gradient(#26cdda,
			#26cdda);
		background-blend-mode: normal,
			normal;
		border-radius: 38rpx;
	}
</style>
