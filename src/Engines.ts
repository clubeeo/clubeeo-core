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
  get accessEngine() { return this.once('accessEngine', () => new AccessEngine(this.app)) }
  get badgeEngine() { return this.once('badgeEngine', () => new BadgeEngine(this.app)) }
  get motionEngine() { return this.once('motionEngine', () => new MotionEngine(this.app)) }
  get roleEngine() { return this.once('roleEngine', () => new RoleEngine(this.app)) }
  get translation(): ITranslationEngine { return this.once('translation', () => new TranslationEngine(this.app)) }

}
