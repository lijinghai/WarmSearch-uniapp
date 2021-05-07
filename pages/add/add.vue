<template>
	<view>

        <uni-forms ref="form" :value="formData" :rules="rules">
            <uni-forms-item label="个人信息" name="name">
                <!-- <uinput type="text" v-model="formData.name" placeholder="请输入姓名" /> -->
				<uinput name="input" label="物品名称" v-model="test2" inputBorder="bottom" borderAnimation="center"
					placeholder="请输入物品名称">
				</uinput>
				
				<uinput  label="物品详情" v-model="test21" inputBorder="bottom"
					borderAnimation="center" placeholder="请输入物品详情">
				</uinput>
				
				<uinput  label=" 联  系  人" v-model="test211" inputBorder="bottom"
					borderAnimation="center" placeholder="请输入联系人">
				</uinput>
				
				<uinput  label="联系方式" v-model="test211" inputBorder="bottom"
					borderAnimation="center" placeholder="请输入联系方式">
				</uinput>
            </uni-forms-item>
            <uni-forms-item label="图片" name="email">
                <!-- <input class="input" v-model="formData.email" type="text" placeholder="请输入用户名" @input="binddata('email',$event.detail.value)" /> -->
      
			
			</uni-forms-item>
			
			<uni-file-picker
			    v-model="imageValue" 
			    fileMediatype="image" 
			    mode="grid" 
			    @select="select" 
			    @progress="progress" 
			    @success="success" 
			    @fail="fail" 
			/>
			
            <button @click="submit">Submit</button>
        </uni-forms>

	</view>
</template>

<script>
	import uinput from "@/components/poiuy-uinput/uinput.vue"
	export default {
		components: {
			uinput
		},
		data() {
			return {
				imageValue:[],
				test: '',
				test2: '',
				tel: '',
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com'
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					}
				}
			}
		},
		methods: {
			aa(e) {
				console.log(e);
			},
			aaa() {
				this.test = 'aaa';
			},
			submit() {
				this.$refs.form.submit().then(res => {
					console.log('表单数据信息：', res);
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
