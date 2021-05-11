<script>
	// 判断用户是否登录
	global.isLogin = function() {
		try{
			// suid的全局id
			var suid = uni.getStorageSync('suid');
			// srand用户的随机码，在本地记录
			var srand = uni.getStorageSync('srand');
		}catch(e){
			//TODO handle the exception
			if(suid == '' || srand == '') {
				return false;
			} else {
				return [suid,srand];
			}
		}
	};
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
