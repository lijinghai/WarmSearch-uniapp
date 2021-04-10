<template>
	<!-- 顶部滑动 -->
	<view class="publish_header">
		<view class="top">
			<view class="lost"
				@tap="sendType('lost')">
				{{ title.name1}}
			</view>
			<view class="found"
				@tap="sendType('found')">
				{{ title.name2}}
			</view>
			<span class="linear"
			:class="msgType==='lost'?'linear0':'linear100'"></span>
		</view>
	</view>
</template>

<script>
	// import { mapState,mapMutations} from 'vuex'
	export default {
		props:{
			title:{
				type:Object
			}
		},
		computed:{
			// ...mapState({
			// 	msgType:state=>state.msgType
			// })
		},
		methods: {
			// ...mapMutations(['getMsgType']),
			// sendType(type){
			// 	this.getMsgType({ type })
			// }
		}
	}
</script>

<style scoped>
	.publish_header{
		background-color: #fff;
		--topH:50px;
		width: 100%;
		height: var(--topH);
		font-size: 14px;
	}
	.publish_header .top{
		position: relative;
		margin:0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
	.publish_header .top view{
		line-height: var(--topH);
		text-align: center;
		height: 100%;
		padding: 0 50px;
	}
	.publish_header .top .linear{
		position: absolute;
		bottom:0;
		left:0;
		height: 4px;
		width: 50%;
		border-radius: 5px;
		background: linear-gradient(to right,red,orange);
		transition: all .2s ease-in-out;
	}
	.linear0{
		transform: translate3d(0%,0,0);
	}
	.linear100{
		transform: translate3d(100%,0,0);
	}
</style>
