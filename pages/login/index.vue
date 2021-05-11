<template>
	<view class="content">
		<!--#ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" 
		@getuserinfo="getUserInfo" withCredentials="true">微信登录</button>
		<!-- #endif -->
		
		
	</view>
</template>
 
<script>
	export default {
		data() {
			
		},
		methods: {
			 getUserInfo:function(res1) {
				 if(!res1.detail.iv){
					 uni.showToast({
					 	title:"您取消了授权，登录失败",
						icon:"none"
					 });
					 return false;
				 }else {
					 uni.showModal({
					 	title:'提醒',
					 	content:'请登录',
					 	success:function(){
					 		uni.navigateTo({
					 			url:"/pages/lost/lost"
					 		})
					 	},
					 });
				 }
				 console.log(res1);
				 // uni.login({
				 // 	provider: 'weixin',
				 // 	success:function(res2){
				 // 		// console.log(loginRes);
					// 	//  获取sessionKey
					// 	uni.request({
					// 		url: 'https://api.wecixin.q.com/sns/jscode2session?appid=wx56284897b844dcac&secret=9bb70478f2450c04b869acc5316bca3a&grant_type=authorization_code&js_code=JSCODE='+res2.code,
					// 		// url : 'https://hoa.hcoder.net/xcxenxode/?c=sk&appid=wx56284897b844dcac&secret=9bb70478f2450c04b869acc5316bca3a&code='+res2.code,
					// 	success: function(res3){
					// 		console.log(res3);
					// 	},
					// 	fail:function(e){
					// 		console.log(e);
					// 	}
					// 	})
				 // 	}
				 // });
			 }
		},
		onLoad: function() {
		
			
		}
	}
</script>
 
 
<style >

page
view {
	
}

</style>