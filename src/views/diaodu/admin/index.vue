<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入关键字" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="primary" class="ml10" @click="onOpenAddRole">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					创建融合线路
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="roleName" label="融合线路名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSign" label="线路类型" show-overflow-tooltip></el-table-column>
				<el-table-column prop="describe" label="可选厂商线路" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sort" label="线路CNAME域名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="备注" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="180">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditRole(scope.row)">编辑</el-button>
						<el-button size="small" text type="primary" @click="onOpenjiexi(scope.row)">线路解析</el-button>
						<el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="tableData.param.pageNum" background
				v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total">
			</el-pagination>
		</el-card>
		<AddRole ref="addRoleRef" />
		<EditRole ref="editRoleRef" />
		<jieAddRole ref="jieaddRoleRef" />
		<jieEditRole ref="jieeditRoleRef" />
		<tiRole ref="tiRoleRef" />
		<el-drawer v-model="drawer" title="页面融合线路" direction="rtl" :before-close="handleClose" size="80%">
			<el-card shadow="hover">
				<div class="system-user-search mb15">
					<el-input size="default" placeholder="请输入关键字" style="max-width: 180px"> </el-input>
					<el-button size="default" type="primary" class="ml10">
						<el-icon>
							<ele-Search />
						</el-icon>
						查询
					</el-button>
					<el-button size="default" type="primary" class="ml10" @click="jieonOpenAddRole">
						<el-icon>
							<ele-FolderAdd />
						</el-icon>
						添加解析记录
					</el-button>
					<el-button size="default" type="primary" class="ml10" @click="opentiRole">
						批量替换产商线路
					</el-button>
				</div>
				<el-table :data="tableData.data" :span-method="objectSpanMethod" style="width: 100%">
					<!-- <el-table-column type="selection" width="60" /> -->
					<el-table-column prop="roleName" label="解析线路" show-overflow-tooltip></el-table-column>
					<el-table-column label="厂商线路">
						<template #default="scope">
							<span>{{scope.row.roleSign}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template #default="scope">
							<span>{{scope.row.status}}</span>
						</template>
					</el-table-column>
					<el-table-column label="备注">
						<template #default="scope">
							<span>{{scope.row.describe}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180">
						<template #default="scope">
							<el-button size="small" text type="primary" @click="jieonOpenEditRole(scope.row)">编辑</el-button>
							<el-button size="small" text type="primary" @click="onOpenjiexi(scope.row)">启动</el-button>
							<el-button size="small" text type="primary" @click="onRowDel2(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
					:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="tableData.param.pageNum" background
					v-model:page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.total">
				</el-pagination>
			</el-card>
		</el-drawer>
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
	import AddRole from '/@/views/diaodu/admin/component/addRole.vue';
	import EditRole from '/@/views/diaodu/admin/component/editRole.vue';
	import jieAddRole from '/@/views/diaodu/admin/component/jieaddRole.vue';
	import jieEditRole from '/@/views/diaodu/admin/component/jieeditRole.vue';
	import tiRole from '/@/views/diaodu/admin/component/tiRole.vue';
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
			data: Array < TableData > ;
			total: number;
			loading: boolean;
			param: {
				pageNum: number;
				pageSize: number;
			};
		};
	}

	export default defineComponent({
		components: {
			AddRole,
			EditRole,
			jieAddRole,
			jieEditRole,
			tiRole
		},
		setup() {
			const addRoleRef = ref();
			const editRoleRef = ref();
			const jieaddRoleRef = ref();
			const jieeditRoleRef = ref();
			const tiRoleRef = ref();
			const drawer = ref(false)
			const state = reactive < TableDataState > ({
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
				let data = [{
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
						roleName: '555',
						roleSign: '4421',
						describe: '666',
						sort: 1,
						status: false,
						createTime: '233'
					},
					{
						roleName: '123',
						roleSign: '123',
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
			// 打开修改角色弹窗
			const onOpenjiexi = (row: Object) => {
				drawer.value = true
			};
			// 删除角色
			const onRowDel = (row: any) => {
				ElMessageBox.confirm(`您确定要删除该线路：“${row.roleName}”，是否继续?`, '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning',
					})
					.then(() => {
						ElMessage.success('删除成功');
					})
					.catch(() => {});
			};
			// 删除角色
			const onRowDel2 = (row: any) => {
				ElMessageBox.confirm(`您确定要删除该解析线路吗：“${row.roleName}”，是否继续?`, '提示', {
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

			const handleClose = (done: () => void) => {
				done()
			}
			
			// 解析 
			// 打开新增角色弹窗
			const jieonOpenAddRole = () => {
				jieaddRoleRef.value.openDialog();
			};
			// 打开修改角色弹窗
			const jieonOpenEditRole = (row: Object) => {
				jieeditRoleRef.value.openDialog(row);
			};
			const opentiRole = (row: Object) => {
				tiRoleRef.value.openDialog(row);
			};
			const objectSpanMethod = ({
			  row,
			  column,
			  rowIndex,
			  columnIndex,
			}: SpanMethodProps) => {
			  if (columnIndex === 0) {
			    if (rowIndex % 2 === 0) {
			      return {
			        rowspan: 2,
			        colspan: 1,
			      }
			    } else {
			      return {
			        rowspan: 1,
			        colspan: 0,
			      }
			    }
			  }
			}
			
			// 页面加载时
			onMounted(() => {
				initTableData();
			});
			return {
				addRoleRef,
				editRoleRef,
				jieaddRoleRef,
				jieeditRoleRef,
				tiRoleRef,
				onOpenAddRole,
				onOpenEditRole,
				onRowDel,
				onRowDel2,
				onHandleSizeChange,
				onHandleCurrentChange,
				drawer,
				handleClose,
				onOpenjiexi,
				jieonOpenAddRole,
				jieonOpenEditRole,
				opentiRole,
				objectSpanMethod,
				...toRefs(state),
			};
		},
	});
</script>
