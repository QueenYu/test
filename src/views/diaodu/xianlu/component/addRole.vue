<template>
	<div class="system-add-role-container">
		<el-dialog title="添加厂商线路" v-model="isShowDialog" width="569px">
			<el-form @submit.native.prevent ref="formRef" :rules="rules" :model="ruleForm" size="default"
				label-width="135px">
				<el-form-item label="厂商名称" prop="firmId">
					<el-select size="default" placeholder="请选择" v-model="ruleForm.firmId" clearable>
						<el-option :label="item.name" :value="item.id" v-for="(item,index) in namelist" />
					</el-select>
				</el-form-item>
				<el-form-item label="线路类型" prop="lineType">
					<el-select size="default" placeholder="请选择" v-model="ruleForm.lineType" clearable>
						<el-option label="图片小文件" :value="1" />
						<el-option label="音视频点播" :value="2" />
						<el-option label="大文件下载" :value="3" />
						<el-option label="视频直播" :value="4" />
					</el-select>
				</el-form-item>
				<el-form-item label="厂商CNAME域名" prop="cname">
					<el-input v-model="ruleForm.cname" placeholder="请输入厂商CNAME域名" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="ruleForm.remark" type="textarea" :rows="4" placeholder="请输入备注" clearable>
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
		defineComponent,
		onMounted,
		ref
	} from 'vue';
	import {
		firmLines
	} from '/@/api/changshang/index';
	import {
		ElMessageBox,
		ElMessage
	} from 'element-plus';
	export default defineComponent({
		setup(props, {
			emit
		}) {
			const changshang = firmLines();
			const state = reactive({
				isShowDialog: false,
				ruleForm: {
					cname: "",
					firmId: "",
					firmName: "",
					lineType: "",
					remark: "",
				}
			});

			// 验证
			const rules = reactive({
				firmId: [{
					required: true,
					message: '请选择厂商名称',
					trigger: 'change'
				}],
				lineType: [{
					required: true,
					message: '请选择线路类型',
					trigger: 'change'
				}],
				cname: [{
					required: true,
					message: '请输入厂商CNAME域名',
					trigger: 'blur'
				}],
			})

			// 打开弹窗
			const openDialog = () => {
				state.isShowDialog = true;
				Object.keys(state.ruleForm).map(key => {
					delete state.ruleForm[key]
				})
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
				if ((Object.keys(rules).filter(i => !state.ruleForm[i])).length <= 0) {
					namelist.value.forEach((item, index) => {
						if (item.id == state.ruleForm.firmId) {
							state.ruleForm.firmName = item.name
							changshang.firmLinesadd(state.ruleForm).then(res => {
								closeDialog();
								ElMessage.success({
									message: res.data.msg,
									type: "success"
								});
								emit('fatherMethod');
							})
						}
					});
				} else {
					ElMessage.warning('*号为必填项，请补全！')
				}
			};

			const namelist = ref([])
			onMounted(() => {
				changshang.firmsall().then(res => {
					namelist.value = res.data.data
				})
			})

			return {
				openDialog,
				closeDialog,
				onCancel,
				onSubmit,
				changshang,
				namelist,
				rules,
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
