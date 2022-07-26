<template>
	<div class="system-edit-role-container">
		<el-dialog title="修改厂商" v-model="isShowDialog" width="569px">
			<el-form :model="ruleForm" size="default" label-width="90px">
				<el-form-item label="厂商名称">
					<el-input v-model="ruleForm.name" placeholder="请输入厂商名称" clearable></el-input>
				</el-form-item><el-form-item label="备注">
					<el-input v-model="ruleForm.remark" type="textarea" :rows="4" placeholder="请输入" ></el-input>
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
import { reactive, toRefs, defineComponent } from 'vue';
	import {
		firms
	} from '/@/api/changshang/index';
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus';
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
}

export default defineComponent({
	name: 'systemEditRole',
	setup() {
		const changshang = firms();
		const state = reactive<RoleState>({
			isShowDialog: false,
			ruleForm: {
				createTime: "",
				id: "",
				name: "",
				remark: "",
				updateTime: ""
			}
		});
		// 打开弹窗
		const openDialog = (row: DialogRow) => {
			state.ruleForm = row;
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			state.isShowDialog = false;
		};
		// 新增
		const onSubmit = () => {
			changshang.firmsadd(state.ruleForm).then(res => {
				state.isShowDialog = false;
			})
		};
		
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			changshang,
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
