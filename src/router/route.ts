import { RouteRecordRaw } from 'vue-router';

/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `/@/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		redirect: '/changshang',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/changshang',
				name: 'changshang',
				component: () => import('/@/views/changshang/index.vue'),
				meta: {
					title: 'message.router.changshang',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'iconfont icon-shouye',
				}
			},
			{
				path: '/yuming',
				name: 'yuming',
				component: () => import('/@/views/yuming/index.vue'),
				meta: {
					title: 'message.router.yuming',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'iconfont icon-diqiu',
				}
			},
			{
				path: '/zhengshu',
				name: 'zhengshu',
				component: () => import('/@/views/zhengshu/index.vue'),
				meta: {
					title: 'message.router.zhengshu',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'iconfont icon-shenqingkaiban',
				}
			},
			{
				path: '/diaodu',
				name: 'diaodu',
				component: () => import('/@/views/diaodu/index.vue'),
				meta: {
					title: 'message.router.diaodu',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'iconfont icon-shuju',
				}
			},
			{
				path: '/shuaxin',
				name: 'shuaxin',
				component: () => import('/@/layout/routerView/parent.vue'),
				redirect: '/shuaxin/menu',
				meta: {
					title: 'message.router.shuaxin',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					icon: 'ele-Refresh',
				},
				children: [
					{
						path: '/shuaxin/yuqu',
						name: 'shuaxinyuqu',
						component: () => import('/@/views/shuaxin/yuqu/index.vue'),
						meta: {
							title: 'message.router.shuaxinyuqu',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-Refresh',
						},
					},
					{
						path: '/shuaxin/tongji',
						name: 'shuaxintongji',
						component: () => import('/@/views/shuaxin/tongji/index.vue'),
						meta: {
							title: 'message.router.shuaxintongji',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							icon: 'ele-Platform',
						},
					}
				],
			},
			{
				path: '/fengjin',
				name: 'fengjin',
				component: () => import('/@/views/fengjin/index.vue'),
				meta: {
					title: 'message.router.fengjin',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'ele-Lock',
				}
			},
			{
				path: '/ziyuan',
				name: 'ziyuan',
				component: () => import('/@/views/ziyuan/index.vue'),
				meta: {
					title: 'message.router.ziyuan',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'ele-CameraFilled',
				}
			},
			{
				path: '/yunying',
				name: 'yunying',
				component: () => import('/@/views/yunying/index.vue'),
				meta: {
					title: 'message.router.yunying',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'ele-Tools',
				}
			},
			{
				path: '/yonghu',
				name: 'yonghu',
				component: () => import('/@/views/yonghu/index.vue'),
				meta: {
					title: 'message.router.yonghu',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					icon: 'ele-User',
				}
			},
			// {
			// 	path: '/system',
			// 	name: 'system',
			// 	component: () => import('/@/layout/routerView/parent.vue'),
			// 	redirect: '/system/menu',
			// 	meta: {
			// 		title: 'message.router.system',
			// 		isLink: '',
			// 		isHide: false,
			// 		isKeepAlive: true,
			// 		isAffix: false,
			// 		isIframe: false,
			// 		icon: 'iconfont icon-xitongshezhi',
			// 	},
			// 	children: [
			// 		{
			// 			path: '/system/menu',
			// 			name: 'systemMenu',
			// 			component: () => import('/@/views/system/menu/index.vue'),
			// 			meta: {
			// 				title: 'message.router.systemMenu',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: 'iconfont icon-caidan',
			// 			},
			// 		},
			// 		{
			// 			path: '/system/role',
			// 			name: 'systemRole',
			// 			component: () => import('/@/views/system/role/index.vue'),
			// 			meta: {
			// 				title: 'message.router.systemRole',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: 'ele-ColdDrink',
			// 			},
			// 		},
			// 		{
			// 			path: '/system/user',
			// 			name: 'systemUser',
			// 			component: () => import('/@/views/system/user/index.vue'),
			// 			meta: {
			// 				title: 'message.router.systemUser',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: 'iconfont icon-icon-',
			// 			},
			// 		},
			// 		{
			// 			path: '/system/dept',
			// 			name: 'systemDept',
			// 			component: () => import('/@/views/system/dept/index.vue'),
			// 			meta: {
			// 				title: 'message.router.systemDept',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: 'ele-OfficeBuilding',
			// 			},
			// 		},
			// 		{
			// 			path: '/system/dic',
			// 			name: 'systemDic',
			// 			component: () => import('/@/views/system/dic/index.vue'),
			// 			meta: {
			// 				title: 'message.router.systemDic',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: 'ele-SetUp',
			// 			},
			// 		},
			// 	],
			// },
			// {
			// 	path: '/limits',
			// 	name: 'limits',
			// 	component: () => import('/@/layout/routerView/parent.vue'),
			// 	redirect: '/limits/frontEnd',
			// 	meta: {
			// 		title: 'message.router.limits',
			// 		isLink: '',
			// 		isHide: false,
			// 		isKeepAlive: true,
			// 		isAffix: false,
			// 		isIframe: false,
			// 		icon: 'iconfont icon-quanxian',
			// 	},
			// 	children: [
			// 		{
			// 			path: '/limits/frontEnd',
			// 			name: 'limitsFrontEnd',
			// 			component: () => import('/@/layout/routerView/parent.vue'),
			// 			redirect: '/limits/frontEnd/page',
			// 			meta: {
			// 				title: 'message.router.limitsFrontEnd',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: '',
			// 			},
			// 			children: [
			// 				{
			// 					path: '/limits/frontEnd/page',
			// 					name: 'limitsFrontEndPage',
			// 					component: () => import('/@/views/limits/frontEnd/page/index.vue'),
			// 					meta: {
			// 						title: 'message.router.limitsFrontEndPage',
			// 						isLink: '',
			// 						isHide: false,
			// 						isKeepAlive: true,
			// 						isAffix: false,
			// 						isIframe: false,
			// 						icon: '',
			// 					},
			// 				},
			// 				{
			// 					path: '/limits/frontEnd/btn',
			// 					name: 'limitsFrontEndBtn',
			// 					component: () => import('/@/views/limits/frontEnd/btn/index.vue'),
			// 					meta: {
			// 						title: 'message.router.limitsFrontEndBtn',
			// 						isLink: '',
			// 						isHide: false,
			// 						isKeepAlive: true,
			// 						isAffix: false,
			// 						isIframe: false,
			// 						icon: '',
			// 					},
			// 				},
			// 			],
			// 		},
			// 		{
			// 			path: '/limits/backEnd',
			// 			name: 'limitsBackEnd',
			// 			component: () => import('/@/layout/routerView/parent.vue'),
			// 			meta: {
			// 				title: 'message.router.limitsBackEnd',
			// 				isLink: '',
			// 				isHide: false,
			// 				isKeepAlive: true,
			// 				isAffix: false,
			// 				isIframe: false,
			// 				icon: '',
			// 			},
			// 			children: [
			// 				{
			// 					path: '/limits/backEnd/page',
			// 					name: 'limitsBackEndEndPage',
			// 					component: () => import('/@/views/limits/backEnd/page/index.vue'),
			// 					meta: {
			// 						title: 'message.router.limitsBackEndEndPage',
			// 						isLink: '',
			// 						isHide: false,
			// 						isKeepAlive: true,
			// 						isAffix: false,
			// 						isIframe: false,
			// 						icon: '',
			// 					},
			// 				},
			// 			],
			// 		},
			// 	],
			// }
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			isHide: true,
		},
	},
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/layout/index.vue'),
		meta: {
			title: '布局界面',
		},
		children: [
			// 请不要往这里 `children` 中添加内容，此内容为了防止 No match found for location with path "xxx" 问题
			...notFoundAndNoPower,
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	/**
	 * 提示：写在这里的为全屏界面，不建议写在这里
	 * 请写在 `dynamicRoutes` 路由数组中
	 */
	{
		path: '/visualizingDemo1',
		name: 'visualizingDemo1',
		component: () => import('/@/views/visualizing/demo1.vue'),
		meta: {
			title: 'message.router.visualizingLinkDemo1',
		},
	},
	{
		path: '/visualizingDemo2',
		name: 'visualizingDemo2',
		component: () => import('/@/views/visualizing/demo2.vue'),
		meta: {
			title: 'message.router.visualizingLinkDemo2',
		},
	},
];
