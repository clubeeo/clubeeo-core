import {BadgeEngine} from './engines/BadgeEngine/BadgeEngine'
import {AccessEngine} from './engines/AccessEngine/AccessEngine'
import {RoleEngine} from './engines/RoleEngine/RoleEngine'
import MotionEngine from './engines/MotionEngine/MotionEngine';
import {EnginesContainerBase} from './core/lib/EngineBase'
import {App} from './App'
import AppsEngine from './engines/AppsEngine/AppsEngine'
import TranslationEngine from './engines/TranslationEngine/TranslationEngine';

export class Engines extends EnginesContainerBase<App> {
  protected app: App;

  constructor(app: App) {
    super(app);
    this.app = app;

    return this
  }

  static buildDefault(app: App) {
    return new Engines(app)
      .mount('apps', AppsEngine)
      .mount('access', AccessEngine)
      .mount('badge', BadgeEngine)
      .mount('motion', MotionEngine)
      .mount('role', RoleEngine)
      .mount('translation', TranslationEngine);
  }

  access: AccessEngine;
  /**
   * @deprecated Use `access` instead.
   */
  get accessEngine() { return this.access }

  badge: BadgeEngine;
  /**
   * @deprecated Use `badge` instead.
   */
  get badgeEngine() { return this.badge }

  motion: MotionEngine;
  /**
   * @deprecated Use `motion` instead.
   */
  get motionEngine() { return this.motion }

  role: RoleEngine;
  /**
   * @deprecated Use `role` instead.
   */
  get roleEngine() { return this.role }

}
