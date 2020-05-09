import EntityEndpoint from './entity_endpoint';

interface ApiConfig {
  host?: string;
  port?: number;
  cors?: boolean;
}

export default class API {
  rootUrl: string;
  token?: string;
  requestParams?: RequestInit;

  constructor(apiConfig: ApiConfig) {
    this.rootUrl = `${apiConfig.host || '127.0.0.1'}:${apiConfig.port || 8080}`;

    this.requestParams = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (apiConfig.cors) {
      this.requestParams.mode = 'cors';
    }
  }

  setToken(token: string) {
    this.token = token;

    if (this.requestParams) {
      this.requestParams.headers = {
        ...this.requestParams.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }
  }

  clearToken() {
    this.token = undefined;

    if (this.requestParams) {
      this.requestParams.headers = {
        ...this.requestParams.headers,
        Authorization: '',
      };
    }
  }

  makeEntityEndpoint(entityName: string) {
    return new EntityEndpoint(this.rootUrl, entityName, this.requestParams);
  }
}
