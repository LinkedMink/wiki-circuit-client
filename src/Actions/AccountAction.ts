import { Action } from "redux";
import { JwtPayload } from "../Constants/Account";

export enum AccountActionType {
  SaveSession = "SAVE_SESSION",
  DestroySession = "DESTROY_SESSION",
  SaveAccount = "SAVE_ACCOUNT",
}

export interface AccountTokens {
  jwtToken: string;
  decodedToken: JwtPayload;
}

export interface AccountAction extends Action<AccountActionType> {
  type: AccountActionType;
  payload: null | Record<string, unknown> | AccountTokens;
}

export function saveSession(
  jwtToken: string,
  decodedToken: JwtPayload
): AccountAction {
  return {
    type: AccountActionType.SaveSession,
    payload: { jwtToken, decodedToken },
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
