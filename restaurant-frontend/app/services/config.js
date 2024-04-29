import Service from '@ember/service';

export default class ConfigService extends Service {
  host = 'http://localhost:8080';
  namespace = 'api';
}
