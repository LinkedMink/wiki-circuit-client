import { Action } from "redux";

export const SAVE_CONFIG = "SAVE_CONFIG";
export type SaveConfig = "SAVE_CONFIG";

export interface ConfigData {
  urls: {
    user: string;
    scheduler: string;
  };
  jwtPublicKey: string;
  logLevelConsole: string;
  logLevelPersist: string;
}

export interface ConfigAction extends Action<SaveConfig> {
  type: SaveConfig;
  payload: ConfigData;
}

export function saveConfig(config: ConfigData): ConfigAction {
  return {
    type: SAVE_CONFIG,
    payload: config,
  };
}
