import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export default class CodebaseHQConnector {
    private apiUser: string;
    private apiKey: string;
    private apiHostname: string;
    private apiUrl: string;
    private instance: AxiosInstance;

    constructor(
        apiUser: string,
        apiKey: string,
        apiHostname: string,
        apiUrl: string = 'https://api3.codebasehq.com'
    ) {
        this.apiUser = apiUser;
        this.apiKey = apiKey;
        this.apiHostname = apiHostname;
        this.apiUrl = apiUrl;
        let config: AxiosRequestConfig = {
            baseURL: this.apiUrl,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml',
            },
            auth: {
                username: apiKey,
                password: apiUser
            }
        };
        this.instance = axios.create(config);
    }

    protected async get(endpointUrl: string) {
        return await this.instance.get(this.apiUrl + endpointUrl);
    }

    protected async post(endpointUrl: string, data: any) {
        return await this.instance.post(this.apiUrl + endpointUrl, data);
    }
}
