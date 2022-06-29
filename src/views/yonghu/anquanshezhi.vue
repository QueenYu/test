<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<el-form size="default" label-width="110px">
				<el-form-item label="密码组合">
					<span class="mr15">至少包含</span>
					<el-checkbox label="小写字母" size="primary" />
					<el-checkbox label="大写字母" size="primary" />
					<el-checkbox label="数字" size="primary" />
					<el-checkbox label="特殊符号" size="primary" />
				</el-form-item>
				<el-form-item label="密码长度">
					<span class="mr15">限制密码长度至少为</span>
					<el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
					<span class="ml15">位</span>
				</el-form-item>
				<el-form-item label="历史密码检查">
					<span class="mr15">新密码不得与历史前</span>
					<el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
					<span class="ml15">次密码重复</span>
				</el-form-item>
				<el-form-item label="密码重试约束">
					<span class="mr15">1小时内密码错误可重试</span>
					<el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
					<span class="ml15">次</span>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="default">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
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
	import pvpu from '/@/views/yunying/pvpu.vue';
	import diquyunying from '/@/views/yunying/diquyunying.vue';
	import diyupaiming from '/@/views/yunying/diyupaiming.vue';
	import remenref from '/@/views/yunying/remenref.vue';
	import remenurl from '/@/views/yunying/remenurl.vue';
	const activeName = ref('one')
	const handleClick = (tab: TabsPaneContext, event: Event) => {
		console.log(tab, event)
	}
	// 页面加载时
	onMounted(() => {});
</script>
