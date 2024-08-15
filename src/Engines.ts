import {BadgeEngine} from './engines/BadgeEngine/BadgeEngine'
import {AccessEngine} from './engines/AccessEngine/AccessEngine'
import {RoleEngine} from './engines/RoleEngine/RoleEngine'
import MotionEngine from './engines/MotionEngine/MotionEngine';
import {EnginesContainerBase} from './core/lib/EngineBase'
import {App} from './App'
import AppsEngine from './engines/AppsEngine/AppsEngine'
import TranslationEngine from './engines/TranslationEngine/TranslationEngine';
import { ITranslationEngine } from './engines/TranslationEngine/TranslationTypes';

export class Engines extends EnginesContainerBase {
  protected app: App;

  constructor(app: App) {
    super();
    this.app = app;

    this.enableEngines('apps', 'accessEngine', 'badgeEngine', 'motionEngine', 'roleEngine', 'translation');
  }

  get apps() { return this.once('apps', () => new AppsEngine(this.app)) }

  get access() { return this.once('access', () => new AccessEngine(this.app)) }
  /**
   * @deprecated Use `access` instead.
   */
  get accessEngine() { return this.access }

  get badge() { return this.once('badge', () => new BadgeEngine(this.app)) }
  /**
   * @deprecated Use `badge` instead.
   */
  get badgeEngine() { return this.badge }

  get motion() { return this.once('motion', () => new MotionEngine(this.app)) }
  /**
   * @deprecated Use `motion` instead.
   */
  get motionEngine() { return this.motion }

  get role() { return this.once('role', () => new RoleEngine(this.app)) }
  /**
   * @deprecated Use `role` instead.
   */
  get roleEngine() { return this.role }

  get translation(): ITranslationEngine { return this.once('translation', () => new TranslationEngine(this.app)) }

}
