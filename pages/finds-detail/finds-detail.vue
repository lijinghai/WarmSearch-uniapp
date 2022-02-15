<template>
	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">物品详情</block>
		</cu-custom>
		<view class="goods_detail">
			<!-- 轮播图 -->
			<swiper indicator-dots="true">
				<swiper-item v-for="item in swipers" :key="item.id">
					<image :src="item.flImgurl"></image>
				</swiper-item>
			</swiper>

			<view class="box1">
				<view class="dname">
					<text>{{info.flImgdesc}}</text>
					<text>{{info.flStatus}}</text>
					<view class="btnBox">
						<view @click="getClaim(info.id)" class="evaluate btn">认领</view>
					</view>
				</view>
				<!-- <view class="goods_name">{{info.imgdesc}}</view> -->
			</view>

			<view class="line"></view>

			<view class="box2">
				<view>拾取时间:{{info.flCreatetime}}</view>
				<view>联系人:{{info.flName}}</view>
				<view @click="phone">联系方式:{{info.flContact}}(点击拨打)</view>
			</view>
			<view class="line"></view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				swipers: [],
				info: {}
			}
		},
		methods: {
			getClaim(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/claim2/index?id=' + id
				})
			},
			phone() {
				uni.makePhoneCall({
					phoneNumber: '该手机号'
				})
			},
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/findlist/id?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.swipers = res.data.data.items
			},
			async getInfo() {
				const res = await this.$myRequest({
					url: '/findlist/id?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.info = res.data.data.items[0]
			},
			onLoad(options) {
				console.log(options)
				this.id = options.id
				this.getSwipers()
				this.getInfo()
			}
		},
	}
</script>

<style lang="scss">
	.btnBox {
		margin-top: -29px;
		margin-left: 230px;
		width: 150rpx;
		display: flex;
		justify-content: space-between;

		.btn {
			line-height: 52rpx;
			width: 140rpx;
			border-radius: 12rpx;
			border: 2rpx solid $u-tips-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-tips-color;
		}

		.evaluate {
			color: $u-type-primary;
			border-color: $u-type-primary;
		}
	}

	.goods_detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.dname {
				font-size: 35rpx;
				color: $search-color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					// text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 32rpx;
			line-height: 70rpx;
		}

		.line {
			height: 10rpx;
			width: 750rpx;
			background: #eee;
		}
	}
</style>
