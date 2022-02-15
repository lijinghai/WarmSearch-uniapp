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
					<image :src="item.imgurl"></image>
				</swiper-item>

				<!-- <swiper-item v-for="item in swipers" :key="item.id+1">
					<image :src="item.d_imgurl"></image>
				</swiper-item> -->
			</swiper>

			<view
				class="cu-list menu card-menu margin-top-lg margin-bottom-lg shadow-shop bg-white text-black my-radius sm-border">

				<view class="cu-item" :style="[{animation: 'show ' + 0.6+ 's 1'}]">
					<view class='content'>
						<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>物品名称</text>
					</view>
					<view class="action">
						<view>{{info.imgname}}</view>
					</view>
					<view class="action">
						<button class="cu-btn round" :class="['bg-green' , shadow]" @click="getClaim(info.id)">认领</button>
					</view>
				</view>

				<view class="cu-item" :style="[{animation: 'show ' + 0.6+ 's 1'}]">
					<view class='content'>
						<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>物品状态</text>
					</view>
					<view class="action">
						<view>{{info.status}}</view>
					</view>
				</view>
				<view class="cu-item" :style="[{animation: 'show ' + 0.6+ 's 1'}]">
					<view class='content'>
						<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>物主姓名</text>
					</view>
					<view class="action">
						<view>{{info.lostname}}</view>
					</view>
				</view>
				<view class="cu-item" :style="[{animation: 'show ' + 0.6+ 's 1'}]">
					<view class='content'>
						<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>丢失时间</text>
					</view>
					<view class="action">
						<view>{{info.create_time}}</view>
					</view>
				</view>

				<view class="cu-item" @click="phone" data-number="15178672798"
					:style="[{animation: 'show ' + 0.6+ 's 1'}]">
					<view class='content'>
						<image src='../../static/me/icon/dengta.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>联系方式</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-blue light">{{info.contact}}</view>
					</view>
				</view>

				<view class="cu-item" :style="[{animation: 'show ' + 0.6+ 's 1'}]">
					<view class='content' style="height: 290rpx;">
						<image src='../../static/me/icon/xiaoxi.png' class='png' mode='aspectFit'></image>
						<text class='text-lg margin-sm'>物品描述: {{info.imgdesc}}
						</text>
					</view>

				</view>
			</view>

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
			phone() {
				uni.makePhoneCall({
					phoneNumber: '该手机号'
				})
			},
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/goodsfirst/id?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.swipers = res.data.data.items
			},
			async getInfo() {
				const res = await this.$myRequest({
					url: '/goodsfirst/id?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.info = res.data.data.items[0]
			},
			getClaim(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/Claim/index?id=' + id
				})
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
	.box {
		margin: 20upx 0;
	}
	
	.box view.cu-bar {
		margin-top: 20upx;
	}
</style>
