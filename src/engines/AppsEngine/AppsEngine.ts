import App from '../../App'
import clubAppRoutes from './api/clubAppRoutes'
import ClubApp from './models/ClubApp';
import ClubAppProp from './models/ClubAppProp';
import ClubAppRole from './models/ClubAppRole';
import ClubAppRepo from './repos/ClubAppRepo'
import { EngineBase } from '../../core/lib/EngineBase';
import { AppsService } from './AppsService';

export default class AppsEngine extends EngineBase {
  readonly type = 'engine';
  readonly app: App;
  readonly service: AppsService<App>;
  readonly repos: {
    clubApp: ClubAppRepo,
  }

  constructor(app: App) {
    super();

    this.app = app;
    this.service = new AppsService(app);
    this.repos = {
      clubApp: new ClubAppRepo(app),
    };
  }

  models = {
    ClubApp,
    ClubAppProp,
    ClubAppRole,
  }

  get api() { return clubAppRoutes(this) }

  apiConfig = {prefix: '/club/:clubSlug/app'}

}
