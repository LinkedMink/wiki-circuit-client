import { Reducer } from "redux";
import {
  AlertAction,
  AlertActionType,
  AlertRedirect,
} from "../Actions/AlertAction";

export enum AlertSeverity {
  NONE = "None",
  INFO = "Info",
  ERROR = "Error",
}

export interface Alert {
  severity: AlertSeverity;
  message: string;
  redirect: string;
}

export type AlertReduced = Alert | Record<string, never>;

const accountReducer: Reducer<AlertReduced, AlertAction> = (
  state: AlertReduced = {},
  action: AlertAction
): AlertReduced => {
  if (action.type === AlertActionType.Clear) {
    return Object.assign({}, state, {
      severity: undefined,
      message: undefined,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Error) {
    return Object.assign({}, state, {
      severity: AlertSeverity.ERROR,
      message: action.payload,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Info) {
    return Object.assign({}, state, {
      severity: AlertSeverity.INFO,
      message: action.payload,
      redirect: undefined,
    });
  } else if (action.type === AlertActionType.Redirect) {
    const alert = action.payload as AlertRedirect;
    return Object.assign({}, state, {
      severity: AlertSeverity.ERROR,
      message: alert.message,
      redirect: alert.path,
    });
  } else {
    return state;
  }
};

export default accountReducer;
