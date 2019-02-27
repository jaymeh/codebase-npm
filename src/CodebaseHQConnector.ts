import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
var parseString = require('xml2js').parseString;

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
        let response = await this.instance.get(this.apiUrl + endpointUrl);
        return this.responseToArray(response);
    }

    protected async post(endpointUrl: string, data: any) {
        // Parse the data into xml.

        let response = await this.instance.post(this.apiUrl + endpointUrl, data);
        return this.responseToArray(response);
    }

    /**
     * Converts an API response into an associative array, via XML
     * @param string $response
     * @return array
     */
    private responseToArray(response: AxiosResponse)
    {
        let data = response.data;
        var documentData = null;
        parseString(data, (err: any, result: any) => {
            documentData = result;
        });

        return documentData;
    }
}
