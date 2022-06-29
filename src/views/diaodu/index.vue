<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="厂商线路" name="first">
					 <xianlu />
				</el-tab-pane>
				<el-tab-pane label="融合线路管理" name="second">
					<admin />
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<!-- <AddRole ref="addRoleRef" />
		<EditRole ref="editRoleRef" /> -->
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
	import xianlu from '/@/views/diaodu/xianlu/index.vue';
	import admin from '/@/views/diaodu/admin/index.vue';
	const activeName = ref('first')
	const handleClick = (tab: TabsPaneContext, event: Event) => {
	  console.log(tab, event)
	}
	// 页面加载时
	onMounted(() => {
	});
</script>
