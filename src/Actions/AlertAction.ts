import { Action } from "redux";

export enum AlertActionType {
  Clear = "ALERT_CLEAR",
  Redirect = "ALERT_REDIRECT",
  Error = "ALERT_ERROR",
  Info = "ALERT_INFO",
}

export interface AlertRedirect {
  message: string;
  path: string;
}

export interface AlertAction extends Action<AlertActionType> {
  type: AlertActionType;
  payload: AlertRedirect | string | null;
}

export function alertClear(): AlertAction {
  return {
    type: AlertActionType.Clear,
    payload: null,
  };
}

export function alertRedirect(message: string, path: string): AlertAction {
  return {
    type: AlertActionType.Redirect,
    payload: {
      message,
      path,
    },
  };
}

export function alertError(text: string): AlertAction {
  return {
    type: AlertActionType.Error,
    payload: text,
  };
}

export function alertInfo(text: string): AlertAction {
  return {
    type: AlertActionType.Info,
    payload: text,
  };
}
