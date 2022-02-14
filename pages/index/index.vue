<!-- 首页页面
@author: lijing
@email: lijinghailjh@163.com
@Date: 2021 7 30
 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">首页</block>
		</cu-custom>
		<view class="wrap">

			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true"
				:circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swipers" :key="index">
					<image :src="item.imgUrl" mode="aspectFill"></image>
					<video :src="item.imgUrl" autoplay loop muted :show-play-btn="false" :controls="false"
						objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>

			<view class="page-box">
				<view class="hot_goods">
					<!-- <view class="title">寻物有我</view> -->
					<!-- <view class="cu-bar justify-center bg-white">
						<view class="action border-title">
							<text class="text-xl text-bold text-blue">寻物有我</text>
							<text class="bg-gradual-blue" style="width:3rem"></text>
						</view>
					</view> -->
					<!-- 文字滚动 -->
					<uni-notice-bar showClose="true" showIcon="true" color="#87CEFF" scrollable="true" single="true"
						text="[通知] 19级张三同学遗失笔记本电脑,如有拾取到同学请速联系他,联系方式:15178***798,重谢!"></uni-notice-bar>
				</view>
				
				<!-- =============================================================================================================== -->
				<view class="order" v-for="(res, index) in goods" :key="res.id">
					<view class="top" @click="goGoodsDetatil(res.id)">
						<view class="left">
							<uni-text class="cuIcon-titles text-blue"></uni-text>
							<view class="store">{{ res.imgname }}</view>
							<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
						</view>
						<view class="right">
							<text class="text-blue">丢失时间：{{ res.createTime }}</text>
						</view>
					</view>
					<view class="item" @click="goGoodsDetatil(res.id)">
						<view class="left">
							<image :src="res.imgurl" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="title u-line-2 text-bold">{{ res.imgdesc }}</view>
							<!-- <view class="type">{{ res.imgdesc }}</view> -->
							<view class="delivery-time">失主： {{ res.lostname }}</view>
						</view>
					</view>
					<u-line color="#f1f1f1" margin="24rpx 0 15rpx 0"></u-line>
					<view class="bottom">
						<view>
							<view class="cu-avatar-group" style="padding-left: 24rpx;">
								<view class="cu-avatar round" v-for="(item,index) in avatar" :key="index"
									:style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
							</view>
							<text class="text-blue text-shadow">状态:{{ res.status }}</text>
						</view>

						<view class="btnBox">
							<view @click="getClaim(res.id)" class="evaluate btn">认领</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				goods: [],
				percent: 50,
				activeColor: '#0081ff',
				striped: false,
				stripedActive: false,
				orderList: [
					[],
					[],
					[],
					[]
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()

		},
		computed: {},
		methods: {
			// 获取轮播图的数据
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/unbo?limit=3&page=1&sort=1'
				})
				this.swipers = res.data.data.items
			},
			// 获取热门物品的信息
			async getHotGoods() {
				const res = await this.$myRequest({
					url: '/goodsfirst?limit=6&page=1&sort=1'
				})
				console.log(res)
				this.goods = res.data.data.items
				console.log(this.goods)
			},
			// 导航到物品详情页
			goGoodsDetatil(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			},
			// 
			getClaim(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/Claim/index?id=' + id
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.home {
		swiper {
			width: 750rps;
			height: 380rps;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.hot_goods {
		background: #eee;
		overflow: hidden;
		margin-top: 10px;

		.title {
			height: 50px;
			line-height: 50px;
			color: #87CEFF;
			text-align: center;
			letter-spacing: 20px;
			background-color: #fff;
			margin: 7rpx 0;
		}
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;

				.progressBox {
					width: 150rpx;
					float: right;
				}
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 260rpx;
					height: 190rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 45rpx;
				}

				.type {
					margin: 6rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
					-webkit-box-orient: vertical;
				}

				.delivery-time {
					color: #0081ff;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			line-height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btnBox {
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
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 300rpx;
			border-radius: 50%;
			margin: 0 auto;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
