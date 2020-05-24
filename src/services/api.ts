import EntityEndpoint from './entity_endpoint';

interface ApiConfig {
  host?: string;
  port?: number;
  cors?: boolean;
}

const tokenKey = 'ais_api_token';

export default class API {
  rootUrl: string;
  token?: string;
  requestParams?: RequestInit;

  constructor(apiConfig: ApiConfig) {
    const token = window.localStorage.getItem(tokenKey);

    if (token) {
      this.setToken(token);
    }

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
    } else {
      this.requestParams = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    }

    window.localStorage.setItem(tokenKey, token);
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
