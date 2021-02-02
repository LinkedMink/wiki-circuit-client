import { Reducer } from "redux";
import { ConfigAction, SAVE_CONFIG } from "../Actions/ConfigAction";
import { LogLevel } from "../Shared/LogService";

export interface Config {
  urls: {
    user: string;
    scheduler: string;
  };
  signerKey: string | null;
  logLevelConsole: LogLevel;
  logLevelPersist: LogLevel;
}

export type ConfigReduced = Config | Record<string, never>;

const configReducer: Reducer<ConfigReduced, ConfigAction> = (
  state: ConfigReduced = {},
  action: ConfigAction
): ConfigReduced => {
  if (action.type === SAVE_CONFIG) {
    const config: Config = {
      urls: action.payload.urls,
      signerKey: action.payload.jwtPublicKey
        ? atob(action.payload.jwtPublicKey)
        : null,
      logLevelConsole: LogLevel[action.payload.logLevelConsole.toUpperCase()],
      logLevelPersist: LogLevel[action.payload.logLevelPersist.toUpperCase()],
    };

    return config;
  } else {
    return state;
  }
};

export default configReducer;
