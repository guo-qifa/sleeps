<template>
	<view class="container" style="margin-bottom: 50rpx;">
		<view class="top">
			<view class="userBox">
				<image src="../static/report.png" mode="" style="width: 280rpx;height: 280rpx;"></image>
				<view style="margin-top: -220rpx;color: #008aff;">
					<view class="" style="font-size: 60rpx;font-weight: bold;margin-bottom: -10rpx;">
						{{dataInfo.hardnessGrade}}级
					</view>
					<view class="" >
						床垫软硬度
					</view>
				</view>
				
			</view>

		</view>
		<view class="line" style="margin-top: 500rpx;"></view>
		<view class="containerBox">
			<view class="list">
				
				<view class="listKey">
					昵称
				</view>
				<view class="listValue">
					{{dataInfo.nickname}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					年龄
				</view>
				<view class="listValue">
					{{dataInfo.ageRange}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					性别
				</view>
				<view class="listValue">
					{{dataInfo.sex}}
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					身高
				</view>
				<view class="listValue">
					{{dataInfo.height}}cm

				</view>
			</view>
			<view class="list">
				<view class="listKey">
					体重
				</view>
				<view class="listValue">
					{{dataInfo.weight}}kg

				</view>
			</view>
			<view class="list">
				<view class="listKey">
					肩宽
				</view>
				<view class="listValue">
					{{dataInfo.shoulderWidth}}cm

				</view>
			</view>
			<view class="list">
				<view class="listKey">
					颈椎弧
				</view>
				<view class="listValue">
                     {{dataInfo.spineArc||'暂无'}}
				</view>
			</view>

			<view class="list">
				<view class="listKey">
					BMI
				</view>
				<view class="listValue">
					{{dataInfo.bmi}}

				</view>
			</view>
			<view class="list">
				<view class="listKey">
					脊椎形态
				</view>
				<view class="listValue">
					{{dataInfo.vertebralMorphology}}
			
				</view>
			</view>
		

		</view>
		<view class="line"></view>
		
		<view class="containerBox">
			<text class="tite_text">您平时的睡眠习惯是:</text>
			<view class="list">
				<view class="listKey">
					睡姿
				</view>
				<view class="listValue">
			  {{dataInfo.sleepPosture}}
			
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					软硬度偏好
				</view>
				<view class="listValue">
					 {{dataInfo.softHardPreference}}
			
				</view>
			</view>
			<view class="list">
				<view class="listKey">
					睡眠痛点
				</view>
				<view class="listValue">
			   	 {{dataInfo.sleepDiscomfort}}
			
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="containerBox">
			<view class="list">
				<view class="listKey">
					体验平台
				</view>
				<view class="listValue">
                     {{dataInfo.storeName}}
			
				</view>
			</view>
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
			}
		},
		onLoad(v){
			this.dataInfo = JSON.parse(v.list)
			
		},
		
	}
</script>

<style>
	.tite_text{
		color: #008aff;
		font-size: 30rpx;
		padding-left: 50rpx;
	}
	.top {
		width: 750rpx;
		height: 400rpx;
		background-image: url('~@/static/infoBg.png');
		background-size: 100% 100%;
		position: fixed;
		top: 0rpx;
	}

	.line {
		height: 10rpx;
		background-color: #f5f8fa;
	}

	.userBox {
		text-align: center;
		padding-top: 180rpx;
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
