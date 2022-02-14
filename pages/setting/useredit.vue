<!-- 用户详情编辑页面
@author: lijing
@email: lijinghailjh@163.com
@Date: 2021 7 30
 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">编辑资料</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="input" v-model="info.name"></input>
			</view>
			<!-- 			<view class="cu-form-group">
				<view class="title">用户名</view>
				<input placeholder="用户名" name="input" v-model="info.name" disabled></input>
			</view> -->
			<view class="cu-form-group">
				<view class="title">头像</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red radius" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">性别</view>
				<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''"
					:checked="switchC?true:false"></switch>
			</view>



			<view class="cu-form-group margin-top">
				<view class="title">手机号码</view>
				<input placeholder="输入手机号码" name="input" maxlength="11" v-model="info.username"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="输入邮箱" name="input" v-model="info.email"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">个性签名</view>
				<input placeholder="输入个性签名" name="input" v-model="info.introduction"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="onSubmit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [],
				index: -1,
				switchC: true,
				imgList: [],
				uploadUrl: "/sys/common/upload",
				myFormData: {
					avatar: '',
					realname: '',
					username: '',
					sex: 1,
					birthday: '',
					orgCode: '',
					workNo: '',
					phone: '',
					email: '',
					id: '',
					introduction: ''
				},
			};
		},
		onLoad: function(option) {
			this.getInfo()
		},
		methods: {
			onSubmit() {
				let myForm = this.info
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				let checkEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
				console.log("myForm", myForm)
				if (!myForm.username || myForm.username.length == 0) {
					this.$tip.alert('请输入手机号');
					return false
				}
				if (!checkPhone.test(myForm.username)) {
					this.$tip.alert('请输入正确的手机号');
					return false
				}
				if (!checkEmail.test(myForm.email)) {
					this.$tip.alert('请输入正确的邮箱地址');
					return false
				}

				const _this = this // 获取此时的this为一个常量，防止下面请求回调改变出错
				console.log("表单提交")
				// 提交跳转
				this.$myRequest({
					url: '/suser',
					method: 'Put',
					data: _this.info, // 发送的数据

				}).then((res) => {
					console.log(res)
					this.loading = false;
					if (res.data.code === 20000) { // 获取数据成功
						console.log("成功")

						uni.switchTab({
							url: '../people/people'
						})
						this.$tip.success('修改成功!')
					} else if (res.data.code === 500) { // 获取数据失败
						console.log("失败")
						this.loading = false;
						this.$tip.alert(res.data.message);
					}
				}).catch((err) => {
					let msg = "请求出现错误，请稍后再试"
					this.loading = false;
					this.$tip.alert(msg);
				}).finally(() => {
					this.loading = false;
				})
			},

			// 获取用户信息
			async getInfo() {
				const res = await this.$myRequest({
					url: '/suser/info?token=' + uni.getStorageSync('token')
				})
				this.infoid = res.data.data
				console.log("用户id==>" + this.infoid.id)
				if (res.data.data != null) {
					console.log("进来了")
					const res1 = await this.$myRequest({
						url: '/suser/id?limit=1&page=1&sort=1&id=' + this.infoid.id
					})
					console.log("用户详情信息")
					this.info = res1.data.data.items[0]
					console.log(res1.data.data.items[0])
					if (res1.data.data.items[0] != null) {
						let result = res1.data.data.items[0]
						console.log("result.sex")
						console.log(result.sex)
						console.log(result.sex === 1)
						this.info.name = result.name == null ? '用户' : result.name
						this.switchC = result.sex == 1 ? true : false
						this.info.username = result.username == null ? '无' : result.username
						this.info.birthday = result.birthday == null ? '无' : result.birthday
						this.info.account = result.account == null ? '无' : result.account
						this.info.mobile = result.mobile == null ? '无' : result.mobile
						this.info.email = result.email == null ? '无' : result.email
						this.info.introduction = result.introduction == null ? '无' : result.introduction
					}
				}
			},


			DateChange(e) {
				this.myFormData.birthday = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
				console.log("11111")
				console.log(this.switchC)
				if (this.switchC == true) {
					this.info.sex = 1;
				} else if (this.switchC == false) {
					this.info.sex = 2;
				}

			},
			ChooseImage() {
				var that = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res)
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}

						// that.$http.upload(that.$config.apiUrl+that.uploadUrl, {
						// 		filePath: res.tempFilePaths[0],
						// 		name: 'file'
						// 	})
						// 	.then(res => {
						// 		that.myFormData.avatar=res.data.message;
						// 	})
						// 	.catch(err => {
						// 		that.$tip.error(err.data.message)
						// 	});
						// this.imgList = res.tempFilePaths
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '主人',
					content: '确定要删除这张照片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
