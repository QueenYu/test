<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane label="PV/UV" name="one">
					 <pvpu v-if="activeName == 'one'"/>
				</el-tab-pane>
				<el-tab-pane label="地区运营商" name="two">
					<diquyunying v-if="activeName == 'two'"/>
				</el-tab-pane>
				<el-tab-pane label="域名排名" name="three">
					 <diyupaiming v-if="activeName == 'three'"/>
				</el-tab-pane>
				<el-tab-pane label="热门referer" name="four">
					 <remenref v-if="activeName == 'four'"/>
				</el-tab-pane>
				<el-tab-pane label="热门URL" name="five">
					 <remenurl v-if="activeName == 'five'"/>
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
	onMounted(() => {
	});
</script>
