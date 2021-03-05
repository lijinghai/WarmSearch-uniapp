<template>
	<view class="home">
		<!-- 轮播图 -->
		<!-- indicator-dots 图片下的点 -->
		<!-- circular 循环 -->
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key='item.id'>
				<image :src="item.imgUrl"></image>
			</swiper-item>
		</swiper>
		
		<!-- 寻物有我 -->
		<view class="hot_goods">
			<view class="title">寻物有我</view>
			<!-- 组件封装 -->
			<goodsList @goodsItemClick="goGoodsDetatil" :goods="goods"></goodsList>
		</view>
		
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue'
	export default {
		data() {
			return {
				swipers: [],
				goods: []
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		components: {"goodsList":goodsList},
		methods: {
			// 获取轮播图的数据
			async getSwipers () {
				const res = await this.$myRequest({
					url: '/unbo?limit=3&page=1&sort=1'
				})
				console.log(res)
				this.swipers = res.data.data.items
			},
			// 获取热门物品的信息
			async getHotGoods(){
				const res = await this.$myRequest({
					url: '/goodsfirst?limit=6&page=1&sort=1'
				})
				console.log(res)
				this.goods = res.data.data.items
			},
			// 导航到物品详情页
			goGoodsDetatil (id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id='+id
				})
				console.log(id)
			}
			
		}
	}
</script>

<style lang="scss">
.home {
	swiper{
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
	margin-top:10px;
	.title{
		height: 50px;
		line-height: 50px;
		color: 	#87CEFF;
		text-align: center;
		letter-spacing: 20px;
		background-color: #fff;
		margin: 7rpx 0;
	}
}
</style>
