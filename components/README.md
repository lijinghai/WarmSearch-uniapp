
## 插件安装
#### 自定义输入框  待更完善 

##### 导入
> import uinput from "@/components/my-components/uinput.vue"

----------------------------------		
#### *注意 修改width时 可以使用一个块级元素包裹起来 因为内部插件是100%宽度

> using:
#### 属性 attribute
1. **name** 和原生一样的name属性 用于表单
2. **onlyInput** 是否仅仅是一个输入框 默认为false
3. **type** 输入框类型。默认为text 
>>> 可选值 text|tel|email|number|digit(带小数点类型)|idcard(身份证类型)|password|bankcard(银行卡号)|msgcode(短信验证码)|textarea
4. **disabled** 是否禁用 默认为false
5. **label** 标题文本 
6. **labelPosition** 标题文本位置 默认为 right 可选值 right|left|center|top
7. **placeholder** 输入框提示语
8. **maxlength** 最大长度  默认为70 可以自行输入 注意：长度会根据不同输入框类型自动更换长度
9. **mustFill** 不做验证 默认为false
10. **inputBorder** 下划线输入框  可选值 *all* | *bottom* 默认为 *all*  对应属性 borderAnimation下划线进入动画 可选值 *left* | *center* | *right* 默认为 *left* 
11. **inputStyle** 自定义样式 直接写style即可 如：改变 input线颜色 border:1px solid red
----------------------------------	

#### textarea专属属性
* **tlposition** 可选值 top|center|bottom|none 与  *labelPosition* 不冲突 默认为top 
* **height** 只需要给大小 自带upx单位

----------------------------------	

#### 短信验证码专属属性  
*  **send** 是否能发送 可以先判断号码框是否填写后传入 用于触发倒计时功能  true 默认值为false
*  **codeText** 发送验证码的文本文字  例如：发送验证码  默认为获取验证码
*  **countDown** 倒计时秒数 默认为60s 

----------------------------------	

#### 方法 method 
*  *input*    > 输入时触发得到Input框的值
*  *getValue* > 失去焦点触发得到Input框的值可返回当前输入框的状态 是否通过验证
>>> 返回值为 status：true|false 判断是否通过验证 ; value 返回输入框的值 ; el 当前输入框的元素对象 **用于做提交按钮是不用再去做一次验证**
*  *focus*    > 获取焦点回调
		
* 短信验证码框专属方法 counting 已开始倒计时回调方法 没有返回值

----------------------------------	

### 示范代码 
##### 如下 使用v-model正常获取输入框数据

```<template>
		<view>
			<uinput label="输入框1" v-model="test" :focus="true" labelPosition="top" placeholder="请输入输入框1"></uinput>
			<view class="font14 ml10">输入框1的结果:{{test}}</view>
			<uinput label="输入框2" v-model="test2" inputBorder="bottom" borderAnimation="center"  placeholder="请输入输入框2"></uinput>
			<view class="font14 ml10">输入框2的结果:{{test2}}</view>
			<uinput label="手机号" v-model="tel" type="tel" placeholder="请输入手机号"></uinput>
			<view class="font14 ml10">手机框的结果:{{tel}}</view>
			<uinput label="验证码" type="msgcode" :send="true" placeholder="请输入验证码"></uinput>
			<view class="font14 ml10"></view>
			
			<uinput :onlyInput="true" placeholder="邮箱输入框" type="email" ></uinput>
			
			<uinput class="mt10" :onlyInput="true" placeholder="银行卡号输入框" type="bankcard" inputBorder="bottom"></uinput>
			
			<uinput type="textarea" height="300" tlposition="none" :maxlength="-1" placeholder="输入文本框">
			</uinput>
			<button @click="aaa">aaa</button>
		</view>
</template>

<script>
	import uinput from "@/components/my-components/uinput.vue";
	export default {
		components: {
			uinput
		},
		data(){
			return{
				test:'',
				test2:'测试数据',
				tel:''
			}
		},
		methods:{
			aa(e){
				console.log(e);
			},
			aaa(){
				this.test = 'aaa';
			}
		}
	}
</script>

<style>
	
</style>
```

##### 发现问题请及时在评论区给我反馈，谢谢大家的指正，如果好用请给个好评哦~

	