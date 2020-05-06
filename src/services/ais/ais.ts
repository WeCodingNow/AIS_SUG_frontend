interface ApiConfig {
  host: string;
  port: number;
}

export default class AisService {
  rootUrl: string;

  constructor(apiConfig: ApiConfig) {
    this.rootUrl = `${apiConfig.host}:${apiConfig.port}`;
  }
}
