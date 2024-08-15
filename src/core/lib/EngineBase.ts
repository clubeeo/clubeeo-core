import { ContainerBase } from "./ContainerBase";
import _ from "lodash";

export class EngineBase extends ContainerBase {
  readonly type = 'engine';
}

export class EnginesContainerBase extends ContainerBase {
  // constructor(protected c: { logger: ILogger }) {
  //   super();
  // }

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
        // this.c.logger.info({method, engineName}, `${engineName}.${method}: call`);
        await engine[method](...args);
        // this.c.logger.info({method, engineName}, `${engineName}.${method}: done`);
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
