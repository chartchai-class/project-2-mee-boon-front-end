import apiClient from '@/services/AxiosCilent'
apiClient.interceptors.request.use(
    (request: any) => {
        const token = localStorage.getItem('access_token');
        console.log('token',token);
        if (token) {
            request.headers['Authorization'] = 'Bearer' + token;
        }
        return request;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)
