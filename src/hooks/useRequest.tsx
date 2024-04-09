import axios, { AxiosRequestConfig } from "axios";
import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from "../utils/message";


// 默认请求参数
const defaultRequestConfig = {url: '/', method: 'GET', data: {}, params: {}};


function useRequest<T>(options: AxiosRequestConfig & {manual?:boolean} = defaultRequestConfig) {
    const [data, setData] = useState<T | null>(null);     // 请求返回的内容
    const [error, setError] = useState('');     // 返回的错误
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());
    const navigate = useNavigate();    

    const cancel = () => {
        controllerRef.current.abort();
    }
    
    const request = useCallback((requestOptions: AxiosRequestConfig) => {
        // 清空之前的请求状态和数据
        setData(null);
        setError('');
        setLoaded(false);

        // token 用于前端验证是否登录（实际是否登录由后端验证），因此不需要将 token 发送给后端
        // 后端在前端初次登录后返回 token 给前端，前端将其保存在浏览器 localStorage 内
        // 如果前端有 token，则表示每次请求后端，都是已登录状态
        // 如果前端没有 token，则表示在某次请求后端后，后端返回了未登录

        // 发送请求时，携带登录 token 给后端
        // const loginToken = localStorage.getItem('token');
        // const headers = loginToken ? {
        //     token: loginToken
        // } : {}

        // 发送请求
        return axios.request<T>({
            //baseURL: 'https://www.grocergo.site/',
            url: requestOptions?.url,
            method: requestOptions?.method,
            signal: controllerRef.current.signal,
            data: requestOptions?.data,
            params: requestOptions?.params,
            // headers: headers
        })
        .then((response) => {
            setData(response.data);
            return response.data;
        })
        .catch((e: any) => {
            if (e?.response?.status === 403) {
                localStorage.removeItem('token');         
                if (localStorage.getItem('location')) {
                    localStorage.removeItem('location');
                }
                navigate('/account/login');
            }
            setError(e.message || 'unknown request error');
            throw new Error(e);
        })
        .finally(() => {
            setLoaded(true);
        })    
    }, [navigate])

    // 使用 request() 方法必须传入参数，如果传入的参数与初始化 useRequest 时传入的 options 不一致，则自动重新发送请求
    useEffect(() => {
        if (!options.manual) {
            request(options).catch((e) => {
                message(e.message);
            })
        }
    }, [options, request])

    return {data, error, loaded, request, cancel};
} 

export default useRequest;