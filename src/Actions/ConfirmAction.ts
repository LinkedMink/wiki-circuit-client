import { Action } from "redux";

export enum ConfirmActionType {
  ClearKey = "CONFIRM_CLEAR_KEY",
  OpenDialog = "CONFIRM_OPEN_DIALOG",
  SetValue = "CONFIRM_SET_VALUE",
}

export interface ConfirmData {
  key?: string;
  message?: string;
  value?: unknown;
}

export interface ConfirmAction extends Action<ConfirmActionType> {
  type: ConfirmActionType;
  payload: ConfirmData;
}

export function confirmOpenDialog(key: string, message: string): ConfirmAction {
  return {
    type: ConfirmActionType.OpenDialog,
    payload: {
      key,
      message,
    },
  };
}

export function confirmClearKey(key: string): ConfirmAction {
  return {
    type: ConfirmActionType.ClearKey,
    payload: { key },
  };
}

export function confirmSetValue(value: unknown): ConfirmAction {
  return {
    type: ConfirmActionType.SetValue,
    payload: { value },
  };
}
