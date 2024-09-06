import {nanoid} from 'nanoid';
import {AppEnv} from './appEnv';
import {IModelHooksService, ModelHooksDummyService} from './services/ModelHooksService';
import {UserManageService} from './services/user/UserManageService';
import {AccessService} from './services/AccessService'
import {BricksLoggerConsole, BricksLoggerMultiProxy, IBricksLogger} from 'bricks-ts-logger';
import {DatabaseLoggerConsole} from './services/DatabaseLogger'
import axios from 'axios';
import {MeInClubService} from './services/MeInClubService'
import {Emitter} from 'mitt'
import {ReposContainer} from './models/repos/ReposContainer'
import {ClubUserEvents, clubUserEventsFactory} from './events/clubUserEvents'
import {DataSource} from 'typeorm/data-source/DataSource'
import {TelegramContainer} from './clubApps/TelegramApp/TelegramContainer'
import {Contexts} from './Contexts'
import {UserSenderService} from './services/UserSenderService'
import {postEventsFactory, TPostEvents} from './clubApps/PostsApp/postEvents'
import {Engines} from './Engines'
import {SimpleFileUploadService} from './services/uploads/SimpleFileUploadService'
import {ClubWidgetFactory} from './factories/ClubWidgetFactory'
import {AppFactory} from './engines/AppsEngine/AppsFactory'
import ClubeeoCoreApp from './core/ClubeeoCoreApp';
import { taskProcessingDaemon } from './daemons/TaskProcessingDaemon/taskProcessingDaemon';
import AuthService from './services/AuthService';
import AppSettings from './AppSettings';
import User from './models/User';
import UserExt from './models/UserExt';
import Member from './models/Member';
import Club from './models/Club';

/**
 * Application service container
 *
 * Naming:
 * * Exact implementation named as class (e.g. SyncTemplateMailerService)
 * * Interface named in snake case without "Service" suffix  (e.g. templateMailer)
 */
export class App extends ClubeeoCoreApp<User, UserExt, Member, Club> {
  readonly clubUserEvents: Emitter<ClubUserEvents>;
  readonly postEvents: Emitter<TPostEvents>;
  readonly axios = axios;

  constructor(env: AppEnv) {
    super({
      User: User,
      UserExt: UserExt,
      Member: Member,
      Club: Club,
    });

    this.clubUserEvents = clubUserEventsFactory(this);
    this.postEvents = postEventsFactory(this);
  }

  async run() {
    await super.run();

    if (this.Env.workers.legacyTasks) {
      // cron(app);
      taskProcessingDaemon(this);
    }

    if (this.Env.workers.motion) {
      this.engines.motion.runDaemon();
    }
  }

  get Env() { return this.once('Env', () => AppEnv.getInstance()) }

  get Settings() { return this.once('Settings', () => new AppSettings(this)) }

  /**
   * @deprecated use `logger` instead
   */
  get consoleLogger(): IBricksLogger { return this.once('consoleLogger', () => new BricksLoggerConsole()) }
  get nanoid() { return nanoid }

  // nested containers
  get contexts() { return this.once('contexts', () => new Contexts(this)) }

  get engines() { return this.once('engines', () => Engines.buildDefault(this)) }
  get ng() { return this.engines; }

  get repos() { return this.once('repos', () => new ReposContainer(this)) }

  /**
   * @deprecated
   * @returns {DataSource}
   **/
  get DB(): DataSource { return this.db }

  // services

  /**
   * @deprecated access via `ng` instead
   */
  get auth() { return this.once('auth', () => new AuthService(this)) }

  /**
   * @deprecated access via `ng` instead
   */
  get access() { return this.once('access', () => new AccessService(this)) }

  get clubAppFactory() { return this.once('clubAppFactory', () => new AppFactory(this)) }
  get clubWidgetFactory() { return this.once('clubWidgetFactory', () => new ClubWidgetFactory(this)) }
  get fileUploadService() { return this.once('fileUploadService', () => new SimpleFileUploadService(this)) }
  get MeInClubService() { return this.once('MeInClubService', () => new MeInClubService(this)) }
  get modelHooks(): IModelHooksService { return this.once('modelHooks', () => new ModelHooksDummyService(this)) }
  get UserManageService() { return this.once('UserManageService', () => new UserManageService(this)) }
  get userSender() { return this.once('userSender', () => new UserSenderService(this)) }

  // logger
  /**
   * @deprecated use `logger` instead
   */
  get log(): IBricksLogger {
    return this.once('log', () => new BricksLoggerMultiProxy(
      this.consoleLogger,
      this.dbLogger,
    ));
  }
  /**
   * @deprecated use `logger` instead
   */
  get dbLogger(): IBricksLogger { return this.once('dbLogger', () => new DatabaseLoggerConsole(this)) }

  // integrations: todo: move to engines
  get TelegramContainer() { return this.once('TelegramContainer', () => new TelegramContainer(this)) }

  // settings
  get dataSourceSettings() {
    return {
      ...super.dataSourceSettings,
      entities: [
        __dirname + "/models/*.ts",
        __dirname + "/engines/MotionEngine/models/*.ts",
        ...Object.values(this.engines.apps.models),
        ...Object.values(this.engines.translations.models),
      ],
    };
  }

}

export default App;