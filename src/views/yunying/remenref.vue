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
			
			<div class="home-card-item">
				<el-table :data="tableData.data" style="width: 100%">
					<el-table-column type="index" label="排名" width="60" />
					<el-table-column prop="roleName" label="Referer" show-overflow-tooltip></el-table-column>
					<el-table-column prop="roleName" label="流量" show-overflow-tooltip></el-table-column>
					<el-table-column prop="roleName" label="流量占比" show-overflow-tooltip></el-table-column>
					<el-table-column prop="roleName" label="请求数" show-overflow-tooltip></el-table-column>
					<el-table-column prop="roleName" label="请求书占比" show-overflow-tooltip></el-table-column>
				</el-table>
				<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange"
					class="mt15" :pager-count="5" :page-sizes="[10, 20, 30]"
					v-model:current-page="tableData.param.pageNum" background
					v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
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


	export default defineComponent({
		setup() {
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

			const radio1 = ref('今天')

			
			onMounted(() => {
				initTableData();
			});

			return {
				radio1,
				...toRefs(state)
			};
		},
	});
</script>
