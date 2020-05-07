interface ApiConfig {
  host?: string;
  port?: number;
  cors?: boolean;
}

type Method = 'GET' | 'POST' | 'PUT';

class EntityEndpoint {
  constructor(public url: string, public entityEndpoint: string, public requestParams?: RequestInit) {}

  fetchWithParams(method: Method, entityUrl: string, body?: any): Promise<Response> {
    return fetch(`${this.url}/${entityUrl}`, {
      method,
      ...(this.requestParams || {}),
      body: JSON.stringify(body),
    });
  }

  Get(id?: number): Promise<Response> {
    return this.fetchWithParams('GET', `${this.entityEndpoint}${id ? `/${id}` : ''}`);
  }

  Post(body: any): Promise<Response> {
    return this.fetchWithParams('POST', this.entityEndpoint, body);
  }

  Put(id: number, body: any): Promise<Response> {
    return this.fetchWithParams('PUT', `${this.entityEndpoint}/${id}}`, body);
  }
}

export default class API {
  rootUrl: string;
  requestParams?: RequestInit;

  constructor(apiConfig: ApiConfig) {
    this.rootUrl = `${apiConfig.host || '127.0.0.1'}:${apiConfig.port || 8080}`;

    if (apiConfig.cors) {
      this.requestParams = {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
  }

  makeEntityEndpoint(entityName: string) {
    return new EntityEndpoint(this.rootUrl, entityName, this.requestParams);
  }
}
