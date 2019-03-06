import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
const parser = require('fast-xml-parser');

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
        const config: AxiosRequestConfig = {
          auth: {
            password: apiKey,
            username: apiUser
          },
          baseURL: this.apiUrl,
          headers: {
            'Accept': 'application/xml',
            'Content-Type': 'application/xml'
          },
          timeout: 15000,
        };

        this.instance = axios.create(config);
    }

    protected async get(endpointUrl: string) {
      try {
        const response = await this.instance.get(this.apiUrl + endpointUrl);
        const arrayResponse = await this.responseToArray(response);
        return arrayResponse;
      } catch(e) {
        console.log(e);
      }
    }

    protected async post(endpointUrl: string, data: any) {
      try {
        // Parse the data into xml.
        const response = await this.instance.post(this.apiUrl + endpointUrl, data);
        const arrayResponse = await this.responseToArray(response);
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
        const data = response.data;

        const jsonObj = await parser.parse(data);

        return jsonObj;
    }
}
