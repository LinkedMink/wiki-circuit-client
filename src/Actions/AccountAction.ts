import { Action } from "redux";

export enum AccountActionType {
  SaveSession = "SAVE_SESSION",
  DestroySession = "DESTROY_SESSION",
  SaveAccount = "SAVE_ACCOUNT",
}

export interface AccountAction extends Action<AccountActionType> {
  type: AccountActionType;
  payload: null | string | Record<string, unknown>;
}

export function saveSession(jwtToken: string): AccountAction {
  return {
    type: AccountActionType.SaveSession,
    payload: jwtToken,
  };
}

export function destroySession(): AccountAction {
  return {
    type: AccountActionType.DestroySession,
    payload: null,
  };
}

export function saveAccount(data: Record<string, unknown>): AccountAction {
  return {
    type: AccountActionType.SaveAccount,
    payload: data,
  };
}
