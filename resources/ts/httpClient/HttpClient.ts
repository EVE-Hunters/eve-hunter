import Axios from './axios';
import {AxiosInstance, AxiosResponse} from "axios";

interface QueryString {
    [index: string]: string|number
}

interface UrlParameters {
    [index: string]: string
}

interface PostRequest {
    data?: Object,
    urlParams?: UrlParameters,
}


abstract class HttpClient {
    protected readonly instance: AxiosInstance

    public constructor(url: string='') {
        let _url = window.location;
        this.instance = Axios.create({
            baseURL: `${window.location.origin}${url}`
        })

        this._initializeResponseInterceptor();
    }

    /**
     * Create a query strings off an object
     * @param params
     * @constructor
     * @private
     */
    private parseQueryString(params: QueryString){
        let keys = Object.keys(params)
        let _params: string[] = []

        keys.forEach( key => {
            _params.push(`${key}=${params[key]}`)
        })

        return _params.join('&')
    }

    protected get<T>(url: string, params: QueryString = {}): Promise<T> {
        let query_strings = this.parseQueryString(params);

        if(query_strings.length != 0){
            url += `?${query_strings}`
        }

        return this.instance.get(url);
    }


    protected post<T>(url: string, data: any={}): Promise<T> {
        return this.instance.post(url, data);
    }


    private _initializeResponseInterceptor = () => {
        this.instance.defaults.headers.common['Accept'] = 'application/json';
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError
        )
    }

    private _handleResponse = ({data}: AxiosResponse) => data

    private _handleError = (error: any) => Promise.reject(error)
}

export default HttpClient
