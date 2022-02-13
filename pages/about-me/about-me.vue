<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于我们</block>
		</cu-custom>
	<view class="contact">
		<image class="img" src="../../static/imgDemo/lianxime.png"></image>
		<view class="info">
			<view @click="phone">联系电话：152*******12(点击拨打)</view>
			<view>联系地址：北京</view>
		</view>
		<!-- 地图 -->
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 118.798656,    //经度
				latitude: 32.076794,    //纬度
				scale: 16,    //设置地图的缩放级别
				markers:[
					{
						longitude: 118.798656,    //经度
						latitude: 32.076794,    //纬度
						iconPath: '../../static/imgDemo/xuanwuhu.jpg',
						width:30,
						height:30
					}
				]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '152*******12'
				})
			}
		}
	}
</script>

<style lang="scss">
.contact{
	.img{
		width: 750rpx;
		height: 320rpx;
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #eee;
	}
	.map{
		width: 750rpx;
		height: 750rpx;
	}
}
</style>
