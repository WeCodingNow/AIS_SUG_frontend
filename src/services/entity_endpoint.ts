type Method = 'GET' | 'POST' | 'PUT';

export default class EntityEndpoint {
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
