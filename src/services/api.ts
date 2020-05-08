import EntityEndpoint from './entity_endpoint';

interface ApiConfig {
  host?: string;
  port?: number;
  cors?: boolean;
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
