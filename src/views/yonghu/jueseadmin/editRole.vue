<template>
	<div class="system-edit-role-container">
		<el-dialog title="编辑用户" v-model="isShowDialog" width="569px">
			<el-form :model="ruleForm" size="default" label-width="110px">
				<h4 style="margin-bottom:20px">基本信息</h4>
				<el-form-item label="角色名称">
					<el-input v-model="ruleForm.roleName" placeholder="请输入角色名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="ruleForm.describe" type="textarea" :rows="4" placeholder="请输入" ></el-input>
				</el-form-item>
				<h4 style="margin-bottom:20px">设置角色权限</h4>
				<el-form-item label="选择功能权限">
					<el-checkbox  label="厂商管理" size="mini" />
					<el-checkbox  label="域名管理" size="mini" />
					<el-checkbox  label="证书管理" size="mini" />
					<el-checkbox  label="调度管理" size="mini" />
					<el-checkbox  label="刷新预热" size="mini" />
					<el-checkbox  label="封禁" size="mini" />
					<el-checkbox  label="资源监控" size="mini" />
					<el-checkbox  label="用户中心" size="mini" />
				</el-form-item>
				<el-form-item label="用户中心">
					<el-table :data="datare" style="width: 100%">
						<el-table-column prop="roleName" label="功能" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作" width="200">
							<template #default="scope">
								<el-switch
								    class="ml-2"
								    style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
								  />
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent,ref } from 'vue';

// 定义接口来定义对象的类型
interface MenuDataTree {
	id: number;
	label: string;
	children?: MenuDataTree[];
}
interface DialogRow {
	roleName: string;
	roleSign: string;
	sort: number;
	status: boolean;
	describe: string;
}
interface RoleState {
	isShowDialog: boolean;
	ruleForm: DialogRow;
	menuData: Array<MenuDataTree>;
	menuProps: {
		children: string;
		label: string;
	};
}

export default defineComponent({
	name: 'systemEditRole',
	setup() {
		const state = reactive<RoleState>({
			isShowDialog: false,
			ruleForm: {
				roleName: '', // 角色名称
				roleSign: '', // 角色标识
				sort: 0, // 排序
				status: true, // 角色状态
				describe: '', // 角色描述
			},
			menuData: [],
			menuProps: {
				children: 'children',
				label: 'label',
			},
		});
		// 打开弹窗
		const openDialog = (row: DialogRow) => {
			state.ruleForm = row;
			state.isShowDialog = true;
			getMenuData();
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			closeDialog();
		};
		
		const datare = ref([
				{
					roleName: '基本信息',
					roleSign:'123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				},
				{
					roleName: '用户管理',
					roleSign:'123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				},
				{
					roleName: '角色管理',
					roleSign:'123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				},
				{
					roleName: '安全设置',
					roleSign:'123',
					describe: '123',
					sort: 1,
					status: false,
					createTime: '12'
				}
			])
		
		// 获取菜单结构数据
		const getMenuData = () => {
			state.menuData = [
				{
					id: 1,
					label: '系统管理',
					children: [
						{
							id: 11,
							label: '菜单管理',
							children: [
								{
									id: 111,
									label: '菜单新增',
								},
								{
									id: 112,
									label: '菜单修改',
								},
								{
									id: 113,
									label: '菜单删除',
								},
								{
									id: 114,
									label: '菜单查询',
								},
							],
						},
						{
							id: 12,
							label: '角色管理',
							children: [
								{
									id: 121,
									label: '角色新增',
								},
								{
									id: 122,
									label: '角色修改',
								},
								{
									id: 123,
									label: '角色删除',
								},
								{
									id: 124,
									label: '角色查询',
								},
							],
						},
						{
							id: 13,
							label: '用户管理',
							children: [
								{
									id: 131,
									label: '用户新增',
								},
								{
									id: 132,
									label: '用户修改',
								},
								{
									id: 133,
									label: '用户删除',
								},
								{
									id: 134,
									label: '用户查询',
								},
							],
						},
					],
				},
				{
					id: 2,
					label: '权限管理',
					children: [
						{
							id: 21,
							label: '前端控制',
							children: [
								{
									id: 211,
									label: '页面权限',
								},
								{
									id: 212,
									label: '页面权限',
								},
							],
						},
						{
							id: 22,
							label: '后端控制',
							children: [
								{
									id: 221,
									label: '页面权限',
								},
							],
						},
					],
				},
			];
		};
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			datare,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.system-edit-role-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
