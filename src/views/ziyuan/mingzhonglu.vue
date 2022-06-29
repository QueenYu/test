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
			<div class="home-card-item jiankongs">
				<div style="height: 100%" ref="myEchart1"></div>
			</div>
			<el-row :gutter="15" class="home-card-one mb15">
				<el-col>
					<div class="home-card-item" v-if="radio2 == '流量命中率'">
						<el-table :data="tableData.data" style="width: 100%">
							<el-table-column prop="roleName" label="域名" show-overflow-tooltip></el-table-column>
							<el-table-column prop="roleSign" label="命中率" show-overflow-tooltip></el-table-column>
						</el-table>
						<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
							class="mt15" :pager-count="5" :page-sizes="[10, 20, 30]"
							v-model:current-page="tableData.param.pageNum" background
							v-model:page-size="tableData.param.pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
						</el-pagination>
					</div>
					<div class="home-card-item" v-if="radio2 == '请求命中率'">
						<el-table :data="tableData.data" style="width: 100%">
							<el-table-column prop="roleName" label="域名" show-overflow-tooltip></el-table-column>
							<el-table-column prop="roleSign" label="命中率" show-overflow-tooltip></el-table-column>
						</el-table>
						<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
							class="mt15" :pager-count="5" :page-sizes="[10, 20, 30]"
							v-model:current-page="tableData.param.pageNum" background
							v-model:page-size="tableData.param.pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
						</el-pagination>
					</div>
				</el-col>
			</el-row>
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
	import caozuojilu from '/@/views/shuaxin/yuqu/caozuojilu.vue';
	import mulushuaxin from '/@/views/shuaxin/yuqu/mulushuaxin.vue';
	import wenjianshuaxin from '/@/views/shuaxin/yuqu/wenjianshuaxin.vue';
	import wenjianyuqu from '/@/views/shuaxin/yuqu/wenjianyuqu.vue';
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
			const activeName = ref('one')
			const storesTagsViewRoutes = useTagsViewRoutes();
			const storesThemeConfig = useThemeConfig();
			const {
				themeConfig
			} = storeToRefs(storesThemeConfig);
			const {
				isTagsViewCurrenFull
			} = storeToRefs(storesTagsViewRoutes);
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

			let global: any = {
				homeChartOne: null,
				homeChartTwo: null,
				homeCharThree: null,
				dispose: [null, '', undefined],
			};

			const state = reactive({
				charts: {
					theme: '',
					bgColor: '',
					color: '#303133',
				},
			});

			let myEchart1 = ref();
			let myEchart2 = ref();
			const radio1 = ref('今天')
			const radio2 = ref('流量命中率')

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
						name: '流量命中率',
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
						name: '请求命中率',
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
				if (radio2.value == '流量命中率') {
					reads1();
				} else if (radio2.value == '请求命中率') {
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

			// 批量设置 echarts resize
			const initEchartsResize = () => {
				window.addEventListener('resize', initEchartsResizeFun);
			};

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
				myEchart2,
				radio1,
				radio2,
				activeName,
				tableData,
				...toRefs(state),
			};
		},
	});
</script>
