<template>
	<view class="contact">
		<image class="img" src="../../static/imgDemo/lianxime.png"></image>
		<view class="info">
			<view @click="phone">联系电话：15380408957 (点击拨打)</view>
			<view>联系地址：安徽省安庆市天城中学</view>
		</view>
		<!-- 地图 -->
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 116.946183,    //经度
				latitude: 30.816133,    //纬度
				scale: 16,    //设置地图的缩放级别
				markers:[
					{
						longitude: 116.946183,    //经度
						latitude: 30.816133,    //纬度
						iconPath: '../../static/imgDemo/tcLogo.png',
						width:30,
						height:30
					}
				]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '15380408957'
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
