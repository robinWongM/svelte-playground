import type { RequestHandler, RequestHandlerOutput, ResponseBody } from '@sveltejs/kit'
import axios from 'axios'
import type { AxiosError } from 'axios'

export const get: RequestHandler = ({ request }) => {
    return axios.get('https://accounts.ecnc.link/kratos/sessions/whoami', {
        headers: {
            cookie: request.headers.get('cookie')
        }
    })
    .then(({ status, headers, data }) => {
        return {
            status,
            headers,
            body: data,
        }
    })
    .catch((err: AxiosError) => {
        return {
            status: 200,
            headers: err.response?.headers || {},
            body: err.response?.data || {},
        }
    })
}