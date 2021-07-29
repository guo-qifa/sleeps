<template>
	<view class="container">
		<view class="top">
			<view class="userBox">
				
			</view>

		</view>
		<view class="line"></view>
		<view class="containerBox">
			<view class="list">
				<view class="input-row">
					<m-input type="password" v-model="oldPassword" displayable  placeholder="旧密码"></m-input>
				</view>
			</view>
			<view class="list">
				<view class="input-row">
					<m-input type="password" v-model="newPassword" displayable  placeholder="新密码"></m-input>
				</view>
			</view>
			<view class="list">
				<view class="input-row">
					<m-input type="password" v-model="newPasswords" displayable  placeholder="确认密码"></m-input>
				</view>
			</view>
			 
		</view>
		<view>
			 <button class="nav-btn" type="primary" @tap="out">提交</button>
		</view>

	</view>
</template>

<script>
	import mInput from '../components/m-input.vue'
	
	export default {
		components: {
			mInput,
		},
		
		data(){
			return{
				oldPassword:'',
				newPassword:'',
				newPasswords:'',
				storeUserId:'',
			}
		},
		methods: {
			change:function(){
				uni.navigateTo({
					url: 'changPas',
				
				});
			},
			out:function(){
				let _this = this
			  uni.getStorage({
					key: 'businessinfo',
					success:function(res){
						let o = JSON.parse(res.data).info
						_this.storeUserId = o.storeUserId 
						console.log(storeUserId)
						
					}
				})
				
				console.log(this.storeUserId)
				if(this.newPassword != this.newPasswords){
					uni.showModal({
						title: '提示',
						content: '两次输入密码不一致',
					});
					return false
				}
				this.$myRequest({
					url: 'm_store/modify/password',
					method: 'put',
					data: {
						newPassword:this.newPassword,
						oldPassword: this.oldPassword,
						storeUserId:_this.storeUserId
					},
					
				}).then(res =>{
					console.log(res)
					if(res.data.code ==200){
						uni.showModal({
							title: '提示',
							content: '修改成功请重新登录',
							showCancel: false,
							confirmText: "确定"
						});
						uni.navigateTo({
							url: 'login',
						
						});
					}else{
						uni.showModal({
							title: '提示',
							content: res.data.message,
						});
					}
					
				})
				
			}
		}
	}
</script>

<style>
	.top {
		width: 750rpx;
		height: 400rpx;
		background-image: url('~@/static/userBg.png');
		background-size: 100% 100%;
	}

	.line {
		height: 10rpx;
		background-color: #f5f8fa;
	}

	.userBox {
		text-align: center;
		padding-top: 40rpx;
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
	.m-input-view{
		width: 100%;
	}
</style>
