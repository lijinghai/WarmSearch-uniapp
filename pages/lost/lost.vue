<template>
	<view class="u-wrap">>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">寻失物</block>
		</cu-custom>

		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="keywords" placeholder="输入搜索的关键词" confirm-type="search"
					@confirm="searchUserByKey"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-blue shadow-blur round" @tap="searchUserByKey">搜索</button>
			</view>
		</view>

		<view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索您想查找的内容</text>
			</view>
		</view>

		<view class="pics">
			<!-- 可滚动区域 -->
			<scroll-view scroll-y scroll-with-animation class="left" scroll-y>
				<view @click="leftClickHandle(index,item.id)" :class="active===index?'active':''"
					v-for="(item,index) in cates" :key="item.id">
					{{item.ctitle}}
				</view>
			</scroll-view>

			<!-- 右侧信息页显示 -->
			<scroll-view class="right" scroll-y>
				<view class="item" v-for="item in secondData" :key="item.g_id">
					<image @click="previewImg(item.d_imgurl)" :src="item.d_imgurl"></image>
					<view class="lname">
						<text>{{item.imgname}}</text>
						<text>{{item.status}}</text>
						<view class="btnBox">
							<view @click="getClaim(item.id)" class="evaluate btn">认领</view>
						</view>
					</view>
					<view class="line"></view>
					<view class="goods_name">{{item.imgdesc}}</view>
					<view class="line"></view>
					<view class="box2">
						<view>丢失时间:{{item.create_time}}</view>
						<view>联系人:{{item.lostname}}</view>
						<view @click="phone">联系方式:{{item.contact}}(点击拨打)</view>
					</view>


					<view class="line"></view>
				</view>
				<text v-if="secondData.length == 0">暂无数据</text>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],
				active: 0,
				secondData: []
			}
		},
		methods: {
			getClaim(id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/Claim/index?id=' + id
				})
			},
			searchUserByKey(value) {
				// this.loadInfo()
				this.$u.toast('搜索内容为：' + value)
			},
			phone() {
				uni.makePhoneCall({
					phoneNumber: '该手机号'
				})
			},
			async getPicsCate() {
				const res = await this.$myRequest({
					url: '/category/all?limit=9999&page=1&sort=1'
				})
				console.log(res)
				this.cates = res.data.data.items
				this.leftClickHandle(0, this.cates[0].id)
			},
			async leftClickHandle(index, g_id) {
				console.log("id:" + g_id)
				this.active = index
				// 获取右侧的数据
				const res = await this.$myRequest({
					url: '/category?limit=9999&page=1&sort=&id=' + g_id
				})
				console.log(res)
				this.secondData = res.data.data.items
			},
			previewImg(current) {
				const urls = this.secondData.map(item => {
					return item.d_imgurl
				})
				console.log(urls)
				// 预览图片
				uni.previewImage({
					current,
					urls
				})
			}
		},
		onLoad() {
			this.getPicsCate()

		}
	}
</script>

<style lang="scss" scoped>
	.btnBox {
		margin-top: -29px;
		margin-left: 138px;
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

	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 30rpx;
		color: $u-main-color;
		font-weight: bold;
		margin: 10rpx 0;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100rpx;
	}

	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		// 一行显示
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			// 选中颜色
			.active {
				background: $search-color;
				color: #fff;
			}
		}

		.right {
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;

			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				.lname {
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
		}
	}
</style>
