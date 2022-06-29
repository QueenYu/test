<template>
	<div class="system-role-container">
		<el-input
		    :rows="10"
		    type="textarea"
		    placeholder="请输入URL封禁"
		/>
		<el-button size="default" type="primary" class="mt10">
			提交
		</el-button>
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

	// 页面加载时
	onMounted(() => {
	});
</script>
