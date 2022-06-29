<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="流量宽带" name="one">
					 <liuliangkuandai v-if="activeName=='one'" />
				</el-tab-pane>
				<el-tab-pane label="访问统计" name="two">
					<fangwentongji v-if="activeName=='two'"/>
				</el-tab-pane>
				<el-tab-pane label="回源统计" name="three">
					 <huiyuantongji v-if="activeName=='three'"/>
				</el-tab-pane>
				<el-tab-pane label="命中率" name="four">
					 <mingzhonglu v-if="activeName=='four'"/>
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
	import liuliangkuandai from '/@/views/ziyuan/liuliangkuandai.vue';
	import fangwentongji from '/@/views/ziyuan/fangwentongji.vue';
	import huiyuantongji from '/@/views/ziyuan/huiyuantongji.vue';
	import mingzhonglu from '/@/views/ziyuan/mingzhonglu.vue';
	const activeName = ref('one')
	const handleClick = (tab: TabsPaneContext, event: Event) => {
	  console.log(tab, event)
	}
	// 页面加载时
	onMounted(() => {
	});
</script>
