<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<p>每次提交地址最多200个。</p>
			<p>输入时，多个 URL 请用回车换行分隔，每个 URL 应当以 http:// 或 https:// 开头， 例如</p>
			<p> http://www.example.com/index.html</p>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="URL封禁" name="one">
					 <fengjin />
				</el-tab-pane>
				<el-tab-pane label="URL解封禁" name="two">
					<jiefengjin />
				</el-tab-pane>
				<el-tab-pane label="操作记录" name="three">
					<caozuojilu />
				</el-tab-pane>
			</el-tabs>
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
	import fengjin from '/@/views/fengjin/fengjin.vue';
	import jiefengjin from '/@/views/fengjin/jiefengjin.vue';
	import caozuojilu from '/@/views/fengjin/caozuojilu.vue';
	const activeName = ref('one')
	const handleClick = (tab: TabsPaneContext, event: Event) => {
	  console.log(tab, event)
	}
	// 页面加载时
	onMounted(() => {
	});
</script>
