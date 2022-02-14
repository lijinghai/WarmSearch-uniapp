<!-- 认领页面
@author: lijing
@email: lijinghailjh@163.com
@Date: 2022 2 14
 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">认领页面</block>
		</cu-custom>
		<view>
			<view>{{id}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0
			}
		},
		methods: {
			
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/goodsdetail?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.swipers = res.data.data.items
			},
			async getInfo() {
				const res = await this.$myRequest({
					url: '/goodsdetail?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.info = res.data.data.items[0]
			},
			onLoad(options) {
				console.log(options)
				this.id = options.id
				// this.getSwipers()
				// this.getInfo()
			}
		}
		}
</script>

<style>
</style>
