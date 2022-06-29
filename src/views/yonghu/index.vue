<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="基本信息" name="one">
					 <jibenxinxi v-if="activeName == 'one'"/>
				</el-tab-pane>
				<el-tab-pane label="用户管理" name="two">
					<yonghuguanli v-if="activeName == 'two'"/>
				</el-tab-pane>
				<el-tab-pane label="角色管理" name="three">
					 <jueseguanli v-if="activeName == 'three'"/>
				</el-tab-pane>
				<el-tab-pane label="安全设置" name="four">
					 <anquanshezhi v-if="activeName == 'four'"/>
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
	import jibenxinxi from '/@/views/yonghu/jibenxinxi.vue';
	import yonghuguanli from '/@/views/yonghu/yonghuguanli.vue';
	import jueseguanli from '/@/views/yonghu/jueseguanli.vue';
	import anquanshezhi from '/@/views/yonghu/anquanshezhi.vue';
	const activeName = ref('one')
	const handleClick = (tab: TabsPaneContext, event: Event) => {
	  console.log(tab, event)
	}
	// 页面加载时
	onMounted(() => {
	});
</script>
