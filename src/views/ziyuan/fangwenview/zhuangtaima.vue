<template>
	<div class="system-role-container">
		<el-card shadow="hover">

			<div style="text-align:right;">
				<el-radio-group v-model="radio2">
					<el-radio-button label="2xx" size="default" />
					<el-radio-button label="3xx" size="default" />
					<el-radio-button label="4xx" size="default" />
					<el-radio-button label="5xx" size="default" />
				</el-radio-group>
			</div>
			<div class="home-card-item jiankongs">
				<div style="height: 100%" ref="myEchart1"></div>
			</div>
			<div class="home-card-item">
				<el-table :data="tableData.data" style="width: 100%">
					<el-table-column prop="roleName" label="状态码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="roleSign" label="总次数" show-overflow-tooltip></el-table-column>
					<el-table-column prop="roleSign" label="占比" show-overflow-tooltip></el-table-column>
				</el-table>
				<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
					class="mt15" :pager-count="5" :page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.pageNum" background
					v-model:page-size="tableData.param.pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
				</el-pagination>
			</div>
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
	import * as echarts from 'echarts';
	import {
		storeToRefs
	} from 'pinia';
	import {
		useThemeConfig
	} from '/@/stores/themeConfig';
	import {
		useTagsViewRoutes
	} from '/@/stores/tagsViewRoutes';
	export default defineComponent({
		setup() {
			const storesTagsViewRoutes = useTagsViewRoutes();
			const storesThemeConfig = useThemeConfig();
			const {
				themeConfig
			} = storeToRefs(storesThemeConfig);
			const {
				isTagsViewCurrenFull
			} = storeToRefs(storesTagsViewRoutes);

			const state = reactive({
				charts: {
					theme: '',
					bgColor: '',
					color: '#303133',
				},
			});

			let myEchart1 = ref();
			
			
			const tableData = ref({
				data: [{
					roleName: '123',
					roleSign: '123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				}],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			});
			
			const radio2 = ref('2xx')
			onMounted(() => {
				initEchartsResize();
			});
			function reads1() {
				const option = {
					backgroundColor: state.charts.bgColor,
					title: {
						text: '',
						x: 'left',
						textStyle: {
							fontSize: '15',
							color: state.charts.color
						},
					},
					grid: {
						top: 70,
						right: 20,
						bottom: 30,
						left: 30
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['耗时'],
						right: 0
					},
					xAxis: {
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					},
					yAxis: [{
						type: 'value',
						name: '',
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: '#f5f5f5'
							}
						},
					}, ],
					series: [{
						name: '200',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [1,1, 2, 1, 3, 15, 2, 3, 4, 5, 6, 10],
						lineStyle: {
							color: '#fe9a8b'
						},
						itemStyle: {
							color: '#fe9a8b',
							borderColor: '#fe9a8b'
						},
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#fe9a8bb3'
								},
								{
									offset: 1,
									color: '#fe9a8b03'
								},
							]),
						},
					}],
				};
				let myChart1 = echarts.init(myEchart1.value);
				myChart1.setOption(option);
			}
			
			watch([radio2], (newValue: any, oldValue: any) => { //直接监听
				reads1();
			});

			const initEchartsResizeFun = () => {
				nextTick(() => {
					for (let i = 0; i < state.myCharts.length; i++) {
						setTimeout(() => {
							( < any > state.myCharts[i]).resize();
						}, i * 1000);
					}
				});
			};

			const initEchartsResize = () => {
				window.addEventListener('resize', initEchartsResizeFun);
			};

			onActivated(() => {
				initEchartsResizeFun();
			});
		
			watch(
				() => isTagsViewCurrenFull.value,
				() => {
					initEchartsResizeFun();
				}
			);
			watch(
				() => themeConfig.value.isIsDark,
				(isIsDark) => {
					nextTick(() => {
						state.charts.theme = isIsDark ? 'dark' : '';
						state.charts.bgColor = isIsDark ? 'transparent' : '';
						state.charts.color = isIsDark ? '#dadada' : '#303133';
						reads1();
					});
				}, {
					deep: true,
					immediate: true,
				}
			);
			return {
				reads1,
				myEchart1,
				radio2,
				...toRefs(state),
				tableData
			};
		},
	});
</script>
