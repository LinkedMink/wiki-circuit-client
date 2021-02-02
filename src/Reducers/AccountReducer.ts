import * as jwt from "jsonwebtoken";
import { Reducer } from "redux";
import store from "../Store";
import { AccountAction, AccountActionType } from "../Actions/AccountAction";

export interface JwtPayload {
  aud: string;
  claims: string[];
  email: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

export interface Account {
  jwtToken?: string;
  decodedToken?: JwtPayload;
  profile: Record<string, unknown>;
}

export type AccountReduced = Account | Record<string, never>;

const accountReducer: Reducer<AccountReduced, AccountAction> = (
  state: AccountReduced = {},
  action: AccountAction
): AccountReduced => {
  if (action.type === AccountActionType.SaveSession) {
    const jwtToken = action.payload as string;
    const signerKey = store.getState().config?.signerKey;
    return Object.assign({}, state, {
      jwtToken,
      decodedToken: signerKey
        ? jwt.verify(jwtToken, signerKey)
        : jwt.decode(jwtToken),
    });
  } else if (action.type === AccountActionType.DestroySession) {
    return Object.assign({}, state, {
      jwtToken: undefined,
      decodedToken: undefined,
    });
  } else if (action.type === AccountActionType.SaveAccount) {
    return Object.assign({}, state, {
      profile: action.payload,
    });
  } else {
    return state;
  }
};

export default accountReducer;
