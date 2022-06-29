<template>
	<div class="system-role-container">
		<el-card shadow="hover" style="font-size:13px;">
			<div style="width:80%;display:flex;vertical-align: middle;line-height: 60px;">
				<div style="width:120px">
					<div class="yonghuimg">
						admin
					</div>
				</div>
				<div>登录账号：</div>
				<div>test@126.com</div>
				<div class="ml15">创建时间：</div>2022-06-09 11:14:00
			</div>
			<div style="display:flex; margin-top:50px;">
				<div style="width:80%;display:flex;">
					<p style="width:120px">登录密码：</p>
					<p>安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</p>
				</div>
				<div style="width:20%;color: blue; cursor: pointer;" @click="drawer1=true">
					修改
				</div>
			</div>
			<div style="display:flex; margin-top:30px;margin-bottom: 100px;">
				<div style="width:80%;display:flex;">
					<p style="width:120px">修改安全邮箱：</p>
					<p>您已绑定了手机test@126.com，无特殊情况不建议修改。</p>
				</div>
				<div style="width:20%;color: blue; cursor: pointer;" @click="drawer2=true">
					修改
				</div>
			</div>
		</el-card>
		<el-drawer v-model="drawer1" title="修改密码" direction="rtl" :before-close="handleClose" size="80%">
			<el-card shadow="hover" style="width:50%; margin:auto" class="mt15">
				<div class="mt15 mb15">
					<el-steps :active="1" finish-status="success">
						<el-step title="验证身份" :icon="Edit" />
						<el-step title="修改密码" :icon="Edit" />
						<el-step title="完成" :icon="Edit" />
					</el-steps>
				</div>
				<el-form size="default" label-width="130px">
					<el-form-item label="当前登录密码">
						<el-input placeholder="请输入" clearable></el-input>
					</el-form-item>
					<el-form-item label="新的登录密码">
						<el-input placeholder="请输入" clearable></el-input>
					</el-form-item>
					<el-form-item label="确认新的登录密码">
						<el-input placeholder="请输入" clearable></el-input>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" size="default">确 定</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-drawer>
		<el-drawer v-model="drawer2" title="修改邮箱" direction="rtl" :before-close="handleClose2" size="80%">
			<el-card shadow="hover" style="width:50%; margin:auto" class="mt15">
				<div class="mt15 mb15">
					<el-steps :active="1" finish-status="success">
						<el-step title="验证身份" :icon="Edit" />
						<el-step title="修改密码" :icon="Edit" />
						<el-step title="完成" :icon="Edit" />
					</el-steps>
				</div>
				<p class="mb15">请完成以下操作</p>
				<el-form size="default" label-width="90px">
					<el-form-item label="您的邮箱">
						<el-input placeholder="请输入厂商名称" clearable></el-input>
					</el-form-item>
					<el-form-item label="验证码">
						<el-input placeholder="请输入厂商名称" clearable>
							<template #append>获取验证码</template>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="default">确 定</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-drawer>
	</div>
</template>

<script lang="ts" setup>
	import {
		Edit
	} from '@element-plus/icons-vue'
	import {
		toRefs,
		reactive,
		onMounted,
		ref,
		defineComponent
	} from 'vue';
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus';

	const drawer1 = ref(false)
	const drawer2 = ref(false)
	const handleClose = (done: () => void) => {
		drawer1.value = false
	}

	const handleClose2 = (done: () => void) => {
		drawer2.value = false
	}
	// 页面加载时
	onMounted(() => {});
</script>
