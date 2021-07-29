<template>
	<view>
		<cmd-page-body type="top">

			<view class="login">
				<cmd-transition name="fade-up">
					<form @submit="formSubmit">

						<view>
							<view class="login-username">
								<image src="../static/userIcon.png" mode="" class="userIcon"></image>
								<input type="text" class="uni-input" name="username" placeholder='请输入账号' />
							</view>

							<view class="login-password">
								<image src="../static/passIcon.png" mode="" class="upassIcon"></image>
								<input confirm-type='next' type="password" class="uni-input" name="password" placeholder="请输入密码" />
							</view>
							<view class="forget">
								<text @tap="forget">忘记密码</text>?
							</view>
							<button confirm-type='done' class="btn-login" hover-class="btn-login-hover" form-type="submit">登录</button>

						</view>
					</form>
				</cmd-transition>

			</view>
		</cmd-page-body>
		<Loading :visible="visible"></Loading>

	</view>
</template>

<script>
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import Loading from './Loding.vue';



	export default {
		components: {
			cmdTransition,
			Loading
		},

		data() {
			return {
				username: '',
				password: '',
				visible:false

			};
		},



		methods: {
			formSubmit: function(e) {
				this.visible = true 
				let username = e.detail.value.username
				let password = e.detail.value.password
				if (!username || !password) {
					uni.showModal({
						title: '提示',
						content: '请输入账号或者密码',
						showCancel: false,
						confirmText: "确定"


					});
					return false
				}
				
				
				this.$myRequest({
					url: 'm_store/login',
					method: 'post',
					data: {
						username: username,
						password: password
					}
				}).then(res => {
					// uni.setStorageSync('businessinfo', JSON.stringify(res.data.result));
					if (res.data.code == 200) {
						console.log('登录成功')
						uni.setStorage({
							key: 'businessinfo',
							data: JSON.stringify(res.data.result),
							success: function() {
								console.log('登录存储成功')
								// 存储成功后跳转房源详情页
								
								uni.navigateTo({
									url: 'home',
								
								});
							}
						})
					} else {

						uni.showModal({
							title: '提示',
							content: res.data.message,
							showCancel: false,
							confirmText: "确定"


						});
					}
                       this.visible = false 
				})



			},
			forget() {
				uni.showModal({
					title: '提示',
					content: '请联系管理员修改密码',
					showCancel: false,
					confirmText: "知道了"


				});
			}

		},


		beforeDestroy() {

		}
	}
</script>

<style>
	.userIcon {
		width: 60rpx;
		height: 50rpx;
		position: absolute;
		left: 10rpx;
		top: 20rpx;
	}

	.upassIcon {
		width: 60rpx;
		height: 50rpx;
		position: absolute;
		left: 10rpx;
		top: 20rpx;
	}

	.forget {
		text-align: right;
		color: #999999;
		margin-top: -10px;
		margin-bottom: 10rpx;
		font-size: 24rpx;
		
	}

	.login {
		margin-top: 850rpx;
		margin-right: 72rpx;
		margin-left: 72rpx;

	}

	.login-title {
		font-size: 56upx;
		font-weight: 500;
	}

	.login-explain {
		font-size: 28upx;
		color: #9E9E9E;
	}



	.login-phone-getcode {
		color: #3F51B5;
		text-align: center;
		min-width: 140upx;
	}



	.login-username {
		height: 80rpx;
		background-color: #f2f2f2 !important;
		border-radius: 5rpx;
		margin-bottom: 40rpx;
		position: relative;

	}

	.login-password {
		height: 80rpx;
		background-color: #f2f2f2;
		border-radius: 5rpx;
		margin-bottom: 40rpx;
		position: relative;

	}

	.btn-login {
		height: 90rpx;
		line-height: 90rpx;
		background-image: linear-gradient(180deg,
			#64bbf3 0%,
			#4e78e8 100%),
			linear-gradient(#26cdda,
			#26cdda);
		background-blend-mode: normal,
			normal;
		border-radius: 45rpx;
		color: #FFFFFF;
	}

	.btn-login-active {
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-login-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}

	.uni-input {
		background-color: #f2f2f2;
		padding-left: 80rpx;
		height: 2.4em;
	}
</style>
