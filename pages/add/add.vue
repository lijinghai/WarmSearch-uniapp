<!-- 发布消息页面
@author: lijing
@email: lijinghailjh@163.com
@Date: 2021 7 30
 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">发布消息</block>
		</cu-custom>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">

				<!-- 第一页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<form>
								<view class="cu-form-group">
									<view class="title">失主姓名：</view>
									<input placeholder="请输入失主人姓名" name="input" v-model="info1.lostname"></input>
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
								<view class="cu-form-group margin-top">
									<view class="title">物品名称</view>
									<input placeholder="请输入物品名称" name="input" v-model="info1.imgname"></input>
								</view>
								<view class="cu-form-group margin-top">
									<view class="title">物品描述</view>
									<input placeholder="请输入物品描述" name="input" v-model="info1.imgdesc"></input>
								</view>
								<view class="cu-form-group margin-top">
									<view class="title">物品的类别</view>
									<picker @change="PickerChange" :value="index" :range="picker">
										<view class="picker">
											{{index>-1?picker[index]:'请选择物品的类别'}}
										</view>
									</picker>
								</view>
								<view class="cu-bar bg-white margin-top">
									<view class="action">
										物品图片
									</view>
									<view class="action">
										{{imgList.length}}/1
									</view>
								</view>
								<view class="cu-form-group">
									<view class="grid col-4 grid-square flex-sub">
										<view class="bg-img" v-for="(item,index) in imgList" :key="index"
											@tap="ViewImage" :data-url="imgList[index]">
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
					</scroll-view>
				</swiper-item>


				<!-- 第二页 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<form>
								<view class="cu-form-group">
									<view class="title">拾物人姓名：</view>
									<input placeholder="请输入拾物人姓名" name="input" v-model="info2.flName"></input>
								</view>
								<view class="cu-form-group">
									<view class="title">拾物人联系方式：</view>
									<input placeholder="输入手机号码" name="input" v-model="info2.flContact"></input>
									<view class="cu-capsule radius">
										<view class='cu-tag bg-blue '>
											+86
										</view>
										<view class="cu-tag line-blue">
											中国大陆
										</view>
									</view>
								</view>
								<view class="cu-form-group margin-top">
									<view class="title">物品描述</view>
									<input placeholder="请输入物品描述" name="input" v-model="info2.flImgdesc"></input>
								</view>
					
								<view class="cu-bar bg-white margin-top">
									<view class="action">
										物品图片
									</view>
									<view class="action">
										{{imgList2.length}}/1
									</view>
								</view>
								<view class="cu-form-group">
									<view class="grid col-4 grid-square flex-sub">
										<view class="bg-img" v-for="(item,index) in imgList2" :key="index"
											@tap="ViewImage2" :data-url="imgList2[index]">
											<image :src="imgList2[index]" mode="aspectFill"></image>
											<view class="cu-tag bg-red" @tap.stop="DelImg2" :data-index="index">
												<text class='cuIcon-close'></text>
											</view>
										</view>
										<view class="solids" @tap="ChooseImage2" v-if="imgList2.length<1">
											<text class='cuIcon-cameraadd'></text>
										</view>
									</view>
								</view>
								<view class="padding flex flex-direction">
									<button class="cu-btn bg-blue lg" @click="onSubmit2">提交</button>
								</view>
							</form>
						</view>
					</scroll-view>
				</swiper-item>


			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info1: [],
				info2: [],
				index: 1,
				imgList: [],
				imgList2: [],
				picker: ['', '日用类', '证件类', '现金类', '电子类', '数码类'],
				percent: 50,
				activeColor: '#0081ff',
				striped: false,
				stripedActive: false,
				list: [{
						name: '寻失物'
					},
					{
						name: '寻失主'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				info1: {
					id: undefined,
					createTime: new Date(),
					gid: '',
					imgdesc: '',
					imgname: '',
					imgurl: '',
					lostname: '',
					status: '',
					contact: ''
				},
				info2: {
					id: undefined,
					flCreateTime: new Date(),
					flImgdesc: '',
					flImgurl: '',
					flName: '',
					flStatus: '',
					flContact: '',
					flId: ''
				}
			};
		},
		onLoad() {

		},
		computed: {},
		methods: {
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
								this.info1.imgurl = JSON.parse(dataurl).url
								this.$tip.success('上传成功!')
							} else if (res[1].statusCode === 500) { // 获取数据失败
								console.log("失败")
								this.loading = false;
								this.$tip.alert(res.data.message);
							}
						}).catch((err) => {
							// let msg = "请求出现错误，请稍后再试"
							// this.loading = false;
							// this.$tip.alert(msg);
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
			// 下拉框
			PickerChange(e) {
				this.index = e.detail.value
				console.log(this.index)
				this.info1.gid = e.detail.value
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				// this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			onSubmit() {
				let myForm = this.info1
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				console.log("myForm", myForm)
				if (!myForm.imgurl || myForm.imgurl.length == 0) {
					this.$tip.alert('请上传图片');
					return false
				}
				if (!myForm.gid || myForm.gid.length == 0) {
					this.$tip.alert('请选择类别');
					return false
				}
				if (!myForm.lostname || myForm.lostname.length == 0) {
					this.$tip.alert('请输入姓名');
					return false
				}
				if (!myForm.imgdesc || myForm.imgdesc.length == 0) {
					this.$tip.alert('请输入物品描述');
					return false
				}
				if (!myForm.imgname || myForm.imgname.length == 0) {
					this.$tip.alert('请输入物品名称');
					return false
				}
				if (!checkPhone.test(myForm.contact)) {
					this.$tip.alert('请输入正确的手机号');
					return false
				}

				this.info1.status = '未找到'

				const _this = this // 获取此时的this为一个常量，防止下面请求回调改变出错
				console.log("表单提交")
				console.log(this.info1)

				this.$myRequest({
					url: '/goodsfirst/all',
					method: 'POST',
					data: this.info1, // 发送的数据

				}).then((res) => {
					console.log(res)
					this.loading = false;
					if (res.data.code === 20000) { // 获取数据成功
						console.log("成功")
						uni.switchTab({
							url: '../index/index'
						})
						this.$tip.success('发布成功！')
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
			ChooseImage2() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList2.length != 0) {
							this.imgList2 = this.imgList2.concat(res.tempFilePaths)
						} else {
							this.imgList2 = res.tempFilePaths
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
								this.info2.flImgurl = JSON.parse(dataurl).url
								this.$tip.success('上传成功!')
							} else if (res[1].statusCode === 500) { // 获取数据失败
								console.log("失败")
								this.loading = false;
								this.$tip.alert(res.data.message);
							}
						}).catch((err) => {
							// let msg = "请求出现错误，请稍后再试"
							// this.loading = false;
							// this.$tip.alert(msg);
						}).finally(() => {
							this.loading = false;
						})
			
			
					}
				});
			},
			ViewImage2(e) {
				uni.previewImage({
					urls: this.imgList2,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg2(e) {
				uni.showModal({
					title: '主人',
					content: '确定要删除这张照片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList2.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			onSubmit2() {
				let myForm = this.info2
				let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
				console.log("myForm", myForm)
				if (!myForm.flImgurl || myForm.flImgurl.length == 0) {
					this.$tip.alert('请上传图片');
					return false
				}
				if (!myForm.flName || myForm.flName.length == 0) {
					this.$tip.alert('请输入姓名');
					return false
				}
				if (!myForm.flImgdesc || myForm.flImgdesc.length == 0) {
					this.$tip.alert('请输入物品描述');
					return false
				}
				
				if (!checkPhone.test(myForm.flContact)) {
					this.$tip.alert('请输入正确的手机号');
					return false
				}
			
				this.info2.flStatus = '待招领'
			
				const _this = this // 获取此时的this为一个常量，防止下面请求回调改变出错
				console.log("表单提交")
				console.log(this.info2)
			
				this.$myRequest({
					url: '/findlist/all',
					method: 'POST',
					data: this.info2, // 发送的数据
			
				}).then((res) => {
					console.log(res)
					this.loading = false;
					if (res.data.code === 20000) { // 获取数据成功
						console.log("成功")
						uni.switchTab({
							url: '../find/find'
						})
						this.$tip.success('发布成功！')
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;

				.progressBox {
					width: 150rpx;
					float: right;
				}
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 260rpx;
					height: 190rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 45rpx;
				}

				.type {
					margin: 6rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
					-webkit-box-orient: vertical;
				}

				.delivery-time {
					color: #0081ff;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			line-height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btnBox {
				width: 150rpx;
				display: flex;
				justify-content: space-between;

				.btn {
					line-height: 52rpx;
					width: 140rpx;
					border-radius: 12rpx;
					border: 2rpx solid $u-tips-color;
					font-size: 26rpx;
					text-align: center;
					color: $u-tips-color;
				}

				.evaluate {
					color: $u-type-primary;
					border-color: $u-type-primary;
				}
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 300rpx;
			border-radius: 50%;
			margin: 0 auto;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
