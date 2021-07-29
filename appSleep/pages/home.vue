<template>
	<view>
		<cmd-page-body type="top">
			<view class="nav-box">	
				<navigator url="./report">
				  <button class="nav-btn" type="primary">会员报告</button>
				</navigator>
				<navigator url="./info">
				  <button class="nav-btn" type="primary">会员信息</button>
				</navigator>
				<navigator url="./personal">
				  <button class="nav-btn" type="primary">个人中心</button>
				</navigator>
			</view>
		</cmd-page-body>
		
	</view>
</template>

<script>
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	export default{
		components: {
			cmdTransition,
		},
		onBackPress(e) {  
			uni.showModal({
				title: '提示',
				content: '是否退出深睡app？',
				success: function(res) {
					if (res.confirm) {
						// 退出当前应用，改方法只在App中生效  
						plus.runtime.quit();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
		});
			
	 
			// return true 表示禁止默认返回
			return true
		}, 
	}
	
</script>

<style>
	.nav-box {
		margin-top: 850upx;
		margin-right: 72upx;
		margin-left: 72upx;

	}
	.nav-btn{
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
			margin-bottom: 40rpx;
	}
</style>
