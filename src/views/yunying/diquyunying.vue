<template>
	<div class="system-role-container">
		<el-card shadow="hover">
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
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
			</div>
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
			</div>
			<h3 class="mb15">地区分布</h3>
			<div style="text-align:left;" class="mb15">
				
				<el-radio-group v-model="radio2">
					<el-radio-button label="流量" size="default" />
					<el-radio-button label="带宽" size="default" />
					<el-radio-button label="请求数" size="default" />
				</el-radio-group>
			</div>
			<div class="home-card-item jiankongs" style="display:flex;">
				<div style="height: 100%;width:50%" ref="myEchart1"></div>
				<div style="width:50%;" class="ml20 mr20">
					<el-table :data="tableData.data" style="width: 100%">
						<el-table-column prop="roleName" label="地区" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleName" label="流量" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleName" label="流量占比" show-overflow-tooltip></el-table-column>
					</el-table>
					<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
						class="mt15" :pager-count="5" :page-sizes="[10, 20, 30]"
						v-model:current-page="tableData.param.pageNum" background
						v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.total">
					</el-pagination>
				</div>
			</div>
			<h3 class="mb15">运营商分布</h3>
			<div style="text-align:left;" class="mb15">
				<el-radio-group v-model="radio2">
					<el-radio-button label="流量" size="default" />
					<el-radio-button label="带宽" size="default" />
					<el-radio-button label="请求数" size="default" />
				</el-radio-group>
			</div>
			<div class="home-card-item jiankongs" style="display:flex;">
				<div style="height: 100%;width:50%" ref="myEchart2"></div>
				<div style="width:50%;" class="ml20 mr20">
					<el-table :data="tableData.data" style="width: 100%">
						<el-table-column prop="roleName" label="地区" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleName" label="流量" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleName" label="流量占比" show-overflow-tooltip></el-table-column>
					</el-table>
					<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
						class="mt15" :pager-count="5" :page-sizes="[10, 20, 30]"
						v-model:current-page="tableData.param.pageNum" background
						v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
						:total="tableData.total">
					</el-pagination>
				</div>
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

			let global: any = {
				homeChartOne: null,
				homeChartTwo: null,
				homeCharThree: null,
				dispose: [null, '', undefined],
			};

			const state = reactive({
				tableData: {
					data: [],
					total: 0,
					loading: false,
					param: {
						pageNum: 1,
						pageSize: 10,
					},
				},
				charts: {
					theme: '',
					bgColor: '',
					color: '#303133',
				},
			});
			// 初始化表格数据
			const initTableData = () => {
				let data = [
					{
						roleName: '123',
						roleSign:'123',
						describe: '123',
						sort: 1,
						status: false,
						createTime: '12'
					},
					{
						roleName: '123',
						roleSign:'123',
						describe: '123',
						sort: 1,
						status: false,
						createTime: '12'
					},
					{
						roleName: '123',
						roleSign:'123',
						describe: '123',
						sort: 1,
						status: false,
						createTime: '12'
					}
				]
				state.tableData.data = data;
				state.tableData.total = state.tableData.data.length;
			};

			let myEchart1 = ref();
			let myEchart2 = ref();
			const radio1 = ref('今天')
			const radio2 = ref('流量')

			
			onMounted(() => {
				initEchartsResize();
				initTableData();
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
						top: 10,
						right: 50,
						bottom: 30,
						left: 50
					},
					legend: {
						data: ['耗时'],
						right: 0
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01]
					},
					yAxis: {
						type: 'category',
						data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
					},
					series: [{
						name: '2011',
						type: 'bar',
						data: [18203, 23489, 29034, 104970, 131744, 630230],
						barWidth: '15',
						lineStyle: {
							color: '#fe9a8b'
						},
						itemStyle: {
							color: '#fe9a8b',
							borderColor: '#fe9a8b'
						},
					}]
				};
				let myChart1 = echarts.init(myEchart1.value);
				myChart1.setOption(option);
			}

			function reads2() {
				const option = {
					tooltip: {
					    trigger: 'item',
					  },
					  legend: {
					   top: 'bottom',
					   right: 50,
					   bottom: 30,
					   left: 50
					  },
					  series: [
					    {
					      name: 'Access From',
					      type: 'pie',
					      radius: ['40%', '70%'],
					      avoidLabelOverlap: false,
					      label: {
					        show: false,
					        position: 'center'
					      },
					      emphasis: {
					        label: {
					          show: true,
					          fontSize: '10',
					          fontWeight: 'bold'
					        }
					      },
					      labelLine: {
					        show: true
					      },
					      data: [
					        { value: 1048, name: '电信'},
					        { value: 735, name: '联通'},
					        { value: 580, name: '其他'},
					        { value: 484, name: '移动'},
					        { value: 300, name: '教育网'}
					      ]
					    }
					  ]
				};
				let myChart2 = echarts.init(myEchart2.value);
				myChart2.setOption(option);
			}
			watch([radio2], (newValue: any, oldValue: any) => { //直接监听
				reads1();
				reads2();
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
						reads2();
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
				...toRefs(state)
			};
		},
	});
</script>
