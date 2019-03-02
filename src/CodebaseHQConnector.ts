import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
var parser = require('fast-xml-parser');

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
            timeout: 15000,
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
      try {
        let response = await this.instance.get(this.apiUrl + endpointUrl);
        let arrayResponse = await this.responseToArray(response);
        return arrayResponse;
      } catch(e) {
        console.log(e);
      }
    }

    protected async post(endpointUrl: string, data: any) {
      try {
        // Parse the data into xml.
        let response = await this.instance.post(this.apiUrl + endpointUrl, data);
        let arrayResponse = await this.responseToArray(response);
        return arrayResponse;
      } catch(e) {
        console.log(e);
      }
    }

    /**
     * Converts an API response into an associative array, via XML
     * @param string $response
     * @return array
     */
    private async responseToArray(response: AxiosResponse): Promise<any>
    {
        let data = response.data;

        var jsonObj = await parser.parse(data);

        return jsonObj;
    }
}
