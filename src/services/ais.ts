import Config from '../config.json';

import API from './api';

class AisAPI extends API {
  get Contact() {
    return this.makeEntityEndpoint('contact');
  }
}

export default new AisAPI(Config.api.ais);
