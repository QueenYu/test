<template>
	<div class="home-container">
		<el-row :gutter="15" class="home-card-one mb15">
			<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(v, k) in homeOne" :key="k"
				:class="{ 'home-media home-media-lg': k > 1, 'home-media-sm': k === 1 }">
				<div class="home-card-item flex">
					<div class="flex-margin flex w100" :class="` home-one-animation${k}`">
						<div class="home-card-item-icon flex mr15" :style="{ background: `var(${v.color2})` }">
							<i class="flex-margin font32" :class="v.num4" :style="{ color: `var(${v.color3})` }"></i>
						</div>
						<div class="flex-auto">
							<span class="font30">{{ v.num1 }}</span>
							<div class="mt10">{{ v.num2 }}</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" class="home-card-one mb15">
			<el-col>
				<div class="home-card-item">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="roleName" label="类型" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="厂商" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="总任务数字" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="处理中" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="成功" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="失败" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="成功率" show-overflow-tooltip></el-table-column>
					</el-table>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="15" class="home-card-two mb15">
			<el-col>
				<div class="system-user-search mb15">
					<span class="form-span">时间范围</span>
					<el-date-picker style="max-width: 220px" type="datetimerange" range-separator="-"
						start-placeholder="开始时间" end-placeholder="结束时间" size="default" />
					<span class="form-span">时间粒度</span>
					<el-select size="default" placeholder="请选择" clearable style="max-width: 150px">
						<el-option key="1" label="5分钟" value="1" />
						<el-option key="2" label="1小时" value="2" />
						<el-option key="3" label="1天" value="3" />
					</el-select>
					<span class="form-span">操作类型</span>
					<el-select size="default" placeholder="请选择" clearable style="max-width: 150px">
						<el-option key="1" label="刷新" value="1" />
						<el-option key="2" label="预取" value="2" />
					</el-select>
					<span class="form-span">统计方式</span>
					<el-select size="default" placeholder="请选择" clearable style="max-width: 150px">
						<el-option key="1" label="按整体" value="1" />
						<el-option key="2" label="按厂商" value="2" />
					</el-select>
					<el-button size="default" type="primary" class="ml10">
						<el-icon>
							<ele-Search />
						</el-icon>
						查询
					</el-button>
				</div>
				<div class="home-card-item">
					<div style="height: 100%" ref="homeLineRef"></div>
				</div>
				<div class="home-card-item">
					<div style="height: 100%" ref="homeBarRef"></div>
				</div>
			</el-col>
		</el-row>
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

	let global: any = {
		homeChartOne: null,
		homeChartTwo: null,
		homeCharThree: null,
		dispose: [null, '', undefined],
	};

	export default defineComponent({
		name: 'home',
		setup() {
			const homeLineRef = ref();
			const homePieRef = ref();
			const homeBarRef = ref();
			const storesTagsViewRoutes = useTagsViewRoutes();
			const storesThemeConfig = useThemeConfig();
			const {
				themeConfig
			} = storeToRefs(storesThemeConfig);
			const {
				isTagsViewCurrenFull
			} = storeToRefs(storesTagsViewRoutes);
			const state = reactive({
				homeOne: [{
						num1: '12512',
						num2: '总任务数',
						num4: 'fa',
						color1: '#FF6462',
						color2: '--next-color-primary-lighter',
						color3: '--el-color-primary',
					},
					{
						num1: '65333',
						num2: '处理中任务数',
						num4: 'iconfont',
						color1: '#6690F9',
						color2: '--next-color-success-lighter',
						color3: '--el-color-success',
					},
					{
						num1: '7050',
						num2: '处理中任务数',
						num4: 'iconfont',
						color1: '#6690F9',
						color2: '--next-color-warning-lighter',
						color3: '--el-color-warning',
					},
					{
						num1: '52',
						num2: '失败任务数',
						num4: 'fa',
						color1: '#FF6462',
						color2: '--next-color-danger-lighter',
						color3: '--el-color-danger',
					},
				],
				homeThree: [{
						icon: 'iconfont icon-yangan',
						label: '浅粉红',
						value: '2.1%OBS/M',
						iconColor: '#F72B3F',
					},
					{
						icon: 'iconfont icon-wendu',
						label: '深红(猩红)',
						value: '30℃',
						iconColor: '#91BFF8',
					},
					{
						icon: 'iconfont icon-shidu',
						label: '淡紫红',
						value: '57%RH',
						iconColor: '#88D565',
					},
					{
						icon: 'iconfont icon-shidu',
						label: '弱紫罗兰红',
						value: '107w',
						iconColor: '#88D565',
					},
					{
						icon: 'iconfont icon-zaosheng',
						label: '中紫罗兰红',
						value: '57DB',
						iconColor: '#FBD4A0',
					},
					{
						icon: 'iconfont icon-zaosheng',
						label: '紫罗兰',
						value: '57PV',
						iconColor: '#FBD4A0',
					},
					{
						icon: 'iconfont icon-zaosheng',
						label: '暗紫罗兰',
						value: '517Cpd',
						iconColor: '#FBD4A0',
					},
					{
						icon: 'iconfont icon-zaosheng',
						label: '幽灵白',
						value: '12kg',
						iconColor: '#FBD4A0',
					},
					{
						icon: 'iconfont icon-zaosheng',
						label: '海军蓝',
						value: '64fm',
						iconColor: '#FBD4A0',
					},
				],
				myCharts: [],
				charts: {
					theme: '',
					bgColor: '',
					color: '#303133',
				},
			});
			// 折线图
			const initLineChart = () => {
				if (!global.dispose.some((b: any) => b === global.homeChartOne)) global.homeChartOne.dispose();
				global.homeChartOne = < any > echarts.init(homeLineRef.value, state.charts.theme);
				const option = {
					backgroundColor: state.charts.bgColor,
					title: {
						text: '刷新预取平均耗时',
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
						name: '时长',
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: '#f5f5f5'
							}
						},
					}, ],
					series: [{
						name: '测试1',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 10],
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
				( < any > global.homeChartOne).setOption(option);
				( < any > state.myCharts).push(global.homeChartOne);
			};

			const initBarChart = () => {
				if (!global.dispose.some((b: any) => b === global.homeCharThree)) global.homeCharThree
					.dispose();
				global.homeCharThree = < any > echarts.init(homeBarRef.value, state.charts.theme);
				const option = {
					backgroundColor: state.charts.bgColor,
					title: {
						text: '刷新预取平均数量',
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
						data: ['数量'],
						right: 0
					},
					xAxis: {
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					},
					yAxis: [{
						type: 'value',
						name: '次',
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: '#f5f5f5'
							}
						},
					}, ],
					series: [{
						name: '测试1',
						type: 'line',
						symbolSize: 6,
						symbol: 'circle',
						smooth: true,
						data: [222, 411, 30.4, 651, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 110],
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
				( < any > global.homeCharThree).setOption(option);
				( < any > state.myCharts).push(global.homeCharThree);
			};
			// 批量设置 echarts resize
			const initEchartsResizeFun = () => {
				nextTick(() => {
					for (let i = 0; i < state.myCharts.length; i++) {
						setTimeout(() => {
							( < any > state.myCharts[i]).resize();
						}, i * 1000);
					}
				});
			};
			// 批量设置 echarts resize
			const initEchartsResize = () => {
				window.addEventListener('resize', initEchartsResizeFun);
			};
			// 页面加载时
			onMounted(() => {
				initEchartsResize();
			});
			// 由于页面缓存原因，keep-alive
			onActivated(() => {
				initEchartsResizeFun();
			});
			// 监听 vuex 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
			watch(
				() => isTagsViewCurrenFull.value,
				() => {
					initEchartsResizeFun();
				}
			);
			// 监听 vuex 中是否开启深色主题
			watch(
				() => themeConfig.value.isIsDark,
				(isIsDark) => {
					nextTick(() => {
						state.charts.theme = isIsDark ? 'dark' : '';
						state.charts.bgColor = isIsDark ? 'transparent' : '';
						state.charts.color = isIsDark ? '#dadada' : '#303133';
						setTimeout(() => {
							initLineChart();
						}, 500);
						setTimeout(() => {
							initPieChart();
						}, 700);
						setTimeout(() => {
							initBarChart();
						}, 1000);
					});
				}, {
					deep: true,
					immediate: true,
				}
			);

			const tableData = ref([{
					roleName: '123',
					roleSign: '123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				},
				{
					roleName: '123',
					roleSign: '123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				},
				{
					roleName: '123',
					roleSign: '123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				}
			]);

			return {
				homeLineRef,
				homePieRef,
				homeBarRef,
				tableData,
				...toRefs(state),
			};
		},
	});
</script>

<style scoped lang="scss">
	$homeNavLengh: 8;

	.home-container {
		overflow: hidden;

		.home-card-one,
		.home-card-two,
		.home-card-three {
			.home-card-item {
				width: 100%;
				height: 130px;
				border-radius: 4px;
				transition: all ease 0.3s;
				padding: 20px;
				overflow: hidden;
				background: var(--el-color-white);
				color: var(--el-text-color-primary);
				border: 1px solid var(--next-border-color-light);

				&:hover {
					box-shadow: 0 2px 12px var(--next-color-dark-hover);
					transition: all ease 0.3s;
				}

				&-icon {
					width: 70px;
					height: 70px;
					border-radius: 100%;
					flex-shrink: 1;

					i {
						color: var(--el-text-color-placeholder);
					}
				}

				&-title {
					font-size: 15px;
					font-weight: bold;
					height: 30px;
				}
			}
		}

		.home-card-one {
			@for $i from 0 through 3 {
				.home-one-animation#{$i} {
					opacity: 0;
					animation-name: error-num;
					animation-duration: 0.5s;
					animation-fill-mode: forwards;
					animation-delay: calc($i/10) + s;
				}
			}
		}

		.home-card-two,
		.home-card-three {
			.home-card-item {
				height: 400px;
				width: 100%;
				overflow: hidden;

				.home-monitor {
					height: 100%;

					.flex-warp-item {
						width: 25%;
						height: 111px;
						display: flex;

						.flex-warp-item-box {
							margin: auto;
							text-align: center;
							color: var(--el-text-color-primary);
							display: flex;
							border-radius: 5px;
							background: var(--next-bg-color);
							cursor: pointer;
							transition: all 0.3s ease;

							&:hover {
								background: var(--el-color-primary-light-9);
								transition: all 0.3s ease;
							}
						}

						@for $i from 0 through $homeNavLengh {
							.home-animation#{$i} {
								opacity: 0;
								animation-name: error-num;
								animation-duration: 0.5s;
								animation-fill-mode: forwards;
								animation-delay: calc($i/10) + s;
							}
						}
					}
				}
			}
		}
	}
</style>
