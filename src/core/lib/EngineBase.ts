import { ContainerBase } from "./ContainerBase";
import _ from "lodash";

export class EngineBase extends ContainerBase{
  readonly type = 'engine';
}

export class EnginesContainerBase extends ContainerBase {
  async forEachEngine(fn: (engine: any) => Promise<void>) {
    for (const engineName of this.enabledEngines) {
      const engine = this[engineName];
      await fn(engine);
    }
  }

  async callEachEngine(method: string, ...args: any[]) {
    for (const engineName of this.enabledEngines) {
      const engine = this[engineName];
      if (method in engine) {
        await engine[method](...args);
      }
    }
  }

  enableEngines(...engines: string[]) {
    this.enabledEngines = _.uniq([...this.enabledEngines, ...engines]);
  }

  disableEngines(...engines: string[]) {
    this.enabledEngines = this.enabledEngines.filter(e => !engines.includes(e));
  }

  enabledEngines: string[] = [];
}
