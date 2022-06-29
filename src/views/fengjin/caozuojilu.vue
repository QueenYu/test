<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<span class="form-span">添加时间</span>
				<el-date-picker
						style="max-width: 280px"
				      type="datetimerange"
				      range-separator="-"
				      start-placeholder="开始时间"
				      end-placeholder="结束时间"
					  size="default"
				    />
				<span class="form-span">类型</span>
				<el-select size="default" placeholder="请选择" clearable>
					<el-option key="1" label="所有类型" value="1" />
					<el-option key="2" label="文件刷新" value="2" />
					<el-option key="3" label="目录刷新" value="3" />
					<el-option key="3" label="文件预热" value="4" />
				</el-select>
				<el-input size="default" placeholder="请输入域名或URL" style="max-width: 180px; margin-left:10px;"></el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="roleName" label="操作内容" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleName" label="操作类型" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleName" label="添加时间" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleName" label="状态" show-overflow-tooltip></el-table-column>
				<el-table-column label="进度">
					<template #default="scope">
						<p>产商A-处理中</p>
						<p>产商B-处理中</p>
						<p>产商C-完成-成功</p>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageNum"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<AddRole ref="addRoleRef" />
		<EditRole ref="editRoleRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddRole from '/@/views/zhengshu/component/addRole.vue';
import EditRole from '/@/views/zhengshu/component/editRole.vue';

// 定义接口来定义对象的类型
interface TableData {
	roleName: string;
	roleSign: string;
	describe: string;
	sort: number;
	status: boolean;
	createTime: string;
}
interface TableDataState {
	tableData: {
		data: Array<TableData>;
		total: number;
		loading: boolean;
		param: {
			pageNum: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'systemRole',
	components: { AddRole, EditRole },
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
		const state = reactive<TableDataState>({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
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
		// 打开新增角色弹窗
		const onOpenAddRole = () => {
			addRoleRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditRole = (row: Object) => {
			editRoleRef.value.openDialog(row);
		};
		// 删除角色
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			addRoleRef,
			editRoleRef,
			onOpenAddRole,
			onOpenEditRole,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
