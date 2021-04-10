<template>
	<view>
		<ul class="corMethod">
			<li :class="relationType=='place'?'selected':''"
				@tap="getRelateType('place')" maxlength="20"
				v-if="msgType=='lost'">指定领取地点</li>
			<li :class="relationType=='qq'?'selected':''"
				@tap="getRelateType('qq')">qq</li>
			<li :class="relationType=='tel'?'selected':''" 
				@tap="getRelateType('tel')">手机号</li>
		</ul>
	</view>
</template>

<script>
	import { mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				relationType:''
			}
		},
		computed:{
			...mapState({
				msgType:state=>state.msgType
			})
		},
		methods:{
			...mapMutations([
				'getMessage'
			]),
			getRelateType(type){
				this.relationType=type
				this.$emit('sendRelation',{ relationType:type})
			}	
		}
	}
</script>

