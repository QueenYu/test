<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入关键字" style="max-width: 180px" v-model="tableData.param.name"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click="search()">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="primary" class="ml10" @click="onOpenAddRole">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					添加厂商
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="厂商名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditRole(scope.row)">编辑</el-button>
						<el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="tableData.param.page" background
				v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total">
			</el-pagination>
		</el-card>
		<AddRole ref="addRoleRef" @fatherMethod="initTableData"/>
		<EditRole ref="editRoleRef" />
	</div>
</template>

<script lang="ts">
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
	import AddRole from '/@/views/changshang/component/addRole.vue';
	import EditRole from '/@/views/changshang/component/editRole.vue';
	import {
		firms
	} from '/@/api/changshang/index';

	export default defineComponent({
		name: 'systemRole',
		components: {
			AddRole,
			EditRole
		},
		setup() {
			const addRoleRef = ref();
			const editRoleRef = ref();
			const changshang = firms();
			const state = reactive({
				tableData: {
					data: [],
					total: 0,
					loading: false,
					param: {
						page: 1,
						pageSize: 10,
						name:''
					},
				},
			});
			// 初始化表格数据
			const initTableData = () => {
				changshang.firmslist(state.tableData.param).then(res => {
					state.tableData.data = res.data.data.list;
					state.tableData.total = Number(res.data.data.total);
				})
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
				ElMessageBox.confirm(`您确定要删除该厂商：“${row.roleName}”，是否继续?`, '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					})
					.then(() => {
						changshang.firmsdel(row.id).then(res => {
							if(res.data.code == 200){
								ElMessage.success(res.data.msg);
								initTableData();
							}else{
								ElMessage.error(res.data.msg);
							}
							
						})
						
					})
					.catch(() => {});
			};
			// 分页改变
			const onHandleSizeChange = (val: number) => {
				state.tableData.param.pageSize = val;
				initTableData();
			};
			// 分页改变
			const onHandleCurrentChange = (val: number) => {
				state.tableData.param.page = val;
				initTableData();
			};
			
			const search = () => {
				initTableData();
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
				changshang,
				search,
				initTableData,
				...toRefs(state),
			};
		},
	});
</script>
