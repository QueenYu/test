<template>
	<div class="system-add-role-container">
		<el-dialog title="添加厂商线路" v-model="isShowDialog" width="569px">
			<el-form :model="ruleForm" size="default" label-width="120px">
				<el-form-item label="厂商名称">
					<el-select size="default" placeholder="请选择" clearable>
						<el-option key="1" label="联通CDN" value="1" />
						<el-option key="2" label="电信云" value="2" />
						<el-option key="3" label="移动云" value="3" />
					</el-select>
				</el-form-item>
				<el-form-item label="线路类型">
					<el-select size="default" placeholder="请选择" clearable>
						<el-option key="1" label="图片小文件" value="1" />
						<el-option key="2" label="音视频点播" value="2" />
						<el-option key="3" label="大文件下载" value="3" />
					</el-select>
				</el-form-item>
				<el-form-item label="厂商CNAME域名">
					<el-input v-model="ruleForm.roleName" placeholder="请输入厂商CNAME域名" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="ruleForm.roleName" type="textarea" :rows="4" placeholder="请输入备注" clearable>
					</el-input>
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
	import {
		reactive,
		toRefs,
		defineComponent
	} from 'vue';

	// 定义接口来定义对象的类型
	interface MenuDataTree {
		id: number;
		label: string;
		children ? : MenuDataTree[];
	}
	interface RoleState {
		isShowDialog: boolean;
		ruleForm: {
			roleName: string;
			describe: string;
		};
		menuData: Array < MenuDataTree > ;
		menuProps: {
			children: string;
			label: string;
		};
	}

	export default defineComponent({
		setup() {
			const state = reactive < RoleState > ({
				isShowDialog: false,
				ruleForm: {
					roleName: '', // 名称
					describe: '', // 描述
				},
				menuData: [],
				menuProps: {
					children: 'children',
					label: 'label',
				},
			});
			// 打开弹窗
			const openDialog = () => {
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
			// 获取菜单结构数据
			const getMenuData = () => {
				state.menuData = [{
						id: 1,
						label: '系统管理',
						children: [{
								id: 11,
								label: '菜单管理',
								children: [{
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
								children: [{
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
								children: [{
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
						children: [{
								id: 21,
								label: '前端控制',
								children: [{
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
								children: [{
									id: 221,
									label: '页面权限',
								}, ],
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
				...toRefs(state),
			};
		},
	});
</script>

<style scoped lang="scss">
	.system-add-role-container {
		.menu-data-tree {
			width: 100%;
			border: 1px solid var(--el-border-color);
			border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
			padding: 5px;
		}
	}
</style>
