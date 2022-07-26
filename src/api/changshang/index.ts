import request from '/@/utils/request';

/**
 * @method firmslist 列表
 * @method firmsedit 编辑
 * @method firmsadd 添加
 * @method firmsdel 删除
 * @method firmsall 所有厂商
 * @method firmLineslist 列表
 * @method firmLinesedit 编辑
 * @method firmLinesadd 添加
 * @method firmLinesdel 删除
 */
export function firms() {
	return {
		firmslist: (params: any) => {
			return request({
				url: '/rest/web/v1/firms',
				method: 'get',
				params: params,
			});
		},
		firmsedit: (params: any) => {
			return request({
				url: '/rest/web/v1/firms',
				method: 'put',
				data: params,
			});
		},
		firmsadd: (params: any) => {
			return request({
				url: '/rest/web/v1/firms',
				method: 'post',
				data: params,
			});
		},
		firmsdel: (params: any) => {
			return request({
				url: '/rest/web/v1/firms/'+params,
				method: 'delete'
			});
		},
	};
}

export function firmLines() {
	return {
		firmsall: () => {
			return request({
				url: '/rest/web/v1/firms/list',
				method: 'get'
			});
		},
		firmLineslist: (params: any) => {
			return request({
				url: '/rest/web/v1/firmLines',
				method: 'get',
				params: params,
			});
		},
		firmLinesedit: (params: any) => {
			return request({
				url: '/rest/web/v1/firmLines',
				method: 'put',
				data: params,
			});
		},
		firmLinesadd: (params: any) => {
			return request({
				url: '/rest/web/v1/firmLines',
				method: 'post',
				data: params,
			});
		},
		firmLinesdel: (params: any) => {
			return request({
				url: '/rest/web/v1/firmLines/'+params,
				method: 'delete'
			});
		},
	};
}
