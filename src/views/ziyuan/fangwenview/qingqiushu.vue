<template>
	<div class="system-role-container">
		<el-card shadow="hover">

			<div style="display:flex;">
				<div style="text-align:left; width:50%;">
					<span v-if="radio2 == '请求数'">总请求数：0次</span>
					<span v-if="radio2 == 'QPS'">峰值QPS：0次/秒</span>
				</div>
				<div style="text-align:right; width:50%">
					<el-radio-group v-model="radio2">
						<el-radio-button label="请求数" size="default" />
						<el-radio-button label="QPS" size="default" />
					</el-radio-group>
				</div>

			</div>
			<div class="home-card-item jiankongs">
				<div style="height: 100%" ref="myEchart1"></div>
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
			const radio2 = ref('请求数')
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
						name: '请求数',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [0, 1, 2, 3, 4, 12, 22, 23, 21, 30, 53, 10],
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

			function reads2() {
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
						name: 'QPS',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [123, 55, 1234, 221, 55, 33, 22, 55, 31, 62, 531, 101],
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
				if (radio2.value == '请求数') {
					reads1();
				} else if (radio2.value == 'QPS') {
					reads2();
				}
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
				reads2,
				myEchart1,
				radio2,
				...toRefs(state),
			};
		},
	});
</script>
