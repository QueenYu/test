<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-select size="default" placeholder="请选择" clearable>
					<el-option key="1" label="全部厂商" value="1" />
					<el-option key="2" label="厂商A" value="2" />
					<el-option key="3" label="厂商B" value="3" />
					<el-option key="3" label="厂商C" value="4" />
				</el-select>
				<el-select size="default" placeholder="请选择" clearable style="margin-left:10px">
					<el-option key="1" label="全部域名" value="1" />
				</el-select>
				<el-select size="default" placeholder="请选择" clearable style="margin-left:10px">
					<el-option key="1" label="全部省份" value="1" />
				</el-select>
				<el-select size="default" placeholder="请选择" clearable style="margin-left:10px">
					<el-option key="1" label="全部运营商" value="1" />
				</el-select>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
			</div>
			<div class="system-user-search mb15">
				<el-radio-group v-model="radio1">
					<el-radio-button label="近6小时" size="default" />
					<el-radio-button label="近12小时" size="default" />
					<el-radio-button label="今天" size="default" />
					<el-radio-button label="昨天" size="default" />
					<el-radio-button label="近7天" size="default" />
					<el-radio-button label="近30天" size="default" />
				</el-radio-group>
				<el-date-picker style="max-width: 280px" type="datetimerange" range-separator="-"
					start-placeholder="开始时间" end-placeholder="结束时间" size="default" />
			</div>
			<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			    <el-tab-pane label="请求数" name="one">
					<qingqiushu v-if="activeName=='one'"/>
				</el-tab-pane>
			    <el-tab-pane label="状态码" name="two">
					<zhuangtaima v-if="activeName=='two'"/>
				</el-tab-pane>
			  </el-tabs>
		</el-card>
	</div>
</template>

<script lang="ts">
	import {
		toRefs,
		reactive,
		defineComponent,
		onMounted,
		ref,
		watch,
		nextTick,
		onActivated
	} from 'vue';
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus';
	import qingqiushu from '/@/views/ziyuan/fangwenview/qingqiushu.vue';
	import zhuangtaima from '/@/views/ziyuan/fangwenview/zhuangtaima.vue';
	export default defineComponent({
		components: { qingqiushu, zhuangtaima },
		setup() {
			const activeName = ref('one')
			const radio1 = ref('今天')
			const radio2 = ref('带宽')
			const handleClick = (tab: TabsPaneContext, event: Event) => {
			  console.log(tab, event)
			}
			return {
				radio1,
				radio2,
				activeName,
				handleClick,
			};
		},
	});
</script>
