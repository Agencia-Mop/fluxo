import { join } from "path";
import { ActionProps } from "./../../types";

import { PATH_ACTIONS } from "./../../config/constants";
import { Action } from "./../Action";
import { Log } from "../Log";

export class ActionFactory {
  static async new (data: ActionProps) {
    if (data.type === "action") {
      const actionName = data.action;
      const pathModule = join(PATH_ACTIONS, actionName);

      Log.log(pathModule);

      const ActionModule =  await import (pathModule);
      return new ActionModule.default(data);
    }
    return new Action (data);
  }
  
} 