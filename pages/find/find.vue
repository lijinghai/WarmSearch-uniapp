<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">寻失主</block>
		</cu-custom>
	<view>
		<find-item @itemClick="goDetail" :list="findlist"></find-item>
	</view>
	</view>
</template>

<script>
	import findItem from '../../components/find-item/find-item.vue'
	export default {
		data() {
			return {
				findlist:[]
			}
		},
		methods: {
			async getFindList() {
				const res = await this.$myRequest({
					url: '/findlist?limit=99&page=1&sort=1'
					
				})
				console.log(res)
				this.findlist = res.data.data.items
				console.log(this.findlist)
			},
			goDetail (fl_id) {
				console.log(fl_id)
				uni.navigateTo({
					url: '/pages/finds-detail/finds-detail?id='+fl_id
				})
			},
			// 页面进去时执行
			onShow() {
				this.getFindList()
			},
		},
		// 注册组件
		components: {"findItem":findItem},
		onLoad() {
			this.getFindList()
		}
		
	}
</script>

<style>

</style>
