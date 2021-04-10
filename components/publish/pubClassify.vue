<template>
	<view class="pubClassify">
		<ul class="corMethod">
			<li :class="classfiyType==='learn'?'selected':''"
				@tap="getClassfiyType('learn')">学习用品</li>
			<li :class="classfiyType==='daily'?'selected':''"
				@tap="getClassfiyType('daily')">生活用品</li>
			<li :class="classfiyType==='elec'?'selected':''" 
				@tap="getClassfiyType('elec')">电子用品</li>
			<li :class="classfiyType==='other'?'selected':''" 
				@tap="getClassfiyType('other')">其他</li>
		</ul>
	</view>
</template>

<script>
	import { mapMutations} from 'vuex'
	export default{
		data(){
			return{
				classfiyType:'learn',
				classList:[
					{
						title:'learn',
						value:'学习用品'
					},
					{
						title:'daily',
						value:'生活用品'
					},
					{
						title:'elect',
						value:'电子用品'
					},
					{
						title:'other',
						value:'其他'
					}
				]
			}
		},
		methods:{
			...mapMutations([
				'getMessage'
			]),
			getClassfiyType(type){
				this.classfiyType=type
				// this.$emit('sendClass',{ classType:type})
			}
		}
	}
</script>

<style lang="scss">
/* 联系 */
.corMethod{
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.corMethod li{
	margin:0 5px;
	padding:4px 8px;
	border-radius: 5px;
	font-size: 16px;
	border:1px solid #ccc;
}
li.selected{
	border:1px solid #4588aa;
}

</style>
