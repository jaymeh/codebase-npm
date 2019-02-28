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
            timeout: 5000,
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            },
            auth: {
              username: apiUser,
              password: apiKey
            }
        };

        this.instance = axios.create(config);
    }

    protected async get(endpointUrl: string) {
        let response = await this.instance.get(this.apiUrl + endpointUrl);
        let arrayResponse = await this.responseToArray(response);
        return arrayResponse;
    }

    protected async post(endpointUrl: string, data: any) {
        // Parse the data into xml.
        let response = await this.instance.post(this.apiUrl + endpointUrl, data);
        let arrayResponse = await this.responseToArray(response);
        return arrayResponse;
    }

    /**
     * Converts an API response into an associative array, via XML
     * @param string $response
     * @return array
     */
    private responseToArray(response: AxiosResponse) : Promise<any>
    {
        let data = response.data;

        return new Promise((resolve, reject) => {
          parseString(data, {trim: true, ignoreAttrs: true, explicitArray: false}, (err: any, result: any) => {
            if(!err) {
              // let items = JSON.stringify(result);
              // console.log(items);
              resolve(result);
            }

            reject(err);
          });
        })
    }
}
