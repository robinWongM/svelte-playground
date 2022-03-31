import type { RequestHandler, RequestHandlerOutput, ResponseBody } from '@sveltejs/kit';
import axios from 'axios';
import type { AxiosError } from 'axios';

export const get: RequestHandler = ({ request }) => {
	const url = new URL(request.url);
	if (!url.searchParams.get('flow')) {
		const initFlowURLParams = new URLSearchParams({
			aal: url.searchParams.get('aal') || '',
			refresh: url.searchParams.get('refresh') || '',
			return_to: url.searchParams.get('return_to') || ''
		});
		const initFlowURL = `https://accounts.ecnc.link/kratos/self-service/login/browser?${initFlowURLParams.toString()}`;

		return {
			status: 307,
			headers: {
				location: initFlowURL
			}
		};
	}

	const getFlowURLParams = new URLSearchParams({
		id: url.searchParams.get('flow')
	});
	const getFlowURL = `https://accounts.ecnc.link/kratos/self-service/login/flows?${getFlowURLParams.toString()}`;
	return axios
		.get(getFlowURL, {
			headers: {
				cookie: request.headers.get('cookie')
			}
		})
		.then((res) => {
			if ((request.headers.get('user-agent') || '').toLowerCase().includes('lark')) {
				return axios
					.request({
						url: res.data.ui.action,
						method: res.data.ui.method,
						data: {
							method: 'oidc',
							provider: 'lark'
						}
					})
					.then((res) => {
						return {
							status: 200,
							headers: res.headers,
							body: res.data
						};
					});
			}
            if ((request.headers.get('user-agent') || '').toLowerCase().includes('micromessenger')) {
				return axios
					.request({
						url: res.data.ui.action,
						method: res.data.ui.method,
						data: {
							method: 'oidc',
							provider: 'wecom'
						}
					})
					.then((res) => {
						return {
							status: 200,
							headers: res.headers,
							body: res.data
						};
					});
            }

			return {
				status: 200,
				headers: res.headers,
				body: res.data.ui
			};
		})
		.catch((err) => {
            if (err.response?.data?.redirect_browser_to) {
                return {
                    status: 307,
                    headers: {
                        location: err.response.data.redirect_browser_to,
                        ...err.response.headers,
                    },
                }
            }
			return {
				status: 200,
				body: err.response.data
			};
		});
};
