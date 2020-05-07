import Config from '../config.json';

import API from './api';

class AisAPI extends API {
  get Contact() {
    return this.makeEntityEndpoint('contact');
  }

  get ContactType() {
    return this.makeEntityEndpoint('contact_type');
  }

  get ControlEventType() {
    return this.makeEntityEndpoint('control_event_type');
  }

  get ControlEvent() {
    return this.makeEntityEndpoint('control_event');
  }

  get Discipline() {
    return this.makeEntityEndpoint('discipline');
  }

  get Group() {
    return this.makeEntityEndpoint('group');
  }

  get Mark() {
    return this.makeEntityEndpoint('mark');
  }

  get Residence() {
    return this.makeEntityEndpoint('residence');
  }

  get Semester() {
    return this.makeEntityEndpoint('semester');
  }

  get Student() {
    return this.makeEntityEndpoint('student');
  }
}

export default new AisAPI(Config.api.ais);
