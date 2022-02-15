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
		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xl padding">
					<text class=" text-red">广而告之：</text>
					<text class="text-black text-bold">很高兴我的平台可以帮到您，为了防止恶意认领现象的发生请填写您的信息，还望谅解！
					</text>
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">被认领物品名称：</view>
				<text>{{info.flImgdesc}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">认领人姓名：</view>
				<input placeholder="请输入认领人姓名" name="input" v-model="info1.userName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">认领人学号：</view>
				<input placeholder="请输入认领人学号" name="input" v-model="info1.number"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">认领人联系方式：</view>
				<input placeholder="输入手机号码" name="input" v-model="info1.contact"></input>
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
				<view class="title">认领人地址</view>
				<input placeholder="请输入认领人地址" name="input" v-model="info1.address"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					认领人证件照
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
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
				info1: [],
				id: 0,
				imgList: [],
				info1: {
					id: undefined,
					imgUrl: '',
					address: '',
					contact: '',
					createTime: new Date(),
					updateTime: new Date(),
					goodsName: '',
					number: '',
					userName: ''
				}
			}
		},
		methods: {
			onSubmit() {
				let myForm = this.info1
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				console.log("myForm", myForm)
				if (!myForm.url || myForm.url.length == 0) {
					this.$tip.alert('请上传图片');
					return false
				}
				if (!myForm.userName || myForm.userName.length == 0) {
					this.$tip.alert('请输入姓名');
					return false
				}
				if (!myForm.number || myForm.number.length == 0) {
					this.$tip.alert('请输入学号');
					return false
				}
				if (!myForm.address || myForm.address.length == 0) {
					this.$tip.alert('请输入地址');
					return false
				}
				if (!checkPhone.test(myForm.contact)) {
					this.$tip.alert('请输入正确的手机号');
					return false
				}
				this.info1.flImgdesc = this.info.imgname

				const _this = this // 获取此时的this为一个常量，防止下面请求回调改变出错
				console.log("表单提交")
				// 提交跳转
				this.$myRequest({
					url: '/pcattestation/all',
					method: 'POST',
					data: _this.info1, // 发送的数据

				}).then((res) => {
					console.log(res)
					this.loading = false;
					if (res.data.code === 20000) { // 获取数据成功
						console.log("成功")
						uni.switchTab({
							url: '../index/index'
						})
						this.$tip.success('请静候我们的联系!')
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
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}

						uni.uploadFile({
							url: this.$BASE_URL.BASE_URL + '/upload',
							method: 'POST',
							name: 'file',
							filePath: res.tempFilePaths[0]
						}).then((res) => {
							console.log("res1")
							console.log(res)
							this.loading = false;
							if (res[1].statusCode === 200) { // 获取数据成功
								console.log("成功")
								var dataurl = res[1].data
								console.log(JSON.parse(dataurl).url)
								this.info1.url = JSON.parse(dataurl).url
								this.$tip.success('上传成功!')
							} else if (res[1].statusCode === 500) { // 获取数据失败
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
			},
			async getInfo() {
				const res = await this.$myRequest({
					url: '/findlist/id?limit=1&page=1&sort=1&id=' + this.id
				})
				console.log(res)
				this.info = res.data.data.items[0]
				this.info1.imgname = this.info.imgname
			},
			onLoad(options) {
				console.log(options)
				this.id = options.id
				this.getInfo()
			}
		}
	}
</script>

<style>
</style>
