<template>
	<view>
		<!-- 用户信息模块 -->
		<view class="userBox">
			<!-- 昵称 -->
			<text class="nickName">{{nickNames}}</text>
			<!-- 头像 -->
			<image class="userIcon" :src="avatarUrl"></image>
		</view>
		
		<view class="aboutme">
			<button type="default" @click="gotoLost(url)">寻找物品</button>
			<!-- <text>关于我们</text> -->
			<button type="default" @click="goto(url)">关于我们</button>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				nickNames: '匿名用户',
				avatarUrl: '../../static/logo2.png',
				show: '',
				hidden: ''
			}
		},
		methods: {
			  goto(url) {
			     uni.navigateTo({
			        url: '/pages/about-me/about-me'
			      })
			},
			gotoLost(url) {
			     uni.navigateTo({
			        url: '/pages/upload-lost/upload-lost'
			      })
			}
		},
		onLoad: function(option) {
			let that = this;
 
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							console.log(infoRes);
							that._data.nickNames = infoRes.userInfo.nickName;
							that._data.avatarUrl = infoRes.userInfo.avatarUrl;
						}
					});
				}
			});
 
		}
	}
</script>
 
 
<style >
	/* 用户盒子 */
	.userBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: linear-gradient(to top right, #63b8ff 0%, #4876ff 25%, #3a5fcd 100%);
	}
 
	/* 用户昵称 */
	.nickName {
		color: #ffffff;
	}
 
	/* 用户头像 */
	.userIcon {
		align-self: flex-end;
		border-radius: 50%;
		overflow: hidden;
		width: 100px;
		height: 100px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5)
	}
</style>