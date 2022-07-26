<template>
	<div class="system-add-role-container">
		<el-dialog title="添加厂商" v-model="isShowDialog" width="569px">
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
interface RoleState {
	isShowDialog: boolean;
	ruleForm: {
		name: string;
		remark: string;
	};
}

export default defineComponent({
	setup(props, { emit }) {
		const changshang = firms();
		const state = reactive<RoleState>({
			isShowDialog: false,
			ruleForm: {
				name: "",
				remark: ""
			}
		});
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true;
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
			changshang.firmsadd(state.ruleForm).then(res => {
				state.isShowDialog = false;
				ElMessage.success({
					message: res.msg,
					type: "success"
				});
				emit('fatherMethod');
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
.system-add-role-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
