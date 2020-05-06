interface ApiConfig {
  host?: string;
  port?: number;
  cors?: boolean;
}

class EntityEndpoint {
  constructor(public url: string, public entityEndpoint: string, public requestParams?: RequestInit) {}

  Get(id?: number): Promise<Response> {
    return fetch(`${this.url}/${this.entityEndpoint}${id || ''}`, {
      method: 'GET',
      ...(this.requestParams ? this.requestParams : {}),
    });
  }

  Post(body: any): Promise<Response> {
    return fetch(`${this.url}/${this.entityEndpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...(this.requestParams ? this.requestParams : {}),
    });
  }

  Put(id: number, body: any): Promise<Response> {
    return fetch(`${this.url}/${this.entityEndpoint}${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...(this.requestParams ? this.requestParams : {}),
    });
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
